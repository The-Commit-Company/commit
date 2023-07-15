import dagre from '@dagrejs/dagre'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import '../../../styles/flow.css'
import ReactFlow, {
    Background,
    Controls,
    Edge,
    Handle,
    Node,
    NodeProps,
    Position,
    ReactFlowProvider,
    useReactFlow,
    MarkerType,
    ControlButton,
    getConnectedEdges,
    useStoreApi,
    useEdgesState,
    useNodesState
} from 'reactflow'
import tables, { relationships } from './tables'
// import { uniqBy } from 'lodash'
import 'reactflow/dist/style.css'
import { PostgresTable, PostgresRelationship, TableNodeData } from '@/types/Table'
import { CgMaximizeAlt } from 'react-icons/cg'
import { TbArrowsMinimize } from 'react-icons/tb'
// import { set } from 'lodash'

// ReactFlow is scaling everything by the factor of 2
const NODE_WIDTH = 320
const NODE_ROW_HEIGHT = 40

export const Graph = () => {
    return (
        <ReactFlowProvider>
            <TablesGraph tables={tables} relationships={relationships} />
        </ReactFlowProvider>
    )
}

function getGraphDataFromTables(tables: PostgresTable[], relationships: PostgresRelationship[]): {
    nodes: Node<TableNodeData>[]
    edges: Edge[]
} {
    if (!tables.length) {
        return { nodes: [], edges: [] }
    }

    const nodes = tables.map((table) => {
        const columns = (table.columns || []).map((column) => {
            return {
                id: column.id,
                name: column.name,
                format: column.format,
            }
        })

        return {
            id: `${table.id}`,
            type: 'table',
            data: {
                name: table.name,
                isForeign: false,
                columns,
            },
            position: { x: 0, y: 0 },
        }
    })

    const edges: Edge[] = []

    const uniqueRelationships: PostgresRelationship[] = relationships

    for (const rel of uniqueRelationships) {


        const [source, sourceHandle] = findTablesHandleIds(
            tables,
            rel.source_table_name,
            rel.source_column_name
        )
        const [target, targetHandle] = findTablesHandleIds(
            tables,
            rel.target_table_name,
            rel.target_column_name
        )

        // We do not support [external->this] flow currently.
        if (source && target) {
            edges.push({
                id: String(rel.id),
                source,
                sourceHandle,
                target,
                targetHandle,
                animated: true,
            })
        }
    }

    return getLayoutedElements(nodes, edges)
}

function findTablesHandleIds(
    tables: PostgresTable[],
    table_name: string,
    column_name: string
): [string?, string?] {
    for (const table of tables) {
        if (table_name !== table.id) continue

        for (const column of table.columns || []) {
            if (column_name !== column.id) continue

            return [String(table.id), column.id]
        }
    }

    return []
}

const getLayoutedElements = (nodes: Node<TableNodeData>[], edges: Edge[]) => {
    const dagreGraph = new dagre.graphlib.Graph()
    dagreGraph.setDefaultEdgeLabel(() => ({}))
    dagreGraph.setGraph({
        rankdir: 'LR',
        align: 'UL',
        nodesep: 100,
        ranksep: 50,
    })

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, {
            width: NODE_WIDTH / 2,
            height: (NODE_ROW_HEIGHT / 2) * (node.data.columns.length + 1), // columns + header
        })
    })

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target)
    })

    dagre.layout(dagreGraph)

    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id)
        node.targetPosition = Position.Left
        node.sourcePosition = Position.Right
        // We are shifting the dagre node position (anchor=center center) to the top left
        // so it matches the React Flow node anchor point (top left).
        node.position = {
            x: nodeWithPosition.x - nodeWithPosition.width / 2,
            y: nodeWithPosition.y - nodeWithPosition.height / 2,
        }

        return node
    })

    return { nodes, edges }
}


function TableNode({ data, targetPosition, sourcePosition }: NodeProps<TableNodeData>) {
    // Important styles is a nasty hack to use Handles (required for edges calculations), but do not show them in the UI.
    // ref: https://github.com/wbkd/react-flow/discussions/2698
    const hiddenNodeConnector = '!h-px !w-px !min-w-0 !min-h-0 !cursor-grab !border-0 !opacity-0'

    return (
        <div className={`w-[${NODE_WIDTH / 2}px] rounded-lg overflow-hidden bg-white  shadow-sm`}>
            <header className="text-[0.5rem] leading-5 px-2 font-bold text-center bg-blue-500 text-white">
                {data.name}
            </header>

            {data.columns.map((column) => (
                <div
                    className="text-[8px] leading-5 relative flex justify-between odd:bg-scale-300 even:bg-scale-400 border-slate-100 border"
                    key={column.id}
                >
                    <span
                        className={`${column.id === "name" ? 'border-l-2 border-l-blue-500 pl-[6px] pr-2' : 'px-2'
                            } text-ellipsis overflow-hidden whitespace-nowrap`}
                    >
                        {column.name}
                    </span>
                    <span className="px-2">{column.format}</span>
                    {targetPosition && (
                        <Handle
                            type="target"
                            id={column.id}
                            position={targetPosition}
                            className={`${hiddenNodeConnector} !left-0`}
                        />
                    )}
                    {sourcePosition && (
                        <Handle
                            type="source"
                            id={column.id}
                            position={sourcePosition}
                            className={`${hiddenNodeConnector} !right-0`}
                        />
                    )}
                </div>
            ))}
        </div>
    )
}

const TablesGraph: FC<{ tables: PostgresTable[], relationships: PostgresRelationship[] }> = ({ tables, relationships }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [fullscreenOn, setFullScreen] = useState(false);
    // const [nodeHoverActive, setNodeHoverActive] = useState(true);
    const reactFlowInstance = useReactFlow()
    const nodeTypes = useMemo(
        () => ({
            table: TableNode,
        }),
        []
    )



    const toggleFullScreen = () => {
        if (fullscreenOn) {
            document.exitFullscreen().then(function () {
                setFullScreen(false)
            })
                .catch(function (error) {
                    alert("Can't exit fullscreen")
                    console.error(error)
                });
        } else {
            const element = document.querySelector("body");

            // make the element go to full-screen mode
            element && element.requestFullscreen()
                .then(function () {
                    setFullScreen(true)
                })
                .catch(function (error) {
                    alert("Can't turn on fullscreen")
                    console.error(error)
                });
        }
    }
    const store = useStoreApi();
    const onNodeMouseEnter = useCallback(
        (_: any, node: Node) => {

            const state = store.getState();
            state.resetSelectedElements();
            state.addSelectedNodes([node.id]);

            const connectedEdges = getConnectedEdges([node], edges);
            setEdges(eds => {
                return eds.map((ed) => {
                    if (connectedEdges.find(e => e.id === ed.id)) {
                        ed.animated = false
                        ed.style = {
                            ...ed.style,
                            stroke: '#042f2e',
                        }
                        // setHighlightEdgeClassName(ed);
                    }

                    return ed;
                });
            });
        },
        [edges, setEdges, store]
    );

    const onNodeMouseLeave = useCallback(
        (_: any, node: Node) => {

            const state = store.getState();
            state.resetSelectedElements();
            state.addSelectedNodes([node.id]);

            const connectedEdges = getConnectedEdges([node], edges);
            setEdges(eds => {
                return eds.map((ed) => {
                    if (connectedEdges.find(e => e.id === ed.id)) {
                        ed.animated = true
                        ed.style = {
                            ...ed.style,
                            stroke: '#0ea5e9',
                        }
                    }

                    return ed;
                });
            });
        },
        [edges, setEdges, store]
    );

    useEffect(() => {
        const { nodes, edges } = getGraphDataFromTables(tables, relationships)
        setNodes(nodes)
        setEdges(edges)
        // reactFlowInstance.setNodes(nodes)
        // reactFlowInstance.setEdges(edges)
        setTimeout(() => reactFlowInstance.fitView({})) // it needs to happen during next event tick

    }, [tables, relationships, setNodes, setEdges, reactFlowInstance])



    return (
        <>
            <div className='Flow' style={{ width: '100vw', height: '100vh' }}>
                {/* <Markers /> */}
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    defaultNodes={[]}
                    defaultEdges={[]}
                    onNodeMouseEnter={onNodeMouseEnter}
                    onNodeMouseLeave={onNodeMouseLeave}
                    snapToGrid={true}
                    snapGrid={[16, 16]}
                    defaultEdgeOptions={{
                        type: 'smoothstep',
                        markerEnd: MarkerType.ArrowClosed,
                        deletable: false,
                        style: {
                            stroke: '#0ea5e9',
                            strokeWidth: 2,
                            // color: '#082f49'
                        },
                    }}
                    nodeTypes={nodeTypes}
                    fitView
                    proOptions={{
                        hideAttribution: true,
                    }}
                >
                    <Controls showFitView={false}>
                        <ControlButton onClick={toggleFullScreen}>
                            {!fullscreenOn && <CgMaximizeAlt />}
                            {fullscreenOn && <TbArrowsMinimize />}
                        </ControlButton>
                    </Controls>
                    {/* <Background /> */}
                    {/* <Background id="1" gap={10} color="#aaaaaa" variant={BackgroundVariant.Dots} />
                    <Background
                        id="2"
                        gap={100}
                        offset={1}
                        color="#dddddd"
                        variant={BackgroundVariant.Lines}
                    /> */}
                    <Background color="#aaa" gap={16} />
                </ReactFlow>

            </div>
        </>
    )
}
import dagre from '@dagrejs/dagre'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import '../../../../styles/flow.css'

import ReactFlow, {
    Background,
    Controls,
    Edge,
    Node,
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
// import { uniqBy } from 'lodash'
import 'reactflow/dist/style.css'
import { PostgresTable, PostgresRelationship, TableNodeData } from '@/types/Table'
import { CgMaximizeAlt } from 'react-icons/cg'
import { TbArrowsMinimize } from 'react-icons/tb'
import { TableNode } from '../TableNode'
import { MetaTableDrawer } from '../../TableDrawer/MetaTableDrawer'

// import { set } from 'lodash'

// ReactFlow is scaling everything by the factor of 2
export const NODE_WIDTH = 320
export const NODE_ROW_HEIGHT = 40

export const MetaGraph = ({ tables, relationships, setDoctypes, doctypes }: {
    tables: PostgresTable[]
    relationships: PostgresRelationship[]
    setDoctypes: React.Dispatch<React.SetStateAction<string[]>>
    doctypes: string[]
}) => {
    return (
        <ReactFlowProvider>
            <TablesGraph tables={tables} relationships={relationships} setDoctypes={setDoctypes} doctypes={doctypes} />
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
        rankdir: 'TB',
        align: 'UL',
        nodesep: 80,
        ranksep: 80,
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



const TablesGraph: FC<{
    tables: PostgresTable[], relationships: PostgresRelationship[], setDoctypes: React.Dispatch<React.SetStateAction<
        string[]
    >>
    doctypes: string[]
}> = ({ tables, relationships, setDoctypes }) => {
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

    const [selectedDoctype, setSelectedDoctype] = useState<string | null>(null);

    const onNodeClick = useCallback((_: any, node: Node<{ name: string }>) => {
        setSelectedDoctype(node.data?.name)
    }, []
    );

    const onNodesDelete = useCallback(
        (nodesToDelete: Node[]) => {
            const nodes = nodesToDelete.map((node) => node.id);
            setNodes((ns) => ns.filter((n) => !nodes.includes(n.id)));
            setEdges((es) =>
                es.filter((e) => {
                    return (
                        !nodes.includes(e.source) && !nodes.includes(e.target)
                    );
                })
            );

            setDoctypes((doctypes) => {
                return doctypes.filter((doctype) => {
                    return !nodes.includes(doctype);
                });
            })
        },
        [setNodes, setEdges, setDoctypes]
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
            <div className='Flow' style={{ width: '100vw', height: 'auto', padding: 2 }}>
                {/* <Markers /> */}
                <ReactFlow
                    style={{
                        backgroundColor: '#F7FAFC',
                    }}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodeClick={onNodeClick}
                    onNodesDelete={onNodesDelete}
                    defaultNodes={[]}
                    defaultEdges={[]}
                    onNodeMouseEnter={onNodeMouseEnter}
                    onNodeMouseLeave={onNodeMouseLeave}
                    snapToGrid={true}
                    snapGrid={[16, 16]}
                    maxZoom={10}
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
                    <Background color="#171923" gap={16} />
                </ReactFlow>
                <MetaTableDrawer isOpen={!!selectedDoctype} onClose={() => setSelectedDoctype(null)} doctype={selectedDoctype ?? ''} key={selectedDoctype} />
            </div>
        </>
    )
}
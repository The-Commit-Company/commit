import { PostgresTable } from "@/types/Table";
import { NodeProps, Handle, useReactFlow } from "reactflow";
import { NODE_WIDTH } from "./Graph";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { XMarkIcon } from '@heroicons/react/24/outline'
import { cn } from "@/lib/utils";


export const TableNode = ({ data, targetPosition, sourcePosition }: NodeProps<PostgresTable>) => {

    const hiddenNodeConnector = '!h-px !w-px !min-w-0 !min-h-0 !cursor-grab !border-0 !opacity-0'

    const { getNode, deleteElements } = useReactFlow();

    const onDelete = () => {
        const nodeToDelete = getNode(data.name)
        if (nodeToDelete) {
            deleteElements({
                nodes: [nodeToDelete],
            }
            )
        }
    }
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className={`w-[${NODE_WIDTH / 2}px ] rounded-lg overflow-hidden bg-white  shadow-sm`}>
                        {data.istable ? <header className="text-[0.5rem] leading-7 px-2 font-bold text-center bg-teal-500 text-white">
                            {data.name}
                        </header>
                            : <header className="text-[0.5rem] leading-7 px-2 font-bold text-center bg-blue-500 text-white">
                                {data.name}
                            </header>}

                        {data.columns.map((column) => (
                            <div
                                className={`text-[8px] leading-5 relative flex justify-between odd:bg-scale-300  even:bg-scale-400 border-slate-100 border ${cn(column.is_custom_field ? 'bg-yellow-50' : '')}`}
                                key={column.id}
                            >
                                <span
                                    className={`${column.id === "name" ? `border-l-2 ${data.istable ? 'border-l-teal-500' : 'border-l-blue-500'} pl-[6px] pr-2` : 'px-2'
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
                </TooltipTrigger>
                <TooltipContent align="start" side="right" sideOffset={0.5} className="p-0 rounded-full bg-white border border-black shadow-sm">
                    <XMarkIcon className="h-2 w-2 m-1 text-black" aria-hidden="true" onClick={onDelete} />
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

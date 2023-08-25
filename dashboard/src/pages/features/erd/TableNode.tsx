import { PostgresTable } from "@/types/Table";
import { NodeProps, Handle } from "reactflow";
import { NODE_WIDTH } from "./Graph";
import { HoverCard, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { TableHoverCard } from "./TableHoverCard";

export const TableNode = ({ data, targetPosition, sourcePosition }: NodeProps<PostgresTable>) => {
    // Important styles is a nasty hack to use Handles (required for edges calculations), but do not show them in the UI.
    // ref: https://github.com/wbkd/react-flow/discussions/2698
    const hiddenNodeConnector = '!h-px !w-px !min-w-0 !min-h-0 !cursor-grab !border-0 !opacity-0'

    return (
        <>
            <div className={`w-[${NODE_WIDTH / 2}px ] rounded-lg overflow-hidden bg-white  shadow-sm`}>
                <header className="text-[0.5rem] leading-5 px-2 font-bold text-center bg-blue-500 text-white">
                    {data.name}
                </header>

                {data.columns.map((column) => (
                    <HoverCard key={column.id}>
                        <HoverCardTrigger asChild>
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
                        </HoverCardTrigger>
                        <TableHoverCard column={column} />
                    </HoverCard>
                ))}
            </div>
        </>
    )
}

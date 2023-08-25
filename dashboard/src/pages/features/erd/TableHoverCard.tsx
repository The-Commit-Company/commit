import { ICON_KEY, ICON_KEY_MAP } from "@/components/common/Icons";
import { PostgresColumn } from "@/types/Table";
import { Arrow, HoverCardContent } from "@radix-ui/react-hover-card";
// import { AiOutlineLink } from "react-icons/ai";


export const TableHoverCard = ({ column }: { column: PostgresColumn }) => {

    const IconComponent = ICON_KEY_MAP[column.format as ICON_KEY]
    return (
        <HoverCardContent className="w-auto bg-white z-10 border border-gray-200 p-2" side='right'>
            <Arrow className="color-gray-200" />
            <div className="flex space-x-2 items-center">
                {/* <div className="flex gap-x-1 items-center"> */}
                {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={column.imageUrl} alt="" /> */}
                <div className="h-8 w-8 flex-none rounded-full border border-gray-200 flex items-center justify-center">
                    <IconComponent className="h-4 w-4" />
                </div>

                <div className="flex-auto ">
                    <p className="text-xs font-semibold leading-3 text-gray-900">{column.name}</p>
                    <p className="mt-1 truncate text-xs leading-3 text-gray-500">{column.id}</p>
                </div>
                {/* </div> */}
            </div>
        </HoverCardContent>
    )
}
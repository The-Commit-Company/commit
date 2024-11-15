import { CommitDocs } from "@/types/commit/CommitDocs";
import { DocsSidebarItem } from "./docs";
import DynamicIcon from "@/components/common/DynamicIconImport/IconComponent";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import classNames from "classnames";
import { cn } from "@/lib/utils";

export const Sidebar = ({ commit_docs, sidebar_items, selectedEndpoint, setSelectedEndpoint }: { commit_docs: Omit<CommitDocs, 'sidebar' | 'navbar_items' | 'footer'>, sidebar_items: Record<string, DocsSidebarItem[]>, selectedEndpoint: string, setSelectedEndpoint: (selectedEndpoint: string) => void }) => {

    return (
        <div className="flex flex-col w-full h-full p-2">
            <div className="flex flex-row items-center gap-4 p-4">
                {commit_docs.light_mode_logo && <img src={commit_docs.light_mode_logo} alt="logo" className="h-8" />}
                {commit_docs.header && <div className="text-lg font-bold">{commit_docs.header}</div>}
            </div>
            <div className="flex flex-col overflow-y-auto gap-3">
                {Object.keys(sidebar_items).map((key) => (
                    <SidebarGroup key={key} groupName={key} items={sidebar_items[key]} selectedEndpoint={selectedEndpoint} setSelectedEndpoint={setSelectedEndpoint} />
                ))}
            </div>
        </div>
    )
}

const SidebarGroup = ({ groupName, items, selectedEndpoint, setSelectedEndpoint }: { groupName: string, items: DocsSidebarItem[], selectedEndpoint: string, setSelectedEndpoint: (selectedEndpoint: string) => void }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-sm font-semibold p-2 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <span>{groupName}</span>
                <span>{isExpanded ? <MdKeyboardArrowDown className={'h-6'} /> : <MdKeyboardArrowRight className={'h-6'} />}</span>
            </div>
            {isExpanded && items.map((item) => (
                <SidebarItem item={item} key={item.route} selectedEndpoint={selectedEndpoint} setSelectedEndpoint={setSelectedEndpoint} />
            ))}
        </div>
    )
}

const SidebarItem = ({ item, selectedEndpoint, setSelectedEndpoint, className, level = 1 }: { item: DocsSidebarItem, selectedEndpoint: string, setSelectedEndpoint: (selectedEndpoint: string) => void, className?: string, level?: number }) => {

    if (item.is_group_page && item.group_items?.length) {
        const [isExpanded, setIsExpanded] = useState(false);
        return (
            <div className="flex flex-col gap-1">
                <SidebarTitle item={item} selectedEndpoint={selectedEndpoint} setSelectedEndpoint={setSelectedEndpoint} className={className} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                {isExpanded && item.group_items.map((groupItem) => (
                    <SidebarItem item={groupItem} key={groupItem.route} selectedEndpoint={selectedEndpoint} setSelectedEndpoint={setSelectedEndpoint} className={`pl-${6 + (2 * (level - 1))}`} level={level + 1} />
                ))}
            </div>
        )
    }

    return (
        <SidebarTitle item={item} selectedEndpoint={selectedEndpoint} setSelectedEndpoint={setSelectedEndpoint} className={className} />
    )
}

const SidebarTitle = ({ item, selectedEndpoint, setSelectedEndpoint, className, isExpanded, setIsExpanded }: { item: DocsSidebarItem, selectedEndpoint: string, setSelectedEndpoint: (selectedEndpoint: string) => void, className?: string, isExpanded?: boolean, setIsExpanded?: (isExpanded: boolean) => void }) => {

    const isSelected = item.route === selectedEndpoint;

    const badgeClass = classNames({
        'text-[10px] px-1 py-0': true,
        'bg-blue-500': item.badge_color === 'blue',
        'bg-red-500': item.badge_color === 'red',
        'bg-green-500': item.badge_color === 'green',
        'bg-yellow-500': item.badge_color === 'yellow',
        'bg-purple-500': item.badge_color === 'purple',
        'bg-pink-500': item.badge_color === 'pink',
        'bg-indigo-500': item.badge_color === 'indigo',
        'bg-cyan-500': item.badge_color === 'cyan',
        'bg-teal-500': item.badge_color === 'teal',
        'bg-lime-500': item.badge_color === 'lime',
        'bg-orange-500': item.badge_color === 'orange',
        'bg-blue-gray-500': item.badge_color === 'blue-gray',
        'bg-gray-500': item.badge_color === 'gray',
        'bg-true-gray-500': item.badge_color === 'true-gray',
        'bg-warm-gray-500': item.badge_color === 'warm-gray',
        'bg-cool-gray-500': item.badge_color === 'cool-gray',
    })

    return (
        <div
            className={`flex items-center px-4 py-2 gap-2 cursor-pointer text-sm rounded-md transition-colors
                        ${isSelected ? "bg-blue-50 text-blue-500 font-medium" : "text-[--foreground]"}
                        hover:bg-gray-100 ${className}`}
            onClick={item.is_group_page ? () => setIsExpanded && setIsExpanded(!isExpanded) : () => setSelectedEndpoint(item.route)}
        >
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-row gap-2">
                    {item.icon && <DynamicIcon icon={item.icon} size="18px" className={isSelected ? "text-blue-800" : "text-gray-500"} />}
                    {item.badge && <Badge
                        className={cn(badgeClass, 'text-[10px] px-1 py-0')}>{item.badge}</Badge>}
                    <div className="">
                        {item.title}
                    </div>
                </div>
                {item.is_group_page && item.group_items?.length ? <span>{isExpanded ? <MdKeyboardArrowDown className={'h-6'} /> : <MdKeyboardArrowRight className={'h-6'} />}</span> : null}
            </div>
        </div>
    )
}

import { CommitDocs } from "@/types/commit/CommitDocs";
import { DocsSidebarItem } from "./docs";
import DynamicIcon from "@/components/common/DynamicIconImport/IconComponent";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import classNames from "classnames";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { useGetCommitDocsDetails } from "@/components/features/meta_apps/useGetCommitDocsDetails";

export const Sidebar = ({ ID }: { ID: string }) => {

    const { data, isLoading } = useGetCommitDocsDetails(ID);

    if (data) {
        const commit_docs: CommitDocs = data.commit_docs;
        const sidebar_items = data.sidebar_items;
        return (
            <div className="sticky top-0 h-screen overflow-y-auto border-r border-gray-200 dark:border-gray-700">
                <div className="py-6 px-8">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        {commit_docs.light_mode_logo && (
                            <img src={commit_docs.light_mode_logo} alt="logo" className="h-8" />
                        )}
                        {commit_docs.header && <div className="text-lg font-bold">{commit_docs.header}</div>}
                    </div>
                    {/* Sidebar Items */}
                    {Object.keys(sidebar_items).map((key) => (
                        <SidebarGroup
                            key={key}
                            groupName={key}
                            items={sidebar_items[key]}

                        />
                    ))}
                </div>
            </div>
        );
    }
    if (isLoading) {
        return <SidebarSkeleton />;
    }
};

const SidebarGroup = ({ groupName, items }: { groupName: string, items: DocsSidebarItem[] }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="flex flex-col gap-1 mt-6 lg:mt-4">
            <div className="flex justify-between items-center text-sm font-semibold py-2 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="mb-2 font-semibold text-gray-900 dark:text-gray-200">{groupName}</div>
                <span>{isExpanded ? <ChevronDown className={'h-4'} /> : <ChevronRight className={'h-4'} />}</span>
            </div>
            {isExpanded && items.length > 0 && (
                <ul>
                    {items.map((item) => (
                        <SidebarItem item={item} key={item.route} />
                    ))}
                </ul>
            )}
        </div>
    )
}

const SidebarItem = ({ item, className, level = 1 }: { item: DocsSidebarItem, className?: string, level?: number }) => {

    if (item.is_group_page && item.group_items?.length) {
        const [isExpanded, setIsExpanded] = useState(false);
        return (
            <li>
                <SidebarTitle item={item} className={className} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                {isExpanded && item.group_items.length &&
                    <ul>
                        {item.group_items.map((groupItem) => (
                            <SidebarItem item={groupItem} key={groupItem.route} className={`pl-${6 + (2 * (level))}`} level={level + 1} />
                        ))}
                    </ul>
                }
            </li>
        )
    }

    return (
        <li>
            <SidebarTitle item={item} className={className} />
        </li>
    )
}

const SidebarTitle = ({ item, className, isExpanded, setIsExpanded }: { item: DocsSidebarItem, className?: string, isExpanded?: boolean, setIsExpanded?: (isExpanded: boolean) => void }) => {

    const { pageID, ID } = useParams();
    const isSelected = item.route === pageID;

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
            className={cn(
                `group flex items-center py-1.5 cursor-pointer text-sm font-medium focus:outline-primary dark:focus:outline-primary-light space-x-3  border-l border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300`,
                isSelected ? 'border-blue-600 dark:border-primary-light text-blue-600 dark:text-primary-light' : '',
                className
            )}
            onClick={item.is_group_page ? () => setIsExpanded && setIsExpanded(!isExpanded) : () => { }}
        >
            <div className="flex justify-between items-center w-full ml-4 py-1">
                {item.is_group_page ? <div className="flex items-center gap-2">
                    {item.icon && <DynamicIcon icon={item.icon} size={14} className={isSelected ? "text-blue-600" : "text-gray-500"} />}
                    {item.badge && <Badge
                        className={cn(badgeClass, 'text-[10px] px-1 py-0')}>{item.badge}</Badge>}
                    <div className="">
                        {item.title}
                    </div>
                </div> : <a className="flex flex-row gap-2 items-center" href={`../${ID}/${item.route}`}>
                    {item.icon && <DynamicIcon icon={item.icon} size={14} className={isSelected ? "text-blue-600" : "text-gray-500"} />}
                    {item.badge && <Badge
                        className={cn(badgeClass, 'text-[10px] px-1 py-0')}>{item.badge}</Badge>}
                    <div className="">
                        {item.title}
                        </div>
                </a>}
                {item.is_group_page && item.group_items?.length ? <span>{isExpanded ? <ChevronDown className={'h-4'} /> : <ChevronRight className={'h-4'} />}</span> : null}
            </div>
        </div>
    )
}

const SidebarSkeleton = () => {
    return (
        <div className="py-6 px-8 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex items-center gap-4 mb-8">
                <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            {/* Sidebar Groups Skeleton */}
            {[...Array(5)].map((_, groupIndex) => (
                <div key={groupIndex} className="flex flex-col gap-1 mt-6 lg:mt-4">
                    <div className="flex justify-between items-center text-sm font-semibold py-2 cursor-pointer">
                        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                        <span className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></span>
                    </div>
                    <ul>
                        {[...Array(3 + Math.floor(Math.random() * 2))].map((_, itemIndex) => (
                            <li key={itemIndex} className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2"></li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
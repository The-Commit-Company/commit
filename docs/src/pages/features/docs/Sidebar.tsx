import { CommitDocs } from "@/types/commit/CommitDocs";
import { DocsSidebarItem } from "./docs";
import DynamicIcon from "@/components/common/DynamicIconImport/IconComponent";
import { Badge } from "@/components/ui/badge";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useFrappePrefetchCall } from "frappe-react-sdk";
import { useGetCommitDocsDetails } from "@/hooks/useGetCommitDocsDetails";

export const Sidebar = ({ ID }: { ID: string }) => {

    const { data, isLoading } = useGetCommitDocsDetails(ID);

    if (data) {
        const commit_docs: CommitDocs = data.commit_docs;
        const sidebar_items = data.sidebar_items;
        return (
            <div className="sticky top-0 h-screen overflow-y-auto border-r border-gray-200 dark:border-gray-700">
                <div className="py-6 px-8">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-8">
                        {commit_docs.light_mode_logo && (
                            <img src={commit_docs.light_mode_logo} alt="logo" className="h-8 rounded-md" />
                        )}
                        {commit_docs.header && <div className="text-lg font-bold">{commit_docs.header}</div>}
                        {commit_docs.published == 0 && (
                            <Badge className="px-1 py-0 bg-orange-500">
                                Draft
                            </Badge>
                        )}
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
    const { pageID } = useParams();

    // Check if the current route is in the item's hierarchy
    const isRouteMatch = (item: DocsSidebarItem): boolean => {
        if (item.route === pageID) return true;
        if (item.group_items) {
            return item.group_items.some(isRouteMatch);
        }
        return false;
    };

    const [isExpanded, setIsExpanded] = useState(() => isRouteMatch(item));

    if (item.is_group_page && item.group_items?.length) {
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

const BadgeClassMap = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    red: 'bg-red-500 hover:bg-red-600',
    green: 'bg-green-500 hover:bg-green-600',
    yellow: 'bg-yellow-500 hover:bg-yellow-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
    pink: 'bg-pink-500 hover:bg-pink-600',
    indigo: 'bg-indigo-500 hover:bg-indigo-600',
    cyan: 'bg-cyan-500 hover:bg-cyan-600',
    teal: 'bg-teal-500 hover:bg-teal-600',
    lime: 'bg-lime-500 hover:bg-lime-600',
    orange: 'bg-orange-500 hover:bg-orange-600',
    'blue-gray': 'bg-blue-gray-500 hover:bg-blue-gray-600',
    gray: 'bg-gray-500 hover:bg-gray-600',
    'true-gray': 'bg-true-gray-500 hover:bg-true-gray-600',
    'warm-gray': 'bg-warm-gray-500 hover:bg-warm-gray-600',
    'cool-gray': 'bg-cool-gray-500 hover:bg-cool-gray-600',
}

const SidebarTitle = ({ item, className, isExpanded, setIsExpanded }: { item: DocsSidebarItem, className?: string, isExpanded?: boolean, setIsExpanded?: (isExpanded: boolean) => void }) => {
    const { pageID } = useParams();
    const isSelected = item.route === pageID;

    const BADGE_COLOR = BadgeClassMap[item.badge_color as keyof typeof BadgeClassMap ?? 'gray'];

    const handleClick = () => {
        if (item.is_group_page && setIsExpanded) {
            setIsExpanded(!isExpanded);
        }
    };

    const [isHovered, setIsHovered] = useState(false);

    const preload = useFrappePrefetchCall('commit.commit.doctype.commit_docs_page.commit_docs_page.get_commit_docs_page', {
        name: item.route
    })

    useEffect(() => {
        let timeout: NodeJS.Timeout | null
        if (isHovered) {
            timeout = setTimeout(() => {
                preload()
            }, 250)
        }

        return () => {
            if (timeout) {
                clearTimeout(timeout)
            }
        }

    }, [isHovered])

    const onMouseEnter = useCallback(() => {
        setIsHovered(true)
    }, [])

    const onMouseLeave = useCallback(() => {
        setIsHovered(false)
    }, [])

    const content = (
        <div className="flex justify-between items-center w-full ml-4 py-1" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div className="flex items-center gap-2">
                {item.icon && <DynamicIcon icon={item.icon} size={14} className={isSelected ? "text-blue-600" : "text-gray-500"} />}
                <div className="">
                    {item.title}
                </div>
            </div>
            <div className="flex flex-row gap-2 items-center">
                {item.badge && <Badge className={cn('text-[10px] px-1 py-0', BADGE_COLOR)}>{item.badge}</Badge>}
                {item.published === 0 && <Badge className="px-1 py-0 bg-orange-500 hover:bg-orange-600">Draft</Badge>}
                {item.is_group_page && item.group_items?.length ? <span>{isExpanded ? <ChevronDown className={'h-4'} /> : <ChevronRight className={'h-4'} />}</span> : null}
            </div>
        </div>
    );

    return item.is_group_page ? (
        <div
            className={cn(
                `group flex items-center py-1.5 cursor-pointer text-sm font-medium focus:outline-primary dark:focus:outline-primary-light space-x-3 border-l border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300`,
                isSelected ? 'border-blue-600 dark:border-primary-light text-blue-600 dark:text-primary-light' : '',
                className
            )}
            onClick={handleClick}
        >
            {content}
        </div>
    ) : (
        <Link
            className={cn(
                `group flex items-center py-1.5 cursor-pointer text-sm font-medium focus:outline-primary dark:focus:outline-primary-light space-x-3 border-l border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300`,
                isSelected ? 'border-blue-600 dark:border-primary-light text-blue-600 dark:text-primary-light' : '',
                className
            )}
            to={`./${item.route}`}
        >
            {content}
        </Link>
    );
};

const SidebarSkeleton = () => {
    return (
        <div className="sticky top-0 h-screen overflow-y-auto border-r border-gray-200 dark:border-gray-700">
            <div className="py-6 px-8 animate-pulse">
                {/* Header Skeleton */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
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
                                <div key={itemIndex} className="group flex items-center py-1.5 cursor-pointer text-sm font-medium focus:outline-primary dark:focus:outline-primary-light space-x-3 border-l border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                                    <li className="h-4 w-32 ml-4 py-1 bg-gray-200 dark:bg-gray-700 rounded mb-2"></li>
                                </div>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};
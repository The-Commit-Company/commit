import DynamicIcon from "@/components/common/DynamicIconImport/IconComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DocsNavbarItem } from "./docs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Search } from "lucide-react";
import { useGetCommitDocsDetails } from "@/hooks/useGetCommitDocsDetails";


export const Navbar = ({ ID }: { ID: string }) => {
    const { data, isLoading } = useGetCommitDocsDetails(ID);
    if (data) {
        const navbar_items = data.navbar_items;
        return (
            <div className="max-w-8xl mx-auto relative lg:pl-[20rem] bg-white">
                <div className="relative">
                    <div className="absolute w-full h-full border-b border-gray-500/5 dark:border-gray-300/[0.06]"></div>
                    <div className="relative">
                        <div className="flex items-center lg:px-12 h-16 min-w-0 border-b border-gray-500/5 dark:border-gray-300/[0.06] mx-4 lg:mx-0">
                            <div className="h-full relative flex-1 flex justify-between items-center gap-x-4 min-w-0">
                                {/* Left side: Search bar */}
                                <div className="flex items-center w-1/3 relative">
                                    <Input placeholder="Search..." className="w-full pl-10" />
                                    <Search size={16} className="absolute left-3 text-gray-800" />
                                </div>
                                {/* Right side: Navbar items */}
                                <div className="flex items-center space-x-2">
                                    {Object.keys(navbar_items).reverse().map((key) => (
                                        <div key={key} className="flex items-center space-x-4">
                                            {navbar_items[key]?.type === 'Button' ? (
                                                <Button
                                                    key={navbar_items[key].label}
                                                    variant={navbar_items[key]?.is_primary_button ? 'default' : 'ghost'}
                                                    size={'sm'}
                                                    className={navbar_items[key]?.is_primary_button ? 'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full' : ''}
                                                    onClick={() => window.open(navbar_items[key].url, navbar_items[key].open_in_new_tab ? "_blank" : "_self")}
                                                >
                                                    {navbar_items[key].icon && <DynamicIcon icon={navbar_items[key].icon} size="14px" />}
                                                    {navbar_items[key].label}
                                                </Button>
                                            ) : (
                                                <MenuButton key={navbar_items[key].label} item={navbar_items[key]} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if (isLoading) {
        return <NavbarSkeleton />;
    }
    return null
};


const MenuButton = ({ item }: { item: DocsNavbarItem }) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    aria-label="Actions"
                    size={'sm'}
                >
                    {item.label}
                    <ChevronDown size={16} className="ml-2" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
                {item.items?.map((subItem) => (
                    <DropdownMenuItem key={subItem.label} onClick={() => window.open(subItem.url, subItem.open_in_new_tab ? "_blank" : "_self")}>
                        {subItem.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const NavbarSkeleton = () => {
    return (
        <div className="max-w-8xl mx-auto relative lg:pl-[20rem] bg-white">
            <div className="relative">
                <div className="absolute w-full h-full border-b border-gray-500/5 dark:border-gray-300/[0.06]"></div>
                <div className="relative">
                    <div className="flex items-center lg:px-12 h-16 min-w-0 border-b border-gray-500/5 dark:border-gray-300/[0.06] mx-4 lg:mx-0">
                        <div className="h-full relative flex-1 flex justify-between items-center gap-x-4 min-w-0">
                            {/* Left side: Search bar skeleton */}
                            <div className="flex items-center w-1/3 relative">
                                <div className="w-full h-9 bg-gray-200 dark:bg-gray-700 rounded pl-10 animate-pulse"></div>
                                <div className="absolute left-3 w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                            </div>
                            {/* Right side: Navbar items skeleton */}
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-4">
                                    <div className="w-24 h-9 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

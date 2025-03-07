import { FilePenLine, House, PanelBottom, PanelLeft, PanelLeftOpen, PanelRightOpen, PanelTop, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useGetCommitDocsDetails } from "@/components/features/meta_apps/useGetCommitDocsDetails";
import { Button } from "@/components/ui/button";

export interface SidebarItem {
    title: string;
    route: string;
    icon?: JSX.Element;
}

const SidebarItems: SidebarItem[] = [
    { title: "Overview", route: "overview", icon: <House className="h-4 w-4" /> },
    { title: "Editor", route: "editor", icon: <FilePenLine className="h-4 w-4" /> },
    { title: "Sidebar", route: "sidebar", icon: <PanelLeft className="h-4 w-4" /> },
    { title: "Navbar", route: "navbar", icon: <PanelTop className="h-4 w-4" /> },
    { title: "Footer", route: "footer", icon: <PanelBottom className="h-4 w-4" /> },
    { title: "Settings", route: "settings", icon: <Settings className="h-4 w-4" /> },
];

export const Sidebar = ({ ID, isCollapsed, setIsCollapsed }: { ID: string, isCollapsed: boolean, setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const { data } = useGetCommitDocsDetails(ID);

    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);

    const last = pathSegments[pathSegments.length - 1]
    const selectedClassName = "text-blue-600 dark:text-blue-500 hover:bg-blue-600/5 dark:hover:bg-blue-500/5";
    const notSelectedClassName = "text-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700/10";

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };


    if (data) {
        return (
            <div className={`fixed inset-y-0 z-30 flex-col hidden lg:flex bg-zinc-100 dark:bg-white/[0.04] ${isCollapsed ? 'w-14' : 'w-60'}`}>
                <div className="flex gap-5 flex-col overflow-y-auto px-3 py-4 h-full">
                    <div className="flex items-center h-8">
                        <div className={`flex-1 ${isCollapsed ? 'hidden' : 'block'}`}>
                            <div className="flex items-center gap-2 px-1">
                                <div className={`text-lg font-bold`}>
                                    {data?.commit_docs?.header}
                                </div>
                            </div>
                        </div>
                        <Button size='icon' variant="ghost" className="h-6 w-6 ml-1" onClick={toggleCollapse}>
                            {isCollapsed ? <PanelLeftOpen className={`h-4 w-4`} /> :
                                <PanelRightOpen className={`h-4 w-4`} />}
                        </Button>
                    </div>
                    <div className="relative w-full h-full overflow-hidden">
                        <div className="flex gap-5 grow flex-col justify-between overflow-y-auto absolute top-0 left-0 w-full h-full transition-all duration-300 ease-in-out translate-x-0">
                            <div className="flex flex-col gap-4">
                                <nav className="flex flex-col flex-1 gap-0.5">
                                    {SidebarItems.map((item) => (
                                        <div key={item.route}>
                                            <Link to={`./${item.route}`}>
                                                <div
                                                    className={`flex gap-2 items-center rounded-lg px-2 h-8 text-sm leading-5 ${last === item.route ? selectedClassName : notSelectedClassName}`}
                                                >
                                                    {item.icon}
                                                    <span className={`${isCollapsed ? 'hidden' : 'block'}`}>{item.title}</span>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        );
    }

    return null
};
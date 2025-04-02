import { FilePenLine, House, PanelBottom, PanelLeft, PanelLeftOpen, PanelRightOpen, PanelTop, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useGetCommitDocsDetails } from "@/components/features/meta_apps/useGetCommitDocsDetails";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export interface SidebarItem {
    title: string;
    route: string;
    icon: JSX.Element;
}

const SidebarItems: SidebarItem[] = [
    { title: "Overview", route: "overview", icon: <House className="h-4 w-4 flex-shrink-0" /> },
    { title: "Editor", route: "editor", icon: <FilePenLine className="h-4 w-4 flex-shrink-0" /> },
    { title: "Sidebar", route: "sidebar", icon: <PanelLeft className="h-4 w-4 flex-shrink-0" /> },
    { title: "Navbar", route: "navbar", icon: <PanelTop className="h-4 w-4 flex-shrink-0" /> },
    { title: "Footer", route: "footer", icon: <PanelBottom className="h-4 w-4 flex-shrink-0" /> },
    { title: "Settings", route: "settings", icon: <Settings className="h-4 w-4 flex-shrink-0" /> },
];

export const Sidebar = ({ ID, isCollapsed, setIsCollapsed }: { ID: string, isCollapsed: boolean, setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { data } = useGetCommitDocsDetails(ID, true);
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const secondLastSegment = pathSegments[pathSegments.length - 2];

    const isActive = (route: string) => {
        if (route === "editor") {
            return secondLastSegment === route || pathSegments.includes(route);
        }
        return pathSegments.includes(route);
    };

    const selectedClassName = "text-blue-600 dark:text-blue-500 bg-blue-600/10 dark:bg-blue-500/10";
    const notSelectedClassName = "text-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700/10";

    return data ? (
        <motion.div
            initial={{ width: isCollapsed ? 56 : 240 }}
            animate={{ width: isCollapsed ? 56 : 240 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 z-30 flex-col hidden lg:flex bg-zinc-100 dark:bg-white/[0.04]"
        >
            <div className="flex flex-col overflow-y-auto px-3 py-4 h-full">
                <div className="flex items-center justify-between h-8">
                    <motion.div
                        initial={{ opacity: isCollapsed ? 0 : 1 }}
                        animate={{ opacity: isCollapsed ? 0 : 1 }}
                        transition={{ duration: 0.2 }}
                        className={`text-lg font-bold pl-2 ${isCollapsed ? 'hidden' : 'block'}`}
                    >
                        {data?.commit_docs?.header}
                    </motion.div>
                    <Button size='icon' variant="ghost" className="h-6 w-6 ml-1" onClick={() => setIsCollapsed(!isCollapsed)}>
                        {isCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
                    </Button>
                </div>
                <nav className="flex flex-col mt-4 gap-1">
                    {SidebarItems.map((item) => (
                        <Link key={item.route} to={`./${item.route}`}>
                            <div className={`flex items-center gap-2 rounded-lg px-2 h-8 text-sm leading-5 transition-all duration-300 ${isActive(item.route) ? selectedClassName : notSelectedClassName}`}>
                                <span className="flex-shrink-0">{item.icon}</span>
                                <motion.span
                                    initial={{ opacity: isCollapsed ? 0 : 1, x: isCollapsed ? -20 : 0 }}
                                    animate={{ opacity: isCollapsed ? 0 : 1, x: isCollapsed ? -20 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={isCollapsed ? "hidden" : "block"}
                                >
                                    {item.title}
                                </motion.span>
                            </div>
                        </Link>
                    ))}
                </nav>
            </div>
        </motion.div>
    ) : null;
};

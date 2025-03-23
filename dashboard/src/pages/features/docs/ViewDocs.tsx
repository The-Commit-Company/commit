import { Outlet, useParams } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { useState } from "react";

const ViewDocs = () => {
    const { ID } = useParams();

    if (ID) {
        return <ViewDocsDetails ID={ID} key={ID} />;
    }
    return null;
};

const ViewDocsDetails = ({ ID }: { ID: string }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <div className="relative antialiased">
            <div className="flex flex-col lg:flex-row min-h-screen">
                <Sidebar ID={ID} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                <div className="p-0 h-screen bg-zinc-100 dark:bg-white/[0.04] min-h-screen max-h-screen overflow-hidden w-full max-w-full min-w-full lg:p-2 lg:pl-0">
                    <div className={`relative mt-[60px] max-lg:pb-[72px] lg:mt-0 lg:rounded-xl lg:border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 min-h-full max-h-full h-full overflow-y-auto lg:px-10 pt-8 mb-6 ${isCollapsed ? 'lg:ml-14' : 'lg:ml-60'}`}>
                        <div className="mx-auto max-w-6xl ">
                            <main>
                                <Outlet />
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDocs;
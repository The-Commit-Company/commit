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
                <div className={`relative mt-[60px] lg:mt-0 px-6 lg:px-12 pt-8 mb-6 w-full ${isCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
                    <div className="mx-auto max-w-6xl ">
                        <main>
                            <Outlet />
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDocs;
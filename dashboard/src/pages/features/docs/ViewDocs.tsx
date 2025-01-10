import { Outlet, useParams } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const ViewDocs = () => {
    const { ID } = useParams();

    if (ID) {
        return <ViewDocsDetails ID={ID} key={ID} />;
    }
    return null;
};

const ViewDocsDetails = ({ ID }: { ID: string }) => {

    return (
        <div className="relative antialiased">
            <div className="z-20 fixed lg:sticky top-0 w-full">
                <Navbar ID={ID} />
            </div>
            <div className="flex flex-col lg:flex-row min-h-screen">
                {/* Sidebar */}
                <aside className="hidden lg:block lg:w-[20rem] z-30 -mt-16">
                    <Sidebar
                        ID={ID}
                    />
                </aside>

                {/* Main Content */}
                <main className="flex-1 w-full h-full">
                    <div id="content-container" className="pb-10">
                        <Outlet />
                    </div>
                </main>
            </div>
            <Footer ID={ID} />
        </div>
    );
    // }
};

export default ViewDocs;
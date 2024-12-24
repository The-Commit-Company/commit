import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner";
import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader";
import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PageContent } from "./PageContent";
import { useGetCommitDocsDetails } from "@/components/features/meta_apps/useGetCommitDocsDetails";

const ViewDocs = () => {
    const { ID, pageID } = useParams();

    if (ID && pageID) {
        return <ViewDocsDetails ID={ID} pageID={pageID} />;
    }
    return null;
};

const ViewDocsDetails = ({ ID, pageID }: { ID: string, pageID: string }) => {
    const navigate = useNavigate();

    const { data, error, isLoading } = useGetCommitDocsDetails(ID);

    const onPageChange = (pageID: string) => {
        navigate(`/docs/${ID}/${pageID}`);
    }

    if (isLoading) {
        return <FullPageLoader />;
    }
    if (error) {
        return <ErrorBanner error={error} />;
    }

    if (data) {
        return (
            <div className="relative antialiased">
                <div className="z-20 fixed lg:sticky top-0 w-full">
                    <Navbar navbar_items={data.navbar_items} />
                </div>
                <div className="flex flex-col lg:flex-row min-h-screen">
                    {/* Sidebar */}
                    <aside className="hidden lg:block lg:w-[20rem] z-30 -mt-16">
                        <Sidebar
                            commit_docs={data.commit_docs}
                            sidebar_items={data.sidebar_items}
                            selectedEndpoint={pageID}
                            setSelectedEndpoint={onPageChange}
                        />
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 w-full h-full">
                        <div id="content-container" className="pb-10">
                            <PageContent selectedEndpoint={pageID} route_map={data.route_map} />
                        </div>
                    </main>
                </div>

                <Footer footer_items={data.footer_items} commit_docs={data.commit_docs} />

            </div>
        );
    }
};

export default ViewDocs;
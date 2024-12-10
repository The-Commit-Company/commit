import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner";
import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader";
import { useFrappeGetCall } from "frappe-react-sdk";
import { useNavigate, useParams } from "react-router-dom";
import { Docs } from "./docs";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PageContent } from "./PageContent";

const ViewDocs = () => {
    const { ID, pageID } = useParams();

    if (ID && pageID) {
        return <ViewDocsDetails ID={ID} pageID={pageID} />;
    }
    return null;
};

const ViewDocsDetails = ({ ID, pageID }: { ID: string, pageID: string }) => {
    const navigate = useNavigate();

    const { data, error, isLoading } = useFrappeGetCall<{
        message: Docs;
    }>("commit.commit.doctype.commit_docs.commit_docs.get_commit_docs_details",
        {
            route: ID,
        },
        undefined,
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        });

    const onPageChange = (pageID: string) => {
        navigate(`/docs/${ID}/${pageID}`);
    }

    if (isLoading) {
        return <FullPageLoader />;
    }
    if (error) {
        return <ErrorBanner error={error} />;
    }

    if (data && data?.message) {
        return (
            <div className="relative antialiased">
                <div className="z-20 fixed lg:sticky top-0 w-full">
                    <Navbar navbar_items={data.message.navbar_items} />
                </div>
                <div className="flex flex-col lg:flex-row min-h-screen">
                    {/* Sidebar */}
                    <aside className="hidden lg:block lg:w-[20rem] z-30 -mt-16">
                        <Sidebar
                            commit_docs={data.message.commit_docs}
                            sidebar_items={data.message.sidebar_items}
                            selectedEndpoint={pageID}
                            setSelectedEndpoint={onPageChange}
                        />
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 w-full h-full">
                        <div id="content-container" className="pb-10">
                            <PageContent selectedEndpoint={pageID} route_map={data.message.route_map} />
                        </div>
                    </main>
                </div>

                <Footer footer_items={data.message.footer_items} commit_docs={data.message.commit_docs} />

            </div>
        );
    }
};

export default ViewDocs;
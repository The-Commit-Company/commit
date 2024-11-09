import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner";
import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader";
import { useFrappeGetCall } from "frappe-react-sdk";
import { useNavigate, useParams } from "react-router-dom";
import { Docs } from "./docs";
import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const ViewDocs = () => {
    const { ID } = useParams();

    if (ID) {
        return <ViewDocsDetails ID={ID} />;
    }
    return null;
};

const ViewDocsDetails = ({ ID }: { ID: string }) => {
    const [selectedendpoint, setSelectedEndpoint] = useState<string>("");
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
            onSuccess: (d: { message: Docs }) => {
                if (!selectedendpoint) {
                    setSelectedEndpoint(d.message.sidebar_items[Object.keys(d.message.sidebar_items)[0]][0].route);
                }
            },
        });

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const endpointFromURL = searchParams.get("page");

        if (endpointFromURL) {
            setSelectedEndpoint(endpointFromURL);
        }
    }, []);

    useEffect(() => {
        if (selectedendpoint) {
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set("page", selectedendpoint);
            navigate({ search: searchParams.toString() }, { replace: true });
        }
    }, [selectedendpoint, navigate]);

    if (isLoading) {
        return <FullPageLoader />;
    }
    if (error) {
        return <ErrorBanner error={error} />;
    }

    if (data && data?.message) {
        return (
            <div className="overflow-hidden">
                <div className="flex w-full h-[100vh]">
                    {/* Sidebar */}
                    <div className="w-[22vw] flex justify-center">
                        <div className="w-[20vw] h-full">
                            <Sidebar
                                commit_docs={data.message.commit_docs}
                                sidebar_items={data.message.sidebar_items}
                                selectedEndpoint={selectedendpoint}
                                setSelectedEndpoint={setSelectedEndpoint}
                            />
                        </div>
                    </div>

                    {/* Vertical Divider */}
                    <div className="w-[1px] bg-gray-100 h-full"></div>

                    {/* Main Content */}
                    <div className="w-[78vw] flex flex-col overflow-hidden">
                        {/* Fixed Navbar */}
                        <div className="fixed w-[78vw] top-0 z-10">
                            <Navbar navbar_items={data.message.navbar_items} />
                        </div>

                        {/* Content area with top padding to accommodate fixed Navbar */}
                        <div className="mt-[60px] overflow-y-auto h-full"> {/* Adjust '60px' based on Navbar height */}
                            {/* Page Content */}
                        </div>
                    </div>
                </div>
                <Footer footer_items={data.message.footer_items} commit_docs={data.message.commit_docs} />
            </div>
        );
    }
};

export default ViewDocs;
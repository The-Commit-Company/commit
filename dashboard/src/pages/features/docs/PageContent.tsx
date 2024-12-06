import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner";
import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader";
import MDXRenderer from "@/components/common/MarkdownRenderer/MDX";
import { OnThisPage } from "@/components/features/documentation/OnThisPage";
import { CommitDocsPage } from "@/types/commit/CommitDocsPage";
import { useFrappeGetCall } from "frappe-react-sdk";


export interface PageData {
    doc: CommitDocsPage
    toc_obj: TocObj
}

export type TocChildren = {
    [key: string]: TocItem;
};

export type TocItem = {
    name: string;
    children: TocChildren;
};

export interface TocObj {
    [key: string]: TocItem;
};

export const PageContent = ({ selectedEndpoint, route_map }: { selectedEndpoint: string, route_map: Record<string, string> }) => {

    const selectedEndpointRoute = route_map[selectedEndpoint];

    const { data, error, isLoading } = useFrappeGetCall<{ message: PageData; }>("commit.commit.doctype.commit_docs_page.commit_docs_page.get_commit_docs_page", {
        name: selectedEndpointRoute
    });

    if (isLoading) {
        return <FullPageLoader />;
    }

    if (error) {
        return <div className="flex py-4 px-12">
            <ErrorBanner error={error} />
        </div>
    }

    if (data && data?.message) {
        return (
            <div className="flex flex-row gap-12 h-full w-full pt-40 lg:pt-2">
                <div className="flex flex-col gap-4 w-full py-6 px-16">
                    <div className="inline-block text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight dark:text-gray-200">{data?.message?.doc?.title}</div>
                    <MDXRenderer mdxContent={data?.message?.doc?.content ?? ''} />
                </div>
                <div className="z-10 hidden xl:flex pl-10 box-border w-[19rem] py-6">
                    <OnThisPage toc_obj={data?.message?.toc_obj} />
                </div>
            </div>
        )
    }

}
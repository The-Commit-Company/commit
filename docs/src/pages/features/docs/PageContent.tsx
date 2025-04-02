import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner";
import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader";
import { CommitDocsPage } from "@/types/commit/CommitDocsPage";
import { useFrappeGetCall } from "frappe-react-sdk";
import { Renderer } from "./Renderer";
import { useParams } from "react-router-dom";

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

const PageContent = () => {

    const { pageID } = useParams();

    const { data, error, isLoading } = useFrappeGetCall<{ message: PageData; }>("commit.commit.doctype.commit_docs_page.commit_docs_page.get_commit_docs_page", {
        name: pageID
    }, undefined, {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        keepPreviousData: true
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
            <Renderer data={data.message} key={data.message.doc.name} />
        )
    }
}

export default PageContent
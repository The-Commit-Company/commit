import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner";
import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader";
import { CommitDocsPage } from "@/types/commit/CommitDocsPage";
import { useFrappeGetCall } from "frappe-react-sdk";
import { useState } from "react";
import { Renderer } from "./Renderer";
import { EditorComponent } from "./EditorComponent";
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

export const PageContent = () => {

    const { pageID } = useParams();

    if (pageID) {
        return (
            <PageContentFetch selectedEndpoint={pageID} />
        )
    }
    return null;
}

const PageContentFetch = ({ selectedEndpoint }: { selectedEndpoint: string }) => {

    const { data, error, isLoading, mutate } = useFrappeGetCall<{ message: PageData; }>("commit.commit.doctype.commit_docs_page.commit_docs_page.get_commit_docs_page", {
        name: selectedEndpoint
    }, undefined, {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        keepPreviousData: true
    });

    const [edit, setEdit] = useState<boolean>(false);

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
            <>
                {edit ? <EditorComponent data={data.message?.doc} setEdit={setEdit} mutate={mutate} key={data.message.doc.name} /> : <Renderer data={data.message} setEdit={setEdit} key={data.message.doc.name} />}
            </>
        )
    }
}
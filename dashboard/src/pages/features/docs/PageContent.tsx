import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner";
import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader";
import { CommitDocsPage } from "@/types/commit/CommitDocsPage";
import { useFrappeGetDoc } from "frappe-react-sdk";
import { EditorComponent } from "./EditorComponent";

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

const PageContent = ({ pageID, ID }: { pageID: string, ID: string }) => {

    const { data, error, isLoading, mutate } = useFrappeGetDoc<CommitDocsPage>("Commit Docs Page", pageID, undefined, {
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

    if (data) {
        return <EditorComponent data={data} mutate={mutate} ID={ID} key={data.name} />
    }
    return null
}

export default PageContent
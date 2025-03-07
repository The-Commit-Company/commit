import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner";
import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader";
import { useFrappeGetCall } from "frappe-react-sdk";
import { Navigate, useParams } from "react-router-dom";


const DocsPage = () => {

    const { ID } = useParams();

    return <NavigateToFirstPage ID={ID as string} />;
}

export const NavigateToFirstPage = ({ ID }: { ID: string }) => {

    const { data, error, isLoading } = useFrappeGetCall<{
        message: string
    }>("commit.commit.doctype.commit_docs.commit_docs.get_first_page_route",
        {
            route: ID,
        },
        undefined,
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        });

    if (isLoading) {
        <FullPageLoader />
    }
    if (error) {
        return <ErrorBanner error={error} />
    }

    if (data) {

        return <Navigate to={data?.message} />
    }

    return <FullPageLoader />

}

export default DocsPage
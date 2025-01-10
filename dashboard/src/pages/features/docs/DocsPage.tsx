import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner";
import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader";
import { useFrappeGetCall } from "frappe-react-sdk";
import { useNavigate, useParams } from "react-router-dom";


const DocsPage = () => {

    const { ID } = useParams();

    if (ID) {
        return <NavigateToFirstPage ID={ID} />;
    }
    return null;
}

export const NavigateToFirstPage = ({ ID }: { ID: string }) => {

    const navigate = useNavigate();

    const { error, isLoading } = useFrappeGetCall<{
        message: string
    }>("commit.commit.doctype.commit_docs.commit_docs.get_first_page_route",
        {
            route: ID,
        },
        undefined,
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            onSuccess: (data) => {
                if (data?.message) {
                    navigate(data.message);
                }
            }
        });

    if (isLoading) {
        <FullPageLoader />
    }
    if (error) {
        return <ErrorBanner error={error} />
    }

    return null
}

export default DocsPage
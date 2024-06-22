import { APIDetails } from "@/components/features/api_viewer/APIDetails"
import { APIList } from "@/components/features/api_viewer/APIList"
import { useState } from "react"
import { useFrappeGetCall } from "frappe-react-sdk"
import { APIData } from "@/types/APIData"
import { useParams } from "react-router-dom"
import { Header } from "@/components/common/Header"
import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader"
import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner"


interface GetAPIResponse {
    apis: APIData[]
    app_name: string
    branch_name: string
    organization_name: string,
    organization_id: string,
    app_logo?: string,
    org_logo?: string,
    last_updated: string,
    project_branch: string,
}
export const APIViewerContainer = () => {
    const { ID } = useParams()

    if (ID) {
        return <APIViewer projectBranch={ID} />
    }
    return null
}

export const APIViewer = ({ projectBranch }: { projectBranch: string }) => {

    const [selectedendpoint, setSelectedEndpoint] = useState<string>('')

    const { data, isLoading, error } = useFrappeGetCall<{ message: GetAPIResponse }>('commit.api.api_explorer.get_apis_for_project', {
        project_branch: projectBranch
    }, undefined, {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        onSuccess: (d: { message: GetAPIResponse }) => setSelectedEndpoint(d.message.apis[0].name)
    })

    if (isLoading) {
        return <FullPageLoader />
    }
    return (
        // show API details column only if there is selected endpoint else show only API list in full width.
        <div className="overflow-hidden">
            <Header text="API Explorer" />
            {error && <ErrorBanner error={error} />}
            {data && <div className="flex w-full h-[calc(100vh-4rem)]">
                <div className={selectedendpoint ? "w-[55%]" : "w-full"}>
                    <APIList
                        apiList={data?.message.apis ?? []}
                        app_name={data?.message.app_name ?? ''}
                        branch_name={data?.message.branch_name ?? ''}
                        setSelectedEndpoint={setSelectedEndpoint}
                        selectedEndpoint={selectedendpoint}
                    />

                </div>

                {selectedendpoint && (
                    <div className="w-[45%]">
                        <APIDetails project_branch={projectBranch} endpointData={data?.message.apis ?? []} selectedEndpoint={selectedendpoint} setSelectedEndpoint={setSelectedEndpoint} viewerType="project" />
                    </div>
                )}
            </div>}
        </div>

    )
}
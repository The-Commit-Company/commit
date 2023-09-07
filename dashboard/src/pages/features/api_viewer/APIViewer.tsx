import { APIDetails } from "@/components/features/api_viewer/APIDetails"
import { APIList } from "@/components/features/api_viewer/APIList"
import { useState } from "react"
import { useFrappeGetCall, } from "frappe-react-sdk"
import { APIData } from "@/types/APIData"
import { useParams } from "react-router-dom"
import { Header } from "@/components/common/Header"
import { FullPageLoader } from "@/components/common/FullPageLoader.tsx/FullPageLoader"


interface GetAPIResponse {
    apis: APIData[]
    app_name: string
    branch_name: string
    organization_name: string,
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
        onSuccess: (d: { message: GetAPIResponse }) => setSelectedEndpoint(d.message.apis[0].name)
    })

    if (error) {
        return <div>Error</div>
    }

    if (isLoading) {
        return <FullPageLoader />
    }
    return (
        // show API details column only if there is selected endpoint else show only API list in full width.
        <div className="overflow-hidden">
            <Header text="API Explorer" />
            <div className="grid grid-cols-5 gap-0 h-[calc(100vh-4rem)]">
                <div className={`col-span-3`}>
                    <APIList
                        apiList={data?.message.apis ?? []}
                        app_name={data?.message.app_name ?? ''}
                        branch_name={data?.message.branch_name ?? ''}
                        setSelectedEndpoint={setSelectedEndpoint}
                    />

                </div>

                {selectedendpoint ? (
                    <div className="col-span-2">
                        <APIDetails endpointData={data?.message.apis ?? []} selectedEndpoint={selectedendpoint} setSelectedEndpoint={setSelectedEndpoint} />
                    </div>
                ) : <div className="col-span-2">
                    <div className="flex items-center justify-center h-full">
                        <div className="text-lg text-gray-700">Select an endpoint to view details</div>

                    </div>
                </div>}
            </div>
        </div>

    )
}
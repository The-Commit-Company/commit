import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner"
import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader"
import { Header } from "@/components/common/Header"
import { APIDetails } from "@/components/features/api_viewer/APIDetails"
import { APIList } from "@/components/features/api_viewer/APIList"
import { APIData } from "@/types/APIData"
import { useFrappeGetCall } from "frappe-react-sdk"
import { useState } from "react"
import { useParams } from "react-router-dom"

interface GetAPIResponse {
    apis: APIData[]
    app_name: string
    branch_name: string
}
export const AppAPIViewerContainer = () => {
    const { ID } = useParams()

    if (ID) {
        return <AppAPIViewer appName={ID} />
    }
    return null
}

export const AppAPIViewer = ({ appName }: { appName: string }) => {

    const [selectedendpoint, setSelectedEndpoint] = useState<string>('')

    const { data, isLoading, error } = useFrappeGetCall<{ message: GetAPIResponse }>('commit.api.meta_data.get_apis_for_app', {
        app_name: appName
    }, undefined, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        onSuccess: (d: { message: GetAPIResponse }) => setSelectedEndpoint(d.message.apis?.[0]?.name)
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
                        <APIDetails project_branch={appName} endpointData={data?.message.apis ?? []} selectedEndpoint={selectedendpoint} setSelectedEndpoint={setSelectedEndpoint} viewerType="app" />
                    </div>
                )}
            </div>}
        </div>

    )
}
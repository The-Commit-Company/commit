import { APIDetails } from "@/components/features/api_viewer/APIDetails"
import { APIList } from "@/components/features/api_viewer/APIList"
import { useEffect, useRef, useState } from "react"
import { useFrappeGetCall } from "frappe-react-sdk"
import { APIData } from "@/types/APIData"
import { useNavigate, useParams } from "react-router-dom"
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
    path_to_folder: string
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
    const navigate = useNavigate()

    const listRef = useRef<HTMLDivElement>(null);

    // Fetch the query parameters from the URL
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)
        const endpointFromURL = searchParams.get('api')

        // Set selected endpoint from URL if available
        if (endpointFromURL) {
            setSelectedEndpoint(endpointFromURL)
        }
    }, [])

    // Update the URL search params when selectedEndpoint changes
    useEffect(() => {
        if (selectedendpoint) {
            const searchParams = new URLSearchParams(window.location.search)
            searchParams.set('api', selectedendpoint)
            navigate({ search: searchParams.toString() }, { replace: true })
        }
    }, [selectedendpoint, navigate])

    const { data, isLoading, error, mutate } = useFrappeGetCall<{ message: GetAPIResponse }>(
        'commit.api.api_explorer.get_apis_for_project',
        {
            project_branch: projectBranch
        },
        undefined,
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            onSuccess: (d: { message: GetAPIResponse }) => {
                if (!selectedendpoint) {
                    setSelectedEndpoint(d.message.apis[0].name)
                }
            }
        }
    )

    if (isLoading) {
        return <FullPageLoader />
    }
    return (
        // show API details column only if there is selected endpoint else show only API list in full width.
        <div className="overflow-hidden">
            <Header text="API Explorer" />
            {error && <ErrorBanner error={error} />}
            {data && <div className="flex w-full h-[calc(100vh-4rem)]">
                <div className={selectedendpoint ? "w-full sm:w-[45%]" : "w-full"}>
                    <APIList
                        apiList={data?.message.apis ?? []}
                        app_name={data?.message.app_name ?? ''}
                        branch_name={data?.message.branch_name ?? ''}
                        setSelectedEndpoint={setSelectedEndpoint}
                        selectedEndpoint={selectedendpoint}
                        path_to_folder={data?.message.path_to_folder}
                        listRef={listRef}
                    />
                </div>

                {selectedendpoint && (
                    <div
                        className={`fixed z-10  right-0 w-[80vw] h-full bg-white shadow-lg transition-transform transform ${selectedendpoint ? 'translate-x-0' : 'translate-x-full'
                            } md:relative md:translate-x-0 sm:w-[55%]`}
                    >
                        <APIDetails
                            project_branch={projectBranch}
                            endpointData={data?.message.apis ?? []}
                            selectedEndpoint={selectedendpoint}
                            setSelectedEndpoint={setSelectedEndpoint}
                            viewerType="project"
                            mutate={mutate}
                        />
                    </div>
                )}
            </div>}
        </div>
    )
}
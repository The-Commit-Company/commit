import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner"
import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader"
import { Header } from "@/components/common/Header"
import { APIData } from "@/types/APIData"
import { useFrappeGetCall } from "frappe-react-sdk"
import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const APIList = lazy(() => import('@/components/features/api_viewer/APIList'))
const APIDetails = lazy(() => import('@/components/features/api_viewer/APIDetails'))

interface GetAPIResponse {
    apis: APIData[]
    app_name: string
    branch_name: string
}
const AppAPIViewerContainer = () => {
    const { ID } = useParams()

    if (ID) {
        return <AppAPIViewer appName={ID} />
    }
    return null
}

export const AppAPIViewer = ({ appName }: { appName: string }) => {

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

    const { data, isLoading, error, mutate } = useFrappeGetCall<{ message: GetAPIResponse }>('commit.api.meta_data.get_apis_for_app', {
        app_name: appName
    }, undefined, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        onSuccess: (d: { message: GetAPIResponse }) => {
            if (!selectedendpoint) {
                setSelectedEndpoint(d.message.apis[0].name)
            }
        }
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
                <div className={selectedendpoint ? "w-full sm:w-[45%]" : "w-full"}>
                    <Suspense fallback={<FullPageLoader />}>
                        <APIList
                            apiList={data?.message.apis ?? []}
                            app_name={data?.message.app_name ?? ''}
                            branch_name={data?.message.branch_name ?? ''}
                            setSelectedEndpoint={setSelectedEndpoint}
                            selectedEndpoint={selectedendpoint}
                            path_to_folder=""
                            listRef={listRef}
                        />
                    </Suspense>

                </div>

                {selectedendpoint && (
                    <div
                        className={`fixed z-10  right-0 w-[80vw] h-full bg-white shadow-lg transition-transform transform ${selectedendpoint ? 'translate-x-0' : 'translate-x-full'
                            } md:relative md:translate-x-0 sm:w-[55%]`}
                    >
                        <Suspense fallback={<FullPageLoader />}>
                            <APIDetails project_branch={appName} endpointData={data?.message.apis ?? []} selectedEndpoint={selectedendpoint} setSelectedEndpoint={setSelectedEndpoint} viewerType="app" mutate={mutate} />
                        </Suspense>
                    </div>
                )}
            </div>}
        </div>

    )
}

export default AppAPIViewerContainer
import { APIDetails } from "@/components/features/api_viewer/APIDetails"
import { APIList } from "@/components/features/api_viewer/APIList"
import { useMemo, useState } from "react"
import { useFrappeGetDoc } from "frappe-react-sdk"
import { CommitProjectBranch } from "@/types/CommitProjectBranch"
import { APIData } from "@/types/APIData"

export const APIViewer = () => {

    const { data } = useFrappeGetDoc<CommitProjectBranch>('Commit Project Branch', 'The-Commit-Company-Raven-develop')

    const [searchQuery, setSearchQuery] = useState<string>('')
    const [requestTypeFilter, setRequestTypeFilter] = useState<string>('')

    const API_JSON: APIData[] = useMemo(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
        return JSON.parse(data?.whitelisted_apis ?? '[]').apis ?? []
    }, [data])

    const apiList = useMemo(() => {
        return API_JSON.filter((api: APIData) => {
            return api.name.toLowerCase().includes(searchQuery.toLowerCase()) || api.request_types.includes(requestTypeFilter.toUpperCase())
        })
    }, [searchQuery, API_JSON, requestTypeFilter])

    const [selectedendpoint, setSelectedEndpoint] = useState<string>(apiList[0]?.name)

    return (
        // show API details column only if there is selected endpoint else show only API list in full width.
        <div className="grid grid-cols-5 gap-0">
            <div className={`${selectedendpoint ? 'col-span-3' : 'col-span-5'} h-screen`}>
                <APIList
                    apiList={apiList}
                    app_name={data?.app_name ?? ''}
                    branch_name={data?.branch_name ?? ''}
                    setSelectedEndpoint={setSelectedEndpoint}
                    setSearchQuery={setSearchQuery}
                    setRequestTypeFilter={setRequestTypeFilter}
                />
            </div>
            {selectedendpoint && (
                <div className="col-span-2 h-screen">
                    <APIDetails endpointData={apiList} selectedEndpoint={selectedendpoint} />
                </div>
            )}
        </div>
    )
}
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
    console.log(apiList)

    const [selectedendpoint, setSelectedEndpoint] = useState<string>(apiList[0]?.name ?? '')

    return (
        <div className="grid grid-cols-5 gap-0">
            <div className="col-span-3 h-screen">
                <APIList
                    apiList={apiList}
                    setSelectedEndpoint={setSelectedEndpoint}
                    setSearchQuery={setSearchQuery}
                    setRequestTypeFilter={setRequestTypeFilter}
                />
            </div>
            <div className="col-span-2 h-screen">
                <APIDetails endpointData={apiList} selectedEndpoint={selectedendpoint} />
            </div>
        </div>
    )
}
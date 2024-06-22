import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { APIData } from "@/types/APIData"
import { useEffect, useMemo, useState } from "react"
import { AiOutlineBranches } from "react-icons/ai"
import { GoPackage } from "react-icons/go"

export interface APIListProps {
    apiList: APIData[]
    app_name: string
    branch_name: string
    setSelectedEndpoint: (endpoint: string) => void
    selectedEndpoint?: string
}

export const APIList = ({ apiList, app_name, branch_name, setSelectedEndpoint, selectedEndpoint }: APIListProps) => {
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [requestTypeFilter, setRequestTypeFilter] = useState<string>('All')

    const filterList = useMemo(() => {

        return apiList.filter((api: APIData) => {

            return api.name.toLowerCase().includes(searchQuery.toLowerCase()) && (requestTypeFilter !== 'All' ? api.request_types.includes(requestTypeFilter.toUpperCase()) : true)

        })

    }, [searchQuery, apiList, requestTypeFilter])

    useEffect(() => {
        setSelectedEndpoint(filterList[0]?.name ?? '')
    }, [filterList, setSelectedEndpoint])

    return (
        <div className="flex flex-col space-y-4 p-3 border-r border-gray-200">
            <div className="flex space-x-2 items-center">
                <div className="flex flex-wrap items-center space-x-1">
                    <GoPackage />
                    <p className="truncate text-md text-gray-700">{app_name}</p>
                </div>
                <div className="w-px h-4 bg-gray-200" />
                <div className="flex flex-wrap items-center space-x-1">
                    <AiOutlineBranches />
                    <p>{branch_name}</p>
                </div>
            </div>
            <div className="flex flex-row space-x-4">
                <div className="w-4/5 flex flex-row space-x-4">
                    <Input placeholder="Search" onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className="flex flex-row space-x-4">
                    <Select onValueChange={(value) => setRequestTypeFilter(value)} defaultValue="All">
                        <SelectTrigger className="w-[14ch]">
                            <SelectValue placeholder="Req. type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="All">All</SelectItem>
                                <SelectItem value="GET">GET</SelectItem>
                                <SelectItem value="POST">POST</SelectItem>
                                <SelectItem value="PUT">PUT</SelectItem>
                                <SelectItem value="DELETE">DELETE</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {/* fixed height container */}
            <div className="flex flex-col space-y-4  overflow-y-auto h-[calc(100vh-12rem)]">
                <ListView list={filterList} setSelectedEndpoint={setSelectedEndpoint} selectedEndpoint={selectedEndpoint} />
            </div>
        </div>
    )
}

export const ListView = ({ list, setSelectedEndpoint, selectedEndpoint }: { list: APIData[], setSelectedEndpoint: (endpoint: string) => void, selectedEndpoint?: string }) => {
    return (
        <div>
        <ul role="list" className="divide-y divide-gray-100 px-1">
            {list.length === 0 && (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] space-y-2" style={{ minHeight: '20rem' }} >
                    <p className="text-gray-500 text-lg">Sorry we couldn't find what you were looking for.</p>
                    <p className="text-gray-500 text-lg">Try searching with different keywords.</p>
                </div>
            )}
            {list.map((person: APIData, index: number) => (
                <li key={`${person.name}-${index}`} className={`flex justify-between gap-x-6 p-2 hover:bg-gray-100 cursor-pointer group ${selectedEndpoint === person.name ? 'bg-gray-100' : ''} `} onClick={() => setSelectedEndpoint(person.name)}>
                    <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                            <p className={`text-sm font-semibold leading-6 cursor-pointer group-hover:text-blue-600 ${selectedEndpoint === person.name ? 'text-blue-600' : 'text-gray-900'}`}><code>{person.name}</code></p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.api_path}</p>
                        </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900 space-x-1">
                            {person.request_types.map((type: string, idx: number) => (
                                <span key={idx} className="text-xs font-semibold leading-5 text-gray-500">{type} {idx !== person.request_types.length - 1 ? '/' : ''}</span>
                            ))}
                        </p>

                        {person.allow_guest && (
                            <div className="mt-1 flex items-center gap-x-1.5">
                                <div className="flex-none rounded-full bg-red-500/20 p-1">
                                    <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                </div>
                                <p className="text-xs leading-5 text-gray-500">Allow Guest</p>
                            </div>
                        )}
                    </div>
                </li>
            ))}
        </ul>
            {/* create a div which is at fixed location  and should be stick bottom which will show total list count at right corner of same w as above ul*/}
            {list.length && <div className="fixed bottom-0 flex justify-end p-2 w-[54%] bg-white h-10 border-t">
                <p className="text-sm justify-end">Total {list.length} API's</p>
            </div>}
        </div>
    )
}

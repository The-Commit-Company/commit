import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { APIData } from "@/types/APIData"

export interface APIListProps {
    apiList: APIData[]
}

export const APIList = ({ apiList }: APIListProps) => {
    return (
        <div className="flex flex-col space-y-4 p-3 border-r border-gray-200 h-screen">
            <div className="border-b border-gray-200 pb-4">
                <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
                    <h3 className="ml-2 mt-2 text-base text-xl font-semibold leading-6 text-gray-900">Listed APIs</h3>
                    <p className="ml-2 mt-1 truncate text-sm text-gray-500">in emotive_app @ <code className="text-xs font-semibold">develop</code></p>
                </div>
            </div>
            <div className="flex flex-row space-x-4">
                <div className="w-4/5 flex flex-row space-x-4">
                    <Input placeholder="Search" />
                    <Input placeholder="Module" />
                </div>
                <div className="w-2/5 flex flex-row space-x-4">
                    <Select >
                        <SelectTrigger className="w-[14ch]">
                            <SelectValue placeholder="Req. type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="GET">GET</SelectItem>
                                <SelectItem value="POST">POST</SelectItem>
                                <SelectItem value="PUT">PUT</SelectItem>
                                <SelectItem value="DELETE">DELETE</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className="flex flex-row space-x-2 items-center w-70">
                        <Checkbox id="Allow Guest" />
                        <label htmlFor="Allow Guest" className="text-sm">Allow Guest</label>
                    </div>
                </div>
            </div>
            {/* fixed height container */}
            <div className="flex flex-col space-y-4 overflow-y-auto h-[calc(100vh-10rem)]">
                <ListView list={apiList} />
            </div>
        </div>
    )
}

export const ListView = ({ list }: { list: APIData[] }) => {
    return (
        <ul role="list" className="divide-y divide-gray-100 px-1">
            {list.map((person: APIData) => (
                <li key={person.name} className="flex justify-between gap-x-6 p-2 hover:bg-gray-50">
                    <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer hover:text-blue-600"><code>{person.name}</code></p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.file}</p>
                        </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        {/* <p className="text-sm leading-6 text-gray-900">{person.role}</p> */}
                        {person.allow_guest ? (
                            <></>
                        ) : (
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
    )
}

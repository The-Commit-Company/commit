import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { APIData } from "@/types/APIData"
import { useEffect, useMemo, useRef, useState } from "react"
import { CommandContent } from "../commands/CommandsContent"
import { Box, FileJson, GitBranch, SquareTerminal } from "lucide-react"
import { web_url } from "@/config/socket"

export interface APIListProps {
    apiList: APIData[]
    app_name: string
    branch_name: string
    setSelectedEndpoint: (endpoint: string) => void
    selectedEndpoint?: string
    path_to_folder: string
    listRef?: React.RefObject<HTMLDivElement>
    /** 'app' = Installed Apps explorer; 'project' = Project Apps (Commit Project Branch) explorer */
    viewerType?: 'app' | 'project'
    /** Required when viewerType is 'project' – the Commit Project Branch document name */
    project_branch?: string
}

const getDefaultBaseUrl = () => web_url.replace(/\/$/, "")

const APIList = ({ apiList, app_name, branch_name, setSelectedEndpoint, selectedEndpoint, path_to_folder, listRef, viewerType = 'app', project_branch }: APIListProps) => {
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [requestTypeFilter, setRequestTypeFilter] = useState<string>('All')
    const [openApiLoading, setOpenApiLoading] = useState(false)
    const [openApiDialogOpen, setOpenApiDialogOpen] = useState(false)
    const [openApiBaseUrl, setOpenApiBaseUrl] = useState("")

    useEffect(() => {
        if (openApiDialogOpen) {
            setOpenApiBaseUrl(viewerType === "app" ? getDefaultBaseUrl() : "")
        }
    }, [openApiDialogOpen, viewerType])

    const handleDownloadOpenAPI = async (baseUrl: string) => {
        const isProject = viewerType === 'project' && project_branch
        const method = isProject
            ? 'commit.api.openapi.get_openapi_definition_project_apps'
            : 'commit.api.openapi.get_openapi_definition_installed_apps'
        const params: Record<string, string> = {}
        if (isProject && project_branch) params.project_branch = project_branch
        else if (app_name) params.app_name = app_name
        const qs = new URLSearchParams(params).toString()
        const url = `${web_url}/api/method/${method}${qs ? `?${qs}` : ''}`
        setOpenApiLoading(true)
        try {
            const res = await fetch(url)
            const json = await res.json()
            const spec = json?.message ?? json
            const serverUrl = baseUrl.trim().replace(/\/$/, "") || getDefaultBaseUrl()
            if (spec && typeof spec === "object") {
                spec.servers = [{ url: serverUrl, description: "Frappe site" }]
            }
            const blob = new Blob([JSON.stringify(spec, null, 2)], { type: 'application/json' })
            const a = document.createElement('a')
            a.href = URL.createObjectURL(blob)
            a.download = `${app_name}-${project_branch ?? "app"}-openapi.json`
            a.click()
            URL.revokeObjectURL(a.href)
            setOpenApiDialogOpen(false)
        } finally {
            setOpenApiLoading(false)
        }
    }

    const filterList = useMemo(() => {

        return apiList.filter((api: APIData) => {

            return api.name.toLowerCase().includes(searchQuery.toLowerCase()) && (requestTypeFilter !== 'All' ? api.request_types.includes(requestTypeFilter.toUpperCase()) : true)

        })

    }, [searchQuery, apiList, requestTypeFilter])

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)
        const endpointFromURL = searchParams.get('api')
        if (endpointFromURL) {
            if (filterList.map((api) => api.name).includes(endpointFromURL)) {
                setSelectedEndpoint(endpointFromURL)
            } else {
                setSelectedEndpoint(filterList[0]?.name ?? '')
            }
        }
        else {
            setSelectedEndpoint(filterList[0]?.name ?? '')
        }
    }, [filterList, setSelectedEndpoint])

    return (
        <div className="flex flex-col space-y-4 p-3 border-r border-gray-200">
            <div className="flex flex-row space-x-4 justify-between">
                <div className="flex space-x-2 items-center">
                    <div className="flex flex-wrap items-center space-x-1">
                        <Box size={14} />
                        <p className="truncate text-md text-gray-700">{app_name}</p>
                    </div>
                    <div className="w-px h-4 bg-gray-200" />
                    <div className="flex flex-wrap items-center space-x-1">
                        <GitBranch size={14} />
                        <p>{branch_name}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <Dialog open={openApiDialogOpen} onOpenChange={setOpenApiDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                aria-label="Download OpenAPI spec"
                                size="sm"
                                variant="outline"
                            >
                                <FileJson className="h-4 w-4 mr-2" />
                                OpenAPI
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Download OpenAPI spec</DialogTitle>
                                <DialogDescription>
                                    Set the base URL for the API. It will be used in the spec as the default server so tools like Bruno use the correct domain.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-2 py-2">
                                <Label htmlFor="openapi-base-url">Base URL</Label>
                                <Input
                                    id="openapi-base-url"
                                    type="url"
                                    placeholder="https://your-site.com"
                                    value={openApiBaseUrl}
                                    onChange={(e) => setOpenApiBaseUrl(e.target.value)}
                                />
                            </div>
                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => setOpenApiDialogOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => handleDownloadOpenAPI(openApiBaseUrl)}
                                    disabled={openApiLoading}
                                >
                                    {openApiLoading ? "Downloading…" : "Download"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button aria-label="View Bench Commands" size={'sm'} variant={'outline'}>
                                <SquareTerminal className="h-4 w-4 mr-2" />
                                Commands
                            </Button>
                        </DialogTrigger>
                        <CommandContent app={app_name} app_path={path_to_folder} />
                    </Dialog>
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
                <ListView list={filterList} setSelectedEndpoint={setSelectedEndpoint} selectedEndpoint={selectedEndpoint} searchQuery={searchQuery} listRef={listRef} />
            </div>
        </div>
    )
}

export const ListView = ({ list, setSelectedEndpoint, selectedEndpoint, searchQuery, listRef }: { list: APIData[], setSelectedEndpoint: (endpoint: string) => void, selectedEndpoint?: string, searchQuery?: string, listRef?: React.RefObject<HTMLDivElement> }) => {

    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

    useEffect(() => {
        if (listRef?.current && selectedEndpoint) {
            const selectedElement = itemRefs?.current?.find(item => item?.dataset.endpoint === selectedEndpoint);
            if (selectedElement) {
                selectedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, []);

    return (
        <div ref={listRef}>
            <ul role="list" className="divide-y divide-gray-100 px-1 pb-6">
            {list.length === 0 && (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] space-y-2" style={{ minHeight: '20rem' }} >
                    <p className="text-gray-500 text-lg">Sorry we couldn't find what you were looking for.</p>
                    <p className="text-gray-500 text-lg">Try searching with different keywords.</p>
                </div>
            )}
            {list.map((person: APIData, index: number) => (
                <li key={`${person.name}-${index}`} ref={el => {
                    if (el) {
                        el.dataset.endpoint = person.name;
                        itemRefs.current[index] = el;
                    }
                }} className={`flex justify-between gap-x-6 p-2 hover:bg-gray-100 cursor-pointer group ${selectedEndpoint === person.name ? 'bg-gray-100' : ''} `} onClick={() => setSelectedEndpoint(person.name)}>
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
            {list.length && <div className="fixed bottom-0 flex justify-end p-2 w-[44%] bg-white h-10 border-t">
                <p className="text-sm justify-end">{list.length} API's {searchQuery ? "found" : ''}</p>
            </div>}
        </div>
    )
}

export default APIList

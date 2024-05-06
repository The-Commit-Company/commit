import CopyButton from "@/components/common/CopyToClipboard/CopyToClipboard"
import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner"
import { FullPageLoader } from "@/components/common/FullPageLoader.tsx/FullPageLoader"
import { Tabs } from "@/components/common/Tabs"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { APIData, Argument } from "@/types/APIData"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { useFrappeGetCall } from "frappe-react-sdk"
import { useMemo } from "react"

export const APIDetails = ({ project_branch, endpointData, selectedEndpoint, setSelectedEndpoint, viewerType }: { project_branch: string, endpointData: APIData[], selectedEndpoint: string, setSelectedEndpoint: React.Dispatch<React.SetStateAction<string>>, viewerType: string }) => {

    const data = useMemo(() => {
        return endpointData.find((endpoint: APIData) => endpoint.name === selectedEndpoint)
    }, [endpointData, selectedEndpoint])

    const tabs = [
        { name: 'Parameters', content: <ParametersTable parameters={data?.arguments} /> },
        { name: 'Code', content: <CodeSnippet apiData={data!} project_branch={project_branch} file_path={data?.file ?? ''} viewerType={viewerType} /> },
    ]

    const requestTypeBgColor = (requestType: string) => {
        switch (requestType) {
            case 'GET':
                return 'bg-green-100'
            case 'POST':
                return 'bg-blue-100'
            case 'PUT':
                return 'bg-yellow-100'
            case 'DELETE':
                return 'bg-red-100'
            default:
                return 'bg-gray-100'
        }
    }

    const requestTypeBorderColor = (requestType: string) => {
        switch (requestType) {
            case 'GET':
                return 'ring-green-600/20'
            case 'POST':
                return 'ring-blue-600/20'
            case 'PUT':
                return 'ring-yellow-600/20'
            case 'DELETE':
                return 'ring-red-600/20'
            default:
                return 'ring-gray-600/20'
        }
    }

    return (
        <div className="flex flex-col space-y-3 p-3">
            <div className="border-b border-gray-200 pb-3 sm:flex sm:items-center sm:justify-between">
                <h1 className="text-lg font-semibold leading-6 text-gray-900">API Details</h1>
                <div className="mt-3 flex sm:ml-4 sm:mt-0 space-x-2">
                    {/* <button
                        type="button"
                        className="py-1 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-600 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Share
                    </button>
                    <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-1 text-center">Export</button> */}
                    <button
                        type="button"
                        className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => setSelectedEndpoint('')}
                    >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
            </div>
            <div>
                {data?.allow_guest || data?.xss_safe ? <div className="border-b border-gray-100 pb-2 space-x-2">
                    {data?.allow_guest && <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-green-600/20">
                        Allow Guest
                    </span>}
                    {data?.xss_safe && <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                        XSS Safe
                    </span>}
                </div> : null}
                <div className="mt-0 border-b border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-2 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Name :</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><code>{data?.name}</code></dd>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Endpoint :</dt>
                            <div className="flex items-start space-x-2 sm:col-span-4">
                                <dd className="mt-1 text-sm text-blue-500 cursor-pointer leading-6 sm:col-span-2 sm:mt-0 truncate w-[58ch]">{data?.api_path}</dd>
                                <CopyButton value={data?.api_path ?? ''} className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Req. Types :</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 space-x-1">
                                {data?.request_types.map((type: string, idx: number) => (
                                    <span key={idx} className={`inline-flex items-center rounded-md ${requestTypeBgColor(type)} px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ${requestTypeBorderColor(type)}`}>
                                        {type}
                                    </span>
                                ))}
                                {data?.request_types.length === 0 && ['GET', 'POST', 'PUT', 'DELETE'].map((type: string, idx: number) => (
                                    <span key={idx} className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ${requestTypeBgColor(type)} ${requestTypeBorderColor(type)}`}>
                                        {type}
                                    </span>
                                ))}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            <Tabs tabs={tabs} />
        </div >
    )
}


export const ParametersTable = ({ parameters }: { parameters?: Argument[] }) => {

    return (
        <Table>
            <TableCaption>A list of parameters that can be used in the API</TableCaption>
            <TableHeader className="bg-gray-100">
                <TableRow>
                    <TableHead>Argument</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Default</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {parameters?.map((parameter) => (
                    <TableRow key={parameter.argument} className="font-light text-sm">
                        <TableCell>{parameter.argument}</TableCell>
                        <TableCell>{parameter.type ? parameter.type : '-'}</TableCell>
                        <TableCell>{parameter.default ? parameter.default : '-'}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}


export const CodeSnippet = ({ apiData, project_branch, file_path, viewerType }: { apiData: APIData, project_branch: string, file_path: string, viewerType: string }) => {

    const { data, error, isLoading } = useFrappeGetCall<{ message: { file_content: string } }>('commit.api.api_explorer.get_file_content_from_path', {
        project_branch: project_branch,
        file_path: file_path,
        block_start: apiData.block_start ?? 0,
        block_end: apiData.block_end ?? 0,
        viewer_type: viewerType
    })
    return (
        <div className="flex flex-col space-y-2">
            {error && <ErrorBanner error={error} />}
            {isLoading && <div className="flex items-center justify-center h-[calc(100vh-16rem)]">
                <FullPageLoader />
            </div>}
            <code className="bg-gray-50 p-4 rounded-md text-sm overflow-auto border-2 border-gray-200 h-[calc(100vh-22rem)]">
                <pre className="counter-reset mb-2">
                    {isLoading && <FullPageLoader />}
                    {data?.message?.file_content}
                </pre>
            </code>
        </div >
    )
}
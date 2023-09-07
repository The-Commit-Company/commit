import CopyButton from "@/components/common/CopyToClipboard/CopyToClipboard"
import { Tabs } from "@/components/common/Tabs"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { APIData, Argument } from "@/types/APIData"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { useMemo } from "react"

export const APIDetails = ({ endpointData, selectedEndpoint, setSelectedEndpoint }: { endpointData: APIData[], selectedEndpoint: string, setSelectedEndpoint: React.Dispatch<React.SetStateAction<string>> }) => {

    const data = useMemo(() => {
        return endpointData.find((endpoint: APIData) => endpoint.name === selectedEndpoint)
    }, [endpointData, selectedEndpoint])

    const tabs = [
        { name: 'Parameters', content: <ParametersTable parameters={data?.arguments} /> },
        { name: 'Code', content: <CodeSnippet /> },
    ]

    /**
     * Funtion to get the API endpoint name from the file path
     * @param path file path of the endpoint
     * @param name name of the endpoint
     * @returns return the endpoint name from the path
     */
    const getEndpointFromPath = (path: string | undefined, name: string | undefined) => {
        const pathArray = path?.split('/').slice(1)
        // remove '.py' from last element of array using regex
        pathArray?.splice(-1, 1, pathArray[pathArray.length - 1].replace(/\.py$/, ''))
        pathArray?.push(name ?? '')
        return pathArray?.join('.')
    }

    return (
        <div className="flex flex-col space-y-3 p-3">
            <div className="border-b border-gray-200 pb-3 sm:flex sm:items-center sm:justify-between">
                <h1 className="text-lg font-semibold leading-6 text-gray-900">API Details</h1>
                <div className="mt-3 flex sm:ml-4 sm:mt-0 space-x-2">
                    <button
                        type="button"
                        className="py-1 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-600 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Share
                    </button>
                    <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-1 text-center">Export</button>
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
                            <dt className="text-sm font-medium leading-6 text-gray-900">API name :</dt>
                            <dd className="mt-1 text-xs leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><code>{data?.name}</code></dd>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">API endpoint :</dt>
                            <div className="flex items-start space-x-2 sm:col-span-4">
                                <dd className="mt-1 text-xs text-blue-500 cursor-pointer leading-6 sm:col-span-2 sm:mt-0 truncate w-[53ch]">{getEndpointFromPath(data?.file, data?.name)}</dd>
                                <CopyButton value={getEndpointFromPath(data?.file, data?.name) ?? ''} className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">File path :</dt>
                            <div className="flex items-start space-x-2 sm:col-span-4">
                                <dd className="mt-1 text-xs text-blue-500 cursor-pointer leading-6 sm:col-span-2 sm:mt-0 truncate w-[53ch]">{data?.file}</dd>
                                <CopyButton value={data?.file ?? ''} className="h-6 w-6" />
                            </div>
                        </div>
                    </dl>
                </div>
            </div>

            <Tabs tabs={tabs} />
        </div>
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
                    <TableRow key={parameter.argument} className="font-light text-xs">
                        <TableCell>{parameter.argument}</TableCell>
                        <TableCell>{parameter.type ? parameter.type : '-'}</TableCell>
                        <TableCell>{parameter.default ? parameter.default : '-'}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export const CodeSnippet = () => {
    return (
        <div className="flex flex-col space-y-2">
            <h1 className="text-sm font-medium leading-6 text-gray-900">API Code Snippet</h1>
            <code className="bg-gray-50 p-2 rounded-md text-sm">
                <pre>
                    {`{
    "name": "API Name",
    "endpoint": "/api/endpoint",
    "method": "GET",
    "module": "Module Name",
    "allowGuest": true
}`}
                </pre>
            </code>
        </div>
    )
}
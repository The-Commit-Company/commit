import CopyButton from "@/components/common/CopyToClipboard/CopyToClipboard"
import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner"
import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader"
import { Tabs } from "@/components/common/Tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { web_url } from "@/config/socket"
import { APIData, Argument } from "@/types/APIData"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { useFrappeGetCall } from "frappe-react-sdk"
import { useMemo } from "react"
import { MdOutlineFileDownload } from "react-icons/md"
import Markdown from "react-markdown"

export const APIDetails = ({ project_branch, endpointData, selectedEndpoint, setSelectedEndpoint, viewerType }: { project_branch: string, endpointData: APIData[], selectedEndpoint: string, setSelectedEndpoint: React.Dispatch<React.SetStateAction<string>>, viewerType: string }) => {

    const data = useMemo(() => {
        return endpointData.find((endpoint: APIData) => endpoint.name === selectedEndpoint)
    }, [endpointData, selectedEndpoint])

    const tabs = [
        {
            name: 'Parameters', content: <ParametersTable parameters={data?.arguments} />
        },
        {
            name: 'Code', content: <CodeSnippet apiData={data!} project_branch={project_branch} file_path={data?.file ?? ''} viewerType={viewerType} />
        },
        {
            name: 'Bruno', content: <Bruno doc={data!} />
        },
    ]
    data?.documentation && tabs.push({ name: 'Documentation', content: <Documentation documentation={data?.documentation ?? ''} /> })

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
                <div className="flex items-center space-x-2">
                <h1 className="text-lg font-semibold leading-6 text-gray-900">API Details</h1>
                    {data?.allow_guest || data?.xss_safe ? <div className="border-b border-gray-100  space-x-2">
                        {data?.allow_guest && <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-green-600/20">
                            Allow Guest
                        </span>}
                        {data?.xss_safe && <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                            XSS Safe
                        </span>}
                    </div> : null}
                </div>
                <div className="mt-3 flex sm:ml-4 sm:mt-0 space-x-2">
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
    }, undefined, {
        revalidateOnFocus: false,
        revalidateIfStale: false,
    })
    const copyValue = () => {
        const content = JSON.parse(JSON.stringify(data?.message?.file_content ?? []) ?? '[]')
        return content?.join('')

    }
    return (
        <div className="flex flex-col space-y-2">
            {error && <ErrorBanner error={error} />}
            {isLoading && <div className="flex items-center justify-center h-[calc(100vh-16rem)]">
                <FullPageLoader />
            </div>}
            <code className="relative bg-gray-50 p-4 rounded-md text-sm overflow-auto border-2 border-gray-200 h-[calc(100vh-22rem)]">
                <div className="absolute top-0 right-0 p-2">
                    <CopyButton value={copyValue()} className="h-6 w-6" variant={'outline'} />
                </div>
                <pre className="counter-reset mb-2">
                    {isLoading && <FullPageLoader />}
                    {data?.message?.file_content}
                </pre>
            </code>
        </div >
    )
}

export const Documentation = ({ documentation }: { documentation: string }) => {

    return (
        <div className="flex flex-col space-y-2 overflow-auto border-2 border-gray-200 h-[calc(100vh-20rem)]">
            <Markdown className={'p-2 flex flex-col gap-2'}>{documentation}</Markdown>
        </div>
    )
}

export const Bruno = ({ doc }: { doc: APIData }) => {

    const rest = useMemo(() => {
        if (doc) {
            const { allow_guest, xss_safe, documentation, block_end, block_start, index, ...rest } = doc
            return rest
        }
    }, [doc])

    const { data, error, isLoading } = useFrappeGetCall('commit.api.bruno.generate_bruno_file', {
        data: JSON.stringify(rest),
        type: 'copy'
    }, rest ? undefined : null, {
        revalidateOnFocus: false,
        revalidateIfStale: false,
    })

    const copyValue = () => {
        const content = JSON.parse(JSON.stringify(data ?? '') ?? '[]')
        return content

    }

    return (
        <div className="flex flex-col space-y-2 h-full overflow-y-hidden">
            {error && <ErrorBanner error={error} />}
            {isLoading && <div className="flex items-center justify-center h-[calc(100vh-16rem)]">
                <FullPageLoader />
            </div>}
            <code className="relative bg-gray-50 p-4 rounded-md text-sm overflow-auto border-2 border-gray-200 h-[calc(100vh-22rem)]">
                <div className="absolute top-0 right-0 p-2">
                    <div className="flex items-center space-x-1">
                        <Button variant={'outline'} size={'icon'} className="h-8 w-8">
                            <a href={`${web_url}/api/method/commit.api.bruno.generate_bruno_file?data=${JSON.stringify(rest)}`} target="_blank">
                                <MdOutlineFileDownload className="h-4 w-4" />
                            </a>
                        </Button>
                        <CopyButton value={copyValue()} className="h-8 w-8" variant={'outline'} />
                    </div>
                </div>
                <pre className="counter-reset mb-2">
                    {isLoading && <FullPageLoader />}
                    {data && <pre>{data}</pre>}
                </pre>
            </code>
            <div className="flex flex-row gap-1 items-center">
                <svg id="emoji" width="30" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><g id="color"><path fill="#F4AA41" stroke="none" d="M23.5,14.5855l-4.5,1.75l-7.25,8.5l-4.5,10.75l2,5.25c1.2554,3.7911,3.5231,7.1832,7.25,10l2.5-3.3333 c0,0,3.8218,7.7098,10.7384,8.9598c0,0,10.2616,1.936,15.5949-0.8765c3.4203-1.8037,4.4167-4.4167,4.4167-4.4167l3.4167-3.4167 l1.5833,2.3333l2.0833-0.0833l5.4167-7.25L64,37.3355l-0.1667-4.5l-2.3333-5.5l-4.8333-7.4167c0,0-2.6667-4.9167-8.1667-3.9167 c0,0-6.5-4.8333-11.8333-4.0833S32.0833,10.6688,23.5,14.5855z"></path><polygon fill="#EA5A47" stroke="none" points="36,47.2521 32.9167,49.6688 30.4167,49.6688 30.3333,53.5021 31.0833,57.0021 32.1667,58.9188 35,60.4188 39.5833,59.8355 41.1667,58.0855 42.1667,53.8355 41.9167,49.8355 39.9167,50.0855"></polygon><polygon fill="#3F3F3F" stroke="none" points="32.5,36.9188 30.9167,40.6688 33.0833,41.9188 34.3333,42.4188 38.6667,42.5855 41.5833,40.3355 39.8333,37.0855"></polygon></g><g id="hair"></g><g id="skin"></g><g id="skin-shadow"></g><g id="line"><path fill="#000000" stroke="none" d="M29.5059,30.1088c0,0-1.8051,1.2424-2.7484,0.6679c-0.9434-0.5745-1.2424-1.8051-0.6679-2.7484 s1.805-1.2424,2.7484-0.6679S29.5059,30.1088,29.5059,30.1088z"></path><path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M33.1089,37.006h6.1457c0.4011,0,0.7634,0.2397,0.9203,0.6089l1.1579,2.7245l-2.1792,1.1456 c-0.6156,0.3236-1.3654-0.0645-1.4567-0.754"></path><path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M34.7606,40.763c-0.1132,0.6268-0.7757,0.9895-1.3647,0.7471l-2.3132-0.952l1.0899-2.9035 c0.1465-0.3901,0.5195-0.6486,0.9362-0.6486"></path><path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M30.4364,50.0268c0,0-0.7187,8.7934,3.0072,9.9375c2.6459,0.8125,5.1497,0.5324,6.0625-0.25 c0.875-0.75,2.6323-4.4741,1.8267-9.6875"></path><path fill="#000000" stroke="none" d="M44.2636,30.1088c0,0,1.805,1.2424,2.7484,0.6679c0.9434-0.5745,1.2424-1.8051,0.6679-2.7484 c-0.5745-0.9434-1.805-1.2424-2.7484-0.6679C43.9881,27.9349,44.2636,30.1088,44.2636,30.1088z"></path><path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M25.6245,42.8393c-0.475,3.6024,2.2343,5.7505,4.2847,6.8414c1.1968,0.6367,2.6508,0.5182,3.7176-0.3181l2.581-2.0233l2.581,2.0233 c1.0669,0.8363,2.5209,0.9548,3.7176,0.3181c2.0504-1.0909,4.7597-3.239,4.2847-6.8414"></path><path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M19.9509,28.3572c-2.3166,5.1597-0.5084,13.0249,0.119,15.3759c0.122,0.4571,0.0755,0.9355-0.1271,1.3631l-1.9874,4.1937 c-0.623,1.3146-2.3934,1.5533-3.331,0.4409c-3.1921-3.7871-8.5584-11.3899-6.5486-16.686 c7.0625-18.6104,15.8677-18.1429,15.8677-18.1429c2.8453-1.9336,13.1042-6.9375,24.8125,0.875c0,0,8.6323-1.7175,14.9375,16.9375 c1.8036,5.3362-3.4297,12.8668-6.5506,16.6442c-0.9312,1.127-2.7162,0.8939-3.3423-0.4272l-1.9741-4.1656 c-0.2026-0.4275-0.2491-0.906-0.1271-1.3631c0.6275-2.3509,2.4356-10.2161,0.119-15.3759"></path><path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M52.6309,46.4628c0,0-3.0781,6.7216-7.8049,8.2712"></path><path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M19.437,46.969c0,0,3.0781,6.0823,7.8049,7.632"></path><line x1="36.2078" x2="36.2078" y1="47.3393" y2="44.3093" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></line></g></svg>
                <div className="text-sm text-gray-500">bruno is a Fast and Git-Friendly Opensource API client.</div>
                <div className="text-sm underline text-blue-500">
                    <a href="https://www.usebruno.com/downloads" target="_blank">
                        Click here to download.
                    </a>
                </div>
            </div>
        </div>
    )
}
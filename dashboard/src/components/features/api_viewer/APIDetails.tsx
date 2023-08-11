import { Tabs } from "@/components/common/Tabs"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const APIDetails = () => {

    const tabs = [
        { name: 'Parameters', content: <ParametersTable /> },
        { name: 'Body', content: <CodeSnippet /> },
        { name: 'Headers', content: <p>Header data if any here.</p> },
        { name: 'Authorization', content: <p>Authorization data here.</p> },
    ]

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
                </div>
            </div>
            <div>
                <div className="border-b border-gray-100 pb-2 space-x-2">
                    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-green-600/20">
                        Allow Guest
                    </span>
                    <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                        XSS Unsafe
                    </span>
                </div>
                <div className="mt-0 border-b border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-2 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">API name :</dt>
                            {/* <dd className="mt-1 text-xs leading-6 text-gray-700 sm:col-span-2 sm:mt-0">:</dd> */}
                            <dd className="mt-1 text-xs leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><code>get_linked_material_requests</code></dd>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">API endpoint :</dt>
                            <dd className="mt-1 text-xs leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><code>erpnext.accounts.get_chart_of_accounts</code></dd>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">File path :</dt>
                            <dd className="mt-1 text-xs text-blue-500 cursor-pointer leading-6 sm:col-span-2 sm:mt-0">../dashboard/src/pages/features/api_viewer/APIViewer.tsx</dd>
                        </div>
                    </dl>
                </div>
            </div>
            <Tabs tabs={tabs} />
        </div>
    )
}


export const ParametersTable = () => {
    const parameters = [
        {
            argument: 'doctype',
            type: 'string',
            default: 'Sales Order',
        },
        {
            argument: 'name',
            type: 'string',
            default: 'SO-00001',
        },
        {
            argument: 'fields',
            type: 'string',
            default: '["name", "customer", "grand_total"]',
        },
        {
            argument: 'filters',
            type: 'string',
            default: '{"customer": "Harry Potter"}',
        },
        {
            argument: 'limit_page_length',
            type: 'int',
            default: '20',
        },
        {
            argument: 'limit_start',
            type: 'int',
            default: '0',
        },
        {
            argument: 'order_by',
            type: 'string',
            default: 'creation desc',
        },
        {
            argument: 'as_dict',
            type: 'int',
            default: '1',
        },
        {
            argument: 'with_childnames',
            type: 'int',
            default: '0',
        },
        {
            argument: 'ignore_permissions',
            type: 'int',
            default: '0',
        },
        {
            argument: 'ignore_ifnull',
            type: 'int',
            default: '0',
        },
        {
            argument: 'debug',
            type: 'int',
            default: '0',
        },
    ]

    return (
        <Table>
            <TableCaption>A list of parameters that can be used in the API</TableCaption>
            <TableHeader className="bg-gray-100">
                <TableRow>
                    <TableHead className="w-[100px]">Argument</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead className="text-right">blah...</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {parameters.map((parameter) => (
                    <TableRow key={parameter.argument} className="font-light text-xs">
                        <TableCell>{parameter.argument}</TableCell>
                        <TableCell>{parameter.type}</TableCell>
                        <TableCell>{parameter.default}</TableCell>
                        <TableCell className="text-right">...</TableCell>
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
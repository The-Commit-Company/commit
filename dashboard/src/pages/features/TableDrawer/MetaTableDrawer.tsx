// import { Dialog, Transition } from '@headlessui/react'
import { LinkIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useFrappeGetDoc } from "frappe-react-sdk"
import { DocType } from "@/types/Core/DocType"
import { convertFrappeTimestampToReadableDate } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocField } from '@/types/Core/DocField'
import { Badge } from '@/components/ui/badge'
import { FieldsTable } from './FieldTable/FieldsTable'
import { PermissionsTable } from './PermissionsTable/PermissionsTable'
import { DocPerm } from '@/types/Core/DocPerm'
import { LinkTable } from './LinkTable/LinkTable'
import { DocTypeLink } from '@/types/Core/DocTypeLink'
import { FullPageLoader } from '@/components/common/FullPageLoader.tsx/FullPageLoader'


export interface Props {
    doctype?: string
    isOpen: boolean
    onClose: () => void
}

export interface DocTypeResponse {
    doctype_json: DocType
}

export const MetaTableDrawer = ({ doctype, isOpen, onClose }: Props) => {


    const { data, error, isLoading } = useFrappeGetDoc<DocType>('DocType', doctype, doctype ? undefined : null)

    return (
        <div data-state={isOpen ? 'open' : 'closed'} className="fixed z-50 grid h-full w-3/5 top-0 right-0 gap-4 border bg-background p-6 py-4 shadow-lg data-[state=open]:block data-[state=closed]:hidden">
            {error && <div>{error.message}</div>}
            {isLoading && <FullPageLoader />}
            {data && <div className="flex h-full flex-col overflow-y-scroll">
                <div className='flex flex-col space-y-1.5 text-center sm:text-left'>
                    <div className='flex justify-between'>
                        <div className='font-semibold px-2 tracking-tight text-2xl'>

                            <div className='pr-2'>{data.name}</div>

                            {data.documentation && <button
                                type="button"
                                className="rounded-md bg-white text-gray-400 hover:text-gray-600 focus:ring-2 focus:[ring-indigo-500 p-1]"
                                onClick={() => window.open(data.documentation)}
                            >
                                <span className="sr-only">Open Documentation</span>
                                <LinkIcon className="h-4 w-4" aria-hidden="true" />

                            </button>}
                        </div>

                        <button
                            type="button"
                            title='Close'
                            className="rounded-md bg-white border border-transparent hover:border-blue-200 focus:ring-2 focus:[ring-indigo-500 p-1]"
                            onClick={onClose}
                        >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-5 w-5 m-1" aria-hidden="true" />
                        </button>
                    </div>
                    <div className='text-sm text-muted-foreground'>
                        {/* class="text-sm text-muted-foreground" */}
                        {data.description && <div>
                            <p className="text-sm text-gray-500 px-2">{data.description}</p>
                        </div>}

                        <div className='flex flex-row px-2 pt-1'>
                            <Badge variant={'default'} style={{
                                backgroundColor: '#319795'
                            }} className='mr-1'>{data.module}</Badge>
                            {data.istable ? <Badge variant={'default'} style={{
                                backgroundColor: '#3182CE'
                            }} className='mr-1'>Child Table</Badge> : null}
                            {data.issingle ? <Badge variant={'default'} style={{
                                backgroundColor: '#38A169'
                            }} className='mr-1'>Single</Badge> : null}
                        </div>
                        <div className="sm:px-0 sm:pt-2 pb-2">
                            <dl className="space-y-4 px-2 sm:space-y-4 sm:px-2 items-start">
                                <div className='space-y-2'>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Created on: {convertFrappeTimestampToReadableDate(data.creation)}</dt>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Last Modified: {convertFrappeTimestampToReadableDate(data.modified)}</dt>
                                    </div>
                                </div>

                            </dl>
                        </div>
                    </div>
                </div>
                <div className="px-2 sm:px-2">
                    <Tabs defaultValue="fields" className="w-full">
                        <TabsList className='w-full justify-start'>
                            <TabsTrigger value="fields">Fields</TabsTrigger>
                            <TabsTrigger value="permissions">Permissions</TabsTrigger>
                            <TabsTrigger value="links">Link</TabsTrigger>

                        </TabsList>
                        <TabsContent value="fields"><FieldsTable data={data.fields ?? [] as DocField[]} /></TabsContent>
                        <TabsContent value="permissions"><PermissionsTable permissions={data.permissions ?? [] as DocPerm[]} /> </TabsContent>
                        <TabsContent value="links"><LinkTable links={data.links ?? [] as DocTypeLink[]} /></TabsContent>
                    </Tabs>
                </div>
            </div>}
        </div>

    )

}
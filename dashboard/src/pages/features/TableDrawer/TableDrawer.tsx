import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, LinkIcon } from '@heroicons/react/24/outline'
import { useFrappeGetDoc } from "frappe-react-sdk"
import { DocType } from "@/types/Core/DocType"
import { convertFrappeTimestampToReadableDate } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocField } from '@/types/Core/DocField'
import { Badge } from '@/components/ui/badge'
import { FieldsTable } from './FieldTable/FieldsTable'
import { PermissionsTable } from './PermissionsTable/PermissionsTable'
import { DocPerm } from '@/types/Core/DocPerm'

export interface Props {
    doctype: string
    isOpen: boolean
    onClose: () => void
}

export const TableDrawer = ({ doctype, isOpen, onClose }: Props) => {

    const { data, error, isLoading } = useFrappeGetDoc<DocType>('DocType', 'User')

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <div className="fixed inset-0" />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-4xl">
                                    {error && <div>{error.message}</div>}
                                    {isLoading && <div>Loading...</div>}
                                    {data && <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">

                                        <div className="flex items-start justify-between p-4 pb-0">

                                            <div className="sm:flex-1">

                                                <div className="flex items-center space-x-2">
                                                    <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">{data.name}</h3>

                                                    {data.documentation && <button
                                                        type="button"
                                                        className="rounded-md bg-white text-gray-400 hover:text-gray-600 focus:ring-2 focus:[ring-indigo-500 p-1]"
                                                        onClick={() => window.open('https://chakra-ui.com/docs/styled-system/theme')}
                                                    >
                                                        <span className="sr-only">Open Documentation</span>
                                                        <LinkIcon className="h-4 w-4" aria-hidden="true" />

                                                    </button>}

                                                </div>

                                                {data.description && <div>
                                                    <p className="text-sm text-gray-500">{data.description}</p>
                                                </div>}

                                                <div className='flex flex-row py-2'>
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

                                            </div>
                                            <button
                                                type="button"
                                                className="rounded-md bg-white text-gray-400 hover:text-gray-600 focus:ring-2 focus:ring-indigo-500"
                                                onClick={onClose}
                                            >
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                        {/* Main */}
                                        <div>
                                            <div className="p-2 sm:px-0 sm:pt-0 pb-2">
                                                <dl className="space-y-4 px-4 sm:space-y-4 sm:px-4 items-start">
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
                                        <div className="px-4 sm:px-4">
                                            <Tabs defaultValue="fields" className="w-full">
                                                <TabsList className='w-full justify-start'>
                                                    <TabsTrigger value="fields">Fields</TabsTrigger>
                                                    <TabsTrigger value="permissions">Permissions</TabsTrigger>
                                                    <TabsTrigger value="links">Link</TabsTrigger>

                                                </TabsList>
                                                <TabsContent value="fields"><FieldsTable data={data.fields ?? [] as DocField[]} /></TabsContent>
                                                <TabsContent value="permissions"><PermissionsTable permissions={data.permissions ?? [] as DocPerm[]} /> </TabsContent>
                                                <TabsContent value="links">Change your notification settings here.</TabsContent>
                                            </Tabs>
                                        </div>
                                    </div>}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )

}
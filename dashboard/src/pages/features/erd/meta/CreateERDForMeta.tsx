import { Header } from "@/components/common/Header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import { XMarkIcon } from "@heroicons/react/20/solid"
import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner"
import { FullPageLoader } from "@/components/common/FullPageLoader.tsx/FullPageLoader"
import { Input } from "@/components/ui/input"
import { useFrappeGetDocList } from "frappe-react-sdk"
import { DocType } from "@/types/Core/DocType"
import { Checkbox } from "@/components/ui/checkbox"
import { useDebounce } from "@/hooks/useDebounce"
import { ERDForMetaDoctypes } from "./ERDForMetaDoctype"

export const CreateERD = () => {
    const [open, setOpen] = useState(true)

    const [erdDoctypes, setERDDocTypes] = useState<string[]>([])

    return (
        <div className="h-screen">
            <Header text="ERD Viewer" />
            <div className="border-r border-gray-200">
                <div className="fixed bottom-4 left-[50%] -translate-x-[50%] z-50" hidden={open}>
                    <Button onClick={() => setOpen(!open)}>
                        Select DocTypes ({erdDoctypes.length})
                    </Button>
                </div>

                <ModuleDoctypeListDrawer open={open} setOpen={setOpen} erdDoctypes={erdDoctypes} setERDDocTypes={setERDDocTypes} />

                {/* fixed height container */}
                <div className="flex h-[95vh] pb-4">
                    {erdDoctypes && <ERDForMetaDoctypes doctypes={erdDoctypes} setDocTypes={setERDDocTypes} />}
                    {/* <ListView list={apiList} setSelectedEndpoint={setSelectedEndpoint} /> */}
                </div>
            </div>
        </div>
    )
}


export interface ModuleDoctypeListDrawerProps {
    open: boolean
    setOpen: (open: boolean) => void
    erdDoctypes: string[]
    setERDDocTypes: React.Dispatch<React.SetStateAction<string[]>>
}

export const ModuleDoctypeListDrawer = ({ open, setOpen, erdDoctypes, setERDDocTypes }: ModuleDoctypeListDrawerProps) => {

    const [doctype, setDocType] = useState<string[]>(erdDoctypes)

    const onGenerateERD = () => {
        setERDDocTypes(doctype)
        setOpen(false)
    }

    useEffect(() => {
        setDocType(erdDoctypes)
    }, [erdDoctypes])


    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <div className="fixed inset-0" />
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 left-0 pr-10 flex max-w-full">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-[-100%]"
                                enterTo="translate-x-[0]"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-[-100%]"
                            >
                                <Dialog.Panel className="pointer-events-auto w-[480px]">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white pt-6 shadow-xl">
                                        <div className="px-4 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="flex space-x-2 ">
                                                    <div className="text-base font-semibold leading-6 text-gray-900">
                                                        Select DocTypes
                                                    </div>
                                                    {doctype.length ? <Badge variant="secondary" className="h-6">{doctype.length} DocTypes</Badge> : null}

                                                </Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none "
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="absolute -inset-2.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                            <ModuleList doctype={doctype} setDocType={setDocType} />
                                        </div>

                                    </div>
                                    <div className="sticky bottom-0 items-center justify-end p-4 flex w-full bg-white border-t">
                                        <Button onClick={onGenerateERD} size="sm" className="bg-blue-500">Generate ERD</Button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export interface DoctypesData {
    module_name: string,
    doctype_name: string
}

export const ModuleList = ({ doctype, setDocType }: { doctype: string[], setDocType: React.Dispatch<React.SetStateAction<string[]>> }) => {

    const [filter, setFilter] = useState<string>("")

    const debouncedInput = useDebounce(filter, 500)


    const { data, error, isLoading } = useFrappeGetDocList<DocType>('DocType', {
        fields: ['name', 'module'],
        orFilters: [['module', 'like', `%${debouncedInput}%`], ['name', 'like', `%${debouncedInput}%`]],
        limit: 100
    })
    if (error) {
        return <ErrorBanner error={error} />
    }
    if (isLoading) {
        return <FullPageLoader className="w-[240px]" />
    }

    if (data) {
        return (
            <div>
                <Input
                    placeholder="Filter DocType..."
                    value={filter}
                    onChange={(event) => setFilter(event.target.value)}
                    className="w-full"
                    autoFocus
                />
                <div>
                    <ul role="list" className="divide-y divide-gray-200">
                        {
                            data?.map((doc: DocType) => {
                                return (
                                    <li className="py-3 flex justify-between items-center pl-4" key={doc.name}>
                                        <label htmlFor={doc.name} className="text-sm font-normal" >{doc.name}</label>
                                        <div className="min-h-[24px] flex flex-row gap-2">
                                            <span className="text-gray-500 text-xs">{doc.module}</span>
                                            <Checkbox id={doc.name} checked={doctype.some(d => d === doc.name)} onCheckedChange={(checked) => {
                                                if (checked) {
                                                    setDocType([...new Set([...doctype, doc.name])])
                                                } else {
                                                    setDocType(doctype.filter((d) => d !== doc.name))
                                                }
                                            }}>
                                                {doc.name}
                                            </Checkbox>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
    return null

}
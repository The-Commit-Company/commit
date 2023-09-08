import { FullPageLoader } from "@/components/common/FullPageLoader.tsx/FullPageLoader"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CommitProjectBranch, ModuleData } from "@/types/CommitProjectBranch"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/20/solid"
import { useFrappeGetDoc } from "frappe-react-sdk"
import { Fragment, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { ERDForDoctypes } from "./ERDForDoctypes"
import { Header } from "@/components/common/Header"
import { Input } from "@/components/ui/input"
import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner"

export const ERDViewer = () => {

    const [open, setOpen] = useState(true)

    const { ID } = useParams()

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

                {ID && <ModuleDoctypeListDrawer open={open} setOpen={setOpen} ID={ID} erdDoctypes={erdDoctypes} setERDDocTypes={setERDDocTypes} />}

                {/* fixed height container */}
                <div className="flex h-[95vh] pb-4">
                    {/* <ListView list={apiList} setSelectedEndpoint={setSelectedEndpoint} /> */}
                    {ID && erdDoctypes && <ERDForDoctypes project_branch={ID} doctypes={erdDoctypes} />}
                </div>
            </div>
        </div>
    )
}

export interface ModuleDoctypeListDrawerProps {
    open: boolean
    setOpen: (open: boolean) => void
    ID: string
    erdDoctypes: string[]
    setERDDocTypes: React.Dispatch<React.SetStateAction<string[]>>
}

export const ModuleDoctypeListDrawer = ({ open, setOpen, ID, erdDoctypes, setERDDocTypes }: ModuleDoctypeListDrawerProps) => {

    const [doctype, setDocType] = useState<string[]>(erdDoctypes)

    const onGenerateERD = () => {
        setERDDocTypes(doctype)
        setOpen(false)
    }


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
                                            <ModuleList ID={ID} doctype={doctype} setDocType={setDocType} />
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

export const ModuleList = ({ ID, doctype, setDocType }: { ID: string, doctype: string[], setDocType: React.Dispatch<React.SetStateAction<string[]>> }) => {

    const { data, error, isLoading } = useFrappeGetDoc<CommitProjectBranch>('Commit Project Branch', ID)

    const [filter, setFilter] = useState<string>("")

    const filterDoctypes = useMemo(() => {
        const module_doctypes_map: ModuleData = JSON.parse(data?.module_doctypes_map ?? "{}")

        const allDoctypes = Object.values(module_doctypes_map).map((m) => m?.doctype_names ?? []).flat()

        return allDoctypes.filter((d) => d.toLowerCase().includes(filter.toLowerCase()))
    }, [data, filter])


    if (error) {
        return <ErrorBanner error={error} />
    }
    if (isLoading) {
        return <FullPageLoader className="w-[240px]" />
    }

    if (data) {
        const moduleData: ModuleData = JSON.parse(data?.module_doctypes_map ?? "{}")


        return (
            <div>
                <Input
                    placeholder="Filter DocType..."
                    value={filter}
                    onChange={(event) => setFilter(event.target.value)}
                    className="w-full"
                />
                {filter ? <div>
                    <ul role="list" className="divide-y divide-gray-200">
                        {
                            filterDoctypes.map((doctypeName: string) => {
                                return (
                                    <li className="py-3 flex justify-between items-center pl-4" key={doctypeName}>
                                        <label htmlFor={doctypeName} className="text-sm font-normal" >{doctypeName}</label>
                                        <div className="min-h-[24px]">
                                            <Checkbox id={doctypeName} checked={doctype.includes(doctypeName)} onCheckedChange={(checked) => {
                                                if (checked) {
                                                    setDocType([...new Set([...doctype, doctypeName])])
                                                } else {
                                                    setDocType(doctype.filter((d) => d !== doctypeName))
                                                }
                                            }}>
                                                {doctypeName}
                                            </Checkbox>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div> :
                    <Accordion type="single" collapsible className="w-full">
                        {Object.keys(moduleData).map((module: string) => {
                            return (
                                <AccordionItem value={module} key={module}>
                                    <div className="w-full flex justify-between items-center">
                                        <div className="text-base">
                                            <AccordionTrigger className="space-x-4">
                                                {module}&nbsp;
                                            </AccordionTrigger>
                                        </div>
                                        <div className="flex space-x-2 items-center">
                                            {moduleData?.[module]?.doctype_names?.filter((d) => doctype.includes(d)).length ?
                                                <Badge variant="secondary" className="h-6 rounded-full">{moduleData?.[module]?.doctype_names?.filter((d) => doctype.includes(d)).length}</Badge> : null}
                                            <Checkbox checked={moduleData?.[module]?.doctype_names?.every((d) => doctype.includes(d))}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setDocType([...new Set([...doctype, ...moduleData?.[module]?.doctype_names ?? []])])
                                                    } else {
                                                        setDocType(doctype.filter((d) => !moduleData?.[module]?.doctype_names?.includes(d)))
                                                    }

                                                }} />
                                        </div>
                                    </div>
                                    <AccordionContent>
                                        <ul role="list" className="divide-y divide-gray-200">
                                            {
                                                moduleData?.[module]?.doctype_names?.map((doctypeName: string) => {
                                                    return (
                                                        <li className="py-3 flex justify-between items-center pl-4" key={doctypeName}>
                                                            <label htmlFor={doctypeName} className="text-sm font-normal" >{doctypeName}</label>
                                                            <div className="min-h-[24px]">
                                                                <Checkbox id={doctypeName} checked={doctype.includes(doctypeName)} onCheckedChange={(checked) => {
                                                                    if (checked) {
                                                                        setDocType([...new Set([...doctype, doctypeName])])
                                                                    } else {
                                                                        setDocType(doctype.filter((d) => d !== doctypeName))
                                                                    }
                                                                }}>
                                                                    {doctypeName}
                                                                </Checkbox>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            )
                        })}
                    </Accordion>}
            </div>
        )
    }

    return null

}

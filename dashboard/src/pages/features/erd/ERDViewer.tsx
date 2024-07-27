import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { AppModuleData } from "@/types/CommitProjectBranch"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/20/solid"
import { useFrappeGetCall } from "frappe-react-sdk"
import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { Header } from "@/components/common/Header"
import { Input } from "@/components/ui/input"
import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner"
import { ERDForDoctypes } from "./ERDForDoctypes"
import { Dialog as Dialog2 } from "@/components/ui/dialog"
import { Popover, PopoverTrigger } from "@/components/ui/popover"
import { DoctypeListPopover, ViewERDAppList } from "./meta/ERDDoctypeAndAppModal"
import { BsDownload } from "react-icons/bs"
import { toPng } from 'html-to-image'

export const ERDViewer = () => {

    const [open, setOpen] = useState(true)

    const location = useLocation()

    const { apps } = location.state as { apps: string[] }

    const [selectedApps, setSelectedApps] = useState<string[]>(apps)

    const [erdDoctypes, setERDDocTypes] = useState<{ doctype: string, project_branch: string }[]>([])

    useEffect(() => {
        const doctypes = JSON.parse(window.sessionStorage.getItem('ERDDoctypes') ?? '[]')
        const filteredDoctypes = doctypes.filter((d: { doctype: string, project_branch: string }) => selectedApps.includes(d.project_branch)) ?? []
        setERDDocTypes(filteredDoctypes)
        if (filteredDoctypes.length) {
            setOpen(false)
        }

    }, [])

    const flowRef = useRef(null)

    return (
        <div className="h-screen">
            <Header text="ERD Viewer" />
            <div className="border-r border-gray-200">
                <div className="fixed bottom-4 flex flex-row gap-1 left-[50%] -translate-x-[50%] z-50" hidden={open}>
                    <Button onClick={() => setOpen(!open)}>
                        Select DocTypes ({erdDoctypes.length})
                    </Button>
                    <Button variant={'outline'} onClick={() => {
                        if (flowRef.current === null) return
                        toPng(flowRef.current, {
                            filter: node => !(
                                node?.classList?.contains('react-flow__minimap') ||
                                node?.classList?.contains('react-flow__controls')
                            ),
                        }).then(dataUrl => {
                            const a = document.createElement('a');
                            a.setAttribute('download', 'erd.png');
                            a.setAttribute('href', dataUrl);
                            a.click();
                        });
                    }}>
                        <div className="flex items-center gap-2">
                            <BsDownload /> Download
                        </div>
                    </Button>
                </div>

                {selectedApps && <ModuleDoctypeListDrawer open={open} setOpen={setOpen} apps={selectedApps} erdDoctypes={erdDoctypes} setERDDocTypes={setERDDocTypes} setSelectedApps={setSelectedApps} />}

                {/* fixed height container */}
                <div className="flex h-[93vh] overflow-hidden">
                    {/* <ListView list={apiList} setSelectedEndpoint={setSelectedEndpoint} /> */}
                    {selectedApps && erdDoctypes && <ERDForDoctypes project_branch={selectedApps} doctypes={erdDoctypes} setDocTypes={setERDDocTypes} flowRef={flowRef} />}
                </div>
            </div>
        </div>
    )
}

export interface ModuleDoctypeListDrawerProps {
    open: boolean
    setOpen: (open: boolean) => void
    apps: string[]
    setSelectedApps: React.Dispatch<React.SetStateAction<string[]>>
    erdDoctypes: { doctype: string, project_branch: string }[]
    setERDDocTypes: React.Dispatch<React.SetStateAction<{ doctype: string; project_branch: string; }[]>>
}

export const ModuleDoctypeListDrawer = ({ open, setOpen, apps, setSelectedApps, erdDoctypes, setERDDocTypes }: ModuleDoctypeListDrawerProps) => {

    const [doctype, setDocType] = useState<{
        doctype: string
        project_branch: string
    }[]>(erdDoctypes)

    const onGenerateERD = () => {
        setERDDocTypes(doctype)
        window.sessionStorage.setItem('ERDDoctypes', JSON.stringify(doctype))
        setOpen(false)
    }

    useEffect(() => {
        setDocType(erdDoctypes)
    }, [erdDoctypes])

    const [openDialog, setOpenDialog] = useState(false)

    const dialogOnClose = () => {
        setOpenDialog(false)
    }


    return (
        <>
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
                                                        <Popover>
                                                            {doctype.length ? <PopoverTrigger asChild>
                                                                <Button variant={'outline'} className="h-6 px-2">{doctype.length} DocTypes</Button>
                                                            </PopoverTrigger> : null}
                                                            <DoctypeListPopover doctypes={doctype} setDoctypes={setDocType} />
                                                        </Popover>
                                                        {apps.length ? <Button variant={'outline'} onClick={() => setOpenDialog(true)} className="h-6 px-2">{apps.length} Apps</Button> : null}

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
                                            <ModuleList apps={apps} doctype={doctype} setDocType={setDocType} />
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
            <Dialog2 open={openDialog} onOpenChange={setOpenDialog}>
                <ViewERDAppList apps={apps} setApps={setSelectedApps} onClose={dialogOnClose} />
            </Dialog2>
        </>
    )
}

export interface DoctypesData {
    app_name: string,
    module_name: string,
    doctype_name: string
}

export const ModuleList = ({ apps, doctype, setDocType }: { apps: string[], doctype: { doctype: string, project_branch: string }[], setDocType: React.Dispatch<React.SetStateAction<{ doctype: string; project_branch: string; }[]>> }) => {

    const { data, error, isLoading } = useFrappeGetCall<{ message: AppModuleData }>('commit.commit.doctype.commit_project_branch.commit_project_branch.get_module_doctype_map_for_branches', {
        branches: JSON.stringify(apps)
    })

    const [filter, setFilter] = useState<string>("")

    const filterDoctypes = useMemo(() => {

        const apps_module_data = data?.message ?? {}
        const allDoctypes: DoctypesData[] = []
        Object.keys(apps_module_data).forEach((app_name) => {
            Object.keys(apps_module_data[app_name]).forEach((module_name) => {
                const moduleData = apps_module_data[app_name][module_name]

                const doctypeNames: string[] = moduleData?.doctype_names ?? []
                doctypeNames.forEach((doctype_name) => {
                    allDoctypes.push({
                        app_name,
                        module_name,
                        doctype_name
                    })
                })
            })
        })

        const filterDoctypes = allDoctypes.filter((d) =>
            d.doctype_name.toLowerCase().includes(filter.toLowerCase()) || d.module_name.toLowerCase().includes(filter.toLowerCase())
        )

        const uniqueDoctypes = filterDoctypes.filter((v, i, a) => a.findIndex(t => (t.doctype_name === v.doctype_name)) === i)

        return uniqueDoctypes

    }, [data, filter])

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
                />
                <div>
                    <ul role="list" className="divide-y divide-gray-200">
                        {
                            filterDoctypes.map((doctypeName: DoctypesData) => {
                                return (
                                    <li className="py-3 flex justify-between items-center pl-4" key={doctypeName.doctype_name}>
                                        <label htmlFor={doctypeName.doctype_name} className="text-sm font-normal" >{doctypeName.doctype_name}</label>
                                        <div className="min-h-[24px] flex flex-row gap-2">
                                            {/* add graytext instead of badge */}
                                            <span className="text-gray-500 text-xs">{doctypeName.module_name}</span>
                                            <Checkbox id={doctypeName.doctype_name} checked={doctype.some(d => d.doctype === doctypeName.doctype_name)} onCheckedChange={(checked) => {
                                                if (checked) {
                                                    setDocType([...new Set([...doctype, {
                                                        doctype: doctypeName.doctype_name,
                                                        project_branch: doctypeName.app_name
                                                    }])])
                                                } else {
                                                    setDocType(doctype.filter((d) => d.doctype !== doctypeName.doctype_name))
                                                }
                                            }}>
                                                {doctypeName.doctype_name}
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

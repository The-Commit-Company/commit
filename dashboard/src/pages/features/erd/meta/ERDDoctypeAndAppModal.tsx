import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner";
import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader";
import { ProjectData } from "@/components/features/projects/Projects";
import { ViewERDProjectCard } from "@/components/features/projects/ViewERDAppDialog";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PopoverContent } from "@/components/ui/popover";
import { useFrappeGetCall } from "frappe-react-sdk";
import { useState } from "react";

export interface DoctypeListPopoverProps {
    doctypes: {
        doctype: string;
        project_branch: string;
    }[];
    setDoctypes: React.Dispatch<React.SetStateAction<{
        doctype: string;
        project_branch: string;
    }[]>>
}

export const DoctypeListPopover = ({ doctypes, setDoctypes }: DoctypeListPopoverProps) => {

    return (
        <PopoverContent className="w-[350px] p-4 bg-white shadow-lg rounded-lg">
            <div className="col-span-2 grid grid-cols-2 gap-2">
                {doctypes.map((doctype) => (
                    <span className="inline-flex justify-between items-center gap-x-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10" key={doctype.doctype}>
                        {doctype.doctype}
                        <button className="group relative h-4 w-4 rounded-sm hover:bg-gray-500/20" onClick={() => setDoctypes(doctypes.filter((d) => d.doctype !== doctype.doctype))}>
                            <span className="sr-only">Remove</span>
                            <svg viewBox="0 0 14 14" className="h-4 w-4 stroke-gray-600/50 group-hover:stroke-gray-600/75">
                                <path d="M4 4l6 6m0-6l-6 6" />
                            </svg>
                            <span className="absolute -inset-1" />
                        </button>
                    </span>
                ))}
            </div>
        </PopoverContent >
    )
}

export const DoctypeListPopoverForMeta = ({ doctypes, setDoctypes }: {doctypes: string[], setDoctypes: React.Dispatch<React.SetStateAction<string[]>>}) => {

    return (
        <PopoverContent className="w-[350px] p-4 bg-white shadow-lg rounded-lg">
            <div className="col-span-2 grid grid-cols-2 gap-2">
                {doctypes.map((doctype:string) => (
                    <span className="inline-flex justify-between items-center gap-x-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10" key={doctype}>
                        {doctype}
                        <button className="group relative h-4 w-4 rounded-sm hover:bg-gray-500/20" onClick={() => setDoctypes(doctypes.filter((d) => d !== doctype))}>
                            <span className="sr-only">Remove</span>
                            <svg viewBox="0 0 14 14" className="h-4 w-4 stroke-gray-600/50 group-hover:stroke-gray-600/75">
                                <path d="M4 4l6 6m0-6l-6 6" />
                            </svg>
                            <span className="absolute -inset-1" />
                        </button>
                    </span>
                ))}
            </div>
        </PopoverContent >
    )
}
export const ViewERDAppList = ({ apps, setApps, onClose }: { apps: string[], setApps: React.Dispatch<React.SetStateAction<string[]>>, onClose: () => void }) => {
    const [selectApp, setSelectApp] = useState<string[]>(apps)

    const { data, error, isLoading } = useFrappeGetCall<{ message: ProjectData[] }>('commit.api.commit_project.commit_project.get_project_list_with_branches', {}, 'get_project_list_with_branches', {
        keepPreviousData: true,
        revalidateOnFocus: true,
        revalidateIfStale: false,
    })

    const onViewERD = () => {
        setApps(selectApp)
        onClose()
    }
    return (
        <DialogContent className="p-4 px-6">
            <DialogHeader>
                <DialogTitle>Select Apps</DialogTitle>
                <DialogDescription>
                    Select the apps to view ERD
                </DialogDescription>
            </DialogHeader>
            {error && <ErrorBanner error={error} />}
            {isLoading && <FullPageLoader />}
            {data && data?.message && <ul role="list" className="divide-y divide-gray-200 max-h-[60vh] overflow-y-scroll">
                {data?.message?.map((org: ProjectData) => {
                    return org.projects.map((project => {
                        return (
                            <ViewERDProjectCard project={project} key={project.name} setApps={setSelectApp} apps={selectApp} />
                        )
                    }
                    ))
                })}
            </ul>}
            <DialogFooter>
                <Button onClick={onViewERD}>View ERD</Button>
            </DialogFooter>
        </DialogContent>
    )
}
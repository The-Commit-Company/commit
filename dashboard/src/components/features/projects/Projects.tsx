import { FullPageLoader } from "@/components/common/FullPageLoader.tsx/FullPageLoader"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CardDescription } from "@/components/ui/card"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CommitProject } from "@/types/commit/CommitProject"
import { AvatarImage } from "@radix-ui/react-avatar"
import { useFrappeGetCall } from "frappe-react-sdk"
import { useMemo, useState } from "react"
import { AiOutlineApi } from "react-icons/ai"
import { BsDatabase } from "react-icons/bs"
import { MdAdd, MdAddBox } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import CreateBranchModal from "./Branch/CreateBranchModal"
import CreateOrgModal from "./Org/CreateOrgModal"
import CreateProjectModal from "./Projects/CreateProjectModal"
import { ViewERDDialogContent } from "./ViewERDAppDialog"
import { KeyedMutator } from "swr"
import { isSystemManager } from "@/utils/roles"
import { AiOutlineDelete } from "react-icons/ai";
import DeleteOrgModal from "./Org/DeleteOrgModal"
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { RxDragHandleDots1 } from "react-icons/rx";
import ManageBranchModal from "./Branch/ManageBranchModal"
import { CommitProjectBranch } from "@/types/commit/CommitProjectBranch"
import DeleteProjectModal from "./Projects/DeleteProjectModal"

export interface ProjectWithBranch extends CommitProject {
    branches: CommitProjectBranch[]
}
export interface ProjectData extends CommitProjectBranch {
    projects: ProjectWithBranch[]
    organization_name: string
    image: string
    name: string
    about: string
}
export const Projects = () => {

    const isCreateAccess = isSystemManager()

    const { data, error, isLoading, mutate } = useFrappeGetCall<{ message: ProjectData[] }>('commit.api.commit_project.commit_project.get_project_list_with_branches')

    const [createOrg, setCreateOrg] = useState<boolean>(false)

    const handleOrgClose = () => {
        setCreateOrg(false)
    }

    if (error) {
        return <div>Error</div>
    }

    if (isLoading) {
        return <FullPageLoader />
    }

    if (data && data.message) {
        return (
            <div className="mx-auto pl-2 pr-4 h-[calc(100vh-4rem)]">
                <div className="h-full space-y-2">
                    <div className="flex flex-row items-center justify-end">
                        <div className="flex gap-2">

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size='sm' disabled={data.message.length === 0} variant={'outline'}>
                                        <BsDatabase className='mr-2' /> View ERD
                                    </Button>
                                </DialogTrigger>
                                <ViewERDDialogContent data={data.message} />
                            </Dialog>

                            {isCreateAccess && <Button size='sm' onClick={() => setCreateOrg(true)}>
                                            <MdAddBox className="mr-2" />
                                            Add Organization
                            </Button>}
                        </div>
                    </div>
                    <ul role="list" className="space-y-2 py-2">
                        {data.message.map((org: ProjectData) => {
                            return <OrgComponent org={org} key={org.organization_name} mutate={mutate} />
                        })}
                    </ul>
                </div>
                <Dialog open={createOrg} onOpenChange={setCreateOrg}>
                    <CreateOrgModal mutate={mutate} onClose={handleOrgClose} />
                </Dialog>
            </div>
        )
    }
}


interface OrgComponentProps {
    org: ProjectData, mutate: KeyedMutator<{ message: ProjectData[]; }>
}

export const OrgComponent = ({ org, mutate }: OrgComponentProps) => {

    const isCreateAccess = isSystemManager()

    const [createProject, setCreateProject] = useState<boolean>(false)

    const handleClose = () => {
        setCreateProject(false)
    }

    return (
        <div>

            <div className="flex justify-between items-center py-2 border-b-[1px]">
                <h1 className="text-lg font-medium tracking-normal">
                    {org.organization_name}
                </h1>
                {isCreateAccess &&
                    <div className="flex space-x-2">
                        <Button size="icon" onClick={() => setCreateProject(true)} className="h-7 w-7">
                                    <MdAdd className="h-4 w-4 " />
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button size="icon" variant="outline" className="h-7 w-7">
                                    <AiOutlineDelete />
                                </Button>
                            </AlertDialogTrigger>
                            <DeleteOrgModal org={org} mutate={mutate} />
                        </AlertDialog>
                    </div>}
                <Dialog open={createProject} onOpenChange={setCreateProject}>
                    <CreateProjectModal onClose={handleClose} org={org} mutate={mutate} />
                </Dialog>
            </div>

            {org?.projects?.length === 0 && <div className="text-sm text-gray-500 pl-4 py-2">No Projects Found. Click <button className="text-blue-500 underline" onClick={() => setCreateProject(true)}>
                here</button> to add a new project.
            </div>}
            <div className="pl-4">
                {org.projects.map((project => {
                    return (
                        <ProjectCard project={project} org={org} key={project.name} mutate={mutate} />
                    )
                }
                ))}
            </div>
        </div>
    )
}
export interface ProjectCardProps {
    project: ProjectWithBranch
    org: ProjectData
    mutate: KeyedMutator<{
        message: ProjectData[];
    }>

}

export const ProjectCard = ({ project, org, mutate }: ProjectCardProps) => {

    const navigate = useNavigate()

    const [branch, setBranch] = useState<string>(project.branches[0]?.name)

    const onNavigate = () => {
        navigate({
            pathname: `/project-viewer/${branch}`
        })
    }
    const appNameInitials = useMemo(() => {
        return project.display_name.split('_').map((word) => word[0]).join('').toUpperCase()
    }, [project])

    const isCreateAccess = isSystemManager()

    const [open, setOpen] = useState(false)

    const [openManageModal, setOpenManageModal] = useState(false)

    const [selectOpen, setSelectOpen] = useState(false)

    return (
        <li className="w-full h-auto hover:shadow-sm">
            <div className="py-2 flex flex-col justify-between">
                <div className="flex space-x-4 items-center justify-between">
                    <div className="flex flex-col">

                        <div className="flex space-x-3 items-start">
                            <Avatar className="h-11 w-11 rounded-md">
                                <AvatarImage src={project.image} />
                                <AvatarFallback className="h-11 w-11 rounded-md">{appNameInitials}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <div className="flex space-x-2 items-center">
                                    <h1 className="text-lg font-medium tracking-normal">{project.display_name}</h1>
                                    <span className="text-sm text-gray-500">
                                        by
                                    </span>
                                    <h1 className="text-md font-normal tracking-normal">{org.organization_name}</h1>
                                </div>
                                <CardDescription className="text-sm text-gray-500">{project.description}</CardDescription>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Select
                            open={selectOpen}
                            onOpenChange={setSelectOpen}
                            onValueChange={(value) => setBranch(value)}
                            value={branch}
                            defaultValue={project.branches[0]?.name}
                        >
                            <SelectTrigger className="h-8 w-40" onClick={() => setSelectOpen(!selectOpen)}>
                                <SelectValue placeholder="Select Branch" />
                            </SelectTrigger>
                            <SelectContent>
                                {project.branches.map((branch: CommitProjectBranch) => {
                                    return (
                                        <SelectItem value={branch.name} key={branch.name}>{branch.branch_name}</SelectItem>
                                    )
                                })}

                                {isCreateAccess &&
                                    <>
                                    {
                                        project.branches.length > 0 &&
                                        <div className="w-full h-[1px] bg-gray-200 shadow-sm my-1" />}
                                    <Button variant="ghost" className="w-full h-8 font-normal text-sm left-0 flex justify-start pl-1" onClick={() => {
                                        setOpen(true)
                                        setSelectOpen(false)
                                    }}>
                                        <MdAdd className="h-4 w-4 mr-1" />
                                        Add Branch
                                    </Button>

                                    {project.branches.length > 0 &&
                                        <Button
                                            variant="ghost"
                                            className="w-full h-8 font-normal text-sm left-0 flex justify-start pl-1"
                                            onClick={() => {
                                                setOpenManageModal(true)
                                                setSelectOpen(false)
                                            }}>
                                            <RxDragHandleDots1 className="h-4 w-4 mr-1" />
                                            Manage Branches
                                        </Button>}
                                </>
                                }

                            </SelectContent>
                        </Select>

                        <Dialog open={openManageModal} onOpenChange={setOpenManageModal}>
                            <ManageBranchModal branches={project.branches} mutate={mutate} setOpenManageModal={setOpenManageModal} />
                        </Dialog>

                        <Dialog open={open} onOpenChange={setOpen}>
                            <CreateBranchModal setBranch={setBranch} project={project} mutate={mutate} setOpen={setOpen} />
                        </Dialog>


                        <Button size='sm' onClick={onNavigate} disabled={branch ? false : true}>
                            <AiOutlineApi className="mr-2" />
                            API Explorer
                        </Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                <Button size='icon' variant='outline' className="h-8 w-8">
                                        <AiOutlineDelete />
                                    </Button>
                                </AlertDialogTrigger>
                                <DeleteProjectModal project={project} mutate={mutate} />
                        </AlertDialog>
                    </div>
                </div>
            </div >
        </li >
    )
}

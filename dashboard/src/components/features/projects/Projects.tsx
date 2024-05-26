import { FullPageLoader } from "@/components/common/FullPageLoader.tsx/FullPageLoader"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CommitProject } from "@/types/commit/CommitProject"
import { CommitProjectBranch } from "@/types/commit/CommitProjectBranch"
import { AvatarImage } from "@radix-ui/react-avatar"
import { useFrappeEventListener, useFrappeGetCall } from "frappe-react-sdk"
import { useEffect, useMemo, useState } from "react"
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

    const [branchCreation, setBranchCreation] = useState<{ branch_name: string, project: string }[] | null>(null)

    useFrappeEventListener('creating_branch', (data) => {
        console.log("fired")
        setBranchCreation([branchCreation, ...data])
    })

    useFrappeEventListener('branch_created', (data) => {
        console.log("fired2")
        const filtered = branchCreation?.filter((doc) => doc.branch_name !== data.branch_name)
        setBranchCreation(filtered ?? null)
    })

    const isCreateAccess = isSystemManager()

    const { data, error, isLoading, mutate } = useFrappeGetCall<{ message: ProjectData[] }>('commit.api.commit_project.commit_project.get_project_list_with_branches')

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
                                    <Button size='sm'>
                                        <BsDatabase className='mr-2' /> View ERD
                                    </Button>
                                </DialogTrigger>
                                <ViewERDDialogContent data={data.message} />
                            </Dialog>

                            {isCreateAccess && <Dialog>
                                <DialogTrigger asChild>
                                    <Button size='sm'>
                                        <MdAddBox className="mr-2" />
                                        Add Organization
                                    </Button>
                                </DialogTrigger>
                                <CreateOrgModal mutate={mutate} />
                            </Dialog>}


                        </div>
                    </div>
                    <ul role="list" className="space-y-2">
                        {data.message.map((org: ProjectData) => {
                            return <OrgComponent branchCreation={branchCreation} org={org} key={org.organization_name} mutate={mutate} />
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}


export const OrgComponent = ({ org, mutate, branchCreation }: {
    org: ProjectData, mutate: KeyedMutator<{
        message: ProjectData[];
    }>, branchCreation: {
        branch_name: string;
        project: string;
    }[] | null
}) => {

    const isCreateAccess = isSystemManager()

    return (
        <div>

            <div className="flex justify-between items-center py-2 border-b-[1px]">
                <h1 className="text-lg font-medium tracking-normal">
                    {org.organization_name}
                </h1>
                {isCreateAccess &&
                    <div className="flex gap-1">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="icon" className="h-7 w-7">
                                    <MdAdd className="h-4 w-4 " />
                                </Button>
                            </DialogTrigger>
                            <CreateProjectModal org={org} mutate={mutate} />
                        </Dialog>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button size="icon" className="h-7 w-7">
                                    <AiOutlineDelete />
                                </Button>
                            </AlertDialogTrigger>
                            <DeleteOrgModal org={org} mutate={mutate} />
                        </AlertDialog>
                    </div>}
            </div>
            <div className="pl-4">
                {org.projects.map((project => {
                    return (
                        <ProjectCard branchCreation={branchCreation} project={project} org={org} key={project.name} mutate={mutate} />
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
    }>,
    branchCreation: {
        branch_name: string;
        project: string;
    }[] | null

}

export const ProjectCard = ({ project, org, mutate, branchCreation }: ProjectCardProps) => {

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

    const creationBranchName = useMemo(() => {
        const find = branchCreation?.find((doc) => doc.project === project.name)
        if (find) return find.branch_name
        return undefined
    }, [branchCreation, project])

    const isCreateAccess = isSystemManager()

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
                                {creationBranchName &&
                                    <BranchCreationLoadingState branch_name="main" />
                                }
                                {/* <BranchCreationLoadingState branch_name="main" /> */}

                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Select
                            onValueChange={(value) => setBranch(value)}
                            defaultValue={project.branches[0]?.name}
                        >
                            <SelectTrigger className="h-8 w-40">
                                <SelectValue placeholder="Select Branch" />
                            </SelectTrigger>
                            <SelectContent >
                                {project.branches.map((branch: CommitProjectBranch) => {
                                    return (
                                        <SelectItem value={branch.name} key={branch.name}>{branch.branch_name}</SelectItem>
                                    )
                                })}
                                {
                                    project.branches.length > 0 && isCreateAccess &&
                                    <div className="w-full h-[1px] bg-gray-200 shadow-sm my-1">

                                    </div>
                                }

                                {isCreateAccess && <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" className="w-full h-8 font-normal text-sm left-0 flex justify-start pl-1">
                                            <MdAdd className="h-4 w-4 mr-1" />
                                            Add Branch
                                        </Button>
                                    </DialogTrigger>
                                    <CreateBranchModal setBranch={setBranch} project={project} mutate={mutate} />
                                </Dialog>}

                                {isCreateAccess && <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" className="w-full h-8 font-normal text-sm left-0 flex justify-start pl-1">
                                            <RxDragHandleDots1 className="h-4 w-4 mr-1" />
                                            Manage Branches
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        Manage Branch Modal..
                                    </DialogContent>
                                </Dialog>}

                            </SelectContent>
                        </Select>

                        <Button size='sm' onClick={onNavigate}>
                            <AiOutlineApi className="mr-2" />
                            API Explorer
                        </Button>
                    </div>
                </div>
            </div >
        </li >
    )
}


const BranchCreationLoadingState = ({ branch_name }: { branch_name: string }) => {

    const [currentLoadingText, setCurrentLoadingText] = useState<string>("")
    const loadingTexts = [
        "May the forks be with you...",
        "A commit a day keeps the mobs away...",
        "Tickling the servers...",
        "Why so serious?...",
        "It's not you. It's me...",
        "Counting backwards from Infinity...",
        "Don't panic...",
        "Don't break your screen yet!...",
        "I swear it's almost done...",
        "Let's take a mindfulness minute...",
    ]

    useEffect(() => {
        const changeInterval = setInterval(() => setCurrentLoadingText(loadingTexts[Math.floor(Math.random() * 10)]), 3000)

        return () => {
            clearInterval(changeInterval);
        }
    }, [])

    return (
        <div className="flex space-x-2 items-center ">
            <div
                className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-solid border-current text-gray-500 border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                role="status">
            </div>
            <div className="text-sm text-gray-500">
                {currentLoadingText}
                {'Loading branch '}
                <b>{branch_name}</b>
            </div>
        </div>
    )
}

export default BranchCreationLoadingState


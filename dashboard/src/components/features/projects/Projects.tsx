import { FullPageLoader } from "@/components/common/FullPageLoader.tsx/FullPageLoader"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CardDescription } from "@/components/ui/card"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CommitProject } from "@/types/commit/CommitProject"
import { CommitProjectBranch } from "@/types/commit/CommitProjectBranch"
import { AvatarImage } from "@radix-ui/react-avatar"
import { useFrappeGetCall } from "frappe-react-sdk"
import { useMemo, useState } from "react"
import { AiOutlineApi } from "react-icons/ai"
import { BsDatabase } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { ViewERDDialogContent } from "./ViewERDAppDialog"
import { MdAddBox } from "react-icons/md";

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

    const { data, error, isLoading } = useFrappeGetCall<{ message: ProjectData[] }>('commit.api.commit_project.commit_project.get_project_list_with_branches')

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
                    <div className="flex flex-row items-center space-x-2 gap-2 justify-between">
                        <h1 className="scroll-m-20 text-2xl font-semibold tracking-normal">
                            Organizations
                        </h1>
                        <div className="flex gap-2">

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size='sm'>
                                    <BsDatabase className='mr-2' /> View ERD
                                </Button>
                            </DialogTrigger>
                            <ViewERDDialogContent data={data.message} />
                        </Dialog>
                        <Button size='sm'>
                            <MdAddBox className="mr-2"/>
                            Add Organization
                        </Button>
                        </div>
                    </div>
                    <ul role="list" className="divide-y divide-gray-200">
                        {data.message.map((org: ProjectData) => {
                            return org.projects.map((project => {
                                return (
                                    <ProjectCard project={project} org={org} key={project.name} />
                                )
                            }
                            ))
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}
export interface ProjectCardProps {
    project: ProjectWithBranch
    org: ProjectData
}

export const ProjectCard = ({ project, org }: ProjectCardProps) => {

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
    return (
        <li className="w-full h-auto hover:shadow-sm">
            <div className="py-4 flex flex-col justify-between">
                <div className="flex space-x-4 items-center justify-between">
                    <div className="flex space-x-3 items-center">
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

                    <div className="flex items-center space-x-4">
                        <Select
                            onValueChange={(value) => setBranch(value)}
                            defaultValue={project.branches[0]?.name}
                        >
                            <SelectTrigger className="h-8 w-40">
                                <SelectValue placeholder="Select Branch" />
                            </SelectTrigger>
                            <SelectContent>
                                {project.branches.map((branch: CommitProjectBranch) => {
                                    return (
                                        <SelectItem value={branch.name} key={branch.name}>{branch.branch_name}</SelectItem>
                                    )
                                })}
                            </SelectContent>
                        </Select>

                        <Button size='sm' onClick={onNavigate}>
                            <AiOutlineApi className="mr-2" />
                            API Explorer
                        </Button>
                        {/* <Button size='sm' onClick={() => {
                            navigate({
                                pathname: `/project-erd/${branch}`
                            })
                        }}>
                            <BsDatabase className='mr-2' /> View ERD
                        </Button> */}
                    </div>
                </div>
            </div >
        </li >
    )
}
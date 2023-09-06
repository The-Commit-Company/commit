import { FullPageLoader } from "@/components/common/FullPageLoader.tsx/FullPageLoader"
import { Button } from "@/components/ui/button"
import { CardDescription, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CommitProject } from "@/types/commit/CommitProject"
import { CommitProjectBranch } from "@/types/commit/CommitProjectBranch"
import { useFrappeGetCall } from "frappe-react-sdk"
import { useState } from "react"
import { AiOutlineApi } from "react-icons/ai"
import { BsDatabase } from "react-icons/bs"
import { useNavigate } from "react-router-dom"

export interface ProjectWithBranch extends CommitProject {
    branches: CommitProjectBranch[]
}
export interface ProjectData extends CommitProjectBranch {
    projects: ProjectWithBranch[]

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
            <div className="mx-auto  p-4 h-[calc(100vh-4rem)]">
                <div className="h-full p-2 space-y-4">
                    <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Projects
                    </h1>
                    <ul role="list" className="divide-y divide-gray-200">
                        {data.message.map((org: ProjectData) => {
                            return org.projects.map((project => {
                                return (
                                    <ProjectCard project={project} key={project.name} />
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
}

export const ProjectCard = ({ project }: ProjectCardProps) => {

    const navigate = useNavigate()

    const [branch, setBranch] = useState<string>(project.branches[0].name)

    const onNavigate = () => {
        navigate({
            pathname: `/viewer/${branch}`
        })
    }

    return (
        <li className="w-full h-auto hover:shadow-sm">
            <div className="py-4 flex flex-col justify-between">
                <div className="flex space-x-4 items-center justify-between">
                    <div className="flex space-x-3 items-center">
                        <img
                            className="inline-block h-12 w-12 rounded-md"
                            src={project.image}
                            alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmrN1Q7oEaS4Z_oUmK8UVYtRZW5ijuqKuvAEX4U2xZt_Jz2sThi8ihE9uSgwzKjifPed8&usqp=CAU"
                        />
                        <div className="flex flex-col">
                            <CardTitle className="text-xl font-medium">{project.display_name}</CardTitle>
                            <CardDescription className="text-md text-gray-500">{project.description}</CardDescription>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Select
                            onValueChange={(value) => setBranch(value)}
                            defaultValue={project.branches[0].name}
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
                        <Button size='sm'>
                            <BsDatabase className='mr-2' /> View ERD
                        </Button>
                    </div>
                </div>
            </div>
        </li>
    )
}
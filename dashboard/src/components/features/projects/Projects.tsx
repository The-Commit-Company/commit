import { FullPageLoader } from "@/components/common/FullPageLoader.tsx/FullPageLoader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CommitProject } from "@/types/commit/CommitProject"
import { CommitProjectBranch } from "@/types/commit/CommitProjectBranch"
import { useFrappeGetCall } from "frappe-react-sdk"
import { useState } from "react"
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
            <div className="mx-auto bg-gray-50 p-4 h-[calc(100vh-109px)]">
                <div className="border-2 border-gray-100 rounded-md bg-white h-full">
                    <div className="p-4 flex justify-around items-center h-full space-x-4">
                        {data.message.map((org: ProjectData) => {
                            return (
                                <OrganizationCard org={org} key={org.name} />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
    return null
}

export const OrganizationCard = ({ org }: { org: ProjectData }) => {

    return (
        <div>
            <div className="text-center text-gray-500">{org.name}</div>
            <div className="flex flex-col space-y-2">
                {org.projects.map((project: ProjectWithBranch) => {
                    return (
                        <ProjectCard project={project} key={project.name} />
                    )
                })}
            </div>
        </div>
    )

}

export interface ProjectCardProps {
    project: ProjectWithBranch
}

export const ProjectCard = ({ project }: ProjectCardProps) => {

    const navigate = useNavigate()

    const [branch, setBranch] = useState<string>('' as string)

    const onNavigate = () => {
        navigate({
            pathname: `/viewer/${branch}`
        })
    }
    return (
        <Card className="w-[340px] h-auto hover:shadow-lg">
            <div className="w-full h-[200px] bg-gray-100 rounded-md">
                <img src={project.banner_image} alt=""
                    className="w-full h-full object-cover rounded-md hover:opacity-80 transition-all duration-300 ease-in-out" />
            </div>
            <CardHeader className="p-3">
                <div className="flex space-x-2 items-center">
                    <img
                        className="inline-block h-10 w-10 rounded-md"
                        src={project.image}
                        alt=""
                    />
                    <div className="flex flex-col">
                        <CardTitle className="text-md font-semibold">{project.app_name}</CardTitle>
                        <CardDescription className="text-sm text-gray-500">{project.description}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-3">
                <Select onValueChange={(value) => setBranch(value)}>
                    <SelectTrigger className="h-[26px] w-auto">
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

                <div className="flex items-center justify-between mt-2">
                    <button disabled={!branch} onClick={onNavigate} type="button" className="py-1 px-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-indigo-400 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm">
                        API Viewer
                    </button>
                    <button type="button" className="py-1 px-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-indigo-400 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm">
                        View ERD
                    </button>

                </div>
            </CardContent>
        </Card>
    )
}
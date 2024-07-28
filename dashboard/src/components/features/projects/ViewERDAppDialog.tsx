import { Button } from "@/components/ui/button"
import { DialogHeader, DialogFooter, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ProjectData, ProjectWithBranch } from "./Projects"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CommitProjectBranch } from "@/types/commit/CommitProjectBranch"

export const ViewERDDialogContent = ({ data }: { data: ProjectData[] }) => {

    const [apps, setApps] = useState<string[]>([])

    const navigate = useNavigate()

    const onViewERD = () => {
        window.sessionStorage.removeItem('ERDDoctypes')
        navigate('/project-erd', {
            state: {
                apps: apps
            }
        })
    }

    return (
        <DialogContent className="p-4 px-6">
            <DialogHeader>
                <DialogTitle>Select Apps</DialogTitle>
                <DialogDescription>
                    Select the apps to view ERD
                </DialogDescription>
            </DialogHeader>
            <ul role="list" className="divide-y divide-gray-200 max-h-[60vh] overflow-y-scroll">
                {data?.map((org: ProjectData) => {
                    return org.projects?.filter((project) => project.branches?.length > 0)?.map((project => {
                        return (
                            <ViewERDProjectCard project={project} key={project.name} setApps={setApps} apps={apps} />
                        )
                    }
                    ))
                })}
            </ul>
            <DialogFooter>
                <Button onClick={onViewERD}>View ERD</Button>
            </DialogFooter>
        </DialogContent>
    )
}

export interface ViewERDProjectCardProps {
    project: ProjectWithBranch
    setApps: (apps: string[]) => void
    apps: string[]
}

export const ViewERDProjectCard = ({ project, apps, setApps }: ViewERDProjectCardProps) => {

    const [branch, setBranch] = useState<string>(project.branches[0]?.name)

    return (
        <li className="w-full h-auto hover:shadow-sm px-2">
            <div className="flex items-center justify-between py-2 w-full">
                <div className="flex space-x-3 items-center">
                    <Checkbox
                            checked={apps.includes(branch)}
                            className="border-gray-300 text-gray-600 shadow-sm"
                            onCheckedChange={(checked) => {
                                if (checked) {
                                    setApps([...apps, branch])
                                } else {
                                    setApps(apps.filter((app) => app !== branch))
                                }
                            }}
                        />
                    <h1 className="text-lg font-medium tracking-normal">{project.display_name}</h1>
                </div>
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
            </div>
        </li >)
}


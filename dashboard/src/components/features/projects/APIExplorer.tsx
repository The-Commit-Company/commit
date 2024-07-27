import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader"
import { Button } from "@/components/ui/button"
import { useFrappeGetCall } from "frappe-react-sdk"
import { ProjectData, ProjectWithBranch } from "./Projects"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AiOutlineApi } from "react-icons/ai"
import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CommitProjectBranch } from "@/types/commit/CommitProjectBranch"
import { Label } from "@/components/ui/label"

export const APIExplorer = () => {
    const { data, error, isLoading } = useFrappeGetCall<{ message: ProjectData[] }>('commit.api.commit_project.commit_project.get_project_list_with_branches', {}, 'get_project_list_with_branches', {
        keepPreviousData: true,
        revalidateOnFocus: true,
        revalidateIfStale: false,
    })

    if (error) {
        return <div>Error</div>
    }

    if (isLoading) {
        return <FullPageLoader />
    }

    if (data && data.message) {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button size='sm' disabled={data.message?.length === 0} variant={'outline'}>
                        <AiOutlineApi className="mr-2" />
                        API Explorer
                    </Button>
                </DialogTrigger>
                <ViewAPIExplorerContent data={data.message} />
            </Dialog>
        )
    }
    return null
}

export const ViewAPIExplorerContent = ({ data }: { data: ProjectData[] }) => {

    const [branch, setBranch] = useState<string>(data?.[0]?.projects?.[0]?.branches?.[0]?.name)

    const navigate = useNavigate()

    const onNavigate = useCallback(() => {
        navigate({
            pathname: `/project-viewer/${branch}`
        })
    }, [branch, navigate])

    return (
        <DialogContent className="p-4 px-6">
            <DialogHeader>
                <DialogTitle>Select Apps</DialogTitle>
                <DialogDescription>
                    Select the apps to view API's
                </DialogDescription>
            </DialogHeader>
            <RadioGroup defaultValue={branch} onValueChange={(value) => setBranch(value)} className="flex flex-col space-y-1" >
                <ul role="list" className="divide-y divide-gray-200 max-h-[60vh] overflow-y-scroll">
                    {data?.map((org: ProjectData) => {
                        return org.projects?.filter((project) => project.branches?.length > 0)?.map((project => {
                            return (
                                <ViewAPIExplorerCard project={project} key={project.name} />
                            )
                        }
                        ))
                    })}
                </ul>
            </RadioGroup>
            <DialogFooter>
                <Button onClick={onNavigate} disabled={branch?.length === 0}>
                    API Explorer
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}

export interface ViewERDProjectCardProps {
    project: ProjectWithBranch
}

export const ViewAPIExplorerCard = ({ project }: ViewERDProjectCardProps) => {

    const [branch, setBranch] = useState<string>(project.branches[0]?.name)

    return (
        <li className="w-full px-2">
            <div className="flex items-center justify-between py-2 w-full">
                <div className="flex space-x-3 items-center">
                    <RadioGroupItem value={branch} key={branch} id={`${project.name}-${branch}`} />
                    <Label htmlFor={`${project.name}-${branch}`} className="flex items-center space-x-3">
                        <h1 className="text-lg font-medium tracking-normal" >{project.display_name}</h1>
                    </Label>
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


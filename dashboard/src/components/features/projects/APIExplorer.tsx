import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader"
import { Button } from "@/components/ui/button"
import { useFrappeGetCall } from "frappe-react-sdk"
import { ProjectData, ProjectWithBranch } from "./Projects"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CommitProjectBranch } from "@/types/commit/CommitProjectBranch"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import api from '../../../assets/api.svg'
import { ChevronRight } from "lucide-react"

export const APIExplorer = () => {
    const { data, error, isLoading } = useFrappeGetCall<{ message: ProjectData[] }>('commit.api.commit_project.commit_project.get_project_list_with_branches', {}, 'get_project_list_with_branches', {
        keepPreviousData: true,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })

    if (error) {
        return <div>Error</div>
    }

    if (isLoading) {
        return <FullPageLoader />
    }

    if (data && data.message) {
        return (
            <Card className="flex flex-col sm:flex-row items-start p-2 border rounded-lg w-full h-full shadow-sm bg-white relative">
                <div className="flex-grow h-full">
                    <CardHeader className="pb-4">
                        <CardTitle>Explore your API's and Bench Commands</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-gray-500 sm:mb-8">
                            Effortlessly explore and interact with your whitelisted API's and Bench commands using our API Explorer. 
                        </div>
                    </CardContent>

                    <CardFooter className="absolute bottom-0">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size='sm' disabled={data.message?.length === 0} className="rounded-full px-4 pr-2 py-2 shadow-md">
                                    Get Started
                                    <ChevronRight size={14} className="ml-2 mr-0 p-0" />
                                </Button>
                            </DialogTrigger>
                            <ViewAPIExplorerContent data={data.message} />
                        </Dialog>
                    </CardFooter>
                </div>
                <div className="flex-shrink-0 sm:mb-0 mb-16 p-4 sm:p-0 items-center justify-center">
                    <img src={api} alt="API" height={'full'} className="w-full rounded-md sm:w-[170px] sm:mr-6 sm:rounded-md" />
                </div>
            </Card>
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
        <DialogContent className="p-6 w-[90vw] sm:w-full overflow-hidden">
            <DialogHeader className="text-left">
                <DialogTitle>Select App</DialogTitle>
                <DialogDescription>
                    Select the app to view API's
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
                    <Label htmlFor={`${project.name}-${branch}`} className="flex items-center space-x-3">
                        <RadioGroupItem value={branch} key={branch} id={`${project.name}-${branch}`} />
                        <h1 className="text-[16px] font-medium tracking-normal cursor-pointer" >{project.display_name}</h1>
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


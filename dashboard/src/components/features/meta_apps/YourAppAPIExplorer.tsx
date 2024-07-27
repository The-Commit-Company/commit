import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader"
import { useFrappeGetCall } from "frappe-react-sdk"
import { useNavigate } from "react-router-dom"
import { AppsData } from "./YourApps"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AiOutlineApi } from "react-icons/ai"
import { useCallback, useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const YourAppAPIExplorer = () => {

    const { data, error, isLoading } = useFrappeGetCall<{ message: AppsData[] }>('commit.api.meta_data.get_installed_apps', {}, 'get_installed_apps', {
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
                    <Button size='sm' disabled={data.message.length === 0} variant={'outline'}>
                        <AiOutlineApi className="mr-2" />
                        API Explorer
                    </Button>
                </DialogTrigger>
                <ViewAPIExplorerContent data={data.message} />
            </Dialog>
        )
    }
}

export const ViewAPIExplorerContent = ({ data }: { data: AppsData[] }) => {

    const [branch, setBranch] = useState<string>(data?.[0]?.app_name)

    const navigate = useNavigate()

    const onNavigate = useCallback(() => {
        navigate({
            pathname: `/meta-viewer/${branch}`
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
                    {data?.map((app: AppsData) => {
                        return (
                            <ViewAPIExplorerCard app={app} key={app.app_name} />
                        )
                    })}
                </ul>
            </RadioGroup>
            <DialogFooter>
                <Button onClick={onNavigate} disabled={branch.length === 0}>
                    API Explorer
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}

export interface ViewAPIExplorerProps {
    app: AppsData
}

export const ViewAPIExplorerCard = ({ app }: ViewAPIExplorerProps) => {

    return (
        <li className="w-full px-2">
            <div className="flex items-center justify-between py-2 w-full">
                <div className="flex space-x-3 items-center">
                    <RadioGroupItem value={app.app_name} key={app.app_name} id={`${app.app_name}`} />
                    <Label htmlFor={`${app.app_name}`} className="flex items-center space-x-3">
                        <h1 className="text-lg font-medium tracking-normal" >{app.app_name}</h1>
                    </Label>
                </div>
                <Select
                    disabled
                    defaultValue={app.git_branch}
                >
                    <SelectTrigger className="h-8 w-40 truncate">
                        <SelectValue placeholder="Select Branch" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={app.git_branch ?? ''} key={app.git_branch} >{app.git_branch}</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </li >)
}
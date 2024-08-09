import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader"
import { useFrappeGetCall } from "frappe-react-sdk"
import { useNavigate } from "react-router-dom"
import { AppsData } from "./YourApps"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useCallback, useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { MdKeyboardArrowRight } from "react-icons/md"
import api from '../../../assets/api.svg'

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
            <Card className="flex flex-col sm:flex-row items-start p-2 border rounded-lg w-full h-full shadow-sm bg-white relative">
                <div className="flex-grow h-full">
                    <CardHeader className="pb-4">
                        <CardTitle>Explore your API's</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-gray-500 sm:mb-8">
                            Explore and interact with your site installed apps whitelisted API's effortlessly
                            using our API Explorer.
                        </div>
                    </CardContent>

                    <CardFooter className="absolute bottom-0">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size='sm' disabled={data.message?.length === 0} className="rounded-full px-4 pr-2 py-2 shadow-md">
                                    Get Started
                                    <MdKeyboardArrowRight className="ml-2 mr-0 p-0" style={{
                                        fontSize: '1rem'
                                    }} />
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
        <DialogContent className="p-6">
            <DialogHeader>
                <DialogTitle>Select App</DialogTitle>
                <DialogDescription>
                    Select the app to view API's
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
                    <Label htmlFor={`${app.app_name}`} className="flex items-center space-x-3">
                        <RadioGroupItem value={app.app_name} key={app.app_name} id={`${app.app_name}`} />
                        <h1 className="text-[16px] font-medium tracking-normal cursor-pointer" >{app.app_name}</h1>
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
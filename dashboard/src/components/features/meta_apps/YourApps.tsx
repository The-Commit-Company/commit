import { FullPageLoader } from "@/components/common/FullPageLoader.tsx/FullPageLoader"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AvatarImage } from "@radix-ui/react-avatar"
import { useFrappeGetCall } from "frappe-react-sdk"
import { useMemo } from "react"
import { AiOutlineApi } from "react-icons/ai"
import { BsDatabase } from "react-icons/bs"
import { useNavigate } from "react-router-dom"

export interface AppsData {
    app_name: string
    app_publisher?: string
    app_description?: string
    app_logo_url?: string
    app_version?: string
    git_branch?: string
}

export const YourApps = () => {
    const navigate = useNavigate()

    const { data, error, isLoading } = useFrappeGetCall<{ message: AppsData[] }>('commit.api.meta_data.get_installed_apps')

    if (error) {
        return <div>Error</div>
    }

    if (isLoading) {
        return <FullPageLoader />
    }

    if (data && data.message) {
        return (
            <div className="mx-auto px-4 h-[calc(100vh-4rem)]">
                <div className="flex flex-row items-center space-x-2 gap-2 justify-between">
                    <h1 className="scroll-m-20 text-2xl font-semibold tracking-normal">
                    </h1>
                    <Button size='sm' onClick={() => {
                        navigate({
                            pathname: `/meta-erd/create`,
                        })
                    }}>
                        <BsDatabase className='mr-2' /> View ERD
                    </Button>
                </div>
                <div className="h-full space-y-">
                    <ul role="list" className="divide-y divide-gray-200">
                        {data.message.map((app: AppsData) => {
                            return <ProjectCard key={app.app_name} app={app} />
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}


export const ProjectCard = ({ app }: { app: AppsData }) => {

    const navigate = useNavigate()

    const onNavigate = () => {
        navigate({
            pathname: `/meta-viewer/${app.app_name}`
        })
    }

    const appNameInitials = useMemo(() => {
        return app.app_name.split('_').map((word) => word[0]).join('').toUpperCase()
    }, [app])

    return (
        <li className="w-full h-auto hover:shadow-sm">
            <div className="py-4 flex flex-col justify-between">
                <div className="flex space-x-4 items-center justify-between">
                    <div className="flex space-x-3 items-center">
                        <Avatar className="h-11 w-11 rounded-md">
                            <AvatarImage src={app.app_logo_url} />
                            <AvatarFallback className="h-11 w-11 rounded-md">{appNameInitials}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <div className="flex space-x-2 items-center">
                                <h1 className="text-lg font-medium tracking-normal">{app.app_name}</h1>
                                <span className="text-sm text-gray-500">
                                    by
                                </span>
                                <h1 className="text-md font-normal tracking-normal">{app.app_publisher}</h1>
                            </div>
                            <CardDescription className="text-sm text-gray-500">{app.app_description}</CardDescription>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
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
import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { AvatarImage } from "@radix-ui/react-avatar"
import { useFrappeGetCall } from "frappe-react-sdk"
import { useMemo } from "react"
import { BsDatabase } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { YourAppAPIExplorer } from "./YourAppAPIExplorer"

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
            <div className="mx-auto pl-2 pr-4 h-[calc(100vh-4rem)]">
                <div className="flex flex-row items-center space-x-2 gap-2 justify-end">

                    <div className="flex items-center space-x-2">
                        <YourAppAPIExplorer />
                        <Button size='sm' onClick={() => {
                            navigate({
                                pathname: `/meta-erd/create`,
                            })
                        }}>
                            <BsDatabase className='mr-2' /> View ERD
                        </Button>
                    </div>
                </div>
                <div className="flex gap-4 flex-wrap py-4">
                    {data.message.map((app: AppsData) => {
                        return <AppsCard key={app.app_name} app={app} />
                    })}
                </div>
            </div>
        )
    }
}


const AppsCard = ({ app }: { app: AppsData }) => {

    const appNameInitials = useMemo(() => {
        return app.app_name.split('_').map((word) => word[0]).join('').toUpperCase()
    }, [app])

    return (
        <Card className="w-[31.5vw]">
            <CardContent className="p-4 flex flex-row items-start gap-4">
                <Avatar className="h-24 w-24 flex items-center rounded-md border border-gray-100">
                    <AvatarImage src={app.app_logo_url} />
                    <AvatarFallback className="rounded-md text-4xl">
                        {appNameInitials}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-between w-full gap-2">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex flex-col">
                            <CardTitle className="text-xl">{app.app_name}</CardTitle>
                            <div className="text-xs">
                                by {app.app_publisher}
                            </div>
                        </div>
                    </div>
                    <CardDescription>
                        {app.app_description}
                    </CardDescription>
                </div>
            </CardContent>
        </Card>
    )
}
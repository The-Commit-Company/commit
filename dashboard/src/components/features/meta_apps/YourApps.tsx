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
                            window.sessionStorage.removeItem('ERDMetaDoctypes')
                            navigate({
                                pathname: `/meta-erd/create`,
                            })
                        }}>
                            <BsDatabase className='mr-2' /> View ERD
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4 py-4">
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
        <Card>
            <CardContent className="flex flex-col gap-4 items-start p-4">
                <div className="w-full flex items-center justify-center">
                    <Avatar className="h-32 w-32 flex items-center rounded-xl border border-gray-100">
                        <AvatarImage src={app.app_logo_url} className="object-contain h-full w-full" />
                        <AvatarFallback className="rounded-xl  text-4xl">{appNameInitials}</AvatarFallback>
                </Avatar>
                </div>
                <div className="flex flex-col gap-2 w-full">
                <div className=" flex flex-col gap-1">
                    <CardTitle>{app.app_name}</CardTitle>
                    <div className="text-xs text-gray-500">
                            {app.app_publisher}
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
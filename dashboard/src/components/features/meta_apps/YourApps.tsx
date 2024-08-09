import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { useFrappeGetCall } from "frappe-react-sdk"
import { useMemo } from "react"
import { YourAppAPIExplorer } from "./YourAppAPIExplorer"
import { ViewERDButtonForSiteApps } from "../projects/ViewERDButton"

export interface AppsData {
    app_name: string
    app_publisher?: string
    app_description?: string
    app_logo_url?: string
    app_version?: string
    git_branch?: string
}

export const YourApps = () => {

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
            <div className="mx-auto pl-2 pr-4 h-full overflow-y-auto pt-2">
                <div className="h-full flex flex-col gap-4">
                    <div className="grid grid-cols-1 gap-6 justify-between sm:grid-cols-2">
                        <ViewERDButtonForSiteApps />
                        <YourAppAPIExplorer />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row items-end justify-between border-b pb-2">
                            <div className="text-xl font-semibold pt-1">Projects</div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-x-8 pb-4">
                            {data.message.map((org: AppsData) => {
                                return (
                                    <AppsCard app={org} key={org.app_name} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const AppsCard = ({ app }: { app: AppsData }) => {
    const appNameInitials = useMemo(() => {
        return app.app_name.split('_').map((word) => word[0]).join('').toUpperCase();
    }, [app]);

    return (
        <div className="flex items-start border-b relative hover:bg-gray-100 p-4">
            <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10 flex items-center rounded-lg">
                    <AvatarImage src={app.app_logo_url} className="object-contain h-full w-full" />
                    <AvatarFallback className="rounded-lg text-xl">{appNameInitials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 cursor-default">
                    <div className="text-base font-semibold">{app.app_name}</div>
                    <div className="text-sm text-gray-500 pb-4">
                        {app.app_description}
                    </div>
                    <div className="text-xs absolute bottom-2 text-gray-400">{app.app_publisher}</div>
                </div>
            </div>
        </div>
    );
};
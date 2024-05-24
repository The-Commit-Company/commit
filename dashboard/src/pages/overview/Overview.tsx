import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner"
import { FullPageLoader } from "@/components/common/FullPageLoader.tsx/FullPageLoader"
import { Header } from "@/components/common/Header"
import { YourApps } from "@/components/features/meta_apps/YourApps"
import { Projects } from "@/components/features/projects/Projects"
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs"
import { CommitSettings } from "@/types/commit/CommitSettings"
import { useFrappeGetDoc } from "frappe-react-sdk"


export const Overview = () => {
    const { data, error, isLoading } = useFrappeGetDoc<CommitSettings>('Commit Settings', 'Commit Settings', undefined, {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        keepPreviousData: true
    })

    return (
        <div className="h-screen flex flex-col gap-2 space-x-2">
            <Header />
            {error && <ErrorBanner error={error} />}
            {isLoading && <FullPageLoader />}
            {data?.show_system_apps ? <Tabs defaultValue="projects" className="h-full">
                <TabsList className="grid grid-cols-2 w-[400px]">
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="your-apps">Your Apps</TabsTrigger>
                </TabsList>
                <TabsContent value="projects">
                    <Projects />
                </TabsContent>
                <TabsContent value="your-apps">
                    <YourApps />
                </TabsContent>
            </Tabs> : <Projects />}
        </div>
    )
}
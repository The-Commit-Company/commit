import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader"
import { Header } from "@/components/common/Header"
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs"
import { isSystemAppAvailable } from "@/utils/roles"
import { lazy, Suspense } from "react"

const Projects = lazy(() => import('@/components/features/projects/Projects'))
const YourApps = lazy(() => import('@/components/features/meta_apps/YourApps'))
const Overview = () => {
    const areAppsAvailable = isSystemAppAvailable()

    return (
        <div className="h-screen flex flex-col gap-2 space-x-2">
            <Header />
            {areAppsAvailable ? <Tabs defaultValue="projects" className="h-full px-2">
                <TabsList className="grid grid-cols-2 w-[400px]">
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="your-apps">Site Apps</TabsTrigger>
                </TabsList>
                <TabsContent value="projects">
                    <Suspense fallback={<FullPageLoader />}>
                        <Projects />
                    </Suspense>
                </TabsContent>
                <TabsContent value="your-apps">
                    <Suspense fallback={<FullPageLoader />}>
                        <YourApps />
                    </Suspense>
                </TabsContent>
            </Tabs> : <Suspense fallback={<FullPageLoader />}>
                <Projects />
            </Suspense>}
        </div>
    )
}
export default Overview
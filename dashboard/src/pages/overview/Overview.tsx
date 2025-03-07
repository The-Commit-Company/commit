import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader"
import { Header } from "@/components/common/Header"
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs"
import { isSystemAppAvailable, isSystemManager } from "@/utils/roles"
import { lazy, Suspense } from "react"
import CommitDocsList from "../features/docs/LandingPage/CommitDocsList"

const Projects = lazy(() => import('@/components/features/projects/Projects'))
const YourApps = lazy(() => import('@/components/features/meta_apps/YourApps'))
const Overview = () => {
    const areAppsAvailable = isSystemAppAvailable()
    const isCreateAccess = isSystemManager();


    return (
        <div className="h-screen flex flex-col gap-2 space-x-2">
            <Header />
            <Tabs defaultValue="projects" className="h-full px-2">
                <TabsList className="grid grid-cols-3 w-fit gap-8">
                    <TabsTrigger value="projects" className="px-8">Projects</TabsTrigger>
                    {areAppsAvailable && <TabsTrigger value="your-apps" className="px-8">Site Apps</TabsTrigger>}
                    {isCreateAccess && <TabsTrigger value="docs" className="px-8">Docs</TabsTrigger>}
                </TabsList>
                <TabsContent value="projects">
                    <Suspense fallback={<FullPageLoader />}>
                        <Projects />
                    </Suspense>
                </TabsContent>
                {areAppsAvailable && <TabsContent value="your-apps">
                    <Suspense fallback={<FullPageLoader />}>
                        <YourApps />
                    </Suspense>
                </TabsContent>}
                {isCreateAccess && <TabsContent value="docs">
                    <Suspense fallback={<FullPageLoader />}>
                        <CommitDocsList />
                    </Suspense>
                </TabsContent>}
            </Tabs>
        </div>
    )
}
export default Overview
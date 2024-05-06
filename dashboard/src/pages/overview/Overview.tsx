import { Header } from "@/components/common/Header"
import { YourApps } from "@/components/features/meta_apps/YourApps"
import { Projects } from "@/components/features/projects/Projects"
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs"



export const Overview = () => {

    return (
        <div className="h-screen flex flex-col gap-2 space-x-2">
            <Header />
            <Tabs defaultValue="projects" className="h-full">
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
            </Tabs>
        </div>
    )
}
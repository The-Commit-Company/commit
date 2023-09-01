import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const Projects = () => {
    return (
        <div className="mx-auto bg-gray-50 p-4 h-[calc(100vh-109px)]">
            <div className="border-2 border-gray-100 rounded-md bg-white h-full">
                <div className="p-4 flex justify-around items-center h-full space-x-4">
                    {[...Array(4)].map(() => (
                        <ProjectCard />
                    ))}
                </div>
            </div>
        </div>
    )
}


export const ProjectCard = () => {
    return (
        <Card className="w-[340px] h-auto hover:shadow-lg">
            <div className="w-full h-[200px] bg-gray-100 rounded-md">
                <img src="https://images.unsplash.com/photo-1619761216693-a6d9e26a1ea0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2254&q=80" alt=""
                    className="w-full h-full object-cover rounded-md hover:opacity-80 transition-all duration-300 ease-in-out" />
            </div>
            <CardHeader className="p-3">
                <div className="flex space-x-2 items-center">
                    <img
                        className="inline-block h-10 w-10 rounded-md"
                        src="https://frappecloud.com/files/erpnext-blue-bg.png"
                        alt=""
                    />
                    <div className="flex flex-col">
                        <CardTitle className="text-md font-semibold">ERPNext</CardTitle>
                        <CardDescription className="text-sm text-gray-500">Open Source ERP built for the web</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-3">
                <Select>
                    <SelectTrigger className="h-[26px] w-auto">
                        <SelectValue placeholder="Select Branch" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="main">main</SelectItem>
                        <SelectItem value="develop">develop</SelectItem>
                        <SelectItem value="1">Branch 1</SelectItem>
                        <SelectItem value="2">Branch 2</SelectItem>
                        <SelectItem value="3">Branch 3</SelectItem>
                    </SelectContent>
                </Select>

                <div className="flex items-center justify-between mt-3">
                    <button type="button" className="py-1 px-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-indigo-400 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm">
                        API Viewer
                    </button>
                    <button type="button" className="py-1 px-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-indigo-400 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm">
                        View ERD
                    </button>
                    <button type="button" className="py-1 px-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-indigo-400 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm">
                        Other
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ViewERDDialogContent } from "./ViewERDAppDialog";
import { ProjectData } from "./Projects";
import { useNavigate } from "react-router-dom";
import erd from '../../../assets/erd.svg'
import { ChevronRight } from "lucide-react";

export const ViewERDButton = ({ data }: { data: ProjectData[] }) => {
    return (
        <Card className="flex flex-col sm:flex-row items-center p-2 border rounded-lg w-full h-full shadow-sm bg-white relative">
            <div className="flex-grow h-full">
                <CardHeader className="pb-4">
                    <CardTitle>Visualize your database</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-sm text-gray-500 sm:mb-8">Analyze and understand the relationships between your doctypes with an interactive Entity Relationship Diagram (ERD).</div>
                </CardContent>
                <CardFooter className="absolute bottom-0">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                size="sm"
                                disabled={data.length === 0}
                                className="rounded-full px-4 pr-2 py-2 shadow-md"
                            >
                                Get Started
                                <ChevronRight size={14} className="ml-2 mr-0 p-0" />
                            </Button>
                        </DialogTrigger>
                        <ViewERDDialogContent data={data} />
                    </Dialog>
                </CardFooter>
            </div>
            <div className="flex-shrink-0 sm:mb-0 mb-16 p-4 sm:p-0">
                <img src={erd} alt="ERD Diagram" height={'full'} className="w-full rounded-md sm:w-[180px] sm:mr-6 sm:rounded-md" />
            </div>
        </Card>
    );
};

export const ViewERDButtonForSiteApps = () => {

    const navigate = useNavigate()

    return (
        <Card className="flex flex-col sm:flex-row items-center p-2 border rounded-lg w-full h-full shadow-sm bg-white relative">
            <div className="flex-grow h-full">
                <CardHeader className="pb-4">
                    <CardTitle>Visualize your site database</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-sm text-gray-500 sm:mb-8">Analyze and understand the relationships between your doctypes with an interactive Entity Relationship Diagram (ERD).</div>
                </CardContent>
                <CardFooter className="absolute bottom-0">
                    <Button
                        size="sm"
                        className="rounded-full px-4 pr-2 py-2 shadow-md"
                        onClick={() => {
                            window.sessionStorage.removeItem('ERDMetaDoctypes')
                            navigate({
                                pathname: `/meta-erd/create`,
                            })
                        }}
                    >
                        Get Started
                        <ChevronRight size={14} className="ml-2 mr-0 p-0" />
                    </Button>
                </CardFooter>
            </div>
            <div className="flex-shrink-0 sm:mb-0 mb-16 p-4 sm:p-0">
                <img src={erd} alt="ERD Diagram" width={180} height={'full'} className="w-full rounded-md sm:w-[180px] sm:mr-6 sm:rounded-md" />
            </div>
        </Card>
    );
}
import { Button } from "@/components/ui/button";
import { isSystemManager } from "@/utils/roles";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { KeyedMutator } from "swr";
import { ProjectData} from "../Projects";
import CreateProjectModal from "../Projects/CreateProjectModal";
import DeleteOrgModal from "./DeleteOrgModal";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog } from "@/components/ui/dialog";
import { ProjectCard } from "../Projects/ProjectsList";

interface OrgComponentProps {
    org: ProjectData, mutate: KeyedMutator<{ message: ProjectData[]; }>
}

export const OrgComponent = ({ org, mutate }: OrgComponentProps) => {

    const isCreateAccess = isSystemManager()

    const [createProject, setCreateProject] = useState<boolean>(false)

    const handleClose = () => {
        setCreateProject(false)
    }

    return (
        <div>

            <div className="flex justify-between items-center py-2 border-b-[1px]">
                <h1 className="text-lg font-medium tracking-normal">
                    {org.organization_name}
                </h1>
                {isCreateAccess &&
                    <div className="flex space-x-2">
                        <Button size="icon" onClick={() => setCreateProject(true)} className="h-7 w-7">
                                    <MdAdd className="h-4 w-4 " />
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button size="icon" variant="outline" className="h-7 w-7">
                                    <AiOutlineDelete />
                                </Button>
                            </AlertDialogTrigger>
                            <DeleteOrgModal org={org} mutate={mutate} />
                        </AlertDialog>
                    </div>}
                <Dialog open={createProject} onOpenChange={setCreateProject}>
                    <CreateProjectModal onClose={handleClose} org={org} mutate={mutate} />
                </Dialog>
            </div>

            {org?.projects?.length === 0 && <div className="text-sm text-gray-500 pl-4 py-2">No Projects Found. Click <button className="text-blue-500 underline" onClick={() => setCreateProject(true)}>
                here</button> to add a new project.
            </div>}
            <div className="pl-4">
                {org.projects.map((project => {
                    return (
                        <ProjectCard project={project} key={project.name} mutate={mutate} />
                    )
                }
                ))}
            </div>
        </div>
    )
}
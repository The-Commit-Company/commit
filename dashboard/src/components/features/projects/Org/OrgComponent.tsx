import { Button } from "@/components/ui/button";
import { isSystemManager } from "@/utils/roles";
import { KeyedMutator } from "swr";
import { ProjectData } from "../Projects";
import DeleteOrgModal from "./DeleteOrgModal";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import ProjectCard from "../Projects/ProjectCard";
import { Trash } from "lucide-react";


interface OrgComponentProps {
    org: ProjectData, mutate: KeyedMutator<{ message: ProjectData[]; }>
}

export const OrgComponent = ({ org, mutate }: OrgComponentProps) => {
    const isCreateAccess = isSystemManager()
    return (
        <div>
            <div className="flex justify-between items-center py-2 border-b-[1px]">
                <h1 className="text-lg font-medium tracking-normal">
                    {org.organization_name}
                </h1>
                {isCreateAccess && <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button size="icon" variant="outline" className="h-7 w-7">
                            <Trash size={12} />
                        </Button>
                    </AlertDialogTrigger>
                    <DeleteOrgModal org={org} mutate={mutate} />
                </AlertDialog>}
            </div>
            <div className="pl-4">
                {org.projects.map((project) => {
                    return (
                        <ProjectCard
                            project={project}
                            githubOrg={org.github_org}
                            orgName={org.organization_name}
                            key={project.name}
                            mutate={mutate} />
                    )
                }
                )}
            </div>
        </div>
    )
}
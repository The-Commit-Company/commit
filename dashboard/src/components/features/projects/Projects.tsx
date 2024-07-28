import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CommitProject } from "@/types/commit/CommitProject";
import { useFrappeGetCall } from "frappe-react-sdk";
import { BsDatabase } from "react-icons/bs";
import { ViewERDDialogContent } from "./ViewERDAppDialog";
import { isSystemManager } from "@/utils/roles";
import { CommitProjectBranch } from "@/types/commit/CommitProjectBranch";
import { AddMenuButton } from "./AddMenuButton";
import { APIExplorer } from "./APIExplorer";
import ProjectCard from "./Projects/ProjectCard";


export interface ProjectWithBranch extends CommitProject {
    branches: CommitProjectBranch[];
}
export interface ProjectData extends CommitProjectBranch {
    projects: ProjectWithBranch[];
    organization_name: string;
    image: string;
    name: string;
    about: string;
}
export const Projects = () => {
    const isCreateAccess = isSystemManager();

    const { data, error, isLoading, mutate } = useFrappeGetCall<{
        message: ProjectData[];
    }>(
        "commit.api.commit_project.commit_project.get_project_list_with_branches",
        {},
        "get_project_list_with_branches",
        {
            keepPreviousData: true,
            revalidateOnFocus: true,
            revalidateIfStale: false,
        }
    );

    if (error) {
        return <div>Error</div>;
    }

    if (isLoading) {
        return <FullPageLoader />;
    }

    if (data && data.message) {
        return (
            <div className="mx-auto pl-2 pr-4 h-[calc(100vh-4rem)]">
                <div className="h-full">
                    <div className="flex gap-2 flex-row items-center justify-end">
                        {isCreateAccess && <AddMenuButton mutate={mutate} />}
                        <APIExplorer />
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="sm" disabled={data.message.length === 0}>
                                    <BsDatabase className="mr-2" /> View ERD
                                </Button>
                            </DialogTrigger>
                            <ViewERDDialogContent data={data.message} />
                        </Dialog>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4 py-4">
                        {data.message.map((org: ProjectData) => {
                            const orgName = org.organization_name;
                            return org.projects.map((project) => (
                                <ProjectCard
                                    orgName={orgName}
                                    project={project}
                                    key={project.name}
                                    mutate={mutate}
                                />
                            ));
                        })}
                    </div>
                </div>
            </div>
        );
    }
};

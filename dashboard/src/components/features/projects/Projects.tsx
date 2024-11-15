import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader";
import { CommitProject } from "@/types/commit/CommitProject";
import { useFrappeGetCall } from "frappe-react-sdk";
import { isSystemManager } from "@/utils/roles";
import { CommitProjectBranch } from "@/types/commit/CommitProjectBranch";
import { AddMenuButton } from "./AddMenuButton";
import { APIExplorer } from "./APIExplorer";
import ProjectCard from "./Projects/ProjectCard";
import { ViewERDButton } from "./ViewERDButton";
import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner";


export interface ProjectWithBranch extends CommitProject {
    branches: CommitProjectBranch[];
}
export interface ProjectData extends CommitProjectBranch {
    projects: ProjectWithBranch[];
    organization_name: string;
    github_org: string;
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
        return <ErrorBanner error={error} />;
    }

    if (isLoading) {
        return <FullPageLoader />;
    }

    if (data && data.message) {
        return (
            <div className="mx-auto pl-2 pr-4 h-full overflow-y-auto pt-2">
                <div className="h-full flex flex-col gap-4">
                    <div className="grid grid-cols-1 gap-6 justify-between sm:grid-cols-2">
                        <ViewERDButton data={data?.message} />
                        <APIExplorer />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row items-end justify-between border-b pb-2">
                            <div className="text-xl font-semibold pt-1">Projects</div>
                            {isCreateAccess && <AddMenuButton mutate={mutate} />}
                        </div>
                        <div className="grid sm:grid-cols-2 gap-x-8 pb-4">
                            {data.message.map((org: ProjectData) => {
                                const orgName = org.organization_name;
                                return org.projects.map((project) => (
                                    <ProjectCard
                                        orgName={orgName}
                                        githubOrg={org.github_org}
                                        project={project}
                                        key={project.name}
                                        mutate={mutate}
                                    />
                                ));
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

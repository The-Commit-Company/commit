import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { KeyedMutator } from "swr";
import { useMemo, useState } from "react";
import { isSystemManager } from "@/utils/roles";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog } from "@radix-ui/react-dialog";
import ManageBranchModal from "../Branch/ManageBranchModal";
import { ProjectWithBranch, ProjectData } from "../Projects";
import DeleteProjectModal from "./DeleteProjectModal";
import { EllipsisVertical, Grip, Trash } from "lucide-react";

export interface ProjectCardProps {
  project: ProjectWithBranch
  mutate: KeyedMutator<{
    message: ProjectData[];
  }>
  orgName: string
  githubOrg: string
}

const ProjectCard = ({ project, mutate, orgName, githubOrg }: ProjectCardProps) => {

  const appNameInitials = useMemo(() => {
    return project.display_name[0].toUpperCase()
  }, [project])

  const isCreateAccess = isSystemManager()

  const [openManageModal, setOpenManageModal] = useState(false)

  const [openDeleteDialogModal, setOpenDeleteDialogModal] = useState(false)

  const openGithubRepo = () => {
    window.open(`https://github.com/${githubOrg}/${project.repo_name}`, '_blank')
  }

  return (
    <div className="flex items-start border-b relative hover:bg-gray-100 p-4">
      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10 flex items-center rounded-lg">
          <AvatarImage src={project.image} className="object-contain h-full w-full" />
          <AvatarFallback className="rounded-lg text-xl">
            {appNameInitials}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1 cursor-default">
          <div className="text-base font-semibold cursor-pointer hover:underline hover:text-blue-500" onClick={openGithubRepo}>{project.display_name}</div>
          <div className="text-sm text-gray-500 pb-4">
            {project.description}
          </div>
          <div className="text-xs absolute bottom-2 text-gray-400">{orgName}</div>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-2">
        {isCreateAccess && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size='icon' className="h-6 w-6">
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-50 mr-4">
              {project.branches.length > 0 && (
                <DropdownMenuItem onClick={() => { setOpenManageModal(true) }}>
                  <>
                    <Grip className="h-4 w-4 mr-2" />
                    Manage Branches
                  </>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => setOpenDeleteDialogModal(true)}>
                <Trash className="h-4 w-4 mr-2" />
                Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <AlertDialog open={openDeleteDialogModal} onOpenChange={setOpenDeleteDialogModal}>
        <DeleteProjectModal project={project} mutate={mutate} />
      </AlertDialog>

      <Dialog open={openManageModal} onOpenChange={setOpenManageModal}>
        <ManageBranchModal branches={project.branches} mutate={mutate} setOpenManageModal={setOpenManageModal} />
      </Dialog>
    </div>
  );
}

export default ProjectCard;

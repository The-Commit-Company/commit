import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AiOutlineDelete } from "react-icons/ai";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { KeyedMutator } from "swr";
import { useMemo, useState } from "react";
import { isSystemManager } from "@/utils/roles";
import { RxDragHandleDots1 } from "react-icons/rx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dialog } from "@radix-ui/react-dialog";
import ManageBranchModal from "../Branch/ManageBranchModal";
import { ProjectWithBranch, ProjectData } from "../Projects";
import DeleteProjectModal from "./DeleteProjectModal";

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
              <Button variant="outline" size='icon' className="h-7 w-7">
                <BsThreeDotsVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-50">
              {project.branches.length > 0 && (
                <DropdownMenuItem onClick={() => { setOpenManageModal(true) }}>
                  <>
                    <RxDragHandleDots1 className="h-4 w-4 mr-2" />
                    Manage Branches
                  </>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => setOpenDeleteDialogModal(true)}>
                <AiOutlineDelete className="h-4 w-4 mr-2" />
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

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AiOutlineDelete } from "react-icons/ai";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { KeyedMutator } from "swr";
import { useMemo, useState } from "react";
import { isSystemManager } from "@/utils/roles";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dialog } from "@radix-ui/react-dialog";
import ManageBranchModal from "../Branch/ManageBranchModal";
import { ProjectWithBranch, ProjectData } from "../Projects";
import DeleteProjectModal from "./DeleteProjectModal";
import { IoIosGitBranch } from "react-icons/io";

export interface ProjectCardProps {
  project: ProjectWithBranch
  mutate: KeyedMutator<{
    message: ProjectData[];
  }>
  orgName: string
}

const ProjectCard = ({ project, mutate, orgName }: ProjectCardProps) => {

  const appNameInitials = useMemo(() => {
    return project.display_name[0].toUpperCase()
  }, [project])

  const isCreateAccess = isSystemManager()

  const [openManageModal, setOpenManageModal] = useState(false)

  const [openDeleteDialogModal, setOpenDeleteDialogModal] = useState(false)

  return (
    <Card className="w-[31.5vw]">
      <CardContent className="p-4 flex flex-row items-start gap-4">
        <Avatar className="h-24 w-24 flex items-center rounded-md border border-gray-100">
          <AvatarImage src={project.image} />
          <AvatarFallback className="rounded-md text-4xl">
            {appNameInitials}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col justify-between w-full gap-2">
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col">
              <CardTitle className="text-xl">{project.display_name}</CardTitle>
              <div className="text-xs">
                by {orgName}
              </div>
            </div>
            {isCreateAccess && <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size='icon' className="h-8 w-8"> <BsThreeDotsVertical /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-50">
                {project.branches.length > 0 &&
                  <DropdownMenuItem onClick={() => { setOpenManageModal(true) }}>
                    <>
                      <IoIosGitBranch className="mr-2 h-4 w-4" />
                      Manage Branches
                    </>
                  </DropdownMenuItem>
                }
                <DropdownMenuItem onClick={() => setOpenDeleteDialogModal(true)}>
                  <AiOutlineDelete className="h-4 w-4 mr-2" />
                  Delete Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>}
          </div>
          <CardDescription>
            {project.description}
          </CardDescription>
        </div>
      </CardContent>

      <AlertDialog open={openDeleteDialogModal} onOpenChange={setOpenDeleteDialogModal}>
        <DeleteProjectModal project={project} mutate={mutate} />
      </AlertDialog>

      <Dialog open={openManageModal} onOpenChange={setOpenManageModal}>
        <ManageBranchModal branches={project.branches} mutate={mutate} setOpenManageModal={setOpenManageModal} />
      </Dialog>
    </Card>
  );
}

export default ProjectCard;

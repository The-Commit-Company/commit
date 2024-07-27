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
}

const ProjectCard = ({ project, mutate, orgName }: ProjectCardProps) => {

  const appNameInitials = useMemo(() => {
    return project.display_name[0].toUpperCase()
  }, [project])

  const isCreateAccess = isSystemManager()

  const [openManageModal, setOpenManageModal] = useState(false)

  const [openDeleteDialogModal, setOpenDeleteDialogModal] = useState(false)

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 items-start">
          <div className="w-full flex items-center justify-center">
            <Avatar className="h-32 w-32 flex items-center rounded-xl  border border-gray-100">
              <AvatarImage src={project.image} className="object-contain h-full w-full" />
              <AvatarFallback className="rounded-xl text-4xl">
                {appNameInitials}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-start">
              <div className=" flex flex-col gap-1">
                <CardTitle>{project.display_name}</CardTitle>
                <div className="text-xs text-gray-500">
                  {orgName}
                </div>
              </div>
              {isCreateAccess && <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size='icon' className="h-7 w-7"> <BsThreeDotsVertical /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-50">
                  {project.branches.length > 0 &&
                    <DropdownMenuItem onClick={() => { setOpenManageModal(true) }}>
                      <>
                        <RxDragHandleDots1 className="h-4 w-4 mr-2" />
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

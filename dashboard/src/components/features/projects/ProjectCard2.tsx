import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AiOutlineDelete } from "react-icons/ai";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { KeyedMutator } from "swr";
import { ProjectData, ProjectWithBranch } from "./Projects";
import { useMemo, useState } from "react";
import DeleteProjectModal from "./Projects/DeleteProjectModal";
import { isSystemManager } from "@/utils/roles";
import ManageBranchModal from "./Branch/ManageBranchModal";
import { Dialog } from "@/components/ui/dialog";
import { RxDragHandleDots1 } from "react-icons/rx";
import { AiOutlineMenu } from "react-icons/ai";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { set } from "react-hook-form";

export interface ProjectCardProps {
  project: ProjectWithBranch
  mutate: KeyedMutator<{
    message: ProjectData[];
  }>

}

export function ProjectCard2({ project, mutate }: ProjectCardProps) {

  const appNameInitials = useMemo(() => {
    return project.display_name[0].toUpperCase()
  }, [project])

  const isCreateAccess = isSystemManager()

  const [openManageModal, setOpenManageModal] = useState(false)

  const [openDeleteDialogModal, setOpenDeleteDialogModal] = useState(false)

  return (
    <Card className="w-[300px] h-[400px]">
      <CardHeader>
        <div className="flex gap-3 justify-between items-start">
          <div className="flex gap-3">
            <Avatar className="h-11 w-11 rounded-md border border-gray-100">
              <AvatarImage src={project.image} />
              <AvatarFallback className="rounded-md">
                {appNameInitials}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{project.display_name}</CardTitle>
              <CardDescription>
                {project.description}
              </CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline"><AiOutlineMenu /></Button>
            </DropdownMenuTrigger>
            {isCreateAccess && 
            <DropdownMenuContent className="w-56">
              {project.branches.length > 0 &&
                <DropdownMenuItem onClick={() => { setOpenManageModal(true) }}>
                  <>
                    <RxDragHandleDots1 className="h-4 w-4 mr-1" />
                    <span> Manage Branches</span>
                  </>
                </DropdownMenuItem>
              }
              <DropdownMenuItem onClick={() => setOpenDeleteDialogModal(true)}>
                <AiOutlineDelete className="h-4 w-4 mr-1" />
                <span>Delete Project</span>
              </DropdownMenuItem>

            </DropdownMenuContent>}
          </DropdownMenu>
        </div>
      </CardHeader>

      <AlertDialog open={openDeleteDialogModal} onOpenChange={setOpenDeleteDialogModal}>
        <DeleteProjectModal project={project} mutate={mutate} />
      </AlertDialog>

      <Dialog open={openManageModal} onOpenChange={setOpenManageModal}>
        <ManageBranchModal branches={project.branches} mutate={mutate} setOpenManageModal={setOpenManageModal} />
      </Dialog>
    </Card >
  );
}

export default ProjectCard2;


// <CardFooter className="flex justify-between">
//         
//       </CardFooter>
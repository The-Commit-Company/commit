import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Badge } from "@/components/ui/badge";

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
    <Card className="w-[220px] h-[300px] relative">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 items-start">
          <Avatar className="h-32 w-full flex items-center rounded-md border border-gray-100">
            <AvatarImage src={project.image} />
            <AvatarFallback className="rounded-md text-4xl">
              {appNameInitials}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1 w-full">
            <div className="flex justify-between items-center">
              <CardTitle>{project.display_name}</CardTitle>
              {isCreateAccess && <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size='icon' className="h-8 w-8"> <BsThreeDotsVertical /></Button>
                </DropdownMenuTrigger>
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

      <CardFooter className="absolute p-4 bottom-0 mt-2">
        <Badge variant="secondary">{orgName}</Badge>
      </CardFooter>
    </Card>
  );
}

export default ProjectCard;

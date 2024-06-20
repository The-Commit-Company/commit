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

  const handleMenu = () => {

  }

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
            <DropdownMenuContent className="w-56">
              {isCreateAccess &&
                <DropdownMenuItem onClick={() => { setOpenManageModal(true) }}>
                  {project.branches.length > 0 &&
                    <>
                      <RxDragHandleDots1 className="h-4 w-4 mr-1" />
                      <span> Manage Branches</span>
                    </>
                  }
                </DropdownMenuItem>
              }
              <DropdownMenuItem>
                <AlertDialog>
                  {isCreateAccess && <AlertDialogTrigger asChild>
                    <Button size='icon' variant='outline' className="h-8 w-8">
                      <AiOutlineDelete />
                    </Button>
                  </AlertDialogTrigger>}
                  <DeleteProjectModal project={project} mutate={mutate} />
                </AlertDialog>
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

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
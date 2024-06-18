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

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <div className="flex gap-2">
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
      </CardHeader>
      <CardFooter className="flex justify-between">
        {isCreateAccess &&
          <>
            {project.branches.length > 0 ?
              <Button
                variant="ghost"
                className="w-full h-8 font-normal text-sm left-0 flex justify-start pl-1"
                onClick={() => {
                  setOpenManageModal(true)
                }}>
                <RxDragHandleDots1 className="h-4 w-4 mr-1" />
                Manage Branches
              </Button> :
              <div></div>}
          </>
        }
        <Dialog open={openManageModal} onOpenChange={setOpenManageModal}>
          <ManageBranchModal branches={project.branches} mutate={mutate} setOpenManageModal={setOpenManageModal} />
        </Dialog>
        <AlertDialog>
          {isCreateAccess && <AlertDialogTrigger asChild>
            <Button size='icon' variant='outline' className="h-8 w-8">
              <AiOutlineDelete />
            </Button>
          </AlertDialogTrigger>}
          <DeleteProjectModal project={project} mutate={mutate} />
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}

export default ProjectCard2;

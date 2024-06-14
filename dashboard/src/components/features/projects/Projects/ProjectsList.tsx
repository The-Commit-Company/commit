import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { isSystemManager } from "@/utils/roles";
import { useState, useMemo } from "react";
import { AiOutlineApi, AiOutlineDelete } from "react-icons/ai";
import { RxDragHandleDots1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { KeyedMutator } from "swr";
import ManageBranchModal from "../Branch/ManageBranchModal";
import { ProjectWithBranch, ProjectData } from "../Projects";
import DeleteProjectModal from "./DeleteProjectModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { CommitProjectBranch } from "@/types/commit/CommitProjectBranch"

export interface ProjectCardProps {
    project: ProjectWithBranch
    mutate: KeyedMutator<{
        message: ProjectData[];
    }>

}

export const ProjectCard = ({ project, mutate }: ProjectCardProps) => {

    const navigate = useNavigate()

    const [branch, setBranch] = useState<string>(project.branches[0]?.name)

    const onNavigate = () => {
        navigate({
            pathname: `/project-viewer/${branch}`
        })
    }
    const appNameInitials = useMemo(() => {
        return project.display_name.split('_').map((word) => word[0]).join('').toUpperCase()
    }, [project])

    const isCreateAccess = isSystemManager()

    const [openManageModal, setOpenManageModal] = useState(false)

    const [selectOpen, setSelectOpen] = useState(false)

    return (
        <li className="w-full h-auto hover:shadow-sm">
            <div className="py-2 flex flex-col justify-between">
                <div className="flex space-x-4 items-center justify-between">
                    <div className="flex flex-col">

                        <div className="flex space-x-3 items-start">
                            <Avatar className="h-11 w-11 rounded-md">
                                <AvatarImage src={project.image} />
                                <AvatarFallback className="h-11 w-11 rounded-md">{appNameInitials}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <div className="flex space-x-2 items-center">
                                    <h1 className="text-lg font-medium tracking-normal">{project.display_name}</h1>
                                </div>
                                <CardDescription className="text-sm text-gray-500">{project.description}</CardDescription>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Select
                            open={selectOpen}
                            onOpenChange={setSelectOpen}
                            onValueChange={(value) => setBranch(value)}
                            value={branch}
                            defaultValue={project.branches[0]?.name}
                        >
                            <SelectTrigger className="h-8 w-40" onClick={() => setSelectOpen(!selectOpen)}>
                                <SelectValue placeholder="Select Branch" />
                            </SelectTrigger>
                            <SelectContent>
                                {project.branches.map((branch: CommitProjectBranch) => {
                                    return (
                                        <SelectItem value={branch.name} key={branch.name}>{branch.branch_name}</SelectItem>
                                    )
                                })}

                                {isCreateAccess &&
                                    <>
                                    {project.branches.length > 0 &&
                                        <div className="w-full h-[1px] bg-gray-200 shadow-sm my-1" />}
                                        {project.branches.length > 0 &&
                                            <Button
                                                variant="ghost"
                                                className="w-full h-8 font-normal text-sm left-0 flex justify-start pl-1"
                                                onClick={() => {
                                                    setOpenManageModal(true)
                                                    setSelectOpen(false)
                                                }}>
                                                <RxDragHandleDots1 className="h-4 w-4 mr-1" />
                                                Manage Branches
                                            </Button>}
                                    </>
                                }
                            </SelectContent>
                        </Select>

                        <Dialog open={openManageModal} onOpenChange={setOpenManageModal}>
                            <ManageBranchModal branches={project.branches} mutate={mutate} setOpenManageModal={setOpenManageModal} />
                        </Dialog>
                        <Button size='sm' onClick={onNavigate} disabled={branch ? false : true}>
                            <AiOutlineApi className="mr-2" />
                            API Explorer
                        </Button>
                        <AlertDialog>
                            {isCreateAccess && <AlertDialogTrigger asChild>
                                <Button size='icon' variant='outline' className="h-8 w-8">
                                    <AiOutlineDelete />
                                </Button>
                            </AlertDialogTrigger>}
                            <DeleteProjectModal project={project} mutate={mutate} />
                        </AlertDialog>
                    </div>
                </div>
            </div >
        </li >
    )
}

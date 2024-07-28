import { KeyedMutator } from "swr";
import { ProjectData, ProjectWithBranch } from "../Projects"
import { useFrappeDeleteDoc } from "frappe-react-sdk";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'


interface DeleteProjectModalProps {
    project: ProjectWithBranch,
    mutate: KeyedMutator<{ message: ProjectData[]; }>
}

const DeleteProjectModal = ({ project, mutate }: DeleteProjectModalProps) => {

    const { deleteDoc, reset } = useFrappeDeleteDoc()

    const handleProjectDelete = () => {

        deleteDoc("Commit Project", `${project.name}`)
            .then(() => {
                mutate()
                reset()
            }).then(() => toast({
                description: `Project ${project.display_name} Deleted`,
                duration: 1500
            }))
    }
    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Delete Project{' '}{project.display_name}?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    This will remove {project.display_name} from the list.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className='!justify-end'>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button variant="destructive" onClick={handleProjectDelete}>
                    Delete
                </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    )
}

export default DeleteProjectModal
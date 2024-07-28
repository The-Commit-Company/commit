import { AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { ProjectData } from '../Projects'
import { useFrappeDeleteDoc } from 'frappe-react-sdk'
import { toast } from '@/components/ui/use-toast'
import { KeyedMutator } from 'swr'

interface DeleteOrgModalProps {
    org: ProjectData,
    mutate: KeyedMutator<{ message: ProjectData[]; }>
}


const DeleteOrgModal = ({ org, mutate }: DeleteOrgModalProps) => {

    const { deleteDoc, reset } = useFrappeDeleteDoc()

    const handleOrgDelete = () => {

        deleteDoc("Commit Organization", `${org.name}`)
            .then(() => {
                mutate()
                reset()
            }).then(() => toast({
                description: `Organization ${org.organization_name} Deleted`,
                duration: 1500
            }))
    }
    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Delete Organization{' '}{org.organization_name}?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    This will remove this organization and the corresponding projects.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className='!justify-end '>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button variant="destructive" onClick={handleOrgDelete}>
                    Delete
                </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    )
}

export default DeleteOrgModal
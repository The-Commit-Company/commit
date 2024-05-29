import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { ProjectData } from '../Projects'
import { useFrappeDeleteDoc } from 'frappe-react-sdk'
import { toast } from '@/components/ui/use-toast'
import { KeyedMutator } from 'swr'

const DeleteOrgModal = ({ org, mutate }: {
    org: ProjectData, mutate: KeyedMutator<{
        message: ProjectData[];
    }>
}) => {

    const { deleteDoc, reset } = useFrappeDeleteDoc()

    const handleOrgDelete = () => {

        deleteDoc("Commit Organization", `${org.name}`)
            .then(() => {
                mutate()
                reset()
            }).then(() => toast({
                description: `Organization ${org.organization_name} Deleted`,
                variant: "destructive"
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
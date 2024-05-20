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
                <AlertDialogTitle>Delete Organization
                    <span className="text-red-600">
                        {' '}
                        {org.organization_name}?
                    </span>
                </AlertDialogTitle>
                <AlertDialogDescription>
                    This will remove this organization from the list.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter >
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                    <Button onClick={handleOrgDelete}>
                        Delete
                    </Button>
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    )
}

export default DeleteOrgModal
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCallback, useMemo, useState } from "react";
import { Pencil, SquareArrowOutUpRight, Trash } from "lucide-react";
import { CommitDocs } from "@/types/commit/CommitDocs";
import { useNavigate } from "react-router-dom";
import { useFrappeDeleteDoc } from "frappe-react-sdk";
import { toast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'


const DocsListCard = ({ data }: { data: CommitDocs }) => {

    const appNameInitials = useMemo(() => {
        return data.header[0].toUpperCase()
    }, [data])

    const [openDeleteDialogModal, setOpenDeleteDialogModal] = useState(false)

    const navigate = useNavigate()

    const onNavigate = useCallback(() => {
        navigate({
            pathname: `/docs/${data.name}`
        })
    }, [navigate])

    return (
        <div className="flex items-start border-b relative hover:bg-gray-100 p-4">
            <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10 flex items-center rounded-lg">
                    <AvatarImage src={data.light_mode_logo} className="object-contain h-full w-full" />
                    <AvatarFallback className="rounded-lg text-xl">
                        {appNameInitials}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 cursor-default">
                    <div className="text-base font-semibold " >{data.header}</div>
                    <div className="text-sm text-gray-500 pb-4">
                        {data.description}
                    </div>
                </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
                <Button size='icon' variant="outline" className="h-6 w-6" onClick={onNavigate}>
                    <Pencil className="h-3 w-3" />
                </Button>
                <Button size='icon' variant="outline" className="h-6 w-6" >
                    <a href={`/commit-docs/${data.route}`} target="_blank" rel="noreferrer">
                        <SquareArrowOutUpRight className="h-3 w-3" />
                    </a>
                </Button>
                <Button size='icon' variant="outline" className="h-6 w-6" onClick={() => setOpenDeleteDialogModal(true)}>
                    <Trash className="h-3 w-3" />
                </Button>
            </div>
            {openDeleteDialogModal && (
                <AlertDialog open={openDeleteDialogModal} onOpenChange={setOpenDeleteDialogModal}>
                    <DeleteProjectModal data={data} />
                </AlertDialog>
            )}
        </div>
    );
}

const DeleteProjectModal = ({data}: {data: CommitDocs}) => {

    const { deleteDoc, reset } = useFrappeDeleteDoc()

    const handleProjectDelete = () => {

        deleteDoc("Commit Docs", `${data.name}`)
            .then(() => {
                reset()
            }).then(() => toast({
                description: `Commit Docs ${data.name} deleted successfully`,
                duration: 1500
            }))
    }
    return (
        <AlertDialogContent className="p-6 w-[90vw] sm:w-full overflow-hidden">
            <AlertDialogHeader className="text-left">
                <AlertDialogTitle>Delete Docs {data.header}
                </AlertDialogTitle>
                <AlertDialogDescription>
                    This will delete {data.header} docs and it's related files.
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

export default DocsListCard;

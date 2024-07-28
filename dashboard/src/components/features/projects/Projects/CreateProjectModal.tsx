import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useFrappeCreateDoc } from "frappe-react-sdk"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import { ProjectData } from "../Projects"
import { KeyedMutator } from "swr"
import { AsyncDropdown } from "@/components/common/AsyncDropdown/AsyncDropdown"

export type FormFields = {
    org: string,
    repo_name: string,
    display_name: string,
    description: string,
}
interface CreateProjectModalProps {
    mutate: KeyedMutator<{ message: ProjectData[]; }>,
    onClose: VoidFunction
}

const CreateProjectModal = ({ mutate, onClose }: CreateProjectModalProps) => {
    const { toast } = useToast()
    const methods = useForm<FormFields>()

    const { createDoc, reset } = useFrappeCreateDoc()

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        createDoc('Commit Project', data)
            .then(() => {
                reset()
            }).then(() => {
                mutate()
                onClose()
                return toast({
                    description: "Project Added Successfully",
                    duration: 1500
                })
            })
    }


    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add Project</DialogTitle>
                <DialogDescription>
                    Please enter details of the project.
                </DialogDescription>
            </DialogHeader>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Label htmlFor="org">Organization</Label>
                    <AsyncDropdown name="org" doctype="Commit Organization" placeholder="Select Organization" className="mb-3 p-3 w-full" />
                    <Label htmlFor="projectdisplayname">Project Display Name</Label>
                    <Input
                        {...methods.register("display_name")}
                        id='projectdisplayname'
                        type="text"
                        placeholder="eg. Leave Management System"
                        className="mb-3 p-3 w-full"
                    />
                    <Label htmlFor="reponame">Project Repo Name</Label>
                    <Input
                        {...methods.register("repo_name")}
                        id='reponame'
                        type="text"
                        placeholder="eg. lms"
                        className="mb-3 p-3 w-full"
                    />
                    <Label htmlFor="description">Description</Label>
                    <Input
                        {...methods.register("description")}
                        id='about'
                        type="text"
                        placeholder="Leave Management System is a full-stack web application."
                        className="mb-3 p-3 w-full"
                    />
                    <DialogFooter>
                        <Button type="submit">
                            Submit
                        </Button>
                    </DialogFooter>
                </form>
            </FormProvider>
        </DialogContent>
    )
}

export default CreateProjectModal

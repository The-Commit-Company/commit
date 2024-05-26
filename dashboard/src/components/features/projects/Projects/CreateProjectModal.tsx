import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useFrappeCreateDoc } from "frappe-react-sdk"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import { ProjectData } from "../Projects"
import { KeyedMutator } from "swr"

export type FormFields = {
    org: string,
    repo_name: string,
    display_name: string,
}


const CreateProjectModal = ({ org, mutate }: {
    org: ProjectData, mutate: KeyedMutator<{
        message: ProjectData[];
    }>
}) => {
    const { toast } = useToast()
    const methods = useForm<FormFields>({
        defaultValues: {
            org: org.name
        }
    })

    const { createDoc, reset } = useFrappeCreateDoc()

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        createDoc('Commit Project', data)
            .then(() => {
                reset()
            }).then(() => {
                mutate();
                return toast({
                    description: "Project Added",
                })
            })
    }


    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add Project for{' '}{org.organization_name}
                </DialogTitle>
                <DialogDescription>
                    Please enter details of the project.
                </DialogDescription>
            </DialogHeader>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
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

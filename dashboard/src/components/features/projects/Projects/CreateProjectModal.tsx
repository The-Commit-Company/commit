import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useFrappeCreateDoc } from "frappe-react-sdk"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import { DialogClose } from '@radix-ui/react-dialog'
import { ProjectData } from "../Projects"
import { KeyedMutator } from "swr"

type FormFields = {
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
        // console.log("data", data);
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

    // console.log("org", org)

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add Project for
                    <span className="text-green-600">
                        {' '}
                        {org.organization_name}
                    </span>
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
                        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
                    />
                    <Label htmlFor="reponame">Project Repo Name</Label>
                    <Input
                        {...methods.register("repo_name")}
                        id='reponame'
                        type="text"
                        placeholder="eg. lms"
                        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
                    />
                    <DialogClose asChild>
                        <Button type="submit" style={{ padding: '10px 20px', margin: '10px 0 0' }}>
                            Submit
                        </Button>
                    </DialogClose>
                </form>
            </FormProvider>
        </DialogContent>
    )
}

export default CreateProjectModal

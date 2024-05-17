import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FormProvider, useForm, SubmitHandler } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { DialogClose } from '@radix-ui/react-dialog'
import { ProjectData, ProjectWithBranch } from "../Projects"
import { useToast } from "@/components/ui/use-toast"
import { useFrappeCreateDoc } from "frappe-react-sdk"
import { KeyedMutator } from "swr"

type FormFields = {
    project: string,
    branch_name: string,
}

export interface BranchProps {
    project: ProjectWithBranch
    mutate: KeyedMutator<{
        message: ProjectData[];
    }>
    setBranch: React.Dispatch<React.SetStateAction<string>>
}

const CreateBranchModal = ({ project, mutate, setBranch }: BranchProps) => {

    const { toast } = useToast()
    const methods = useForm<FormFields>({
        defaultValues: {
            project: project.name
        }
    })

    const { createDoc, reset } = useFrappeCreateDoc()

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        createDoc('Commit Project Branch', data)
            .then((doc) => {
                setBranch(doc.name)
                methods.reset()
                mutate()
                toast({
                    description: `Branch ${doc.branch_name} added for ${project.app_name}`,
                })
                reset()
            })
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Adding Branch of
                    <span className="text-green-600">
                        {' '}
                        {project.display_name}
                    </span>
                </DialogTitle>
                <DialogDescription>
                    Please enter the branch name.
                </DialogDescription>
            </DialogHeader>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Label htmlFor="branchname">Branch Name</Label>
                    <Input
                        {...methods.register("branch_name")}
                        id='branchname'
                        type="text"
                        placeholder="eg. main"
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

export default CreateBranchModal


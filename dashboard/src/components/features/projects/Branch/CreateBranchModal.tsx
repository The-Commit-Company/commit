import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FormProvider, useForm, SubmitHandler } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
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

    const { handleSubmit, register } = methods;

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
                <DialogTitle>Adding Branch of{' '}{project.display_name}
                </DialogTitle>
                <DialogDescription>
                    Please enter the branch name.
                </DialogDescription>
            </DialogHeader>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Label htmlFor="branchname">Branch Name</Label>
                    <Input
                        {...register("branch_name")}
                        id='branchname'
                        type="text"
                        placeholder="eg. main"
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

export default CreateBranchModal


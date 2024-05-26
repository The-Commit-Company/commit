import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FormProvider, useForm, SubmitHandler } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { ProjectData, ProjectWithBranch } from "../Projects"
import { useToast } from "@/components/ui/use-toast"
import { useFrappeCreateDoc, useFrappeEventListener } from "frappe-react-sdk"
import { KeyedMutator } from "swr"
import { useState } from "react"
import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner"

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
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateBranchModal = ({ project, mutate, setBranch, setOpen }: BranchProps) => {

    const [desc, setDesc] = useState<string>("Please enter the branch name.")
    const [eventLoading, setEventLoading] = useState<boolean>(false)

    const { toast } = useToast()
    const methods = useForm<FormFields>({
        defaultValues: {
            project: project.name
        }
    })

    const { createDoc, reset, loading, error } = useFrappeCreateDoc()

    const branchName = methods.watch('branch_name')


    useFrappeEventListener('commit_branch_clone_repo', (data) => {
        if (data.branch_name === branchName && data.project === project.name) {
            setDesc("Cloning repository...")
        }
    })

    useFrappeEventListener('commit_branch_get_modules', (data) => {
        if (data.branch_name === branchName && data.project === project.name) {
            setDesc("Getting modules for app...")
        }
    })

    useFrappeEventListener('commit_branch_find_apis', (data) => {
        if (data.branch_name === branchName && data.project === project.name) {
            setDesc("Finding all APIs...")
        }
    })

    useFrappeEventListener('commit_project_branch_created', (data) => {
        if (data.branch_name === branchName && data.project === project.name) {
            setDesc("Branch created successfully.")
            handleClose(data.name, data.branch_name)
        }
    })

    const handleClose = (name: string, branch_name: string) => {
        setEventLoading(false)
        setBranch(name)
        methods.reset()
        toast({
            description: `Branch ${branch_name} added for ${project.app_name}`
        })
        reset()
        setDesc("")
        setOpen(false)
    }
    const { handleSubmit, register } = methods;


    const onSubmit: SubmitHandler<FormFields> = (data) => {
        createDoc('Commit Project Branch', data)
            .then((doc) => {
                mutate()
                setBranch(doc.name)
                setEventLoading(true)
            })
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Adding Branch of{' '}{project.display_name}
                </DialogTitle>
                <DialogDescription>
                    {desc}
                </DialogDescription>
            </DialogHeader>
            {error && <ErrorBanner error={error} />}
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
                        <Button type="submit" style={{ padding: '10px 20px', margin: '10px 0 0' }} disabled={loading || eventLoading}>
                            {(loading || eventLoading) && <div
                                className="inline-block h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-current text-gray-200 border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                                role="status">
                            </div>}
                      </Button>
                    </DialogFooter>
                </form>
            </FormProvider>
        </DialogContent>
    )
}

export default CreateBranchModal


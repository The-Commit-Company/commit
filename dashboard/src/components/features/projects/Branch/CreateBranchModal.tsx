import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FormProvider, useForm, SubmitHandler } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { ProjectData } from "../Projects"
import { useToast } from "@/components/ui/use-toast"
import { useFrappeCreateDoc, useFrappeEventListener } from "frappe-react-sdk"
import { KeyedMutator } from "swr"
import { useState } from "react"
import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner"
import { AsyncDropdown } from "@/components/common/AsyncDropdown/AsyncDropdown"

type FormFields = {
    project: string,
    branch_name: string,
}

export interface BranchProps {
    mutate: KeyedMutator<{
        message: ProjectData[];
    }>
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateBranchModal = ({ mutate, setOpen }: BranchProps) => {

    const [desc, setDesc] = useState<string>("Please enter the branch name.")
    const [eventLoading, setEventLoading] = useState<boolean>(false)

    const { toast } = useToast()
    const methods = useForm<FormFields>()

    const project = methods.watch('project')

    const { createDoc, reset, loading, error } = useFrappeCreateDoc()

    const branchName = methods.watch('branch_name')

    useFrappeEventListener('commit_branch_clone_repo', (data) => {
        if (data.branch_name === branchName && data.project === project) {
            setDesc("Cloning repository...")
        }
    })

    useFrappeEventListener('commit_branch_get_modules', (data) => {
        if (data.branch_name === branchName && data.project === project) {
            setDesc("Getting modules for app...")
        }
    })

    useFrappeEventListener('commit_branch_find_apis', (data) => {
        if (data.branch_name === branchName && data.project === project) {
            setDesc("Finding all APIs...")
        }
    })

    useFrappeEventListener('commit_project_branch_created', (data) => {
        if (data.branch_name === branchName && data.project === project) {
            setDesc("Branch created successfully.")
            handleClose(data.branch_name)
        }
    })

    useFrappeEventListener('commit_branch_creation_error', (data) => {
        if (data.branch_name === branchName && data.project === project) {
            setDesc("")
            setCreationError(data.error)
            setEventLoading(false)
        }
    })

    const [creationError, setCreationError] = useState(null)


    const handleClose = (branch_name: string) => {
        setEventLoading(false)
        setCreationError(null)
        methods.reset()
        toast({
            description: `Branch ${branch_name} added.`,
            duration: 1500,
        })
        reset()
        setDesc("")
        setOpen(false)
    }
    const { handleSubmit, register } = methods;


    const onSubmit: SubmitHandler<FormFields> = (data) => {
        createDoc('Commit Project Branch', data)
            .then(() => {
                mutate()
                setEventLoading(true)
            })
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add Branch.
                </DialogTitle>
                <DialogDescription>
                    {desc}
                </DialogDescription>
            </DialogHeader>
            {error && <ErrorBanner error={error} />}
            {creationError && <ErrorBanner error={creationError} />}
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Label htmlFor="project">Project</Label>
                    <AsyncDropdown name="project" doctype="Commit Project" placeholder="Select Project" className="mb-3 p-3 w-full" />
                    <Label htmlFor="branchname">Branch Name</Label>
                    <Input
                        {...register("branch_name")}
                        id='branchname'
                        type="text"
                        placeholder="eg. main"
                        className="mb-3 p-3 w-full"
                    />
                    <DialogFooter>
                        <Button type="submit" disabled={loading || eventLoading}>
                            {(loading || eventLoading) &&
                                <div
                                className="inline-block h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-current text-gray-200 border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                                role="status">
                            </div>}
                            Submit
                      </Button>
                    </DialogFooter>
                </form>
            </FormProvider>
        </DialogContent>
    )
}

export default CreateBranchModal


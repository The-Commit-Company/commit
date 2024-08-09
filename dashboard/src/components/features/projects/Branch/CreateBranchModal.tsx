import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FormProvider, useForm, SubmitHandler } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { ProjectData } from "../Projects"
import { useToast } from "@/components/ui/use-toast"
import { useFrappeCreateDoc, useFrappeEventListener } from "frappe-react-sdk"
import { KeyedMutator } from "swr"
import { useEffect, useState } from "react"
import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner"
import { AsyncDropdown } from "@/components/common/AsyncDropdown/AsyncDropdown"
import { FormElement } from "@/components/common/Forms/FormControl"

type FormFields = {
    project: string,
    branch_name: string,
}

export interface BranchProps {
    mutate: KeyedMutator<{
        message: ProjectData[];
    }>
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    open: boolean
}

const CreateBranchModal = ({ mutate, setOpen, open }: BranchProps) => {

    const [desc, setDesc] = useState<string>()
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

    useEffect(() => {
        methods.reset()
    }, [open])

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add Branch
                </DialogTitle>
            </DialogHeader>
            {error && <ErrorBanner error={error} />}
            {creationError && <ErrorBanner error={creationError} />}
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-3">
                        <FormElement name="project" label="Project" aria-required>
                            <AsyncDropdown id="project" name="project" doctype="Commit Project" placeholder="Select Project" className="w-full" rules={{
                                required: "Project is required"
                            }} />
                        </FormElement>
                        <FormElement name="branch_name" label="Branch Name" aria-required>
                            <Input
                                {...register("branch_name", {
                                    required: "Branch Name is required"
                                })}
                                id="branch_name"
                                type="text"
                                placeholder="eg. main"
                            />
                        </FormElement>
                        <DialogFooter>
                            <div className="flex flex-row items-center w-full justify-between">
                                <div className="text-sm text-gray-500">{desc}</div>
                                <Button type="submit" disabled={loading || eventLoading}>
                                    {(loading || eventLoading) &&
                                        <div
                                            className="inline-block h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-current text-gray-200 border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                                            role="status">
                                        </div>}
                                    Submit
                                </Button>
                            </div>
                        </DialogFooter>
                    </div>
                </form>
            </FormProvider>
        </DialogContent>
    )
}

export default CreateBranchModal


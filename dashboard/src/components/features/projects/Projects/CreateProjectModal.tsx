import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useFrappeCreateDoc } from "frappe-react-sdk"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import { ProjectData } from "../Projects"
import { KeyedMutator } from "swr"
import { AsyncDropdown } from "@/components/common/AsyncDropdown/AsyncDropdown"
import { FormElement } from "@/components/common/Forms/FormControl"
import { useEffect } from "react"

export type FormFields = {
    org: string,
    repo_name: string,
    display_name: string,
    description: string,
}
interface CreateProjectModalProps {
    mutate: KeyedMutator<{ message: ProjectData[]; }>,
    onClose: VoidFunction
    open: boolean
}

const CreateProjectModal = ({ mutate, onClose, open }: CreateProjectModalProps) => {
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

    useEffect(() => {
        methods.reset()
    }, [open])

    return (
        <DialogContent className="p-6 w-[90vw] sm:w-full overflow-hidden">
            <DialogHeader className="text-left">
                <DialogTitle>Add Project</DialogTitle>
            </DialogHeader>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-3">
                        <FormElement name='org' label='Organization' aria-required>
                            <AsyncDropdown name="org" doctype="Commit Organization" placeholder="Select Organization" id="org" rules={{
                                required: 'Organization is required'
                            }} />
                        </FormElement>
                        <FormElement name='display_name' label='Project Display Name' aria-required>
                            <Input
                                {...methods.register("display_name", {
                                    required: "Project Display Name is required"
                                })}
                                id="display_name"
                                type="text"
                                placeholder="eg. Leave Management System"
                            />
                        </FormElement>
                        <FormElement name='repo_name' label='Project Repo Name' aria-required>
                            <Input
                                {...methods.register("repo_name", {
                                    required: "Project Repo Name is required"
                                })}
                                id="repo_name"
                                type="text"
                                placeholder="eg. lms"
                            />
                        </FormElement>
                        <FormElement name='description' label='Description'>
                            <Input
                                {...methods.register("description")}
                                id='description'
                                type="text"
                                placeholder="eg: Leave Management System is a full-stack web application."
                            />
                        </FormElement>
                        <DialogFooter>
                            <Button type="submit">
                                Submit
                            </Button>
                        </DialogFooter>
                    </div>
                </form>
            </FormProvider>
        </DialogContent>
    )
}

export default CreateProjectModal

import { FormCreatableSelect } from "@/components/common/Checkbox/CreatableSelect"
import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner"
import { FormElement } from "@/components/common/Forms/FormControl"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { CommitDocsPage } from "@/types/commit/CommitDocsPage"
import { useFrappeGetCall, useFrappePostCall } from "frappe-react-sdk"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"

interface CreateCommitDocsProps {
    onClose: VoidFunction
    open: boolean
    mutate: () => void
    commit_docs: string
}

interface CreateCommitDocsPage extends CommitDocsPage {
    sidebar_label: string
}

const CreateCommitDocsPage = ({ onClose, open, mutate, commit_docs }: CreateCommitDocsProps) => {

    const methods = useForm<CreateCommitDocsPage>({
        defaultValues: {
            commit_docs: commit_docs
        }
    })

    const [opt, setOpt] = useState<{
        label: string
        value: string
    }[]>([])

    const {data,error:labelEror} = useFrappeGetCall('commit.commit.doctype.commit_docs.commit_docs.get_docs_sidebar_parent_labels',{
        id: commit_docs
    },open ? undefined:null)

    useEffect(() => {
        methods.reset()
    }, [open])

    useEffect(() => {
        if(data && data.message){
            const options = [
                ...opt,
                ...data.message
            ]
            // Remove duplicates
            const uniqueOptions = options.filter((v, i, a) => a.findIndex(t => (t.value === v.value)) === i)
            setOpt(uniqueOptions)    
        }
    }, [data])

    const { call, error, loading } = useFrappePostCall('commit.commit.doctype.commit_docs_page.commit_docs_page.create_commit_docs_page')

    const { toast } = useToast()

    const onSubmit = (data: CreateCommitDocsPage) => {
        call({
            data:data
        }).then(() => {
            toast({
                title: "Page Created Successfully",
                duration: 1500
            })
            mutate()
            onClose()
        })
    }
    
    return (
        <DialogContent className="p-6 w-[90vw] sm:max-w-xl overflow-hidden">
            <DialogHeader className="text-left px-4">
                <DialogTitle>Add New Page</DialogTitle>
            </DialogHeader>
            <ErrorBanner error={error} />
            <ErrorBanner error={labelEror} />
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4 p-4">
                        <FormElement name="title" label="Title" aria-required>
                            <Input
                                {...methods.register("title", {
                                    required: "Title is required"
                                })}
                                id="header"
                                type="text"
                                placeholder="eg. Raven"
                            />
                        </FormElement>
                        <FormElement name="sidebar_label" label="Parent Label" aria-required>
                            <FormCreatableSelect
                                mode="single"
                                name="sidebar_label"
                                options={opt}
                                label="Parent Label"
                                onCreate={(value: string) => {
                                    methods.setValue('sidebar_label', value)
                                    setOpt(
                                        [...opt, {
                                            label: value,
                                            value: value
                                        }]
                                    )
                                }}
                            />
                            <p className="text-sm text-gray-500">Parent Label is the group under which the title will be shown</p>
                        </FormElement>

                        <DialogFooter className="mt-4">
                            <Button type="button" onClick={onClose} variant={'ghost'} disabled={loading}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                Submit
                            </Button>
                        </DialogFooter>
                    </div>
                </form>
            </FormProvider>
        </DialogContent>
    )
}

export default CreateCommitDocsPage
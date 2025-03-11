import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useFrappeCreateDoc } from "frappe-react-sdk"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import { FormElement } from "@/components/common/Forms/FormControl"
import { useEffect, useState } from "react"
import { CommitDocs } from "@/types/commit/CommitDocs"
import { Check } from "@/components/common/Checkbox/Check"
import { DocumentUploadModal } from "@/components/common/ImageUploader2/DocumentUploadModal"
import { File } from "@/types/Core/File"

interface CreateCommitDocsProps {
    onClose: VoidFunction
    open: boolean
    mutate: () => void
}

const CreateCommitDocs = ({ onClose, open ,mutate}: CreateCommitDocsProps) => {
    const { toast } = useToast()
    const methods = useForm<CommitDocs>({
        defaultValues:{
            published:1,
        }
    })

    const { createDoc, reset } = useFrappeCreateDoc()

    const onSubmit: SubmitHandler<CommitDocs> = (data) => {
        console.log(data)
        createDoc('Commit Docs', data)
            .then(() => {
                reset()
            }).then(() => {
                mutate()
                onClose()
                return toast({
                    description: "Documentation Added Successfully",
                    duration: 1500
                })
            })
    }

    useEffect(() => {
        methods.reset()
    }, [open])

    const lightModeLogo = methods.watch('light_mode_logo')
    const nightModeLogo = methods.watch('night_mode_logo')

    const [fieldName,setFieldName] = useState<null | 'light_mode_logo' | 'night_mode_logo'>(null)
    const [isOpen,setOpen] = useState(false)

    const onOpen = (field: 'light_mode_logo' | 'night_mode_logo') => {
        setFieldName(field)
        setOpen(true)
    }

    const onCloseModal = () => {
        setFieldName(null)
        setOpen(false)
        methods.clearErrors(); // Clear errors when modal is closed
    }

    const name = methods.watch('name')

    const onUpload = (files: File[]) => {
        if(fieldName){
            methods.setValue(fieldName,files[0].file_url,{
                shouldValidate:false,
                shouldDirty:true
            })
        }
    }

    const clearField = (field: 'light_mode_logo' | 'night_mode_logo') => {
        methods.setValue(field,'',{
            shouldValidate:false,
            shouldDirty:true
        })
    }

    return (
        <DialogContent className="p-6 w-[90vw] sm:max-w-4xl overflow-hidden">
            <DialogHeader className="text-left px-4">
                <DialogTitle>Add New Documentation</DialogTitle>
            </DialogHeader>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4 p-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormElement name="header" label="Header" aria-required>
                                <Input
                                    {...methods.register("header", {
                                        required: "Header is required"
                                    })}
                                    id="header"
                                    type="text"
                                    placeholder="eg. Raven"
                                />
                            </FormElement>
                            <FormElement name="route" label="Route" aria-required>
                                <Input
                                    {...methods.register("route", {
                                        required: "Route is required"
                                    })}
                                    id="route"
                                    type="text"
                                    placeholder="eg. raven"
                                />
                            </FormElement>
                            <FormElement name="company_name" label="Company" aria-required>
                                <Input
                                    {...methods.register("company_name", {
                                        required: "Company is required"
                                    })}
                                    id="company_name"
                                    type="text"
                                    placeholder="eg. Raven"
                                />
                            </FormElement>
                            <FormElement name="published">
                                <Check name="published" label="Published" alignWithLabel/>
                            </FormElement>
                        </div>
                        <FormElement name="description" label="Description">
                            <textarea
                                {...methods.register("description")}
                                id="description"
                                rows={3}
                                placeholder="eg. Raven is a full-stack web application."
                                className="w-full px-4 py-2 border rounded-lg mt-0.5"
                            />
                        </FormElement>
                        <div className="grid grid-cols-2 gap-4">
                            <FormElement name="light_mode_logo" label="Light Mode Logo">
                                {lightModeLogo ? (
                                      <div className="flex items-center gap-0">
                                      <Input
                                          {...methods.register("light_mode_logo")}
                                          id="light_mode_logo"
                                          type="text"
                                          placeholder="eg. https://example.com/light-mode-logo.png"
                                          readOnly
                                          className="rounded-r-none border-r-0"
                                      />
                                      <Button
                                          type="button"
                                          variant="outline"
                                          // size="sm"
                                          className="border-l-0 rounded-l-none bg-gray-200 hover:bg-gray-300"
                                          onClick={() => clearField('light_mode_logo')}
                                      >
                                          Clear
                                      </Button>
                                  </div>
                                  
                                ) : (
                                    <Button
                                        variant="outline"
                                        // size="sm"
                                        className="w-fit mt-0.5"
                                        onClick={() => onOpen('light_mode_logo')}
                                    >
                                        Attach
                                    </Button>
                                )}
                            </FormElement>
                            <FormElement name="night_mode_logo" label="Night Mode Logo">
                                {nightModeLogo ? (
                                    <div className="flex items-center gap-0">
                                        <Input
                                            {...methods.register("night_mode_logo")}
                                            id="night_mode_logo"
                                            type="text"
                                            placeholder="eg. https://example.com/night-mode-logo.png"
                                            className="rounded-r-none border-r-0"
                                            readOnly
                                            
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            // size="sm"
                                            className="border-l-0 rounded-l-none bg-gray-200 hover:bg-gray-300"
                                            onClick={() => clearField('night_mode_logo')}
                                        >
                                            Clear
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        variant="outline"
                                        // size="sm"
                                        className="w-fit mt-0.5"
                                        onClick={() => onOpen('night_mode_logo')}
                                    >
                                        Attach
                                    </Button>
                                )}
                            </FormElement>
                        </div>
                    <DialogFooter className="mt-4">
                        <Button type="button" onClick={onClose} variant={'ghost'}>
                            Cancel
                        </Button>
                        <Button>
                            Submit
                        </Button>
                    </DialogFooter>
                    </div>
                </form>
            </FormProvider>
            {fieldName && <DocumentUploadModal maxFiles={1} open={isOpen} onClose={onCloseModal} fieldname={fieldName} onUpdate={onUpload} doctype="Commit Docs" docname={name} accept={{'image/*': ['.jpeg', '.jpg', '.png']}} isPrivate={false}/>}
        </DialogContent>
    )
}

export default CreateCommitDocs

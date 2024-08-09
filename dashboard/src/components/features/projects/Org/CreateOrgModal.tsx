import { Button } from '@/components/ui/button'
import { DialogHeader, DialogTitle, DialogContent, DialogFooter } from '@/components/ui/dialog'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { useFrappeCreateDoc } from 'frappe-react-sdk'
import { useToast } from '@/components/ui/use-toast'
import { ProjectData } from '../Projects'
import { KeyedMutator } from 'swr'
import { ErrorBanner } from '@/components/common/ErrorBanner/ErrorBanner'
import { SpinnerLoader } from '@/components/common/FullPageLoader/SpinnerLoader'
import { FormElement } from '@/components/common/Forms/FormControl'
import { useEffect } from 'react'

type FormFields = {
    organization_name: string,
    github_org: string,
    about: string,
}

interface CreateOrgModalProps {
    mutate: KeyedMutator<{ message: ProjectData[]; }>
    onClose: () => void
    open: boolean
}


const CreateOrgModal = ({ mutate, onClose, open }: CreateOrgModalProps) => {
    const { toast } = useToast()
    const methods = useForm<FormFields>()

    const { createDoc, reset, loading, error } = useFrappeCreateDoc()

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        createDoc('Commit Organization', data)
            .then(() => {
                mutate()
                reset()
                onClose()
            }).then(() => toast({
                description: "Organization Added",
                duration: 1500
            }))
    }

    useEffect(() => {
        methods.reset()
    }, [open])

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add Organization</DialogTitle>
            </DialogHeader>
            {error && <ErrorBanner error={error} />}
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-3'>
                        <FormElement name='organization_name' label='Organization Name' aria-required>
                            <Input
                                {...methods.register("organization_name", {
                                    required: 'Organization Name is required'
                                })}
                                required
                                id="organization_name"
                                type="text"
                                placeholder="eg. Frappe Framework"
                            />
                        </FormElement>
                        <FormElement name='github_org' label='Github Org' aria-required>
                            <Input
                                {...methods.register("github_org", {
                                    required: 'Github Org is required'
                                })}
                                id='github_org'
                                type="text"
                                placeholder="eg. frappe"
                            />
                        </FormElement>
                        <FormElement name='about' label='About'>
                            <Input
                                {...methods.register("about")}
                                id='about'
                                type="text"
                                placeholder="eg: Frappe Framework is a full-stack web application."
                            />
                        </FormElement>
                        <DialogFooter>
                            <Button type="submit" disabled={loading}>
                                {loading && <SpinnerLoader />}
                                Submit
                            </Button>
                        </DialogFooter>
                    </div>
                </form>
            </FormProvider>
        </DialogContent>
    )
}

export default CreateOrgModal
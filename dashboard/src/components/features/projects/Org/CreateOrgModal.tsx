import { Button } from '@/components/ui/button'
import { DialogDescription, DialogHeader, DialogTitle, DialogContent, DialogFooter } from '@/components/ui/dialog'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFrappeCreateDoc } from 'frappe-react-sdk'
import { useToast } from '@/components/ui/use-toast'
import { ProjectData } from '../Projects'
import { KeyedMutator } from 'swr'
import { ErrorBanner } from '@/components/common/ErrorBanner/ErrorBanner'
import { SpinnerLoader } from '@/components/common/FullPageLoader/SpinnerLoader'

type FormFields = {
    organization_name: string,
    github_org: string,
    about: string,
}

interface CreateOrgModalProps {
    mutate: KeyedMutator<{ message: ProjectData[]; }>
    onClose: () => void
}


const CreateOrgModal = ({ mutate, onClose }: CreateOrgModalProps) => {
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

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add Organization</DialogTitle>
                <DialogDescription>
                    Please enter the Name and the Github Repo Name of the Organization.
                </DialogDescription>
            </DialogHeader>
            {error && <ErrorBanner error={error} />}
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Label htmlFor="orgname">Organization Name</Label>
                    <Input
                        {...methods.register("organization_name", {
                            required: 'Organization Name is required'
                        })}
                        required
                        id="orgname"
                        type="text"
                        placeholder="eg. Frappe Framework"
                        className="mb-3 p-3 w-full"
                    />
                    <Label htmlFor="githuborg">Github Org</Label>
                    <Input
                        {...methods.register("github_org")}
                        id='githuborg'
                        type="text"
                        placeholder="eg. frappe"
                        className="mb-3 p-3 w-full"
                    />
                    <Label htmlFor="about">About</Label>
                    <Input
                        {...methods.register("about")}
                        id='about'
                        type="text"
                        placeholder="Frappe Framework is a full-stack web application."
                        className="mb-3 p-3 w-full"
                    />
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading && <SpinnerLoader />}
                            Submit
                        </Button>
                    </DialogFooter>
                </form>
            </FormProvider>
        </DialogContent>
    )
}

export default CreateOrgModal
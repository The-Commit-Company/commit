import { Button } from '@/components/ui/button'
import { DialogDescription, DialogHeader, DialogTitle, DialogContent } from '@/components/ui/dialog'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFrappeCreateDoc } from 'frappe-react-sdk'
import { useToast } from '@/components/ui/use-toast'
import { DialogClose } from '@radix-ui/react-dialog'
import { KeyedMutator } from 'swr'
import { ProjectData } from '../Projects'

type FormFields = {
    organization_name: string,
    github_org: string,
    about: string,
}


const CreateOrgModal = ({ mutate }: {
    mutate: KeyedMutator<{
        message: ProjectData[];
    }>
}) => {
    const { toast } = useToast()
    const methods = useForm<FormFields>()

    const { createDoc, reset } = useFrappeCreateDoc()

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        createDoc('Commit Organization', data)
            .then(() => {
                mutate()
                reset()
            }).then(() => toast({
                description: "Organization Added",
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
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Label htmlFor="orgname">Organization Name</Label>
                    <Input
                        {...methods.register("organization_name")}
                        id="orgname"
                        type="text"
                        placeholder="eg. Frappe Framework"
                        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
                    />
                    <Label htmlFor="githuborg">Github Org</Label>
                    <Input
                        {...methods.register("github_org")}
                        id='githuborg'
                        type="text"
                        placeholder="eg. frappe"
                        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
                    />
                    <Label htmlFor="about">About</Label>
                    <Input
                        {...methods.register("about")}
                        id='about'
                        type="text"
                        placeholder=""
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

export default CreateOrgModal
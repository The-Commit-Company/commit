import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { convertFrappeTimestampToTimeAgo } from '@/components/utils/dateconversion'
import { CommitProjectBranch } from '@/types/commit/CommitProjectBranch'
import { useFrappeDeleteDoc, useFrappePostCall, useFrappeUpdateDoc } from 'frappe-react-sdk'
import { AiOutlineDelete } from 'react-icons/ai'
import { IoMdSync } from 'react-icons/io'
import { ProjectData } from '../Projects'
import { KeyedMutator } from 'swr'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { useState } from 'react'


const ManageBranchItem = ({ branch, mutate }: { branch: CommitProjectBranch, mutate: KeyedMutator<{ message: ProjectData[]; }> }) => {
    const { call, loading, reset: callReset } = useFrappePostCall<{ message: any }>('commit.commit.doctype.commit_project_branch.commit_project_branch.fetch_repo')


    const { deleteDoc, reset, loading: deleteLoading } = useFrappeDeleteDoc()

    const handleDelete = () => {
        deleteDoc("Commit Project Branch", branch.name)
            .then(() => {
                mutate()
                reset()
            }).then(() => toast({
                description: "Branch Deleted Successfully",
                duration: 1500
            }))
    }

    const handleSync = () => {
        call({
            doc: {},
            name: branch.name,
        }).then(() => {
            mutate()
            callReset()
        }).then(() => toast({
            description: "Branch Synced!",
            duration: 1500
        }))
    }

    const methods = useForm<CommitProjectBranch>({
        defaultValues: {
            frequency : branch.frequency
        }
    })

    const { control, reset: formReset } = methods

    const { updateDoc } = useFrappeUpdateDoc()

    const onSubmit = (data: CommitProjectBranch) => {
        updateDoc("Commit Project Branch", branch.name, data)
            .then(() => {
                mutate()
                formReset({ frequency: data.frequency })
            }).then(() => {
                toast({
                    description: `Branch ${branch.branch_name} will be updated ${data.frequency}`,
                    duration: 2000
                })
                setOpen(false)
            }
            )

    }


    const [open, setOpen] = useState(false);

    return (
        <li className="pl-0 pt-2 hover:shadow-sm flex justify-between">
            <div className="flex flex-col items-start text-md tracking-normal">
                {branch.branch_name}
                <div className='text-xs text-gray-500'>
                    Last synced {convertFrappeTimestampToTimeAgo(branch.last_fetched)}
                </div>
            </div>
            <div className="flex gap-2">
                <Button
                    className="flex gap-2 text-sm"
                    variant="secondary"
                    size={'sm'}
                    onClick={() => handleSync()}
                    disabled={deleteLoading || loading}
                >
                    <IoMdSync className={loading ? 'animate-spin' : ''} />
                    Fetch latest code
                </Button>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            className="text-sm w-[16ch]"
                            variant="outline"
                            onClick={() => setOpen(true)}
                            size={'sm'}>{branch.frequency ?? "Select Frequency" }</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmit)}>
                                <div className="flex flex-col items-start p-1">
                                    <Label className='text-normal text-gray-700'>Select frequency for updating Branch</Label>
                                    <Controller
                                        control={control}
                                        name='frequency'
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="h-8 w-full mt-4 p-2">
                                                    <SelectValue placeholder="Select Frequency" />
                                                </SelectTrigger>
                                                <SelectContent >
                                                    <SelectItem value="Daily">Daily</SelectItem>
                                                    <SelectItem value="Weekly">Weekly</SelectItem>
                                                    <SelectItem value="Monthly">Monthly</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>
                                <div className='flex justify-end items-end w-full'>
                                    <Button
                                        type="submit"
                                        className='mt-3'
                                    >Set
                                    </Button>
                                </div>
                            </form>
                        </FormProvider>
                    </PopoverContent>
                </Popover>
                <Button
                    size={'sm'}
                    className="text-lg p-2" variant="destructive"
                    onClick={() => handleDelete()}
                    disabled={deleteLoading || loading}
                >
                    <AiOutlineDelete />
                </Button>
            </div>
        </li >
    )
}

export default ManageBranchItem



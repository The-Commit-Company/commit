import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { convertFrappeTimestampToTimeAgo } from '@/components/utils/dateconversion';
import { CommitProjectBranch } from '@/types/commit/CommitProjectBranch';
import { useFrappeDeleteDoc, useFrappePostCall, useFrappeUpdateDoc } from 'frappe-react-sdk';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdSync } from 'react-icons/io';
import { ProjectData } from '../Projects';
import { KeyedMutator } from 'swr';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const ManageBranchItem = ({ branch, mutate }: { branch: CommitProjectBranch, mutate: KeyedMutator<{ message: ProjectData[]; }> }) => {
    const { call, loading: syncLoading, reset: callReset } = useFrappePostCall<{ message: any }>('commit.commit.doctype.commit_project_branch.commit_project_branch.fetch_repo');
    const { deleteDoc, loading: deleteLoading, reset } = useFrappeDeleteDoc();
    const { updateDoc } = useFrappeUpdateDoc();
    const [open, setOpen] = useState(false);

    const methods = useForm<CommitProjectBranch>({
        defaultValues: {
            frequency: branch.frequency,
        },
    });

    const handleDelete = () => {
        deleteDoc("Commit Project Branch", branch.name)
            .then(() => {
                mutate();
                reset();
                toast({
                    description: "Branch Deleted Successfully",
                    duration: 1500,
                });
            });
    };

    const handleSync = () => {
        call({ doc: {}, name: branch.name })
            .then(() => {
                mutate();
                callReset();
                toast({
                    description: "Branch Synced!",
                    duration: 1500,
                });
            });
    };

    const onSubmit = (data: CommitProjectBranch) => {
        updateDoc("Commit Project Branch", branch.name, data)
            .then(() => {
                mutate();
                methods.reset({ frequency: data.frequency });
                toast({
                    description: `Branch ${branch.branch_name} will be updated ${data.frequency}`,
                    duration: 2000,
                });
                setOpen(false);
            });
    };

    return (
        <li className="p-2 hover:shadow-sm flex justify-between items-center">
            <BranchInfo branch={branch} />
            <div className="flex gap-2 items-center">
                <SyncButton loading={syncLoading} onSync={handleSync} />
                <FrequencyPopover
                    open={open}
                    setOpen={setOpen}
                    methods={methods}
                    onSubmit={methods.handleSubmit(onSubmit)}
                    control={methods.control}
                    frequency={branch.frequency}
                />
                <DeleteButton loading={deleteLoading} onDelete={handleDelete} />
            </div>
        </li>
    );
};

const BranchInfo = ({ branch }: { branch: CommitProjectBranch }) => (
    <div className="flex flex-col items-start">
        <span className="text-md font-medium">{branch.branch_name}</span>
        <span className="text-xs text-gray-500">Last synced {convertFrappeTimestampToTimeAgo(branch.last_fetched)}</span>
    </div>
);

const SyncButton = ({ loading, onSync }: { loading: boolean, onSync: () => void }) => (
    <Button
        className="flex gap-2 text-sm"
        variant="secondary"
        size="sm"
        onClick={onSync}
        disabled={loading}
        aria-label="Sync branch"
    >
        <IoMdSync className={loading ? 'animate-spin' : ''} />
        Fetch latest code
    </Button>
);

const FrequencyPopover = ({ open, setOpen, methods, onSubmit, control, frequency }: {
    open: boolean,
    setOpen: (open: boolean) => void,
    methods: any,
    onSubmit: any,
    control: any,
    frequency: string | undefined
}) => (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
                className="text-sm w-[16ch]"
                variant="outline"
                onClick={() => setOpen(true)}
                size="sm"
                aria-label="Set update frequency"
            >
                {frequency ?? "Select Frequency"}
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
            <FormProvider {...methods}>
                <form onSubmit={onSubmit}>
                    <div className="flex flex-col p-2">
                        <Label className="text-normal text-gray-700">Select frequency for updating Branch</Label>
                        <Controller
                            control={control}
                            name="frequency"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="h-8 w-full mt-4">
                                        <SelectValue placeholder="Select Frequency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Daily">Daily</SelectItem>
                                        <SelectItem value="Weekly">Weekly</SelectItem>
                                        <SelectItem value="Monthly">Monthly</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                    <div className="flex justify-end mt-3">
                        <Button type="submit" size="sm">Set</Button>
                    </div>
                </form>
            </FormProvider>
        </PopoverContent>
    </Popover>
);

const DeleteButton = ({ loading, onDelete }: { loading: boolean, onDelete: () => void }) => (
    <Button
        size="sm"
        className="text-lg p-2"
        variant="destructive"
        onClick={onDelete}
        disabled={loading}
        aria-label="Delete branch"
    >
        <AiOutlineDelete />
    </Button>
);

export default ManageBranchItem;

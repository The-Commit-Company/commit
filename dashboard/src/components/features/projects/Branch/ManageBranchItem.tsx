import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { convertFrappeTimestampToTimeAgo } from '@/components/utils/dateconversion'
import { CommitProjectBranch } from '@/types/commit/CommitProjectBranch'
import { useFrappeDeleteDoc, useFrappePostCall } from 'frappe-react-sdk'
import { AiOutlineDelete } from 'react-icons/ai'
import { IoMdSync } from 'react-icons/io'
import { ProjectData } from '../Projects'
import { KeyedMutator } from 'swr'


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

    return (
        <li className="pl-0 pt-2 hover:shadow-sm flex justify-between">
            <div className="flex flex-col items-start text-md tracking-normal">
                {branch.branch_name}
                <div className='text-xs text-gray-500 pl-0'>
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
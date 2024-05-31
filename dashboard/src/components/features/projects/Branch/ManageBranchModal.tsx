import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ProjectData } from "../Projects"
import { Button } from "@/components/ui/button"
import { KeyedMutator } from "swr"
import { CommitProjectBranch } from "@/types/commit/CommitProjectBranch"
import ManageBranchItem from "./ManageBranchItem"

export interface ManageBranchModalProps {
    branches: CommitProjectBranch[]
    mutate: KeyedMutator<{ message: ProjectData[]; }>
    setOpenManageModal: React.Dispatch<React.SetStateAction<boolean>>
}


const ManageBranchModal = ({ branches, mutate, setOpenManageModal }: ManageBranchModalProps) => {

    return (
        <DialogContent className="sm:max-w-[600px] sm:max-h-[800px] overflow-y-scroll">
            <DialogHeader>
                <DialogTitle>Manage Branches</DialogTitle>
            </DialogHeader>
            <ul role="list" className="divide-y divide-gray-200">
                {branches?.map((branch: CommitProjectBranch) => {
                    return (
                        <ManageBranchItem key={branch.name} branch={branch} mutate={mutate} />
                    )
                }
                )}
            </ul>
            <DialogFooter>
                <Button variant="outline" onClick={() => setOpenManageModal(false)}>
                    Close
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}


export default ManageBranchModal
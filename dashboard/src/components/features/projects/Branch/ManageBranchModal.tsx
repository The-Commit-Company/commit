import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ProjectData } from "../Projects"
import { Button } from "@/components/ui/button"
import { KeyedMutator } from "swr"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { useFrappeDeleteDoc } from "frappe-react-sdk"
import { CommitProjectBranch } from "@/types/commit/CommitProjectBranch"
import { toast } from "@/components/ui/use-toast"

export interface ManageBranchModalProps {
    branches: CommitProjectBranch[]
    mutate: KeyedMutator<{ message: ProjectData[]; }>
    setOpenManageModal: React.Dispatch<React.SetStateAction<boolean>>
}


const ManageBranchModal = ({ branches, mutate, setOpenManageModal }: ManageBranchModalProps) => {


    const [branchList, setBranchList] = useState<string[]>([])


    const { deleteDoc, reset } = useFrappeDeleteDoc()

    const handleDelete = (branchList: string[]) => {
        branchList.map((branchListItem) => {
            deleteDoc("Commit Project Branch", branchListItem)
                .then(() => {
                    setBranchList([])
                    mutate()
                    reset()
                    setOpenManageModal(false)

                }).then(() => toast({
                    description: "Branch Deleted",
                    variant: "destructive",
                }))
        })
    }

    return (
        <DialogContent className="sm:max-w-[600px] sm:max-h-[800px] overflow-y-scroll">
            <DialogHeader>
                <DialogTitle>Manage Branches</DialogTitle>
                <DialogDescription>
                    Select Branches to delete.
                </DialogDescription>
            </DialogHeader>
            <ul role="list" className="divide-y divide-gray-200">
                {branches?.map((branch: CommitProjectBranch) => {
                    return (
                        <li className="pl-0 py-2 hover:shadow-sm">
                            <div className="flex justify-between text-semibold">
                                <div className="flex gap-3 justify-start items-center text-lg font-medium tracking-normal">
                                    <Checkbox
                                        id='checkbox'
                                        className="border-gray-300 text-gray-600 shadow-sm"
                                        checked={branchList.includes(branch.name)}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setBranchList([...branchList, branch.name])
                                            } else {
                                                setBranchList(branchList.filter((x) => x !== branch.name))
                                            }
                                        }}
                                    >
                                    </Checkbox>
                                    <label htmlFor="checkbox">
                                        {branch.branch_name}
                                    </label>
                                </div>
                            </div>
                        </li>
                    )
                }
                )}

            </ul>
            <DialogFooter>
                <Button variant="destructive" onClick={() => handleDelete(branchList)}>
                    Delete
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}


export default ManageBranchModal
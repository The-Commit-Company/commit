import { FullPageLoader } from "@/components/common/FullPageLoader.tsx/FullPageLoader"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { CommitProject } from "@/types/commit/CommitProject"
import { useFrappeGetCall } from "frappe-react-sdk"
import { useState } from "react"
import { BsDatabase } from "react-icons/bs"
import { MdAddBox } from "react-icons/md"
import CreateOrgModal from "./Org/CreateOrgModal"
import { ViewERDDialogContent } from "./ViewERDAppDialog"
import { isSystemManager } from "@/utils/roles"
import { CommitProjectBranch } from "@/types/commit/CommitProjectBranch"
import { OrgComponent } from "./Org/OrgList"

export interface ProjectWithBranch extends CommitProject {
    branches: CommitProjectBranch[]
}
export interface ProjectData extends CommitProjectBranch {
    projects: ProjectWithBranch[]
    organization_name: string
    image: string
    name: string
    about: string
}
export const Projects = () => {

    const isCreateAccess = isSystemManager()

    const { data, error, isLoading, mutate } = useFrappeGetCall<{ message: ProjectData[] }>('commit.api.commit_project.commit_project.get_project_list_with_branches')

    const [createOrg, setCreateOrg] = useState<boolean>(false)

    const handleOrgClose = () => {
        setCreateOrg(false)
    }

    if (error) {
        return <div>Error</div>
    }

    if (isLoading) {
        return <FullPageLoader />
    }

    if (data && data.message) {
        return (
            <div className="mx-auto pl-2 pr-4 h-[calc(100vh-4rem)]">
                <div className="h-full">
                    <div className="flex gap-2 flex-row items-center justify-end">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size='sm' disabled={data.message.length === 0} variant={'outline'}>
                                        <BsDatabase className='mr-2' /> View ERD
                                    </Button>
                                </DialogTrigger>
                                <ViewERDDialogContent data={data.message} />
                        </Dialog>
                            {isCreateAccess && <Button size='sm' onClick={() => setCreateOrg(true)}>
                            <MdAddBox className="mr-2" />
                            Add Organization
                        </Button>}
                    </div>
                    <ul role="list" className="space-y-2 py-2">
                        {data.message.map((org: ProjectData) => {
                            return <OrgComponent org={org} key={org.organization_name} mutate={mutate} />
                        })}
                    </ul>
                </div>
                <Dialog open={createOrg} onOpenChange={setCreateOrg}>
                    <CreateOrgModal mutate={mutate} onClose={handleOrgClose} />
                </Dialog>
            </div>
        )
    }
}
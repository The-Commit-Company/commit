import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { IoIosGitBranch } from "react-icons/io"
import { MdAdd } from "react-icons/md"
import { VscGithubProject, VscOrganization } from "react-icons/vsc"
import CreateOrgModal from "./Org/CreateOrgModal"
import { KeyedMutator } from "swr"
import { ProjectData } from "./Projects"
import CreateProjectModal from "./Projects/CreateProjectModal"
import CreateBranchModal from "./Branch/CreateBranchModal"

export const AddMenuButton = ({ mutate }: {
    mutate: KeyedMutator<{
        message: ProjectData[];
    }>
}) => {

    const [createOrg, setCreateOrg] = useState<boolean>(false)

    const handleOrgClose = () => {
        setCreateOrg(false)
    }

    const [createProject, setCreateProject] = useState<boolean>(false)

    const handleProjectClose = () => {
        setCreateProject(false)
    }

    const [open, setOpen] = useState(false)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size='sm' variant="outline">
                    Add
                    <MdAdd className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem onClick={() => setCreateOrg(true)} >
                    <VscOrganization className="mr-2 h-4 w-4" />
                    <span>Add Org</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCreateProject(true)}>
                    <VscGithubProject className="mr-2 h-4 w-4" />
                    <span>Add Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpen(true)} >
                    <IoIosGitBranch className="mr-2 h-4 w-4" />
                    <span>Add Branch</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
            <Dialog open={createOrg} onOpenChange={setCreateOrg}>
                <CreateOrgModal mutate={mutate} onClose={handleOrgClose} />
            </Dialog>
            <Dialog open={createProject} onOpenChange={setCreateProject}>
                <CreateProjectModal onClose={handleProjectClose} mutate={mutate} />
            </Dialog>
            <Dialog open={open} onOpenChange={setOpen}>
                <CreateBranchModal mutate={mutate} setOpen={setOpen} />
            </Dialog>
        </DropdownMenu>
    )
}

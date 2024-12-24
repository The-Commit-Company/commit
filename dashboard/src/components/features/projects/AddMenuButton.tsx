import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import CreateOrgModal from "./Org/CreateOrgModal"
import { KeyedMutator } from "swr"
import { ProjectData } from "./Projects"
import CreateProjectModal from "./Projects/CreateProjectModal"
import CreateBranchModal from "./Branch/CreateBranchModal"
import { Building, GitBranch, PanelsTopLeft, Plus } from "lucide-react"

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
                    <Plus className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem onClick={() => setCreateOrg(true)} >
                    <Building className="mr-2 h-4 w-4" />
                    <span>Add Org</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCreateProject(true)}>
                    <PanelsTopLeft className="mr-2 h-4 w-4" />
                    <span>Add Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpen(true)} >
                    <GitBranch className="mr-2 h-4 w-4" />
                    <span>Add Branch</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
            <Dialog open={createOrg} onOpenChange={setCreateOrg}>
                <CreateOrgModal mutate={mutate} onClose={handleOrgClose} open={createOrg} />
            </Dialog>
            <Dialog open={createProject} onOpenChange={setCreateProject}>
                <CreateProjectModal onClose={handleProjectClose} mutate={mutate} open={createProject} />
            </Dialog>
            <Dialog open={open} onOpenChange={setOpen}>
                <CreateBranchModal mutate={mutate} setOpen={setOpen} open={open} />
            </Dialog>
        </DropdownMenu>
    )
}

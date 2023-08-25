import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DocField } from "@/types/Core/DocField";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { FieldActionModal } from "./FieldModal";

export const FieldActionButton = ({ field }: { field: DocField }) => {

    const [open, setOpen] = useState(false)

    const onOpen = () => setOpen(true)

    const onClose = () => setOpen(false)

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <DotsHorizontalIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={onOpen}>View details</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <FieldActionModal field={field} open={open} onClose={onClose} key={field.name} />
        </>
    )

}
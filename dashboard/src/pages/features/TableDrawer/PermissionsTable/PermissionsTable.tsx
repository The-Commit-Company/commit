import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DocPerm } from "@/types/Core/DocPerm";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getFacetedUniqueValues,
    VisibilityState,
    flexRender,
} from "@tanstack/react-table";
import { useState } from "react";

export const PermissionsTable = ({ permissions }: { permissions: DocPerm[] }) => {

    const columns: ColumnDef<DocPerm>[] = [

        {
            accessorKey: "role",
            header: "Role",
            cell: ({ row }) => (
                <div>{row.getValue("role")}</div>
            ),
        },
        {
            accessorKey: "permlevel",
            header: "Level",
            cell: ({ row }) => <div>{row.getValue("permlevel") ?? 0}</div>,
        },
        {
            accessorKey: "select",
            header: "Select",
            cell: ({ row }) => <Checkbox id={row.id} checked={row.getValue("select") ? true : false} disabled={true} />,
        },
        {
            accessorKey: "read",
            header: "Read",
            cell: ({ row }) => <Checkbox id={row.id} checked={row.getValue("read") ? true : false} disabled={true} />,
        },
        {
            accessorKey: "write",
            header: "Write",
            cell: ({ row }) => <Checkbox id={row.id} checked={row.getValue("write") ? true : false} disabled={true} />,

        },
        {
            accessorKey: "create",
            header: "Create",
            cell: ({ row }) => <Checkbox id={row.id} checked={row.getValue("create") ? true : false} disabled={true} />,
        },
        {
            accessorKey: "delete",
            header: "Delete",
            cell: ({ row }) => <Checkbox id={row.id} checked={row.getValue("delete") ? true : false} disabled={true} />,
        },
        {
            accessorKey: "submit",
            header: "Submit",
            cell: ({ row }) => <Checkbox id={row.id} checked={row.getValue("submit") ? true : false} disabled={true} />,
        },
        {
            accessorKey: "cancel",
            header: "Cancel",
            cell: ({ row }) => <Checkbox id={row.id} checked={row.getValue("cancel") ? true : false} disabled={true} />,

        },
        {
            accessorKey: "amend",
            header: "Amend",
            cell: ({ row }) => <Checkbox id={row.id} checked={row.getValue("amend") ? true : false} disabled={true} />,
        },
        {
            accessorKey: "report",
            header: "Report",
            cell: ({ row }) => <Checkbox id={row.id} checked={row.getValue("report") ? true : false} disabled={true} />,

        },
        {
            accessorKey: "import",
            header: "Import",
            cell: ({ row }) => <Checkbox id={row.id} checked={row.getValue("import") ? true : false} disabled={true} />,
        },
        {
            accessorKey: "export",
            header: "Export",
            cell: ({ row }) => <Checkbox id={row.id} checked={row.getValue("export") ? true : false} disabled={true} />,
        },
        {
            accessorKey: "print",
            header: "Print",
            cell: ({ row }) => <Checkbox id={row.id} checked={row.getValue("print") ? true : false} disabled={true} />,
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => <Checkbox id={row.id} checked={row.getValue("email") ? true : false} disabled={true} />,
        }, {
            accessorKey: "share",
            header: "Share",
            cell: ({ row }) => <Checkbox id={row.id} checked={row.getValue("share") ? true : false} disabled={true} />,
        },
    ]

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({ 'cancel': false, 'amend': false, 'report': false, 'import': false, 'export': false, 'print': false, 'email': false, 'share': false })

    const table = useReactTable({
        data: permissions,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            columnVisibility
        }
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    Total {table.getFilteredRowModel().rows.length} row(s).
                </div>
            </div>
        </div>
    )

}
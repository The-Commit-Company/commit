import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { DocTypeLink } from "@/types/Core/DocTypeLink";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ColumnDef, VisibilityState, flexRender, getCoreRowModel, getFacetedUniqueValues, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";


export const LinkTable = ({ links }: { links: DocTypeLink[] }) => {

    const columns: ColumnDef<DocTypeLink>[] = [
        {
            accessorKey: "link_doctype",
            header: "Link Doctype",
            cell: ({ row }) => (
                <div>{row.getValue("link_doctype")}</div>
            ),

        },
        {
            accessorKey: "link_fieldname",
            header: "Link Fieldname",
            cell: ({ row }) => <div>{row.getValue("link_fieldname")}</div>,
        },
        {
            accessorKey: "group",
            header: "Group",
            cell: ({ row }) => <div>{row.getValue("group")}</div>,
        },
        {
            accessorKey: "table_fieldname",
            header: "Table Field",
            cell: ({ row }) => <div>{row.getValue("table_fieldname")}</div>,
        }, {
            accessorKey: "hidden",
            header: "Hidden",
            cell: ({ row }) => <Checkbox id={row.id} checked={row.getValue("hidden") ? true : false} disabled={true} />,
        },
        {
            accessorKey: "is_child_table",
            header: "Child Table",
            cell: ({ row }) => <Checkbox id={row.id} checked={row.getValue("is_child_table") ? true : false} disabled={true} />,
        },
    ]

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({ 'hidden': false, 'is_child_table': false, 'table_fieldname': false })

    const table = useReactTable({
        data: links,
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
                                        <TableHead key={header.id}>
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
                                        <TableCell key={cell.id} >
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
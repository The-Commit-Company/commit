import {
    CheckIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getFacetedUniqueValues,
    useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DocField } from "@/types/Core/DocField"
import { useToast } from "@/components/ui/use-toast"
import { useMemo, useState } from "react"
import { FieldTypeOptions } from "./FieldTypeOptions"
import { DataTableFacetedFilter } from "./FieldTypeFilters"
import { Checkbox } from "@/components/ui/checkbox"
import { OptionsComponent } from "./IconTextComponent"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export interface DrawerTableProps {
    data: DocField[]
}

export const UnwantedDataTypes = [
    'Tab Break',
    'Column Break',
    'Section Break',
    'HTML',
    'Button',
    'Barcode',
    'Fold',
    'Heading',
    'HTML Editor',
    'Markdown Editor',
    'Icon',
]

export const FieldsTable = ({ data }: DrawerTableProps) => {
    const { toast } = useToast()


    const copyData = async (value: string) => {
        try {
            await navigator.clipboard.writeText(value);

        } catch (error) {
            console.error("Clipboard copy error:", error);
        }
    }

    const toastCopy = (value: string) => {
        toast({
            title: "Copied",
            description: <div className='flex flex-row items-center'>
                <CheckIcon className='mr-1' />
                <div className='mr-1'>{value} Copied to clipboard</div>
            </div>,
            duration: 2000,
        });
    }


    const columns: ColumnDef<DocField>[] = [
        // {
        //     id: "select",
        //     header: ({ table }) => (
        //         <Checkbox
        //             checked={table.getIsAllPageRowsSelected()}
        //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        //             aria-label="Select all"
        //         />
        //     ),
        //     cell: ({ row }) => (
        //         <Checkbox
        //             checked={row.getIsSelected()}
        //             onCheckedChange={(value) => row.toggleSelected(!!value)}
        //             aria-label="Select row"
        //         />
        //     ),
        //     enableSorting: false,
        //     enableHiding: false,
        // },
        {
            accessorKey: "label",
            header: "Label",
            cell: ({ row }) => (
                <div>{row.getValue("label")}</div>
            ),
        },
        {
            accessorKey: "fieldname",
            header: () => <div className="text-start">Name</div>,
            cell: ({ row }) => <TooltipProvider>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                        <div style={{ cursor: 'pointer' }}>{row.getValue("fieldname")}</div>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={4} className="bg-zinc-600 border border-zinc-700">
                        <div className="text-sm py-0">
                            {'copy'}
                        </div>
                    </TooltipContent>
                </Tooltip >
            </TooltipProvider >,
        },
        {
            accessorKey: "fieldtype",
            header: () => <div className="text-start">Type</div>,
            cell: ({ row }) => <div> <OptionsComponent field={row.original} /></div>,
            filterFn: (row, id, value: string) => {
                return value.includes(row.getValue(id))
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <DotsHorizontalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => {
                                    copyData(row.getValue("label"))
                                        .then(() => {
                                            toastCopy('Label')
                                        })
                                        .catch(error => {
                                            console.error("Copy error:", error);
                                        });
                                }}>
                                Copy Label
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                                copyData(row.getValue("fieldname"))
                                    .then(() => {
                                        toastCopy('Name')
                                    })
                                    .catch(error => {
                                        console.error("Copy error:", error);
                                    });
                            }}>Copy Name</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View details</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const ValidData = useMemo(() => {
        return data.filter((field) => {
            return !UnwantedDataTypes.includes(field.fieldtype)
        })

    }, [data])

    const [isFetchFrom, setIsFetchFrom] = useState(false)

    const FilterData = useMemo(() => {
        if (isFetchFrom) {
            return ValidData.filter((field) => {
                return field.fetch_from !== undefined && field.fetch_from !== null && field.fetch_from !== ''
            })
        }
        return ValidData
    }, [ValidData, isFetchFrom])

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data: FilterData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getFacetedUniqueValues: getFacetedUniqueValues(),
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })
    return (
        <div className="w-full">
            <div className="flex items-center py-2">
                <Input
                    placeholder="Filter label..."
                    value={(table.getColumn("label")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("label")?.setFilterValue(event.target.value)
                    }
                    className="max-w-xs"
                />
                <div className="px-2">
                    {table.getColumn("fieldtype") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("fieldtype")}
                            title="Fieldtype"
                            options={FieldTypeOptions}
                        />
                    )}
                </div>
                <div className="px-2 flex items-center">
                    <Checkbox id="fetch_from" checked={isFetchFrom} onCheckedChange={(value) => setIsFetchFrom(!!value)} />
                    <label htmlFor="fetch_from" className="ml-2 text-xs text-gray-700">Fetch From</label>
                </div>
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
                                        <TableHead key={header.id}
                                            style={{
                                                paddingTop: '0.25rem',
                                                paddingBottom: '0.25rem',
                                            }} >
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
                                        <TableCell key={cell.id} style={{
                                            paddingTop: '0.25rem',
                                            paddingBottom: '0.25rem',
                                        }} >
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
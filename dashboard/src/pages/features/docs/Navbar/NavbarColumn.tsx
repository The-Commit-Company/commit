import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { NavbarTask, NavbarTaskCard } from './NavbarTaskCard';
import { cva } from 'class-variance-authority';
import { useMemo, useState, useCallback } from 'react';
import { CSS } from "@dnd-kit/utilities";
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { NavbarColumnData } from './NavbarBoard';
import { UniqueIdentifier } from '@dnd-kit/core';
import { Checkbox } from '@/components/ui/checkbox';

export interface Column {
    id: UniqueIdentifier;
    label: string;
}

export type ColumnType = "Column";

export interface ColumnDragData {
    type: ColumnType;
    column: Column;
}
export function NavbarColumn({
    column,
    tasks,
    handleDeleteColumn,
    handleDeleteTask,
    handleUpdateTask,
    handleUpdateColumn,
    handleUpdateColumnTitle,
    handleAddTask,
    index
}: {
    column: NavbarColumnData;
    tasks: NavbarTask[];
    handleDeleteTask: (id: UniqueIdentifier) => void;
    handleDeleteColumn: (id: UniqueIdentifier) => void;
    handleUpdateTask: (id: UniqueIdentifier, task: NavbarTask) => void;
    handleUpdateColumn: (id: UniqueIdentifier, column: NavbarColumnData) => void;
    handleUpdateColumnTitle: (id: string, title: string) => void;
    handleAddTask: (task: NavbarTask) => void;
    index: number;
}) {
    const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: column.id,
        data: { type: "Column", column } satisfies ColumnDragData,
        attributes: { roleDescription: `Column: ${column.label}` },
    });

    const style = { transition, transform: CSS.Translate.toString(transform) };

    const variants = cva(
        "h-[40vh] max-h-[40vh] w-auto bg-zinc-100 dark:bg-white/[0.04] flex flex-col flex-shrink-0 rounded-lg border",
        {
            variants: {
                dragging: {
                    default: "border-2 border-transparent",
                    over: "ring-2 opacity-30",
                    overlay: "ring-2 ring-primary",
                },
            },
        }
    );

    const [newTask, setNewTask] = useState<NavbarTask | null>(null);

    const [open, setOpen] = useState(false);

    const addTask = useCallback(() => {
        if (newTask?.label && newTask?.url) {
            handleAddTask({
                id: newTask.label,
                columnId: column.id,
                label: newTask.label,
                url: newTask.url,
                open_in_new_tab: newTask.open_in_new_tab || false,
            });
            setNewTask(null);
            setOpen(false);
        }
    }, [newTask, column.id, handleAddTask]);

    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(column.label);


    const handleChange = (field: keyof NavbarTask, value: any) => {
        setNewTask((prev) => {
            if (!prev) {
                return {
                    id: '',
                    columnId: column.id,
                    label: '',
                    url: '',
                    open_in_new_tab: false,
                }
            }

            return {
                ...prev,
                [field]: value,
            };
        });

    };

    const handleBlur = () => {
        setIsEditing(false);
        if (newTitle.trim() !== "" && newTitle !== column.label) {
            handleUpdateColumnTitle(column.id, newTitle);
        }
    };
    return (
        <Card
            ref={setNodeRef}
            style={style}
            className={variants({ dragging: isDragging ? "over" : undefined })}
        >
            <CardHeader className="p-2 px-4 font-semibold border-b flex flex-row items-center justify-between bg-white z-10 sticky top-0 rounded-t-lg">
                <span className="text-sm text-primary/80 flex flex-row items-center gap-1">
                    <span className="font-semibold">{index + 1}. </span>
                    {isEditing ? (
                        <Input
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            onBlur={handleBlur}
                            onKeyDown={(e) => e.key === "Enter" && handleBlur()}
                            autoFocus
                            className="border-none shadow-none h-4 bg-transparent p-1 :focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:border-none"
                        />
                    ) : (
                        <h3
                            className="font-semibold cursor-pointer p-1"
                            onDoubleClick={() => setIsEditing(true)}
                        >
                            {column.label}
                        </h3>
                    )}
                </span>
                <div className="flex items-center gap-1">
                    {column.type === "Menu" && <Popover key={column.id}
                        open={open} onOpenChange={
                            (open) => {
                                setOpen(open);
                                if (!open) {
                                    setNewTask(null);
                                }
                            }
                        }
                    >
                        <PopoverTrigger asChild>
                            {/* <Button si>Open popover</Button> */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-primary/80 h-6 w-6 !my-0"
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Add new</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Add a new button under <b>{column.label}</b>
                                    </p>
                                </div>
                                <div className="grid gap-2">
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex flex-col gap-2'>
                                            <Label htmlFor={"label"} >
                                                Label
                                            </Label>
                                            <Input
                                                id="label"
                                                placeholder='Label'
                                                value={newTask?.label}
                                                onChange={(e) => handleChange('label', e.target.value)}
                                            />
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <Label htmlFor={"url"} >
                                                URL
                                            </Label>
                                            <Input
                                                id="url"
                                                placeholder='URL'
                                                value={newTask?.url}
                                                onChange={(e) => handleChange('url', e.target.value)}
                                            />
                                        </div>
                                        <div className='flex flex-row justify-between items-center'>
                                            <div className='flex flex-row gap-2'>
                                                <Checkbox checked={newTask?.open_in_new_tab} onCheckedChange={(checked) => handleChange('open_in_new_tab', checked)} />
                                                <Label htmlFor={"open_in_new_tab"} >
                                                    Open in new tab
                                                </Label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Button
                                        variant="ghost"
                                        size={'sm'}
                                        className="mr-2"
                                        onClick={() => {
                                            setNewTask(null);
                                            setOpen(false);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        size={'sm'}
                                        onClick={() => {
                                            addTask();
                                        }}
                                        disabled={!newTask?.label || !newTask?.url}
                                    >
                                        Add
                                    </Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>}
                    {/* Delete Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary/80 h-6 w-6 !my-0"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteColumn(column.id);
                        }}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>

                    {/* Drag Handle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        {...attributes} {...listeners}
                        className="text-primary/80 cursor-grab h-6 w-6 !my-0"
                    >
                        <GripVertical className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <div className="flex-1 overflow-hidden relative">
                {column.type === 'Menu' && (
                    <ScrollArea className="h-full overflow-y-auto p-2">
                        <CardContent className="flex flex-col gap-2 p-0 bg-zinc-100 dark:bg-white/[0.04]">
                            <SortableContext items={tasksIds}>
                                {tasks.map((task) => (
                                    <NavbarTaskCard
                                        key={task.id}
                                        task={task}
                                        onDelete={handleDeleteTask}
                                        handleUpdateTask={handleUpdateTask}
                                    />
                                ))}
                            </SortableContext>
                        </CardContent>
                    </ScrollArea>
                )}
                {column.type === 'Button' && (
                    <CardContent className="flex flex-col gap-2 p-0 overflow-y-auto bg-zinc-100 dark:bg-white/[0.04]">
                        <div className="px-4 py-2 flex flex-col gap-3">
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="button-label" className='text-xs'>Label</Label>
                                <Input
                                    id="button-label"
                                    value={column.label}
                                    className='h-8'
                                    onChange={(e) => handleUpdateColumn(column.id, { ...column, label: e.target.value })}
                                    placeholder="Enter button label"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label htmlFor="button-url" className='text-xs'>URL</Label>
                                <Input
                                    id="button-url"
                                    value={column.url || ''}
                                    className='h-8'
                                    onChange={(e) => handleUpdateColumn(column.id, { ...column, url: e.target.value })}
                                    placeholder="Enter button URL"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="button-icon" className='text-xs'>Icon</Label>
                                <Input
                                    id="button-icon"
                                    value={column.icon || ''}
                                    className='h-8'
                                    onChange={(e) => handleUpdateColumn(column.id, { ...column, icon: e.target.value })}
                                    placeholder="Enter icon name"
                                />
                            </div>

                            <div className="flex flex-row items-center gap-1">
                                <Checkbox
                                    checked={column.open_in_new_tab ? true: false}
                                    onCheckedChange={(checked) =>
                                        handleUpdateColumn(column.id, { ...column, open_in_new_tab: checked ? true: false })
                                    }
                                />
                                <Label htmlFor="open-in-new-tab" className='text-xs'>Open in new tab</Label>
                            </div>

                            <div className="flex flex-row items-center gap-1">
                                <Checkbox
                                    checked={column.is_primary_button ? true : false}
                                    onCheckedChange={(checked) =>
                                        handleUpdateColumn(column.id, { ...column, is_primary_button: checked ? true : false })
                                    }
                                />
                                <Label htmlFor="is-primary-button" className='text-xs'>Primary Button</Label>
                            </div>

                            <div className="flex flex-row items-center gap-1">
                                <Checkbox checked={column.hide_on_sidebar ? true : false}
                                    onCheckedChange={(checked) =>
                                        handleUpdateColumn(column.id, { ...column, hide_on_sidebar: checked ? true : false })
                                    }
                                />
                                <Label htmlFor="hide-on-sidebar" className='text-xs'>Hide on Sidebar</Label>
                            </div>
                        </div>
                    </CardContent>
                )}
            </div>

        </Card>
    );
}
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { FooterTask, TaskCard } from './FooterTaskCard';
import { UniqueIdentifier } from '@dnd-kit/core';
import { FooterColumnType } from './FooterBoard';
import { cva } from 'class-variance-authority';
import { useMemo, useState } from 'react';
import { CSS } from "@dnd-kit/utilities";
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface Column {
    id: UniqueIdentifier;
    label: string;
}

export type ColumnType = "Column";

export interface ColumnDragData {
    type: ColumnType;
    column: FooterColumnType;
}

interface AddTask {
    label: string;
    url: string;
    hide_on_footer?: boolean;
}

export function FooterColumn({
    column,
    tasks,
    handleDeleteTask,
    handleDeleteColumn,
    handleAddTask,
    index,
    handleUpdateColumnTitle,
}: {
    column: FooterColumnType;
    tasks: FooterTask[];
    index: number;
    handleDeleteTask: (id: UniqueIdentifier) => void; // 👈 Added delete function
    handleDeleteColumn: (id: UniqueIdentifier) => void; // 👈 Added delete function
    handleAddTask: (task: FooterTask) => void; // 👈 Added add function
    handleUpdateColumnTitle: (id: UniqueIdentifier, title: string) => void; // 👈 Added update function
}) {

    const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: column.id,
        data: { type: "Column", column } satisfies ColumnDragData,
        attributes: { roleDescription: `Column: ${column.title}` },
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

    const [title, setTitle] = useState<AddTask | null>(null);

    const [open, setOpen] = useState(false);

    const addTask = () => {
        if (title) {
            const task: FooterTask = {
                id: title.label,
                columnId: column.id,
                label: title.label,
                url: title.url,
                hide_on_footer: title.hide_on_footer,
            }
            handleAddTask(task);
            setTitle(null);
            setOpen(false);
        } else {
            setOpen(false)
            setTitle(null);
        }
    }

    const [isEditing, setIsEditing] = useState(false);
    const [newLabel, setNewLabel] = useState(column.title);

    const handleBlur = () => {
        setIsEditing(false);
        if (newLabel.trim() !== "" && newLabel !== column.title) {
            handleUpdateColumnTitle(column.id, newLabel);
        }
    }

    const handleChange = (field: keyof AddTask, value: any) => {
        setTitle((prev) => {
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

    return (
        <Card
            ref={setNodeRef}
            style={style}
            className={variants({ dragging: isDragging ? "over" : undefined })}
        >
            {/* Sticky Header */}
            <CardHeader className="p-2 px-4 font-semibold border-b flex flex-row items-center justify-between bg-white z-10 sticky top-0 rounded-t-lg">
                <span className="text-sm text-primary/80 flex flex-row items-center gap-1">
                    <span className="font-semibold">{index + 1}. </span>
                    {isEditing ? (
                        <Input
                            value={newLabel}
                            onChange={(e) => setNewLabel(e.target.value)}
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
                            {column.title}
                        </h3>
                    )}
                </span>

                <div className="flex items-center gap-1">
                    <Popover key={column.id}
                        open={open} onOpenChange={
                            (open) => {
                                setOpen(open);
                                if (!open) {
                                    setTitle(null);
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
                        <PopoverContent className="w-auto min-w-[300px]">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Add new</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Add a new link under <b>{column.title}</b>
                                    </p>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className='flex flex-col gap-0'>
                                        <div className='flex flex-row gap-1 items-center'>
                                            <Label htmlFor={"label"} >
                                                Label
                                            </Label>
                                            <span className="text-red-500">*</span>
                                        </div>
                                        <Input value={title?.label} onChange={(e) => handleChange('label', e.target.value)} placeholder="Label" />
                                    </div>
                                    <div className='flex flex-col gap-0'>
                                        <div className='flex flex-row gap-1 items-center'>
                                            <Label htmlFor={"url"} >
                                                URL
                                            </Label>
                                            <span className="text-red-500">*</span>
                                        </div>
                                        <Input value={title?.url} onChange={(e) => handleChange('url', e.target.value)} placeholder="URL" />
                                    </div>
                                    <div className='flex flex-col gap-0'>
                                        <div className='flex flex-row gap-2 items-center'>
                                            <Checkbox checked={title?.hide_on_footer ? true : false} onCheckedChange={(checked) => handleChange('hide_on_footer', checked)} />
                                            <Label htmlFor={"open_in_new_tab"} >
                                                Hide on Footer
                                            </Label>
                                        </div>
                                    </div>

                                </div>
                                <div className="flex justify-end">
                                    <Button
                                        variant="ghost"
                                        size={'sm'}
                                        className="mr-2"
                                        onClick={() => {
                                            setTitle(null);
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
                                    >
                                        Add
                                    </Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
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

            {/* Scrollable Task List */}
            <div className="flex-1 overflow-hidden relative">
                <ScrollArea className="h-full overflow-y-auto p-2">
                    <CardContent className="flex flex-col gap-2 p-0 bg-zinc-100 dark:bg-white/[0.04]">
                        <SortableContext items={tasksIds}>
                            {tasks.map((task) => (
                                <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} />
                            ))}
                        </SortableContext>
                    </CardContent>
                </ScrollArea>
            </div>
        </Card>
    );
}
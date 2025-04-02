import { useEffect, useMemo, useState } from 'react';
import {
    DndContext,
    DragEndEvent,
    useSensor,
    useSensors,
    MouseSensor,
    TouchSensor,
    DragOverlay,
    UniqueIdentifier,
    DragStartEvent,
    DragOverEvent,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { Plus, Save } from 'lucide-react';
import { NavbarColumn } from './NavbarColumn';
import { NavbarTask, NavbarTaskCard } from './NavbarTaskCard';
import { useFrappePostCall } from 'frappe-react-sdk';
import { SpinnerLoader } from '@/components/common/FullPageLoader/SpinnerLoader';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ErrorBanner } from '@/components/common/ErrorBanner/ErrorBanner';
import { CommitDocs } from '@/types/commit/CommitDocs';
import { useToast } from '@/components/ui/use-toast';

export interface NavbarColumnData {
    id: string;
    type: 'Button' | 'Menu';
    label: string;
    url?: string;
    icon?: string;
    open_in_new_tab?: boolean;
    is_primary_button?: boolean;
    hide_on_navbar?: boolean;
}

export function NavbarBoard({
    defaultCols,
    initialTasks,
    mutate,
    commitDoc
}: {
    defaultCols: NavbarColumnData[];
    initialTasks: NavbarTask[];
    mutate: VoidFunction;
        commitDoc: CommitDocs
}) {
    const [columns, setColumns] = useState<NavbarColumnData[]>(defaultCols);
    const [tasks, setTasks] = useState<NavbarTask[]>(initialTasks);
    const [isModified, setIsModified] = useState(false);
    const [activeColumn, setActiveColumn] = useState<NavbarColumnData | null>(null); // Track the active column being dragged
    const [activeTask, setActiveTask] = useState<NavbarTask | null>(null); // Track the active task being dragged

    const columnIds = useMemo(() => columns.map((col) => col.id), [columns]);

    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    useEffect(() => {
        setColumns(defaultCols);
    }, [defaultCols]);

    useEffect(() => {
        setTasks(initialTasks);
    }, [initialTasks]);

    const { call, error, loading } = useFrappePostCall('commit.commit.doctype.commit_docs.commit_docs.manage_navbar')

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }
    const { toast } = useToast();
    const handleSave = () => {
        // Save the columns and tasks to the database or perform any other action
        // Add index to the columns and tasks
        const updatedColumns = columns.map((col, index) => ({ ...col, index }));
        const updatedTasks = tasks.map((task, index) => ({ ...task, index }));

        call({
            commit_doc: commitDoc.name,
            navbar_items: JSON.stringify(updatedColumns),
            sub_navbar_items: JSON.stringify(updatedTasks)
        }).then((res: any) => {
            if (res.message) {
                mutate();
                setIsModified(false);
                toast({
                    description: "Navbar structure updated successfully",
                    duration: 1500,
                });

            }
        })
    }

    const handleDeleteTask = (taskId: UniqueIdentifier) => {
        // Remove the task from the tasks state
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        // set modified to true
        setIsModified(true);
    }

    const handleDeleteColumn = (columnId: UniqueIdentifier) => {
        // Remove the column from the columns state
        setColumns((prevColumns) => prevColumns.filter((col) => col.id !== columnId));
        // Remove the tasks associated with the column
        setTasks((prevTasks) => prevTasks.filter((task) => task.columnId !== columnId));
        // set modified to true
        setIsModified(true);
    }

    const handleAddTask = (task: NavbarTask) => {
        // Add the new task to the tasks state
        setTasks((prevTasks) => [...prevTasks, task]);
        // set modified to true
        setIsModified(true);
    }

    const handleColumnCreate = (column: NavbarColumnData) => {
        // Add the new column to the columns state
        setColumns((prevColumns) => [...prevColumns, column]);
        // set modified to true
        setIsModified(true);
    }
    const handleUpdateColumnTitle = (id: UniqueIdentifier, title: string) => {
        // Update the column title in the columns state
        setColumns((prevColumns) =>
            prevColumns.map((col) => (col.id === id ? { ...col, title } : col))
        );
        // set modified to true
        setIsModified(true);
    }

    const handleUpdateTask = (id: UniqueIdentifier, task: NavbarTask) => {
        // Update the task in the tasks state
        setTasks((prevTasks) =>
            prevTasks.map((t) => (t.id === id ? { ...t, ...task } : t))
        );
        // set modified to true
        setIsModified(true);
    }
    const handleUpdateColumn = (id: UniqueIdentifier, column: NavbarColumnData) => {
        // Update the task column in the tasks state
        setColumns((prevColumns) =>
            prevColumns.map((col) => (col.id === id ? { ...col, ...column } : col))
        );
        // set modified to true
        setIsModified(true);
    }

    const onDragStart = (event: DragStartEvent) => {
        const { active } = event;

        // Check if the active item is a task
        const activeTask = tasks.find((task) => task.id === active.id);
        if (activeTask) {
            setActiveTask(activeTask); // Set the active task being dragged
            return;
        }

        // Check if the active item is a column
        const activeColumn = columns.find((col) => col.id === active.id);
        if (activeColumn) {
            setActiveColumn(activeColumn); // Set the active column being dragged
        }
    };

    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        // Reset active task and column
        setActiveTask(null);
        setActiveColumn(null);

        if (!over) return;

        // Find the active and over tasks
        const activeTaskIndex = tasks.findIndex((task) => task.id === active.id);
        const overTaskIndex = tasks.findIndex((task) => task.id === over.id);

        // Handle column drag-and-drop
        const activeColumnIndex = columns.findIndex((col) => col.id === active.id);
        const overColumnIndex = columns.findIndex((col) => col.id === over.id);

        if (activeTaskIndex !== -1 && overTaskIndex !== -1) {
            // Rearrange tasks
            const updatedTasks = [...tasks];
            const [movedTask] = updatedTasks.splice(activeTaskIndex, 1);
            updatedTasks.splice(overTaskIndex, 0, movedTask);

            // Update state
            setTasks(updatedTasks);
            setIsModified(true);
            return;
        }

        if (activeColumnIndex !== -1 && overColumnIndex !== -1) {
            // Rearrange columns
            const updatedColumns = [...columns];
            const [movedColumn] = updatedColumns.splice(activeColumnIndex, 1);
            updatedColumns.splice(overColumnIndex, 0, movedColumn);

            // Update state
            setColumns(updatedColumns);
            setIsModified(true);
            return;
        }


        // Handle if task moved to a different column
        const activeTask = tasks.find((task) => task.id === active.id);
        const overColumn = columns.find((col) => col.id === over.id);

        if (activeTask && overColumn) {
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === activeTask.id ? { ...task, columnId: overColumn.id } : task
                )
            );
            setIsModified(true);
        }


    };


    const onDragOver = (event: DragOverEvent) => {
        const { active } = event;

        // Check if the active item is a task
        const activeTask = tasks.find((task) => task.id === active.id);
        if (activeTask) {
            setActiveTask(activeTask); // Set the active task being dragged
            return;
        }

        // Check if the active item is a column
        const activeColumn = columns.find((col) => col.id === active.id);
        if (activeColumn) {
            setActiveColumn(activeColumn); // Set the active column being dragged
        }
    }
    const onDragCancel = () => {
        // Reset active task and column
        setActiveTask(null);
        setActiveColumn(null);
    }

    return (
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <div className="mx-auto max-w-7xl flex flex-col gap-6">
                <div className="sm:flex sm:items-start justify-between gap-4">
                    <div className='flex flex-col gap-0'>
                        <h2 className="text-lg font-semibold text-gray-900">Navbar Structure</h2>
                        <p className="text-sm text-gray-600">
                            The navbar structure allows you to customize the layout and content of your navbar.
                            You can add, remove, or rearrange to fit your needs.
                        </p>
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                        <button
                            type="button"
                            className="rounded-md flex items-center bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300 focus:outline-none"
                            onClick={() => setOpen(true)}
                        >
                            Add
                            <Plus className="h-4 w-4 ml-2" />
                        </button>
                        <button
                            type='button'
                            disabled={!isModified}
                            onClick={handleSave}
                            className={`rounded-md flex items-center px-3 py-2 text-sm font-semibold text-white shadow-sm ${isModified ? 'bg-blue-500 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'}`}
                        >
                            Save
                            {loading ? <SpinnerLoader /> : <Save className="h-4 w-4 ml-2" />}
                        </button>
                    </div>
                </div>
                <ErrorBanner error={error} />
                <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver} onDragCancel={onDragCancel}>
                    <div className="grid grid-cols-4 gap-4 h-full">
                        <SortableContext items={columnIds}>
                            {columns.map((col, index) => (
                                <NavbarColumn
                                    key={col.id}
                                    column={col}
                                    tasks={tasks.filter((task) => task.columnId === col.id)}
                                    index={index}
                                    handleDeleteColumn={handleDeleteColumn}
                                    handleDeleteTask={handleDeleteTask}
                                    handleUpdateTask={handleUpdateTask}
                                    handleUpdateColumn={handleUpdateColumn}
                                    handleUpdateColumnTitle={handleUpdateColumnTitle}
                                    handleAddTask={handleAddTask}
                                />
                            ))}
                        </SortableContext>
                    </div>
                    <DragOverlay>
                        {activeTask ? (
                            <NavbarTaskCard
                                task={activeTask}
                                onDelete={handleDeleteTask}
                                handleUpdateTask={handleUpdateTask}
                            />
                        ) : activeColumn ? (
                            <NavbarColumn
                                column={activeColumn}
                                tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
                                index={columns.findIndex((col) => col.id === activeColumn.id)}
                                handleDeleteColumn={handleDeleteColumn}
                                handleDeleteTask={handleDeleteTask}
                                handleUpdateTask={handleUpdateTask}
                                handleUpdateColumn={handleUpdateColumn}
                                handleUpdateColumnTitle={handleUpdateColumnTitle}
                                handleAddTask={handleAddTask}
                            />
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <CreateNewParentLabel onColumnCreate={handleColumnCreate} onClose={handleClose} open={open} />
            </Dialog>
        </div>
    );
}

interface CreateParentLabel {
    onColumnCreate: (column: NavbarColumnData) => void
    onClose: () => void
    open: boolean
}

const CreateNewParentLabel = ({ onColumnCreate, onClose, open }: CreateParentLabel) => {

    const [column, setColumn] = useState<NavbarColumnData | null>(null)

    useEffect(() => {
        setColumn(null)
    }, [open])

    const onSubmit = () => {
        if (column) {
            onColumnCreate(column)
            onClose()
        }
    }

    const handleChange = (field: keyof NavbarColumnData, value: any) => {
        setColumn((prev) => {
            if (!prev) {
                // Initialize the column object if it's null
                return {
                    id: '', // Provide a default value for required fields
                    type: 'Button', // Default type
                    label: '',
                    url: '',
                    icon: '',
                    open_in_new_tab: false,
                    is_primary_button: false,
                    [field]: value, // Update the specific field
                };
            }

            // Update the specific field while preserving the rest of the object
            return {
                ...prev,
                [field]: value,
            };
        });
    };

    return (
        <DialogContent className="p-8 w-[90vw] sm:w-full overflow-hidden">
            <DialogHeader className="text-left">
                <DialogTitle>Add New Button </DialogTitle>
                <p className="text-sm text-gray-600">
                    Create a new button for the navbar. You can add a Menu Button or a normal Button.
                </p>
            </DialogHeader>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor={"type"} >
                        Type
                    </Label>
                    <Select value={column?.type} onValueChange={(value) => handleChange('type', value)} defaultValue={column?.type}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Button">Button</SelectItem>
                            <SelectItem value="Menu">Menu</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor={"label"} >
                        Label
                    </Label>
                    <Input
                        id="label"
                        placeholder='Label'
                        value={column?.label}
                        onChange={(e) => handleChange('label', e.target.value)}
                    />
                </div>
                {column?.type === 'Button' && (
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor={"url"} >
                                URL
                            </Label>
                            <Input
                                id="url"
                                placeholder='URL'
                                value={column?.url}
                                onChange={(e) => handleChange('url', e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor={"icon"} >
                                Icon
                            </Label>
                            <Input
                                id="icon"
                                placeholder='Icon'
                                value={column?.icon}
                                onChange={(e) => handleChange('icon', e.target.value)}
                            />
                            <p className="text-[12px] text-gray-600">
                                Supports only icons from the lucid-react library. Enter the icon name, eg:"Bell" to display it beside the label.
                            </p>
                        </div>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='flex flex-row gap-2'>
                                <Checkbox checked={column?.open_in_new_tab} onCheckedChange={(checked) => handleChange('open_in_new_tab', checked)} />
                                <Label htmlFor={"open_in_new_tab"} >
                                    Open in new tab
                                </Label>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <Checkbox checked={column?.is_primary_button} onCheckedChange={(checked) => handleChange('is_primary_button', checked)} />
                                <Label htmlFor={"is_primary_button"} >
                                    Primary Button
                                </Label>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <Checkbox checked={column?.hide_on_navbar} onCheckedChange={(checked) => handleChange('hide_on_navbar', checked)} />
                                <Label htmlFor={"hide_on_navbar"} >
                                    Hide on Sidebar
                                </Label>
                            </div>
                        </div>
                    </div>)}
            </div>
            <DialogFooter>
                <Button onClick={() => onSubmit()} className="w-full" disabled={!column?.label || !column?.type}>
                    Submit
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}
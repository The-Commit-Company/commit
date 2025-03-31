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
    DragOverEvent,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { Plus, Save } from 'lucide-react';
import { useFrappePostCall } from 'frappe-react-sdk';
import { useToast } from '@/components/ui/use-toast';
import { ErrorBanner } from '@/components/common/ErrorBanner/ErrorBanner';
import { SpinnerLoader } from '@/components/common/FullPageLoader/SpinnerLoader';
import { FooterColumn } from './FooterColumn';
import { TaskCard } from './FooterTaskCard';
import { CommitDocs } from '@/types/commit/CommitDocs';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


export interface FooterColumnType {
    id: string; // Ensure this is a string
    title: string;
}

export interface FooterTask {
    id: string; // Ensure this is a string
    columnId: string; // Ensure this is a string
    label: string;
    url: string;
    hide_on_footer?: boolean;
}

export function FooterBoard({
    defaultCols,
    initialTasks,
    mutate,
    commitDocs,
}: {
    defaultCols: FooterColumnType[];
    initialTasks: FooterTask[];
    mutate: VoidFunction;
    commitDocs: CommitDocs
}) {
    const [columns, setColumns] = useState<FooterColumnType[]>(defaultCols);
    const [tasks, setTasks] = useState<FooterTask[]>(initialTasks);
    const [activeItem, setActiveItem] = useState<{
        type: 'column' | 'task';
        id: string;
    } | null>(null);

    const columnIds = useMemo(() => columns.map((col) => col.id), [columns]);

    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const [isModified, setIsModified] = useState(false);

    useEffect(() => {
        setColumns(defaultCols);
    }, [defaultCols]);

    useEffect(() => {
        setTasks(initialTasks);
    }, [initialTasks]);

    const { call, error, loading } = useFrappePostCall('commit.commit.doctype.commit_docs.commit_docs.manage_footer');

    const { toast } = useToast();

    const handleSave = () => {
        const sequenceColumns = columns.map((col) => col.id);
        const tasksWithIndex = tasks.map((task, index) => ({
            ...task,
            index,
        }));

        call({
            commit_doc: commitDocs.name,
            footer_columns: JSON.stringify(sequenceColumns),
            footer_items: JSON.stringify(tasksWithIndex),
        }).then((res: any) => {
            if (res.message) {
                mutate();
                setIsModified(false);
                toast({
                    description: 'Footer structure updated successfully',
                    duration: 1500,
                });
            }
        });
    };

    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeType = activeItem?.type;

        setIsModified(true);
        if (activeType === 'task') {
            const activeTaskIndex = tasks.findIndex((t) => t.id === active.id);
            if (activeTaskIndex === -1) return;

            const activeTask = tasks[activeTaskIndex];

            // Dropped on another task
            const overTaskIndex = tasks.findIndex((t) => t.id === over.id);
            if (overTaskIndex !== -1) {
                const overTask = tasks[overTaskIndex];

                setTasks((prevTasks) => {
                    const updatedTasks = [...prevTasks.filter((t) => t.id !== active.id)];
                    updatedTasks.splice(overTaskIndex, 0, {
                        ...activeTask,
                        columnId: overTask.columnId,
                    });
                    return updatedTasks;
                });

                return;
            }

            // Dropped on a column
            const overColumn = columns.find((col) => col.id === over.id);
            if (overColumn) {
                setTasks((prevTasks) =>
                    prevTasks.map((t) =>
                        t.id === active.id ? { ...t, columnId: overColumn.id as string } : t
                    )
                );
            }
        } else if (activeType === 'column') {
            const oldIndex = columns.findIndex((col) => col.id === active.id);
            const newIndex = columns.findIndex((col) => col.id === over.id);

            if (oldIndex !== -1 && newIndex !== -1) {
                setColumns((prev) => arrayMove(prev, oldIndex, newIndex));
            }
        }

        setActiveItem(null);
    };

    const handleDeleteTask = (taskId: UniqueIdentifier) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        setIsModified(true);
    };

    const handleDeleteColumn = (id: UniqueIdentifier) => {
        setColumns((prev) => prev.filter((col) => col.id !== id));
        setTasks((prevTasks) => prevTasks.filter((task) => task.columnId !== id));
        setIsModified(true);
    };

    const handleAddTask = (task: FooterTask) => {
        setTasks((prevTasks) => [...prevTasks, task]);
        setIsModified(true);
    };

    const [open, setOpen] = useState(false);


    const handleColumnCreate = (title: string) => {
        const newColumn: FooterColumnType = {
            id: title,
            title,
        };
        setColumns((prev) => [...prev, newColumn]);
        setIsModified(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleUpdateColumnTitle = (id: UniqueIdentifier, title: string) => {
        setColumns((prev) =>
            prev.map((col) => (col.id === id ? { ...col, title } : col))
        );
        setIsModified(true);
    };

    const onDragOver = (event: DragOverEvent) => {
        const { active, over } = event;

        if (!over) return;

        const activeType = activeItem?.type;

        if (activeType === 'task') {
            const activeTaskIndex = tasks.findIndex((t) => t.id === active.id);
            if (activeTaskIndex === -1) return;

            const activeTask = tasks[activeTaskIndex];

            // Check if the task is hovering over a different board
            const overColumn = columns.find((col) => col.id === over.id);
            if (overColumn && activeTask.columnId !== overColumn.id) {
                setTasks((prevTasks) => {
                    // Temporarily add the active task to the target board
                    const updatedTasks = prevTasks.filter((t) => t.id !== active.id);
                    return [
                        ...updatedTasks,
                        { ...activeTask, columnId: overColumn.id as string }, // Explicitly cast to string
                    ];
                });
            }
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <div className="mx-auto max-w-7xl flex flex-col gap-6">
                <div className="sm:flex sm:items-start justify-between gap-4">
                    <div className="flex flex-col gap-0 w-full">
                        <h2 className="text-lg font-semibold text-gray-900">Footer Structure</h2>
                        <p className="text-sm text-gray-600">
                            The footer structure allows you to customize the layout and content of your footer.
                        </p>
                        <ErrorBanner error={error} />
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <button
                            type="button"
                            className="rounded-md flex items-center bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300 focus:outline-none"
                            onClick={() => setOpen(true)}
                        >
                            Add
                            <Plus className="h-4 w-4 ml-2" />
                        </button>
                        <button
                            type="button"
                            disabled={!isModified}
                            onClick={handleSave}
                            className={`rounded-md flex items-center px-3 py-2 text-sm font-semibold text-white shadow-sm ${isModified ? 'bg-blue-500 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'
                                }`}
                        >
                            Save
                            {loading ? <SpinnerLoader /> : <Save className="h-4 w-4 ml-2" />}
                        </button>
                    </div>
                </div>
                <DndContext
                    sensors={sensors}
                    onDragStart={(event) => {
                        if (columns.find((c) => c.id === event.active.id)) {
                            // @ts-expect-error
                            setActiveItem({ type: 'column', id: event.active.id });
                        } else {
                            // @ts-expect-error
                            setActiveItem({ type: 'task', id: event.active.id });
                        }
                    }}
                    onDragEnd={onDragEnd}
                    onDragOver={onDragOver}
                    onDragCancel={() => setActiveItem(null)}
                >
                    <div className="grid grid-cols-4 gap-4 h-full">
                        <SortableContext items={columnIds}>
                            {columns.map((col, index) => (
                                <FooterColumn
                                    key={col.id}
                                    column={col}
                                    index={index}
                                    tasks={tasks.filter((task) => task.columnId === col.id)}
                                    handleDeleteTask={handleDeleteTask}
                                    handleDeleteColumn={handleDeleteColumn}
                                    handleAddTask={handleAddTask}
                                    handleUpdateColumnTitle={handleUpdateColumnTitle}
                                />
                            ))}
                        </SortableContext>
                    </div>
                    <DragOverlay>
                        {activeItem ? (
                            activeItem.type === 'task' ? (
                                <TaskCard
                                    task={tasks.find((t) => t.id === activeItem.id)!}
                                    onDelete={handleDeleteTask}
                                />
                            ) : (
                                <FooterColumn
                                    column={columns.find((c) => c.id === activeItem.id)!}
                                    index={columns.findIndex((c) => c.id === activeItem.id)}
                                    tasks={tasks.filter((task) => task.columnId === activeItem.id)}
                                    handleDeleteTask={handleDeleteTask}
                                    handleDeleteColumn={handleDeleteColumn}
                                    handleAddTask={handleAddTask}
                                    handleUpdateColumnTitle={handleUpdateColumnTitle}
                                />
                            )
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
    onColumnCreate: (label: string) => void
    onClose: () => void
    open: boolean
  }
  
  
  const CreateNewParentLabel = ({ onColumnCreate, onClose, open }: CreateParentLabel) => {
  
    const [label, setLabel] = useState<string>('')
  
    useEffect(() => {
      setLabel('')
    }, [open])
  
    const onSubmit = () => {
      if (label) {
        onColumnCreate(label)
        onClose()
      }
    }
  
    return (
      <DialogContent className="p-6 w-[90vw] sm:w-full overflow-hidden">
        <DialogHeader className="text-left">
          <DialogTitle>Add Parent Label</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-1'>
          <div className='flex flex-row gap-1'>
            <Label htmlFor={"page"} >
              Label
            </Label>
            <span className="text-red-500">*</span>
          </div>
          <Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Enter a label" />
        </div>
        <DialogFooter>
          <Button onClick={() => onSubmit()} className="w-full">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    )
  }
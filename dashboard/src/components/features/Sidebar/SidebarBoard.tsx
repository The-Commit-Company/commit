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
import { BoardColumn, Column } from './BoardColumn';
import { Task, TaskCard } from './TaskCard';
import { Plus, Save } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFrappePostCall } from 'frappe-react-sdk';
import { useToast } from '@/components/ui/use-toast';
import { ErrorBanner } from '@/components/common/ErrorBanner/ErrorBanner';
import { SpinnerLoader } from '@/components/common/FullPageLoader/SpinnerLoader';

export function SidebarBoard({
  defaultCols,
  initialTasks,
  mutate,
  commitDocs
}: {
  defaultCols: Column[];
  initialTasks: Task[];
  mutate: VoidFunction;
  commitDocs: string;
}) {
  const [parentLabels, setParentLabels] = useState<Column[]>(defaultCols);
  const [docsPage, setDocsPage] = useState<Task[]>(initialTasks);
  const [activeItem, setActiveItem] = useState<{
    type: 'column' | 'task';
    id: string;
  } | null>(null);

  const columnIds = useMemo(() => parentLabels.map((col) => col.id), [parentLabels]);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const [isModified, setIsModified] = useState(false);

  // Synchronize state with props when defaultCols or initialTasks change
  useEffect(() => {
    setParentLabels(defaultCols);
  }, [defaultCols]);

  useEffect(() => {
    setDocsPage(initialTasks);
  }, [initialTasks]);

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeType = activeItem?.type;

    setIsModified(true);
    if (activeType === 'task') {
      const activeTaskIndex = docsPage.findIndex((t) => t.id === active.id);
      if (activeTaskIndex === -1) return;

      const activeTask = docsPage[activeTaskIndex];

      // Dropped on another task
      const overTaskIndex = docsPage.findIndex((t) => t.id === over.id);
      if (overTaskIndex !== -1) {
        const overTask = docsPage[overTaskIndex];

        setDocsPage((prevTasks) => {
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
      const overColumn = parentLabels.find((col) => col.id === over.id);
      if (overColumn) {
        setDocsPage((prevTasks) =>
          prevTasks.map((t) =>
            t.id === active.id ? { ...t, columnId: overColumn.id } : t
          )
        );
      }
    } else if (activeType === 'column') {
      const oldIndex = parentLabels.findIndex((col) => col.id === active.id);
      const newIndex = parentLabels.findIndex((col) => col.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        setParentLabels((prev) => arrayMove(prev, oldIndex, newIndex));
      }
    }

    setActiveItem(null);
  }

  const handleDeleteTask = (taskId: UniqueIdentifier) => {
    // Remove the task from the tasks state
    setDocsPage((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    // set modified to true
    setIsModified(true);
    // Optionally, you can also remove the task from the column it belongs to
  }

  const handleDeleteColumn = (id: UniqueIdentifier) => {
    // Remove the column from the columns state
    setParentLabels((prev) => prev.filter((col) => col.id !== id));
    // Remove tasks associated with the column
    setDocsPage((prevTasks) => prevTasks.filter((task) => task.columnId !== id));
    // set modified to true
    setIsModified(true);
  };

  const handleAddTask = (task: Task) => {
    // Add the new task to the tasks state
    setDocsPage((prevTasks) => [...prevTasks, task]);
    // set modified to true
    setIsModified(true);
  }

  const [open, setOpen] = useState(false);

  const handleColumnCreate = (label: string) => {
    // Create a new column with the provided label
    const newColumn: Column = {
      id: label,
      title: label,
    };
    setParentLabels((prev) => [...prev, newColumn]);
    // set modified to true
    setIsModified(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  const handleUpdateColumnTitle = (id: UniqueIdentifier, newTitle: string) => {
    setParentLabels((prev) =>
      prev.map((col) => (col.id === id ? { ...col, title: newTitle, id: newTitle } : col))
    );

    // Update the tasks associated with the column
    setDocsPage((prevTasks) =>
      prevTasks.map((task) =>
        task.columnId === id ? { ...task, columnId: newTitle } : task
      )
    );
    // set modified to true
    setIsModified(true);
  };

  const { call, error, loading } = useFrappePostCall('commit.commit.doctype.commit_docs.commit_docs.manage_sidebar')

  const { toast } = useToast();

  const handleSave = () => {
    // Save the columns and tasks to the database or perform any other action

    const sequenceParentLabels = parentLabels.map((col) => col.id);
    const pagesWithIndex = docsPage.map((task, index) => ({
      ...task,
      index: index,
    }));

    call({
      commit_doc: commitDocs,
      parent_labels: JSON.stringify(sequenceParentLabels),
      docs_page: JSON.stringify(pagesWithIndex),
    }).then((res: any) => {
      if (res.message) {
        mutate();
        setIsModified(false);
        toast({
          description: "Sidebar structure updated successfully",
          duration: 1500,
        });

      }
    })
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeType = activeItem?.type;

    if (activeType === 'task') {
      const activeTaskIndex = docsPage.findIndex((t) => t.id === active.id);
      if (activeTaskIndex === -1) return;

      const activeTask = docsPage[activeTaskIndex];

      // Check if the task is hovering over a different board
      const overColumn = parentLabels.find((col) => col.id === over.id);
      if (overColumn && activeTask.columnId !== overColumn.id) {
        setDocsPage((prevTasks) => {
          // Temporarily add the active task to the target board
          const updatedTasks = prevTasks.filter((t) => t.id !== active.id);
          return [
            ...updatedTasks,
            { ...activeTask, columnId: overColumn.id },
          ];
        });
      }
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="mx-auto max-w-7xl flex flex-col gap-6">
        <div className="sm:flex sm:items-start justify-between gap-4">
          <div className='flex flex-col gap-0'>
            <h2 className="text-lg font-semibold text-gray-900">
              Sidebar Structure
            </h2>
            {/* Helper Text Below Heading */}
            <p className="text-sm text-gray-600">
              The order of the board cards matches the sidebar sequence in the documentation.
            </p>
            <ErrorBanner error={error} />
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
        <DndContext
          sensors={sensors}
          onDragStart={(event) => {
            if (parentLabels.find((c) => c.id === event.active.id)) {
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
          <div className='grid grid-cols-4 gap-4 h-full'>
            <SortableContext items={columnIds}>
              {parentLabels.map((col, index) => (
                <BoardColumn
                  key={col.id}
                  column={col}
                  index={index}
                  tasks={docsPage.filter((task) => task.columnId === col.id)}
                  handleDeleteTask={handleDeleteTask}
                  handleDeleteColumn={handleDeleteColumn}
                  handleAddTask={handleAddTask}
                  commitDocs={commitDocs}
                  handleUpdateColumnTitle={handleUpdateColumnTitle}
                />
              ))}
            </SortableContext>
          </div>

          <DragOverlay>
            {activeItem ? (
              activeItem.type === 'task' ? (
                <TaskCard task={docsPage.find((t) => t.id === activeItem.id)!} onDelete={handleDeleteTask} />
              ) : (
                // Show the column along with its tasks in DragOverlay
                <BoardColumn
                  column={parentLabels.find((c) => c.id === activeItem.id)!}
                  index={parentLabels.findIndex((c) => c.id === activeItem.id)}
                  tasks={docsPage.filter((task) => task.columnId === activeItem.id)}
                  handleDeleteTask={handleDeleteTask}
                  handleDeleteColumn={handleDeleteColumn}
                  handleAddTask={handleAddTask}
                  commitDocs={commitDocs}
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
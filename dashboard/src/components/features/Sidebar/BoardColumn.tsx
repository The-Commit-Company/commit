import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { type UniqueIdentifier } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useCallback, useContext, useMemo, useState } from "react";
import { cva } from "class-variance-authority";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Task, TaskCard } from "./TaskCard";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { AsyncDropdownWithoutForm } from "@/components/common/AsyncDropdown/AsyncDropdown";
import { FrappeConfig, FrappeContext } from "frappe-react-sdk";
import { Input } from "@/components/ui/input";

export interface Column {
  id: UniqueIdentifier;
  title: string;
}

export type ColumnType = "Column";

export interface ColumnDragData {
  type: ColumnType;
  column: Column;
}

interface BoardColumnProps {
  column: Column;
  tasks: Task[];
  isOverlay?: boolean;
  index: number;
  handleDeleteTask: (id: UniqueIdentifier) => void; // 👈 Added delete function
  handleDeleteColumn: (id: UniqueIdentifier) => void; // 👈 Added delete function
  handleAddTask: (task: Task) => void; // 👈 Added add function
  commitDocs: string
  handleUpdateColumnTitle: (id: UniqueIdentifier, title: string) => void; // 👈 Added update function
}

export function BoardColumn({ column, index, tasks, isOverlay, handleDeleteTask, handleDeleteColumn, handleAddTask, commitDocs, handleUpdateColumnTitle }: BoardColumnProps) {
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

  const [title, setTitle] = useState<string | null>(null);

  const { call } = useContext(FrappeContext) as FrappeConfig;

  const [open, setOpen] = useState(false);

  const addTask = useCallback(() => {
    if (title) {
      call.get('frappe.client.get_value', {
        doctype: 'Commit Docs Page',
        filters: title,
        fieldname: ['route', 'title']
      }).then((res: any) => {
        const task = {
          id: title,
          columnId: column.id,
          title: res.message.title,
          route: res.message.route
        }
        handleAddTask(task);
        setTitle(null);
        setOpen(false);
      })
    } else {
      setOpen(false);
      setTitle(null);
    }
  }, [title, column.id, call, handleAddTask, setTitle, setOpen]);

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(column.title);

  const handleBlur = () => {
    setIsEditing(false);
    if (newTitle.trim() !== "" && newTitle !== column.title) {
      handleUpdateColumnTitle(column.id, newTitle);
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({ dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined })}
    >
      {/* Sticky Header */}
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
            <PopoverContent className="w-auto">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Add new</h4>
                  <p className="text-sm text-muted-foreground">
                    Add a new documentation page under <b>{column.title}</b>
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className='flex flex-col gap-1'>
                    <div className='flex flex-row gap-1'>
                      <Label htmlFor={"page"} >
                        Page
                      </Label>
                      <span className="text-red-500">*</span>
                    </div>
                    <AsyncDropdownWithoutForm
                      doctype="Commit Docs Page"
                      selectedValue={title ?? ''}
                      setSelectedValue={setTitle}
                      placeholder="Select a page"
                      filters={[['commit_docs', '=', commitDocs]]}
                    />
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

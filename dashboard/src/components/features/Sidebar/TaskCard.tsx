import { useState } from "react";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

export interface Task {
  id: UniqueIdentifier;
  columnId: any;
  title: string;
  route: string;
}

export function TaskCard({ task, onDelete }: { task: Task; onDelete: (id: UniqueIdentifier) => void }) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { type: "Task", task },
    attributes: { roleDescription: "Task" },
  });

  const style = {
    transition,
    transform: transform ? CSS.Translate.toString(transform) : undefined, // Apply transform only if it exists
    opacity: isDragging ? 0.5 : 1, // Ensure only the dragged task has reduced opacity
    zIndex: isDragging ? 10 : "auto", // Bring the dragged task to the front
  };

  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="relative overflow-hidden" ref={setNodeRef} style={style}>
      {/* Delete Button (Hidden until revealed) */}
      {isRevealed && (
        <Button
          variant="destructive"
          size="sm"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-l-none rounded-r-lg"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}

      {/* Task Card */}
      <Card
        className={`relative transition-transform duration-300 ${
          isRevealed ? "translate-x-[-30px] rounded-r-none" : ""
        } ${isDragging ? "ring-2 ring-blue-500" : ""}`} // Highlight the dragged task
      >
        <CardHeader className="py-1 px-2 flex flex-row items-center justify-between border-b-1">
          <span className="text-sm text-primary/80 pl-2">{task.title}</span>
          <div className="flex items-center !my-0 gap-2">
            {/* Drag Handle */}
            <div className="flex items-center gap-0">
              <Button
                variant="ghost"
                size="icon"
                {...attributes}
                {...listeners}
                className="text-primary/80 cursor-grab h-6 w-6 m-0"
              >
                <GripVertical className="h-4 w-4" />
              </Button>
              {/* Left Arrow Button (Reveals Delete Button) */}
              <Button
                variant="link"
                size="icon"
                className="text-primary/80 h-6 w-6 m-0 mr-1"
                onClick={() => setIsRevealed(!isRevealed)}
              >
                {isRevealed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
import { Active, DataRef, Over } from "@dnd-kit/core";
import { ColumnDragData } from "./BoardColumn";
import { UniqueIdentifier } from "@dnd-kit/core";

export type TaskDragData = {
  type: "Task"; // Identifies the draggable type as a task
  task: {
    id: UniqueIdentifier; // Unique identifier for the task
    columnId: UniqueIdentifier; // ID of the column the task belongs to
    title: string; // Title of the task
  };
};

type DraggableData = ColumnDragData | TaskDragData;

export function hasDraggableData<T extends Active | Over>(
  entry: T | null | undefined
): entry is T & {
  data: DataRef<DraggableData>;
} {
  if (!entry) {
    return false;
  }

  const data = entry.data.current;

  if (data?.type === "Column" || data?.type === "Task") {
    return true;
  }

  return false;
}
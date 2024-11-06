import { useDraggable } from "@dnd-kit/core";
import { Task } from "./types";

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-lg bg-card p-4 border border-border hover:shadow-md"
      style={style}
    >
      <h3 className="font-medium">{task.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{task.description}</p>
    </div>
  );
}

import { useDroppable } from "@dnd-kit/core";

import { Column as ColumnType, Task } from "./types";
import TaskCard from "./TaskCard";
import { CSSProperties } from "react";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
};

export default function Column({ column, tasks }: ColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
  });

  const style: CSSProperties = {
    border: isOver ? "2px solid" : undefined,
    borderColor: isOver ? "var(--primary)" : undefined,
  };

  return (
    <div
      className="flex w-full lg:w-80 min-h-80 flex-col rounded-lg border-2 border-dashed border-border p-4"
      style={style}
    >
      <div className="flex justify-between">
        <h2 className="mb-4 font-semibold">{column.title}</h2>
        <p className="text-sm rounded-full border border-border size-6 text-center">
          {tasks.length}
        </p>
      </div>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {tasks.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import {
  Page,
  PageBody,
  PageDescription,
  PageHeader,
  PageTitle,
} from "../components/Page";
import { Task } from "../components/drag-n-drop/types";
import {
  COLUMNS,
  INITIAL_TASKS,
} from "../components/drag-n-drop/data-constant";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Column from "../components/drag-n-drop/Column";

const DragNDrop = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;

    //   if not over some droppable element, do nothing
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle>Drag N Drop</PageTitle>
        <PageDescription>
          A simple kanban with drag n drop in react using dnd kit package
        </PageDescription>
      </PageHeader>

      <PageBody>
        <DndContext onDragEnd={handleDragEnd}>
          <div className="flex flex-wrap gap-8 transition-all duration-100 ease-in-out">
            {COLUMNS.map((column) => {
              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks.filter((task) => task.status === column.id)}
                />
              );
            })}
          </div>
        </DndContext>
      </PageBody>
    </Page>
  );
};

export default DragNDrop;

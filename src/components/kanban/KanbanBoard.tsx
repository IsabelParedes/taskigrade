"use client";

import { trpc } from "@/app/_trpc/client";
import { dummyCols } from "@/temp/constants";
import { Column, Id, Task } from "@/types/types";
import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import KanbanCard from "./KanbanCard";
import KanbanColumn from "./KanbanColumn";

interface KanbanBoardProps {}

const KanbanBoard = ({}: KanbanBoardProps) => {
  const [columns, setColumns] = useState<Column[]>(dummyCols);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, //need to drag for 5 pixels before event fires, lets buttons work so they're not always in the drag context
      },
    })
  );

  const {
    data: usersTasks,
    isLoading,
    error,
  } = trpc.getUsersTasks.useQuery(undefined, {
    placeholderData: [],
  });
  const [tasks, setTasks] = useState<Task[]>(usersTasks || []);

  useEffect(() => {
    setTasks(usersTasks as Task[]);
  }, [usersTasks]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Something went wrong... {error.message}</div>;
  }

  const createTask = (columnId: Id) => {
    const newTask: Task = {
      id: generateId(),
      initial: true,
      status: columnId,
      title: "",
      createdById: 10, //TODO get active user id
    };

    setTasks([newTask, ...tasks]);
    console.log("newTask", newTask);
  };

  const deleteTask = (id: Id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const updateTask = (id: Id, title: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) {
        return task;
      }
      return { ...task, title };
    });

    setTasks(newTasks);
  };

  const generateId = () => {
    return Math.floor(Math.random() * 10001);
  };

  const onDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === "Column") {
      setActiveColumn(e.active.data.current.column);
      return;
    }

    if (e.active.data.current?.type === "Task") {
      setActiveTask(e.active.data.current.task);
      return;
    }
  };

  const onDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    if (!over) {
      // not over a valid element
      return;
    }

    const activeTaskId = active.id;
    const overTaskId = over.id;

    if (activeTaskId === overTaskId) {
      // dropped task in it's original spot
      return;
    }

    // check if active and over are tasks
    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    // this event is only for tasks
    if (!isActiveATask) {
      return;
    }

    // drop task on task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeTaskId);
        const overIndex = tasks.findIndex((t) => t.id === overTaskId);

        tasks[activeIndex].status = tasks[overIndex].status;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";
    // drop task on column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => {
          return t.id === activeTaskId;
        });

        tasks[activeIndex].status = overTaskId;

        // trigger a re-render
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
    >
      <div className="flex flex-nowrap gap-4 justify-center">
        <SortableContext items={columnsId}>
          {columns.map((col) => (
            <KanbanColumn
              key={col.id}
              column={col}
              tasks={tasks.filter((task) => task.status === col.id)}
              deleteTask={deleteTask}
              updateTask={updateTask}
              createTask={createTask}
            />
          ))}
        </SortableContext>
      </div>

      {typeof window === "object" &&
        createPortal(
          <DragOverlay>
            {activeTask ? (
              <KanbanCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ) : null}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );
};

export default KanbanBoard;

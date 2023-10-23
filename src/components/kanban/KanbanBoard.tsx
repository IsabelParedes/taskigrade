"use client";

import { trpc } from "@/app/_trpc/client";
import { statusCols } from "@/lib/constants";
import { Task } from "@/lib/validators/taskValidator";
import { Id } from "@/types/types";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createId } from "@paralleldrive/cuid2";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import KanbanColumn from "./KanbanColumn";
import OverlayCard from "./OverlayCard";

interface KanbanBoardProps {
  userId: string;
  userAvatar: string;
}

const KanbanBoard = ({ userAvatar, userId }: KanbanBoardProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const utils = trpc.useContext();

  const columnsId = statusCols.map((col) => col.id);

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

  const { data: taskOrder, refetch: refetchTaskOrder } =
    trpc.getTaskOrder.useQuery();

  const { mutate: updateStatus } = trpc.updateStatus.useMutation({
    onSuccess: () => {
      utils.getUsersTasks.invalidate();
    },
  });

  const { mutate: removeTask } = trpc.deleteTask.useMutation({
    onSuccess: () => {
      utils.getUsersTasks.invalidate();
    },
  });

  const { mutate: updateTaskOrder } = trpc.updateTaskOrder.useMutation({
    onSuccess: () => {
      utils.getTaskOrder.invalidate();
    },
  });

  useEffect(() => {
    const arrayIdsOrder = JSON.parse(localStorage.getItem("taskOrder")!);

    if (!arrayIdsOrder && usersTasks?.length) {
      const idsOrderArray = usersTasks.map((t) => t.id);
      localStorage.setItem("taskOrder", JSON.stringify(idsOrderArray));
    }

    let myArray;
    if (arrayIdsOrder?.length && usersTasks?.length) {
      myArray = arrayIdsOrder.map((taskId: string) => {
        return usersTasks.find((task) => task.id === taskId);
      });

      const newItems = usersTasks.filter((task) => {
        return !arrayIdsOrder.includes(task.id);
      });

      if (newItems?.length) myArray = [...newItems, ...myArray];
    }

    setTasks(myArray || (usersTasks as Task[]));
  }, [usersTasks]);

  const createTask = (columnId: Id) => {
    const newTask: Task = {
      id: createId(),
      status: columnId as string,
      title: "",
      initial: true,
      totalTime: 0,
      createdById: userId,
    };

    setTasks([...tasks, newTask]);
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

  const deleteTask = (taskId: string) => {
    const arrayIdsOrder = JSON.parse(localStorage.getItem("taskOrder")!);

    if (arrayIdsOrder?.length) {
      const newIdsOrderArray = arrayIdsOrder.filter(
        (id: string) => id !== taskId
      );
      localStorage.setItem("taskOrder", JSON.stringify(newIdsOrderArray));
    }

    removeTask({ id: taskId });
  };

  const onDragStart = (e: DragStartEvent) => {
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
      const activeIndex = tasks.findIndex((t) => t.id === activeTaskId);
      const overIndex = tasks.findIndex((t) => t.id === overTaskId);

      tasks[activeIndex].status = tasks[overIndex].status;

      setTasks(arrayMove(tasks, activeIndex, overIndex));
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // drop task on column
    if (isActiveATask && isOverAColumn) {
      const activeIndex = tasks.findIndex((t) => {
        return t.id === activeTaskId;
      });

      tasks[activeIndex].status = overTaskId as string;

      // trigger a re-render
      setTasks(arrayMove(tasks, activeIndex, activeIndex));
    }
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { active } = e;

    const activeTaskId = active.id;

    const activeIndex = tasks.findIndex((t) => {
      return t.id === activeTaskId;
    });

    //TODO: maybe save this as a user field
    const idsOrderArray = tasks.map((task) => task.id);
    localStorage.setItem("taskOrder", JSON.stringify(idsOrderArray));

    updateStatus({
      taskId: tasks[activeIndex].id as string,
      status: tasks[activeIndex].status as string,
    });
  };

  //TODO make real loading/error UIs
  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Something went wrong... {error.message}</div>;
  }

  return (
    <DndContext
      id="unique-dnd-context-id"
      sensors={sensors}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <div className="flex flex-nowrap gap-4 justify-center">
        <SortableContext items={columnsId}>
          {statusCols.map((col) => (
            <KanbanColumn
              key={col.id}
              column={col}
              tasks={tasks.filter((task) => task.status === col.id)}
              updateTask={updateTask}
              createTask={createTask}
              deleteTask={deleteTask}
            />
          ))}
        </SortableContext>
      </div>

      {typeof window === "object" &&
        createPortal(
          <DragOverlay>
            {activeTask ? <OverlayCard title={activeTask.title} /> : null}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );
};

export default KanbanBoard;

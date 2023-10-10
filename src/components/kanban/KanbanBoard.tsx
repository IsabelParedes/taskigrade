"use client";

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
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import KanbanCard from "./KanbanCard";
import KanbanColumn from "./KanbanColumn";

interface KanbanBoardProps {}

export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  columnId: Id;
  content: string;
};

const defaultCols: Column[] = [
  {
    id: "todo",
    title: "Todo",
  },
  {
    id: "doing",
    title: "Work in progress",
  },
  {
    id: "done",
    title: "Done",
  },
];

const defaultTasks: Task[] = [
  {
    id: "1",
    columnId: "todo",
    content: "List admin APIs for dashboard",
  },
  {
    id: "2",
    columnId: "todo",
    content:
      "Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation",
  },
  {
    id: "3",
    columnId: "doing",
    content: "Conduct security testing",
  },
  {
    id: "4",
    columnId: "doing",
    content: "Analyze competitors",
  },
  {
    id: "5",
    columnId: "done",
    content: "Create UI kit documentation",
  },
  {
    id: "6",
    columnId: "done",
    content: "Dev meeting",
  },
  {
    id: "7",
    columnId: "done",
    content: "Deliver dashboard prototype",
  },
  {
    id: "8",
    columnId: "todo",
    content: "Optimize application performance",
  },
  {
    id: "9",
    columnId: "todo",
    content: "Implement data validation",
  },
  {
    id: "10",
    columnId: "todo",
    content: "Design database schema",
  },
  {
    id: "11",
    columnId: "todo",
    content: "Integrate SSL web certificates into workflow",
  },
  {
    id: "12",
    columnId: "doing",
    content: "Implement error logging and monitoring",
  },
  {
    id: "13",
    columnId: "doing",
    content: "Design and implement responsive UI",
  },
];

const KanbanBoard = ({}: KanbanBoardProps) => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [columns, setColumns] = useState<Column[]>(defaultCols);

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

  const createTask = (columnId: Id) => {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: Id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const updateTask = (id: Id, content: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) {
        return task;
      }
      return { ...task, content };
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

  const onDragEnd = (e: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = e;
    if (!over) {
      // not over a valid element
      return;
    }

    const activeColId = active.id;
    const overColId = over.id;

    if (activeColId === overColId) {
      // dropped column in it's original spot
      return;
    }
  };

  const onDragOver = (e: DragOverEvent) => {
    console.log("e", e);
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

        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";
    // drop task on column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeTaskId);

        tasks[activeIndex].columnId = overTaskId;

        // trigger a re-render
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };
  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className="flex flex-nowrap gap-4 overflow-scroll">
        <SortableContext items={columnsId}>
          {columns.map((col) => (
            <KanbanColumn
              key={col.id}
              column={col}
              tasks={tasks.filter((task) => task.columnId === col.id)}
              deleteTask={deleteTask}
              updateTask={updateTask}
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

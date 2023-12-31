"use client";

import { trpc } from "@/app/_trpc/client";
import { Id, Task } from "@/types/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";

interface KanbanCardProps {
  task: Task;
  updateTask: (id: Id, content: string) => void;
  deleteTask: (taskId: string) => void;
}

const KanbanCard = ({ task, updateTask, deleteTask }: KanbanCardProps) => {
  const [editMode, setEditMode] = useState(false);

  const utils = trpc.useContext();

  /*  const { userId } = useAuth();
  if (!userId) {
    redirect("/");
  } */

  useEffect(() => {
    if (task.initial) {
      setEditMode(true);
    }
  }, [task.initial]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    task.initial = false;
    setEditMode((prev) => !prev);
  };

  //upsert task
  const { mutate: saveTask } = trpc.upsertTask.useMutation({
    onSuccess: () => {
      console.log("success");
      utils.getUsersTasks.invalidate();
    },
    onError: () => {
      console.log("error");
    },
    onMutate: () => {
      toggleEditMode();
    },
  });

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className=" p-3 h-48 rounded-xl cursor-grab border-2 opacity-50 bg-accent bg-emerald-600"
      />
    );
  }
  const EditContent = () => {
    return (
      <Input
        value={task.title}
        autoFocus
        onBlur={() => setEditMode(false)}
        placeholder="Enter task here..."
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.shiftKey) {
            saveTask({
              id: task.id as string,
              title: task.title,
              createdById: task.createdById,
              initial: false,
              status: task.status as string,
              description: task.description,
            });
          }
        }}
        onChange={(e) => updateTask(task.id, e.target.value)}
      />
    );
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab bg-secondary hover:bg-accent/80"
    >
      <CardHeader>
        <CardTitle className="flex"></CardTitle>
      </CardHeader>
      <CardContent
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          toggleEditMode();
        }}
      >
        {editMode ? <EditContent /> : task.title}
      </CardContent>
      <CardFooter className="justify-end">
        {editMode ? (
          <Button
            key={`save ${task.id}`}
            aria-label="save new task"
            size={"sm"}
            variant={"outline"}
            className="bg-transparent hover:bg-secondary"
            onMouseDown={(e) =>
              // need this so onClick fires before inputs onBlur
              e.preventDefault()
            }
            onClick={() => {
              saveTask({
                id: task.id as string,
                title: task.title,
                createdById: task.createdById,
                initial: false,
                status: task.status as string,
                description: task.description,
              });
            }}
          >
            Save
          </Button>
        ) : (
          <Button
            key={`delete ${task.id}`}
            aria-label="delete task"
            size={"sm"}
            variant={"outline"}
            className="bg-transparent hover:bg-destructive"
            onClick={() => {
              deleteTask(task.id as string);
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default KanbanCard;

"use client";

import { Id, Task } from "@/temp/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Hash, Trash } from "lucide-react";
import { useState } from "react";
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
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

const KanbanCard = ({ task, deleteTask, updateTask }: KanbanCardProps) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

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
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className=" p-3 h-48 rounded-xl cursor-grab border-2 opacity-50 bg-accent"
      />
    );
  }

  if (editMode) {
    return (
      <Card
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={toggleEditMode}
        className="cursor-grab"
      >
        <CardHeader>
          <CardTitle>{task.id}</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            value={task.content}
            autoFocus
            placeholder="Enter task here..."
            onBlur={toggleEditMode}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey) {
                toggleEditMode;
              }
            }}
            onChange={(e) => updateTask(task.id, e.target.value)}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      className="cursor-grab hover:bg-accent/80"
    >
      <CardHeader>
        <CardTitle className="flex">
          <Hash />
          {task.id}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm">{task.content}</CardContent>
      <CardFooter className="justify-end">
        <Button
          aria-label="delete task"
          size={"icon"}
          variant={"outline"}
          className="h-6 w-6 bg-transparent hover:bg-destructive"
          onClick={() => {
            deleteTask(task.id);
          }}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default KanbanCard;

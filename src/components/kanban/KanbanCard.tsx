"use client";


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
import { Id, Task } from "@/types/types";

interface KanbanCardProps {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

const KanbanCard = ({ task, deleteTask, updateTask }: KanbanCardProps) => {
  //const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

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

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className=" p-3 h-48 rounded-xl cursor-grab border-2 opacity-50 bg-accent"
      />
    );
  }
  const EditContent = () => {
    return (
      <Input
        value={task.title}
        autoFocus
        placeholder="Enter task here..."
        onBlur={toggleEditMode}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.shiftKey) {
            toggleEditMode();
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
      onClick={toggleEditMode}
      className="cursor-grab hover:bg-accent/80"
    >
      <CardHeader>
        <CardTitle className="flex">
          {/* <Hash />
          {task.id} */}
        </CardTitle>
      </CardHeader>
      <CardContent>{editMode ? <EditContent /> : task.title}</CardContent>
      <CardFooter className="justify-end">
        {editMode ? (
          <Button
            aria-label="save new task"
            size={"sm"}
            variant={"outline"}
            className="bg-transparent hover:bg-destructive"
            onClick={() => {}}
          >
            Save
          </Button>
        ) : (
          <Button
            aria-label="delete task"
            size={"sm"}
            variant={"outline"}
            className="bg-transparent hover:bg-destructive"
            onClick={() => {
              deleteTask(task.id);
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

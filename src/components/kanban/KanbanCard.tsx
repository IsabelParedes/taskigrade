"use client";

import { trpc } from "@/app/_trpc/client";
import { Task } from "@/lib/validators/taskValidator";
import { Id } from "@/types/types";
import { useUser } from "@clerk/nextjs";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GitBranchPlus, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import KanbanModal from "./KanbanModal";

interface KanbanCardProps {
  task: Task;
  updateTask: (id: Id, content: string) => void;
  deleteTask: (taskId: string) => void;
}

const KanbanCard = ({ task, updateTask, deleteTask }: KanbanCardProps) => {
  const { user } = useUser();

  const utils = trpc.useContext();

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

  //upsert task
  const { mutate: saveTask } = trpc.upsertTask.useMutation({
    onSuccess: () => {
      console.log("success");
      utils.getUsersTasks.invalidate();
    },
    onError: () => {
      console.log("error");
    },
  });

  const addSubTask = () => {
    console.log("click");
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className=" p-3 h-48 rounded-xl cursor-grab border-2 opacity-50 bg-accent bg-emerald-600"
      />
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
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
          <CardContent>
            {task.initial ? (
              <>
                <Input
                  value={task.title}
                  autoFocus
                  placeholder="Enter task here..."
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveTask({
                        id: task.id as string,
                        title: task.title,
                        createdById: task.createdById,
                        initial: false,
                        status: task.status as string,
                        totalTime: task.totalTime,
                      });
                    }
                  }}
                  onChange={(e) => updateTask(task.id, e.target.value)}
                />
                <span className="text-xs text-foreground/80">
                  Press Enter to save...
                </span>
              </>
            ) : (
              <div className="flex justify-between">
                {task.title}
                <Avatar className="h-6 w-6">
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback>
                    {user?.firstName?.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
          </CardContent>
          <CardFooter className="justify-end">
            {task.initial ? (
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
                onClick={(e) => {
                  e.stopPropagation();
                  saveTask({
                    id: task.id as string,
                    title: task.title,
                    createdById: task.createdById,
                    initial: false,
                    status: task.status as string,
                    description: task.description,
                    totalTime: task.totalTime,
                  });
                }}
              >
                Save
              </Button>
            ) : (
              <div className="flex justify-between w-full">
                <Button
                  size={"sm"}
                  className="border hover:bg-secondary"
                  onClick={addSubTask}
                >
                  <GitBranchPlus className="h-4 w-4" />
                </Button>
                <Button
                  key={`delete ${task.id}`}
                  aria-label="delete task"
                  size={"sm"}
                  variant={"outline"}
                  className="bg-transparent hover:bg-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(task.id as string);
                  }}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      </DialogTrigger>

      <DialogContent
        className="w-full max-w-5xl h-fit"
        onBlur={() => utils.getUsersTasks.invalidate()}
      >
        <KanbanModal task={task} />
      </DialogContent>
    </Dialog>
  );
};

export default KanbanCard;

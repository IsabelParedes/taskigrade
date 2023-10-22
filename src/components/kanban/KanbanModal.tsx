"use client";

import { trpc } from "@/app/_trpc/client";
import { DialogDescription, DialogHeader } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Task } from "@/lib/validators/taskValidator";
import { Check, ChevronRight, Dot, Flag, Tag } from "lucide-react";
import { useState } from "react";
import DueDatePicker from "../taskModal/DueDatePicker";
import Timer from "../taskModal/Timer";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import TaskTitle from "./TaskTitle";

const task = {
  id: "test",
  title: "test title",
  status: "todo",
  createdById: "created_by",
  initial: false,
  description: "description",
  totalTime: "time number",
  dueDate: "tomorrow",
  tags: ["tag1", "tag2", "tag3"],
  priority: "high",
  subtasks: ["subtask1", "subtask2", "subtask3"],
};

const statuses = [
  { status: "todo", display: "To Do" },
  { status: "inprogress", display: "In Progress" },
  { status: "test", display: "Test" },
  { status: "complete", display: "Complete" },
];

const priorities = ["urgent", "high", "normal", "low"];

interface KanbanModalProps {
  task: Task;
}

const KanbanModal = ({ task: tempRename }: KanbanModalProps) => {
  const task = {
    ...tempRename,
    tags: ["tag1", "tag2", "tag3"],
    subtasks: ["subtask1", "subtask2", "subtask3"],
  };

  const statusDisplayMap: Record<string, string> = {
    todo: "To Do",
    inprogress: "In Progress",
    test: "Test",
    complete: "Complete",
  };

  const priorityColorMap: Record<string, string> = {
    urgent: "fill-red-600",
    high: "fill-yellow-600",
    normal: "fill-blue-600",
    low: "fill-gray-600",
  };

  const [displayStatus, setDisplayStatus] = useState(task.status);
  const [displayPriority, setDisplayPriority] = useState(task.priority);

  const utils = trpc.useContext();

  const { mutate: updateStatus } = trpc.updateStatus.useMutation({
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      console.log("error");
    },
    onMutate: ({ status }) => {
      setDisplayStatus(status);
    },
  });

  const { mutate: updatePriority } = trpc.updatePriority.useMutation({
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      console.log("error");
    },
    onMutate: ({ priority }) => {
      console.log("priority", priority);
      setDisplayPriority(priority);
    },
  });

  return (
    <div className="flex flex-col">
      <DialogHeader className="space-y-2 mt-4 ">
        {/** header first row */}
        <div className="flex gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-r-none">
                {statusDisplayMap[displayStatus]}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {statuses.map((status) => (
                <DropdownMenuItem
                  key={status.status}
                  className="flex w-full items-center justify-between"
                  onClick={() =>
                    updateStatus({ taskId: task.id, status: status.status })
                  }
                >
                  <span className="capitalize">
                    {status.display ? status.display : status.status}
                  </span>
                  {displayStatus === status.status ? (
                    <Check className="w-4 h-4" />
                  ) : null}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size={"icon"} className="rounded-l-none">
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button variant={"outline"} size={"icon"}>
            <Check className="w-4 h-4" />
          </Button>

          <Avatar className="ml-6 mr-auto">
            <AvatarImage src={task.createdById} />
            <AvatarFallback>F</AvatarFallback>
          </Avatar>

          <DropdownMenu>
            {task.priority ? (
              <span className="capitalize text-xs text-muted-foreground self-center mr-2">
                {displayPriority}
              </span>
            ) : null}
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"} size={"icon"}>
                <Flag
                  className={cn(
                    "w-4 h-4",
                    displayPriority ? priorityColorMap[displayPriority] : ""
                  )}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {priorities.map((priority) => (
                <DropdownMenuItem
                  key={priority}
                  className="flex w-full items-center justify-between"
                  onClick={() => {
                    updatePriority({ taskId: task.id, priority });
                  }}
                >
                  <span className="capitalize">{priority}</span>
                  {task.priority === priority ? (
                    <Check className="w-4 h-4" />
                  ) : null}
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex w-full items-center justify-between">
                Clear
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/** header second row */}
        <div className="flex gap-6">
          <div className="flex flex-col mr-auto">
            <span className="text-sm text-muted-foreground">Time Tracked</span>
            <Timer taskId={task.id} totalTime={task.totalTime} />
          </div>

          <DueDatePicker task={task} />
        </div>

        {/** header third row */}
        <div className="flex justify-between">
          <div>
            {task.tags.map((tag) => (
              <Badge key={tag} className=" mr-1 rounded-l-none">
                {tag}
              </Badge>
            ))}
          </div>

          <Button variant={"outline"} size={"icon"}>
            <Tag className="w-4 h-4" />
          </Button>
        </div>
        <Separator />
      </DialogHeader>

      {/* Main section */}
      <div className="flex flex-col flex-1 justify-around">
        <TaskTitle taskId={task.id} taskTitle={task.title} isModal />
        <DialogDescription>
          {task.description
            ? task.description
            : "Enter your description here..."}
        </DialogDescription>
      </div>

      {/*Sub tasks */}

      <div>
        <Separator />
        <ul className="flex flex-col gap-4 pt-2">
          {task.subtasks.map((task) => (
            <li key={task} className="flex items-center mr-4">
              <Dot className="w-4 h-4" />
              {task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default KanbanModal;

/** for testing only */
"use client";

import { trpc } from "@/app/_trpc/client";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Task } from "@/lib/validators/taskValidator";
import { Check, ChevronRight, Dot, Flag, Tag } from "lucide-react";
import { useState } from "react";
import DropdownItem from "../taskModal/DropdownItem";
import DueDatePicker from "../taskModal/DueDatePicker";
import Timer from "../taskModal/Timer";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

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

const priorities = ["urgent", "high", "normal", "complete"];

interface KanbanModalProps {
  task: Task;
}

const KanbanModal = ({ task: tempRename }: KanbanModalProps) => {
  const task = {
    ...tempRename,
    //totalTime: "time number",
    //dueDate: "tomorrow",
    tags: ["tag1", "tag2", "tag3"],
    priority: "high",
    subtasks: ["subtask1", "subtask2", "subtask3"],
  };

  const statusDisplayMap: Record<string, string> = {
    todo: "To Do",
    inprogress: "In Progress",
    test: "Test",
    complete: "Complete",
  };

  const [displayStatus, setDisplayStatus] = useState(task.status);

  const utils = trpc.useContext();

  const { mutate: updateStatus } = trpc.updateStatus.useMutation({
    onSuccess: () => {
      //utils.getUsersTasks.invalidate();
    },
    onMutate: ({ status }) => {
      setDisplayStatus(status);
    },
  });

  return (
    <>
      <div className="flex flex-col space-y-2 mt-4">
        <DialogHeader>
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
                  <DropdownItem
                    key={status.status}
                    taskId={task.id}
                    displayName={status.display}
                    detailName={status.status}
                    taskDetail={displayStatus}
                    updateStatus={() =>
                      updateStatus({ taskId: task.id, status: status.status })
                    }
                  />
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size={"icon"} className="rounded-l-none">
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button variant={"outline"} size={"icon"}>
              <Check className="w-4 h-4" />
            </Button>
            <Avatar className="mx-6">
              <AvatarImage src={task.createdById} />
              <AvatarFallback>F</AvatarFallback>
            </Avatar>

            <Separator orientation="vertical" className="mx-auto" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"} size={"icon"}>
                  <Flag className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {priorities.map((priority) => (
                  <DropdownItem
                    key={priority}
                    taskId={task.id}
                    detailName={priority}
                    taskDetail={task.priority}
                  />
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
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">
                Time Tracked
              </span>
              <span>
                <Timer taskId={task.id} totalTime={task.totalTime} />
              </span>
            </div>
            <Separator orientation="vertical" className="mx-auto" />
            {task.dueDate ? (
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Due Date</span>
                <span className="text-xs">{task.dueDate}</span>
              </div>
            ) : null}
            <div className="flex justify-around items-center gap-2">
              <DueDatePicker taskId={task.id} />
            </div>
          </div>

          {/** header third row */}
          <div className="flex items-center">
            <div>
              {task.tags.map((tag) => (
                <Badge key={tag} className=" mr-1 rounded-l-none">
                  {tag}
                </Badge>
              ))}
            </div>
            <Separator orientation="vertical" className="mx-auto" />
            <Button variant={"outline"} size={"icon"}>
              <Tag className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        <Separator />
      </div>

      <div className="">
        <DialogTitle className="text-4xl">{task.title}</DialogTitle>
        <DialogDescription>{task.description}</DialogDescription>
      </div>
      <div>
        <Separator />
        <ul className="flex flex-col gap-4">
          {task.subtasks.map((task) => (
            <li key={task} className="flex items-center mr-4">
              <Dot className="w-4 h-4" />
              {task}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default KanbanModal;

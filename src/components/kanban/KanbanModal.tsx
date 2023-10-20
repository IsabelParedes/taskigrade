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
import { ChangeEvent, useState } from "react";
import DropdownItem from "../taskModal/DropdownItem";
import DueDatePicker from "../taskModal/DueDatePicker";
import Timer from "../taskModal/Timer";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
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

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(task.title);
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

  //upsert task
  const { mutate: saveTask } = trpc.upsertTask.useMutation({
    onSuccess: (data) => {
      console.log("success");
      console.log("data", data);
      //utils.getUsersTasks.invalidate();
    },
    onError: () => {
      console.log("error");
    },
    onMutate: () => {
      toggleEditMode();
    },
  });

  const toggleEditMode = () => {
    task.initial = false;
    setEditMode((prev) => !prev);
  };

  const handle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const EditContent = () => {
    return (
      <>
        <Input
          value={title}
          autoFocus
          onBlur={() => setEditMode(false)}
          placeholder="Enter task here..."
          className="h-14 text-4xl w-fit"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              saveTask({
                id: task.id as string,
                title: title,
                createdById: task.createdById,
                initial: false,
                status: task.status as string,
                description: task.description,
                totalTime: task.totalTime,
              });
            }
          }}
          onChange={handle}
        />
        <span className="text-sm font-normal text-foreground/80">
          Press Enter to save
        </span>
      </>
    );
  };

  return (
    <div className="flex flex-col ">
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
            <span className="text-sm text-muted-foreground">Time Tracked</span>
            <span>
              <Timer taskId={task.id} totalTime={task.totalTime} />
            </span>
          </div>
          <Separator orientation="vertical" className="mx-auto" />
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
          <Separator orientation="vertical" className="mx-auto" />
          <Button variant={"outline"} size={"icon"}>
            <Tag className="w-4 h-4" />
          </Button>
        </div>
        <Separator />
      </DialogHeader>

      {/* Main section */}
      <div className="flex flex-col flex-1 justify-around">
        <DialogTitle
          className="text-4xl"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            toggleEditMode();
          }}
        >
          {editMode ? <EditContent /> : title}
        </DialogTitle>
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

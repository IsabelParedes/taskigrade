/** for testing only */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, Check, ChevronRight, Dot, Flag, Tag } from "lucide-react";
import DropdownItem from "../taskModal/DropdownItem";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface Props {}

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
  subtasks: ["subtask1", "subtask2", "subtask3"],
};

const statuses = [
  { status: "todo", display: "To Do" },
  { status: "inprogress", display: "In Progress" },
  { status: "test", display: "Test" },
  { status: "complete", display: "Complete" },
];

const KanbanModal = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="w-full max-w-5xl h-[80%]">
        <div className="flex flex-col space-y-2 mt-4">
          <DialogHeader>
            {/** header first row */}
            <div className="flex gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button className="rounded-r-none capitalize">
                    {task.status}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {statuses.map((status) => (
                    <DropdownItem
                      key={status.status}
                      displayName={status.display}
                      statusName={status.status}
                      taskStatus={task.status}
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
                <DropdownMenuTrigger className="">
                  <Button variant={"outline"} size={"icon"}>
                    <Flag className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="flex w-full items-center justify-between">
                    Urgent
                    {task.status === "urgent" ? (
                      <Check className="w-4 h-4" />
                    ) : null}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex w-full items-center justify-between">
                    High
                    {task.status === "high" ? (
                      <Check className="w-4 h-4" />
                    ) : null}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex w-full items-center justify-between">
                    Normal
                    {task.status === "normal" ? (
                      <Check className="w-4 h-4" />
                    ) : null}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex w-full items-center justify-between">
                    Complete
                    {task.status === "complete" ? (
                      <Check className="w-4 h-4" />
                    ) : null}
                  </DropdownMenuItem>
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
                <span className="text-xs">{task.totalTime}</span>
              </div>
              <Separator orientation="vertical" className="mx-auto" />
              {task.dueDate ? (
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    Due Date
                  </span>
                  <span className="text-xs">{task.dueDate}</span>
                </div>
              ) : null}
              <div className="flex justify-around items-center gap-2">
                <Button variant={"outline"} size={"icon"}>
                  <Calendar className="w-4 h-4" />
                </Button>
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
      </DialogContent>
    </Dialog>
  );
};
export default KanbanModal;

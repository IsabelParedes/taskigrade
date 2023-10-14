"use client";

import { Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Id } from "@/types/types";

interface KanbanHeaderProps {
  title: string;
  count: number;
  columnId: Id;
  createTask: (columnId: Id) => void;

  // title: "to do" | "in progress" | "test" | "complete";
}

const KanbanHeader = ({
  count,
  title,
  createTask,
  columnId,
}: KanbanHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <Badge variant={"outline"}>{count}</Badge>
      {title}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => createTask(columnId)}
              size={"icon"}
              variant={"ghost"}
              className="h-5 w-5"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Add a task</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default KanbanHeader;

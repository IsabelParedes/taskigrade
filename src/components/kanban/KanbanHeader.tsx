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

interface KanbanHeaderProps {
  title: string;
  count: number;
  // title: "to do" | "in progress" | "test" | "complete";
}

const KanbanHeader = ({ count, title }: KanbanHeaderProps) => {
  const handleClick = () => {
    console.log("click");
  };

  return (
    <div className="flex justify-between items-center">
      {title} <Badge variant={"outline"}>{count}</Badge>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleClick}
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

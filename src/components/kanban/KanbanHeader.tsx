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
  title: "to do" | "in progress" | "test" | "complete";
}

const KanbanHeader = ({ title }: KanbanHeaderProps) => {
  const handleClick = () => {
    console.log("click");
  };

  return (
    <div className="flex justify-between items-center">
      {title} <Badge variant={"outline"}>2</Badge>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleClick}
              size={"icon"}
              variant={"ghost"}
              className="h-4 w-4"
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
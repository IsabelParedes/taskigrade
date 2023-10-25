"use client";

import { GitBranchPlus, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface OverlayCardProps {
  title?: string;
}

const OverlayCard = ({ title }: OverlayCardProps) => {
  const style = {
    //transition,
    //transform: CSS.Transform.toString(transform),
  };

  return (
    <Card style={style} className="cursor-grab bg-secondary hover:bg-accent/80">
      <CardHeader>
        <CardTitle className="flex"></CardTitle>
      </CardHeader>
      <CardContent>{title}</CardContent>
      <CardFooter className="justify-between">
        <div className="h-9 inline-flex rounded-md px-3 border items-center justify-center">
          <GitBranchPlus className="h-4 w-4 " />
        </div>
        <div className="h-9 inline-flex rounded-md px-3 border items-center justify-center">
          <Trash className="h-4 w-4 " />
        </div>
      </CardFooter>
    </Card>
  );
};

export default OverlayCard;

"use client";

import { Trash } from "lucide-react";
import { Button } from "../ui/button";
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
      <CardFooter className="justify-end">
        <Button
          size={"sm"}
          variant={"outline"}
          className="bg-transparent hover:bg-destructive"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OverlayCard;

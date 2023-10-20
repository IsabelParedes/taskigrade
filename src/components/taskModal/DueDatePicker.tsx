"use client";

import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Task } from "@/lib/validators/taskValidator";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface DueDatePickerProps {
  //taskId: string;
  task: Task;
}

const DueDatePicker = ({ task }: DueDatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(
    task.dueDate ? new Date(task.dueDate) : undefined
  );
  const [calendarOpen, setCalendarOpen] = useState(false);

  const { mutate: updateDueDate } = trpc.updateDueDate.useMutation({
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      console.log("error");
    },
  });

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      updateDueDate({ dueDate: selectedDate.getTime(), taskId: task.id });
    }
    setCalendarOpen(false);
  };

  return (
    <>
      {date ? (
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Due Date</span>
          <span className="text-xs text-right">{format(date, "MMM d")}</span>
        </div>
      ) : null}
      <div className="flex justify-around items-center gap-2">
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button size={"icon"} variant={"outline"}>
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(e) => handleSelect(e)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};
export default DueDatePicker;

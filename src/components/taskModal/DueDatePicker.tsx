"use client";

import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface DueDatePickerProps {
  taskId: string;
}

const DueDatePicker = ({ taskId }: DueDatePickerProps) => {
  const now = new Date();
  const [date, setDate] = useState<Date | undefined>(now);
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
    console.log("date", selectedDate);
    setDate(selectedDate);
    if (selectedDate) {
      updateDueDate({ dueDate: selectedDate.getTime(), taskId });
    }
    setCalendarOpen(false);
  };

  return (
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
  );
};
export default DueDatePicker;

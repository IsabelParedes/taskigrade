"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface DueDatePickerProps {
  taskId: string;
}

const DueDatePicker = ({ taskId }: DueDatePickerProps) => {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    console.log("date", date);
    console.log("string", formatISO(date!));
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
export default DueDatePicker;

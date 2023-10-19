import { Task } from "@/lib/validators/taskValidator";
import { Check } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";

interface DropdownItemProps {
  displayName: string;
  statusName: string;
  taskStatus: string;
}

const DropdownItem = ({
  taskStatus,
  statusName,
  displayName,
}: DropdownItemProps) => {
  return (
    <DropdownMenuItem className="flex w-full items-center justify-between">
      {displayName}
      {taskStatus === statusName ? <Check className="w-4 h-4" /> : null}
    </DropdownMenuItem>
  );
};
export default DropdownItem;

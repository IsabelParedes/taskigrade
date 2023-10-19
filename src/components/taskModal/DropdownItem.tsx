import { Check } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";

interface DropdownItemProps {
  displayName?: string;
  detailName: string;
  taskDetail: string;
}

const DropdownItem = ({
  taskDetail,
  detailName,
  displayName,
}: DropdownItemProps) => {
  return (
    <DropdownMenuItem className="flex w-full items-center justify-between">
      <span className="capitalize">
        {displayName ? displayName : detailName}
      </span>
      {taskDetail === detailName ? <Check className="w-4 h-4" /> : null}
    </DropdownMenuItem>
  );
};
export default DropdownItem;

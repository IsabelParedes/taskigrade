"use client";

import { trpc } from "@/app/_trpc/client";
import { Check } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";

interface DropdownItemProps {
  taskId: string;
  displayName?: string;
  detailName: string;
  taskDetail: string;
}

const DropdownItem = ({
  taskId,
  taskDetail,
  detailName,
  displayName,
}: DropdownItemProps) => {
  const utils = trpc.useContext();

  const { mutate: updateStatus } = trpc.updateStatus.useMutation({
    onSuccess: () => {
      console.log("status updated");
      utils.getUsersTasks.invalidate();
    },
  });

  return (
    <DropdownMenuItem
      className="flex w-full items-center justify-between"
      onClick={() =>
        updateStatus({
          taskId,
          status: detailName,
        })
      }
    >
      <span className="capitalize">
        {displayName ? displayName : detailName}
      </span>
      {taskDetail === detailName ? <Check className="w-4 h-4" /> : null}
    </DropdownMenuItem>
  );
};
export default DropdownItem;

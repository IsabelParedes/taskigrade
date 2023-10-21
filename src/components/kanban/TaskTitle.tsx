import { trpc } from "@/app/_trpc/client";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

interface TaskTitleProps {
  taskId: string;
  taskTitle: string;
  isModal: boolean;
  userImageUrl?: string;
  userFirstName?: string;
  initial?: boolean;
}

const TaskTitle = ({ taskId, taskTitle, isModal, initial }: TaskTitleProps) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(taskTitle);

  useEffect(() => {
    if (initial) {
      setEditMode(true);
    }
  }, [initial]);

  const { mutate: updateTitle } = trpc.updateTitle.useMutation({
    onSuccess: (data) => {
      console.log("success");
    },
    onError: () => {
      console.log("error");
    },
    onMutate: () => {
      setEditMode(false);
    },
  });

  return editMode ? (
    <div>
      <Input
        value={title}
        autoFocus
        onBlur={() => setEditMode(false)}
        placeholder="Enter task here..."
        className={isModal ? "h-14 text-4xl w-fit" : ""}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateTitle({
              taskId,
              title,
            });
          }
        }}
        onChange={(e) => setTitle(e.target.value)}
      />
      <span className="text-sm font-normal text-foreground/80">
        Press Enter to save
      </span>
    </div>
  ) : (
    <div
      className={
        isModal
          ? "text-4xl font-semibold leading-none tracking-tight cursor-pointer"
          : "flex justify-between"
      }
      onClick={() => setEditMode((prev) => !prev)}
    >
      {title}
    </div>
  );
};
export default TaskTitle;

import { trpc } from "@/app/_trpc/client";
import { useState } from "react";
import { Input } from "../ui/input";

interface TaskTitleProps {
  taskId: string;
  taskTitle: string;
  isModal: boolean;
  userImageUrl?: string;
  userFirstName?: string;
  initial?: boolean;
  classNameInput?: string;
  classNameText?: string;
  onKeyDown: (taskId: string, text: string) => void;
}

const TaskTitle = ({
  taskId,
  taskTitle,
  isModal,
  initial,
  classNameInput,
  classNameText,
  onKeyDown,
}: TaskTitleProps) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(taskTitle);

  // useEffect(() => {
  //   if (initial) {
  //     setEditMode(true);
  //   }
  // }, [initial]);

  // const { mutate: updateTitle } = trpc.updateTitle.useMutation({
  //   onSuccess: (data) => {
  //     console.log("success");
  //   },
  //   onError: () => {
  //     console.log("error");
  //   },
  //   onMutate: () => {
  //     setEditMode(false);
  //   },
  // });

  return editMode ? (
    <div>
      <Input
        value={title}
        autoFocus
        onBlur={() => setEditMode(false)}
        placeholder="Enter task here..."
        className={classNameInput}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setEditMode(false);
            onKeyDown(taskId, title);
          }
        }}
        onChange={(e) => setTitle(e.target.value)}
      />
      <span className="text-sm font-normal text-foreground/80">
        Press Enter to save
      </span>
    </div>
  ) : (
    <div className={classNameText} onClick={() => setEditMode((prev) => !prev)}>
      {title ? title : "Enter your description here..."}
    </div>
  );
};
export default TaskTitle;

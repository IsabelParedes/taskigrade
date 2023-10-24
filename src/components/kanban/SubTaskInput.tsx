"use client";

import { trpc } from "@/app/_trpc/client";
import { Input } from "@/components/ui/input";
import { createId } from "@paralleldrive/cuid2";
import { useState } from "react";

interface SubTaskInputProps {
  createdById?: string;
  parentId: string;
  toggleEditMode: () => void;
}

const SubTaskInput = ({
  createdById,
  parentId,
  toggleEditMode,
}: SubTaskInputProps) => {
  const [text, setText] = useState("");

  const utils = trpc.useContext();

  const { mutate: upsertTask } = trpc.upsertTask.useMutation({
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      console.log("error");
    },
    onSettled: () => {
      utils.getSubTasks.invalidate();
    },
    onMutate: (newSubTask: any) => {
      utils.getSubTasks.cancel();

      const prevSubTasks = utils.getSubTasks.getData();

      utils.getSubTasks.setData({ taskId: parentId }, (oldData) => {
        if (!oldData) {
          return [];
        }

        return [...oldData, newSubTask];
      });
    },
    mutationKey: ["addSubTask"],
  });

  if (!createdById) {
    return <div>Hold up</div>;
  }

  return (
    <div>
      <Input
        value={text}
        autoFocus
        // onBlur={() => toggleEditMode(false)}
        placeholder="Enter Sub Task..."
        className="mt-4"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            toggleEditMode();
            //onKeyDown(taskId, text);
            upsertTask({
              id: createId(),
              createdById: createdById,
              initial: false,
              parentId,
              status: "todo",
              title: text,
              totalTime: 0,
            });
          }
        }}
        onChange={(e) => setText(e.target.value)}
      />
      <span className="text-xs text-foreground/60">Press Enter to save</span>
    </div>
  );
};
export default SubTaskInput;

import { Input } from "@/components/ui/input";
import { useState } from "react";

interface TaskTextProps {
  taskId: string;
  taskText: string;
  classNameInput?: string;
  classNameText?: string;
  onKeyDown: (taskId: string, text: string) => void;
}

const TaskText = ({
  taskId,
  taskText,
  classNameInput,
  classNameText,
  onKeyDown,
}: TaskTextProps) => {
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState(taskText);

  return editMode ? (
    <div>
      <Input
        value={text}
        autoFocus
        onBlur={() => setEditMode(false)}
        placeholder="Enter task here..."
        className={classNameInput}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setEditMode(false);
            onKeyDown(taskId, text);
          }
        }}
        onChange={(e) => setText(e.target.value)}
      />
      <span className="text-sm font-normal text-foreground/80">
        Press Enter to save
      </span>
    </div>
  ) : (
    <div className={classNameText} onClick={() => setEditMode((prev) => !prev)}>
      {/* Title is required, so the only way there's no text is if it's a description */}
      {text ? text : "Enter your description here..."}
    </div>
  );
};
export default TaskText;

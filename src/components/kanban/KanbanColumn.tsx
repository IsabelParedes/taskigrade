import { Column, Id, Task } from "@/temp/types";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import KanbanCard from "./KanbanCard";
import KanbanHeader from "./KanbanHeader";

interface KanbanColumnProps {
  //title: "to do" | "in progress" | "test" | "complete";
  column: Column;
  tasks: Task[];
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

const KanbanColumn = ({
  column,
  tasks,
  deleteTask,
  updateTask,
}: KanbanColumnProps) => {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="basis-1/4 border-0"
    >
      <CardHeader className="capitalize text-center bg-secondary shadow-lg rounded-lg">
        <KanbanHeader title={column.title} count={tasks.length} />
        <Separator />
      </CardHeader>

      <CardContent className="gap-4 flex flex-col mt-4 bg-muted p-4 shadow-lg rounded-lg h-full">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <KanbanCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </CardContent>
    </Card>
  );
};

export default KanbanColumn;

"use client";

import { useEffect } from "react";
import KanbanColumn from "./KanbanColumn";

interface KanbanBoardProps {}

const KanbanBoard = ({}: KanbanBoardProps) => {
  useEffect(() => {
    const draggables = document.querySelectorAll(".task");
    const droppables = document.querySelectorAll(".lane");

    draggables.forEach((task) => {
      task.addEventListener("dragstart", () => {
        task.classList.add("is-dragging");
      });
    });

    draggables.forEach((task) => {
      task.addEventListener("dragend", () => {
        task.classList.remove("is-dragging");
      });
    });
  }, []);

  return (
    <div className="flex flex-nowrap gap-4 overflow-scroll">
      <div id="todo-column" className="lane">
        <KanbanColumn title="to do" />
      </div>
      <div className="lane">
        <KanbanColumn title="in progress" />
      </div>
      <KanbanColumn title="test" />
      <KanbanColumn title="complete" />
    </div>
  );
};

export default KanbanBoard;

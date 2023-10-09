"use client";

import KanbanColumn from "./KanbanColumn";

interface KanbanBoardProps {}

const KanbanBoard = ({}: KanbanBoardProps) => {
  return (
    <div className="flex flex-nowrap gap-4 overflow-scroll">
      <KanbanColumn title="to do" />
      <KanbanColumn title="in progress" />
      <KanbanColumn title="test" />
      <KanbanColumn title="complete" />
    </div>
  );
};

export default KanbanBoard;

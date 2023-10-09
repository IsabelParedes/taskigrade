import KanbanColumn from "./KanbanColumn";

interface KanbanBoardProps {}

const KanbanBoard = ({}: KanbanBoardProps) => {
  return (
    <div className="flex flex-nowrap gap-4">
      <KanbanColumn title="to do" />
      <KanbanColumn title="in progress" />
      <div className="">test</div>
      <div className="">complete</div>
    </div>
  );
};

export default KanbanBoard;

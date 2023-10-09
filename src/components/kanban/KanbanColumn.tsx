import { Card, CardContent, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import KanbanCard from "./KanbanCard";
import KanbanHeader from "./KanbanHeader";

interface KanbanColumnProps {
  title: "to do" | "in progress" | "test" | "complete";
}

const KanbanColumn = ({ title }: KanbanColumnProps) => {
  return (
    <Card className="basis-1/4 lane">
      <CardHeader className="capitalize text-center bg-secondary shadow-lg rounded-lg">
        <KanbanHeader title={title} />
        <Separator />
      </CardHeader>

      <CardContent className="gap-4 flex flex-col mt-4 bg-muted p-4 shadow-lg rounded-lg">
        <KanbanCard />
        <KanbanCard />
        <KanbanCard />
      </CardContent>
    </Card>
  );
};

export default KanbanColumn;

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface KanbanCardProps {}

const KanbanCard = ({}: KanbanCardProps) => {
  return (
    <Card draggable="true" className="cursor-move task">
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>Content</CardContent>
    </Card>
  );
};

export default KanbanCard;

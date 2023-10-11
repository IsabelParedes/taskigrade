import KanbanBoard from "@/components/kanban/KanbanBoard";

interface pageProps {}

const page = ({}: pageProps) => {
  return (
    <main className="p-16">
      <div className="">kanban header</div>
      <div className="">
        <KanbanBoard />
      </div>
    </main>
  );
};

export default page;

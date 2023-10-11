import KanbanBoard from "@/components/kanban/KanbanBoard";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface pageProps {}

const page = async ({}: pageProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // check if user is in db
  //const user =

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

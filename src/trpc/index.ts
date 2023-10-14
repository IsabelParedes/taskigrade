import { db } from "@/db/db";
import { tasks, users } from "@/db/schema";
import { TaskValidator } from "@/lib/validators/taskValidator";
import { Task } from "@/types/types";
import { auth } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { privateProcedure, publicProcedure, router } from "./trpc";

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { userId } = auth();
    if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

    // check if the user is in the database
    const dbUser = await db.query.users.findFirst({
      where: eq(users.clerkId, userId),
    });

    // create user in db
    if (!dbUser) {
      await db.insert(users).values({
        clerkId: userId,
      });
    }

    return { success: true };
  }),
  getUsersTasks: privateProcedure.query(async ({ ctx }) => {
    const usersTasks = await db.query.tasks.findMany({
      where: eq(tasks.createdById, ctx.clerkId),
    });

    return usersTasks as Task[];
  }),
  upsertTask: privateProcedure
    .input(TaskValidator)
    .mutation(async ({ ctx, input }) => {
      console.log("mutating");
      await db.insert(tasks).values({
        title: input.title,
        status: input.status,
        createdById: input.createdById,
        initial: input.initial,
      });
    }),
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

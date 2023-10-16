import { db } from "@/db/db";
import { tasks, users } from "@/db/schema";
import { Task, TaskValidator } from "@/lib/validators/taskValidator";
//import { Task } from "@/types/types";
import { auth } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
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
    .mutation(async ({ input }) => {
      await db
        .insert(tasks)
        .values({
          id: input.id,
          title: input.title,
          status: input.status,
          createdById: input.createdById,
          initial: input.initial,
        })
        .onConflictDoUpdate({
          target: tasks.id,
          set: { title: input.title, status: input.status },
        });
    }),
  deleteTask: privateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await db.delete(tasks).where(eq(tasks.id, input.id));
    }),
  updateStatus: privateProcedure
    .input(
      z.object({
        taskId: z.string(),
        status: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await db
        .update(tasks)
        .set({ status: input.status })
        .where(eq(tasks.id, input.taskId));
    }),
  getTaskOrder: privateProcedure.query(async ({ ctx }) => {
    const taskOrder = await db.query.users.findFirst({
      columns: {
        taskOrder: true,
      },
      where: eq(users.clerkId, ctx.clerkId),
    });

    console.log("taskOrder", taskOrder?.taskOrder);

    return taskOrder?.taskOrder;
  }),
  updateTaskOrder: privateProcedure
    .input(z.object({ sortOrder: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      console.log("sortOrder", input.sortOrder);
      await db
        .update(users)
        .set({ taskOrder: input.sortOrder })
        .where(eq(users.clerkId, ctx.clerkId));
    }),
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

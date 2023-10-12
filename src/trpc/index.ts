import { db } from "@/db/db";
import { users } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { publicProcedure, router } from "./trpc";

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
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

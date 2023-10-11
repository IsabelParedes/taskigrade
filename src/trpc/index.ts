import { auth } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  authCallback: publicProcedure.query(async ({ ctx }) => {
    const { user } = auth();

    if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });

    // check if the user is in the database

    // create user in db

    return { success: true };
  }),
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

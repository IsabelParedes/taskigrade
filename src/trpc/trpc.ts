import { db } from "@/db/db";
import { users } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { TRPCError, initTRPC } from "@trpc/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create();

const isAuth = t.middleware(async ({ next }) => {
  const { userId: clerkId } = auth();

  if (!clerkId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const userId = await db.query.users.findFirst({
    columns: { id: true },
    where: eq(users.clerkId, clerkId),
  });

  if (!userId) {
    redirect("/auth-callback");
  }

  // context returns value from middleware into the private api route
  return next({
    ctx: { clerkId, userId },
  });
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);

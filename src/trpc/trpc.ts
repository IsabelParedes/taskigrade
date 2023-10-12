import { auth } from "@clerk/nextjs";
import { TRPCError, initTRPC } from "@trpc/server";

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create();

const isAuth = t.middleware(async ({ next }) => {
  const { user, userId } = auth();
  console.log("user", userId);
  if (!userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  // context returns value from middleware into the private api route
  return next({
    ctx: { user },
  });
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);

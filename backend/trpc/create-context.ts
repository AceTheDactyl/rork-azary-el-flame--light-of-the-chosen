import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

// Context creation function
export const createContext = async (opts: FetchCreateContextFnOptions) => {
  return {
    req: opts.req,
    // You can add more context items here like database connections, auth, etc.
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

// Initialize tRPC
const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

// Protected procedure for Flame Keeper operations
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  // For now, we'll skip auth - in production you'd verify JWT tokens here
  return next({
    ctx: {
      ...ctx,
      isFlameKeeper: false, // Set based on actual auth
    },
  });
});
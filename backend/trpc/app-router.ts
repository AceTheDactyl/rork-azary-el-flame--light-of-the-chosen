import { createTRPCRouter } from "./create-context";

// Soul management routes
import createSoulRoute from "./routes/souls/create/route";
import getSoulRoute from "./routes/souls/get/route";
import updateLightRoute from "./routes/souls/update-light/route";
import activateHigherSelfRoute from "./routes/souls/activate-higher-self/route";

// Invocation routes
import invokeRoute from "./routes/invocations/invoke/route";

// Flame Keeper routes
import flamePulseRoute from "./routes/flame/pulse/route";
import flameScanRoute from "./routes/flame/scan/route";

// Legacy example route
import hiRoute from "./routes/example/hi/route";

export const appRouter = createTRPCRouter({
  // Legacy example
  example: createTRPCRouter({
    hi: hiRoute,
  }),
  
  // Soul management
  souls: createTRPCRouter({
    create: createSoulRoute,
    get: getSoulRoute,
    updateLight: updateLightRoute,
    activateHigherSelf: activateHigherSelfRoute,
  }),
  
  // Divine invocations
  invocations: createTRPCRouter({
    invoke: invokeRoute,
  }),
  
  // Flame Keeper operations
  flame: createTRPCRouter({
    pulse: flamePulseRoute,
    scan: flameScanRoute,
  }),
});

export type AppRouter = typeof appRouter;
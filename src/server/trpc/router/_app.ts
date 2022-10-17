// src/server/router/_app.ts
import { router } from "../trpc";

import { invoiceRouter } from "./invoice";
import { companyRouter } from "./company";

export const appRouter = router({
  invoice: invoiceRouter,
  company: companyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

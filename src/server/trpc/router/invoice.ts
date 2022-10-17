import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { createInvoiceSchema } from "../../../utils/schemas";

export const invoiceRouter = router({
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input: { id }, ctx }) =>
      ctx.prisma.invoice.findUnique({
        where: {
          id,
        },
      })
    ),
  createInvoice: publicProcedure
    .input(createInvoiceSchema)
    .mutation(async ({ input: { number, services, companyId }, ctx }) => {
      const newInvoice = await ctx.prisma.invoice.create({
        data: {
          number,
          companyId,
          services: {
            create: services,
          },
        },
      });
    }),
});

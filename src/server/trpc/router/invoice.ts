import { publicProcedure, router } from '../trpc';
import { z } from 'zod';

export const invoiceRouter = router({
    getById: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(({ input: { id }, ctx }) =>
            ctx.prisma.invoice.findUnique({
                where: {
                    id,
                },
                include: {
                    company: true,
                    services: true,
                },
            })
        ),
    getLastInvoiceNumber: publicProcedure
        .input(z.object({ companyId: z.number().optional() }))
        .query(async ({ input: { companyId }, ctx }) => {
            const lastInvoice = await ctx.prisma.invoice.findFirst({
                where: {
                    companyId,
                },
                orderBy: {
                    number: 'desc',
                },
            });

            if (!lastInvoice) return -1;

            return lastInvoice.number;
        }),
    // createInvoice: publicProcedure
    //     .input(createInvoiceSchema)
    //     .mutation(async ({ input: { number, services, companyId }, ctx }) => {
    //         const newInvoice = await ctx.prisma.invoice.create({
    //             data: {
    //                 number,
    //                 companyId,
    //                 services: {
    //                     create: services,
    //                 },
    //             },
    //         });
    //     }),
});

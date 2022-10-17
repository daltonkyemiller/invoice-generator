import { publicProcedure, router } from '../trpc';
import { createCompanySchema } from '../../../utils/schemas';

export const companyRouter = router({
    getAll: publicProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.company.findMany({});
    }),
    createCompany: publicProcedure
        .input(createCompanySchema)
        .mutation(async ({ input, ctx }) => {
            return await ctx.prisma.company.create({
                data: { ...input },
            });
        }),
});

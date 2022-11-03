import { publicProcedure, router } from '../trpc';
import { createCompanySchema } from '../../../utils/schemas';
import { TRPCError } from '@trpc/server';
import { ALPHABET } from '../../../utils/consts';

export const companyRouter = router({
    getAll: publicProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.company.findMany({
            include: {
                prefix: true,
            },
        });
    }),
    createCompany: publicProcedure
        .input(createCompanySchema)
        .mutation(async ({ input, ctx }) => {
            const prefixName = input.name
                .split(' ')
                .map((w) => w.charAt(0).toUpperCase())
                .join('');
            let prefixSub = 0;

            const checkPrefixExists = (name: string) => {
                console.log({ name });
                return ctx.prisma.prefix.findFirst({
                    where: {
                        name,
                    },
                });
            };
            const getSub = (sub: number) =>
                prefixSub ? `-${ALPHABET[sub]}` : '';

            while (
                await checkPrefixExists(`${prefixName}${getSub(prefixSub)}`)
            ) {
                if (prefixSub >= 5)
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message:
                            'Prefix creation tried too many times, something is wrong...',
                    });
                prefixSub++;
            }

            const newPrefix = await ctx.prisma.prefix.create({
                data: {
                    name: `${prefixName}${getSub(prefixSub)}`,
                },
            });

            return await ctx.prisma.company.create({
                data: { ...input, prefixId: newPrefix.id },
                include: {
                    prefix: true,
                },
            });
        }),
});

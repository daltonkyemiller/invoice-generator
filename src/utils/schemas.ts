import { z } from 'zod';

export const createServiceSchema = z.object({
    hrs: z.preprocess((v) => Number(v), z.number().min(1)),
    rate: z.preprocess((v) => Number(v), z.number().min(1)),
    name: z.string().min(1),
    notes: z.string().optional(),
});
export type CreateServiceInput = z.TypeOf<typeof createServiceSchema>;

export const createInvoiceSchema = z.object({
    number: z.number(),
    companyId: z.number(),
    services: z.array(createServiceSchema),
});

export type CreateInvoiceInput = z.TypeOf<typeof createInvoiceSchema>;

export const createCompanySchema = z.object({
    name: z.string().min(1),
    address: z.string().min(1),
    city: z.string().min(1),
    notes: z.string().optional(),
});

export type CreateCompanyInput = z.TypeOf<typeof createCompanySchema>;

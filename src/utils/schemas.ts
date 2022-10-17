import { z } from 'zod';

export const serviceSchema = z.object({
    hrs: z.number(),
    rate: z.number(),
});
export type CreateServiceInput = z.TypeOf<typeof serviceSchema>;

export const createInvoiceSchema = z.object({
    number: z.string(),
    companyId: z.number(),
    services: z.array(serviceSchema),
});

export type CreateInvoiceInput = z.TypeOf<typeof createInvoiceSchema>;

export const createCompanySchema = z.object({
    name: z.string(),
    address: z.string(),
    city: z.string(),
    notes: z.string(),
});

export type CreateCompanyInput = z.TypeOf<typeof createCompanySchema>;

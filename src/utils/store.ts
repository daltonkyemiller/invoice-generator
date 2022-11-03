import { Company, Invoice, Prefix } from '@prisma/client';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { CreateServiceInput } from './schemas';

type State =
    | Partial<
          Invoice & {
              company: Company & { prefix: Prefix };
              services: CreateServiceInput[];
          }
      >
    | undefined;

const storage = {
    ...createJSONStorage<State>(() => localStorage),
    delayInit: true,
};

export const INVOICE = atomWithStorage<State>('invoice', undefined, storage);

import create from 'zustand';
import { Company, Invoice, Prefix, Service } from '@prisma/client';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { useEffect, useState } from 'react';
import { CreateServiceInput } from './schemas';

type State = {
    invoice:
        | Partial<
              Invoice & {
                  company: Company & { prefix: Prefix };
                  services: CreateServiceInput[];
              }
          >
        | undefined;
    setInvoice: (invoice: State['invoice']) => void;
    addService: (service: CreateServiceInput) => void;
};

const _useStore = create(
    persist(
        subscribeWithSelector<State>((set, get) => ({
            invoice: get()?.invoice,
            setInvoice: (invoice) =>
                set((state) => ({
                    ...state,
                    invoice: { ...state.invoice, ...invoice },
                })),
            addService: (service) =>
                set((state) => ({
                    ...state,
                    invoice: {
                        ...state.invoice,
                        services: state.invoice?.services
                            ? [...state.invoice?.services, service]
                            : [service],
                    },
                })),
        })),
        {
            name: 'invoice',
            getStorage: () => ({
                getItem: async (name: string) => localStorage.getItem(name),
                setItem: async (name: string, value: string) =>
                    localStorage.setItem(name, value),
                removeItem: async (name: string) =>
                    localStorage.removeItem(name),
            }),
        }
    )
);

// Workaround for ssr because zustand's persist middleware doesn't work with ssr
// Since localstorage doesn't exist on the server, the state isn't being persisted and therefore different from the client
export const useStore = ((sel, opts) => {
    const state = _useStore(sel, opts);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return _useStore.getState();
    return state;
}) as typeof _useStore;

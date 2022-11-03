import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createInvoiceSchema } from '../../../utils/schemas';
import ServiceBuilder from './ServiceBuilder';
import { SelectAddCompany } from './SelectAddCompany';
import { AnimatePresence, motion } from 'framer-motion';
import { atom, useAtom } from 'jotai';
import { INVOICE } from '../../../utils/store';

export default function InvoiceBuilder() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(createInvoiceSchema) });

    const company = atom((get) => get(INVOICE)?.company);

    return (
        <div className="flex flex-col gap-3">
            <section className="flex flex-col gap-3 p-4">
                <header className="upper-divider before:h-2">
                    <h1 className="pt-4 text-4xl font-bold">Company</h1>
                </header>

                <div className="flex gap-3">
                    <SelectAddCompany />
                </div>
            </section>
            <AnimatePresence>
                {company && (
                    <motion.section
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="flex flex-col gap-3 p-4"
                    >
                        <header className="upper-divider before:h-2">
                            <h1 className="pt-4 text-4xl font-bold">
                                Services
                            </h1>
                        </header>
                        <ServiceBuilder />
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}

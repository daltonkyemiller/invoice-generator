import { Button, Card, Input, Select, Textarea } from 'react-daisyui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCompanySchema } from '../../../utils/schemas';
import { memo, useState } from 'react';
import { trpc } from '../../../utils/trpc';
import { useFloating } from '@floating-ui/react-dom';
import { IoMdAdd } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { INVOICE } from '../../../utils/store';

export function SelectAddCompany() {
    const [invoice, setInvoice] = useAtom(INVOICE);

    const { data: companies } = trpc.company.getAll.useQuery();
    const { data: invoiceNumber } = trpc.invoice.getLastInvoiceNumber.useQuery(
        { companyId: invoice?.company?.id },
        {
            enabled: !!invoice?.company?.id,
            onSuccess: (data) => {
                setInvoice((prev) => ({ ...prev, number: data + 1 }));
            },
        }
    );

    if (!companies) return null;
    return (
        <>
            <Select
                defaultValue={invoice?.company?.id || 'sel-comp'}
                onChange={(val: string) => {
                    const company = companies.find(
                        (c) => c.id === parseInt(val)
                    );
                    if (!company) return;
                    setInvoice((prev) => ({ ...prev, company }));
                }}
            >
                <Select.Option disabled value="sel-comp">
                    Select a company
                </Select.Option>
                <>
                    {companies.map((company) => (
                        <Select.Option
                            value={company.id}
                            key={company.id}
                            onSelect={(e) => {
                                setInvoice({ company });
                            }}
                        >
                            {company.name}
                        </Select.Option>
                    ))}
                </>
            </Select>
            <AddCompanyPanel />
        </>
    );
}

const AddCompanyPanel = memo(() => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(createCompanySchema) });
    const [addCompany, setAddCompany] = useState(false);

    const utils = trpc.useContext();
    const mutation = trpc.company.createCompany.useMutation({
        onSuccess: async () => {
            await utils.company.getAll.invalidate();
            setAddCompany(false);
        },
    });

    const { x, y, reference, floating, strategy } = useFloating({
        placement: 'bottom-start',
    });

    return (
        <div ref={reference}>
            <Button
                variant="outline"
                onClick={() => setAddCompany(!addCompany)}
            >
                <IoMdAdd
                    color="white"
                    size={30}
                    className={`${
                        addCompany ? 'rotate-45' : ''
                    } transition-all`}
                />
            </Button>
            <AnimatePresence>
                {addCompany && (
                    <motion.div
                        className="absolute z-10 "
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        <Card
                            className="glow-border flex w-[500px] flex-col gap-2 bg-base-200"
                            style={{
                                position: strategy,
                                top: y ?? 0,
                                left: x ?? 0,
                            }}
                            ref={floating}
                        >
                            <Card.Body>
                                <Input
                                    placeholder={'Company Name...'}
                                    className={`${
                                        errors.name ? '!border-red-500' : ''
                                    }`}
                                    {...register('name')}
                                />
                                <Input
                                    placeholder={'Company Address...'}
                                    className={`${
                                        errors.address ? '!border-red-500' : ''
                                    }`}
                                    {...register('address')}
                                />
                                <Input
                                    placeholder={'Company City...'}
                                    className={`${
                                        errors.city ? '!border-red-500' : ''
                                    }`}
                                    {...register('city')}
                                />
                                <Textarea
                                    {...register('notes')}
                                    className={`${
                                        errors.notes ? '!border-red-500' : ''
                                    }`}
                                    placeholder="Notes..."
                                ></Textarea>

                                <Button
                                    variant="outline"
                                    onClick={handleSubmit(
                                        ({ name, address, city, notes }) => {
                                            mutation.mutate({
                                                name,
                                                address,
                                                city,
                                                notes,
                                            });
                                        }
                                    )}
                                >
                                    Create!
                                </Button>
                            </Card.Body>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
});
AddCompanyPanel.displayName = 'AddCompanyPanel';

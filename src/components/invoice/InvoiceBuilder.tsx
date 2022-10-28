import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCompanySchema, createInvoiceSchema } from '../../utils/schemas';
import { Button, Card, Input, Select, Textarea } from 'react-daisyui';
import { trpc } from '../../utils/trpc';
import { IoMdAdd } from 'react-icons/io';
import { useRef, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import ServiceBuilder from '../ServiceBuilder';
import { useFloating } from '@floating-ui/react-dom';
import { mergeRefs } from '../../utils/mergeRefs';

export default function InvoiceBuilder() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(createInvoiceSchema) });

    const { data: companies } = trpc.company.getAll.useQuery();
    if (!companies) return null;
    return (
        <div className="flex flex-col gap-3">
            <section className="flex flex-col gap-3 p-4">
                <header className="upper-divider before:h-2">
                    <h1 className="pt-4 text-4xl font-bold">Company</h1>
                </header>

                <div className="flex gap-3">
                    <Select defaultValue="sel-comp">
                        <Select.Option disabled value="sel-comp">
                            Select a company
                        </Select.Option>
                        <>
                            {companies.map((company) => (
                                <Select.Option
                                    value={company.id}
                                    key={company.id}
                                >
                                    {company.name}
                                </Select.Option>
                            ))}
                        </>
                    </Select>
                    <AddCompanyPanel />
                </div>
            </section>
            <section className="flex flex-col gap-3 p-4">
                <header className="upper-divider before:h-2">
                    <h1 className="pt-4 text-4xl font-bold">Services</h1>
                </header>
                <ServiceBuilder />
            </section>
        </div>
    );
}

export function AddCompanyPanel() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(createCompanySchema) });
    const [addCompany, setAddCompany] = useState(false);
    const [parent] = useAutoAnimate<HTMLDivElement>({
        duration: 100,
    });

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
        <div ref={mergeRefs([parent, reference])}>
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
            {addCompany && (
                <Card
                    className="glow-border absolute z-20 flex w-[500px] flex-col gap-2 bg-base-200"
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
            )}
        </div>
    );
}

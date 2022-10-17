import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCompanySchema, createInvoiceSchema } from '../../utils/schemas';
import { Button, Input, Select, Textarea } from 'react-daisyui';
import { trpc } from '../../utils/trpc';
import { IoMdAdd } from 'react-icons/io';
import { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function InvoiceBuilder() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(createInvoiceSchema) });

    const { data: companies, isLoading } = trpc.company.getAll.useQuery();
    if (!companies) return null;
    return (
        <div>
            <div className="flex items-center gap-3">
                <Select defaultValue="sel-comp">
                    <Select.Option disabled value="sel-comp">
                        Select a company
                    </Select.Option>
                    <>
                        {companies.map((company) => (
                            <Select.Option value={company.id} key={company.id}>
                                {company.name}
                            </Select.Option>
                        ))}
                    </>
                </Select>
                <AddCompanyPanel />
            </div>
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

    return (
        <div className="relative" ref={parent}>
            <Button onClick={() => setAddCompany(!addCompany)}>
                <IoMdAdd
                    color="white"
                    size={30}
                    className={`${
                        addCompany ? 'rotate-45' : ''
                    } transition-all`}
                />
            </Button>
            {addCompany && (
                <div className="absolute flex w-[500px] flex-col gap-2 p-4 shadow-xl">
                    <Input
                        placeholder={'Company Name...'}
                        {...register('name')}
                    />
                    <Input
                        placeholder={'Company Address...'}
                        {...register('address')}
                    />
                    <Input
                        placeholder={'Company City...'}
                        {...register('city')}
                    />
                    <Textarea
                        {...register('notes')}
                        placeholder="Notes..."
                    ></Textarea>

                    <Button
                        onClick={handleSubmit(
                            ({ name, address, city, notes }) => {
                                mutation.mutate({ name, address, city, notes });
                            }
                        )}
                    >
                        Create!
                    </Button>
                </div>
            )}
        </div>
    );
}

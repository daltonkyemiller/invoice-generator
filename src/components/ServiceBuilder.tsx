import { Button, Input, Textarea } from 'react-daisyui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createServiceSchema } from '../utils/schemas';
import { IoMdAdd } from 'react-icons/io';

export default function ServiceBuilder() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(createServiceSchema) });

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
                <Input {...register('name')} placeholder={'Service Name'} />
                <Textarea
                    {...register('notes')}
                    placeholder="Notes..."
                ></Textarea>
            </div>
            <div className="flex flex-col gap-3">
                <Input {...register('rate')} placeholder="Rate..." />
                <Input {...register('hrs')} placeholder="Hours..." />
            </div>

            <Button variant="outline">
                <IoMdAdd color="white" size={30} />
            </Button>
        </div>
    );
}

import { Button, Input, Textarea } from 'react-daisyui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    CreateServiceInput,
    createServiceSchema,
} from '../../../utils/schemas';
import { IoMdAdd } from 'react-icons/io';
import React from 'react';
import { useStore } from '../../../utils/store';

export default function ServiceBuilder() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(createServiceSchema) });

    const addService = useStore((state) => state.addService);

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
                <Input
                    type="number"
                    {...register('rate')}
                    placeholder="Rate..."
                />
                <Input
                    type="number"
                    {...register('hrs')}
                    placeholder="Hours..."
                />
            </div>

            <Button
                variant="outline"
                onClick={handleSubmit((valid) => {
                    addService(valid as CreateServiceInput);
                })}
            >
                <IoMdAdd color="white" size={30} />
            </Button>
        </div>
    );
}

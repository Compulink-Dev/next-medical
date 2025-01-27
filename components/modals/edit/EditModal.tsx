'use client';
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from '@/components/CustomFormField';
import SubmitButton from '@/components/SubmitButton';
import { useForm, FieldValues, DefaultValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Constrain T to FieldValues and ensure defaultValues match T
interface ReusableFormModalProps<T extends FieldValues> {
    title: string;
    schema: z.ZodType<T>;
    onSubmit: (values: T) => Promise<void>;
    defaultValues: DefaultValues<T>;
    fields: {
        name: keyof T;
        label: string;
        placeholder: string;
        type: FormFieldType;
        iconSrc?: string;
        iconAlt?: string;
    }[];
    children: React.ReactNode;
}

function ReusableFormModal<T extends FieldValues>({
    title,
    schema,
    onSubmit,
    defaultValues,
    fields,
    children,
}: ReusableFormModalProps<T>) {
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const form = useForm<T>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const handleSubmit = async (values: T) => {
        setIsLoading(true);
        try {
            await onSubmit(values);
            setIsDialogOpen(false); // Close the modal after success
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto p-4">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        {fields.map((field) => (
                            <CustomFormField
                                key={String(field.name)}
                                fieldType={field.type}
                                control={form.control}
                                name={field.name as string}
                                label={field.label}
                                placeholder={field.placeholder}
                                iconSrc={field.iconSrc}
                                iconAlt={field.iconAlt}
                            />
                        ))}
                        <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default ReusableFormModal;

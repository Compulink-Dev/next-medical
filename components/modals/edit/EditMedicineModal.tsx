'use client';
import React, { useEffect, useState } from 'react';
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserMedicineValidation } from '@/lib/validation';
import { revalidatePath } from 'next/cache';
import { updateMedicine } from '@/lib/actions/medicine.action';
import { Medicine } from '@/types/appwrite.types';

interface EditMedicineModalProps {
    defaultValues: Medicine; // Expect defaultValues always present for updating
    children: React.ReactNode;
    medicineId: string;
}

function EditMedicineModal({ children, defaultValues, medicineId }: EditMedicineModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog state

    const form = useForm<z.infer<typeof UserMedicineValidation>>({
        resolver: zodResolver(UserMedicineValidation),
        defaultValues: {
            name: "",
            description: "",
            dosage: "",
            stock: "",
        },
    });

    // Sync defaultValues when they change
    useEffect(() => {
        if (defaultValues) {
            form.reset(defaultValues);
        }
    }, [defaultValues, form]);

    const onSubmit = async (values: z.infer<typeof UserMedicineValidation>) => {
        setIsLoading(true);

        console.log('Submitting medicine data:', values); // Check form values
        console.log('Medicine ID:', medicineId); // Check clinic ID

        try {
            const medicine = {
                name: values.name,
                dosage: values.dosage!,
                description: values.description!,
                stock: values.stock!,
            };

            if (medicineId) {
                const updatedMedicine = await updateMedicine(medicineId, medicine);

                if (updatedMedicine) {
                    setIsDialogOpen(false); // Close the modal after success
                    revalidatePath("/admin");
                }
            }
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto p-4">
                <DialogHeader>
                    <DialogTitle>Add new Medicine</DialogTitle>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={form.control}
                                name="name"
                                label="Medicine name"
                                placeholder="Enter clinic name"
                                iconSrc="/assets/icons/user.svg"
                                iconAlt="user"
                            />
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={form.control}
                                name="stock"
                                label="Medicine stock quantity"
                                placeholder="20 sachets"
                                iconSrc="/assets/icons/user.svg"
                                iconAlt="stock"
                            />
                            <CustomFormField
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name="dosage"
                                label="Medicine dosage"
                                placeholder="Enter medicine dosage"
                                iconSrc="/assets/icons/user.svg"
                                iconAlt="dosage"
                            />
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={form.control}
                                name="description"
                                label="Medicine description"
                                placeholder="Enter medicine description"
                                iconSrc="/assets/icons/user.svg"
                                iconAlt="description"
                            />
                            <SubmitButton isLoading={isLoading}>Update Medicine</SubmitButton>
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default EditMedicineModal;

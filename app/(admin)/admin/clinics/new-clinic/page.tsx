'use client'
import React, { useState } from 'react'
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from '@/components/CustomFormField'
import SubmitButton from '@/components/SubmitButton';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserClinicValidation } from '@/lib/validation';
import { createClinic } from '@/lib/actions/clinic.actions';
import { revalidatePath } from 'next/cache';

function page() {

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof UserClinicValidation>>({
        resolver: zodResolver(UserClinicValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof UserClinicValidation>) => {
        setIsLoading(true);

        try {
            const clinic = {
                name: values.name,
                email: values.email,
                phone: values.phone,
                address: values.address,
            };

            const newClinic = await createClinic(clinic);

            if (newClinic) {
                revalidatePath("/admin");
            }
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };

    return (
        <div className="p-12">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="name"
                        label="Clinic name"
                        placeholder="Enter clinic name"
                        iconSrc="/assets/icons/user.svg"
                        iconAlt="user"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="johndoe@gmail.com"
                        iconSrc="/assets/icons/email.svg"
                        iconAlt="email"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="address"
                        label="Clinic address"
                        placeholder="Enter clinic address"
                        iconSrc="/assets/icons/user.svg"
                        iconAlt="user"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name="phone"
                        label="Phone number"
                        placeholder="(555) 123-4567"
                    />
                    <SubmitButton isLoading={isLoading}>Add Clinic</SubmitButton>
                </form>
            </Form>
        </div>
    )
}

export default page
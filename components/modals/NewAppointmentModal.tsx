"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SelectItem } from "@/components/ui/select";
import { createAppointment } from "@/lib/actions/appointment.actions"; // Removed updateAppointment
import { getAppointmentSchema } from "@/lib/validation";
import { Clinic } from "@/types/appwrite.types";
import "react-datepicker/dist/react-datepicker.css";
import { Hospital } from "lucide-react";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { revalidatePath } from "next/cache";
import { useAuth } from "@/lib/providers/AuthProvider";

export const AppointmentModal = ({
    patientId,
    clinics
}: {
    patientId: string;
    clinics: Clinic[];
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog state

    const AppointmentFormValidation = getAppointmentSchema("create"); // Fixed to always use "create"

    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
        resolver: zodResolver(AppointmentFormValidation),
        defaultValues: {
            primaryClinic: "",
            schedule: new Date(),
            reason: "",
            note: "",
        },
    });

    console.log('New Appointment Modal User', patientId);

    const { user } = useAuth()


    console.log('New Appointment Modal User 2 :', user);
    const onSubmit = async (
        values: z.infer<typeof AppointmentFormValidation>
    ) => {
        setIsLoading(true);

        const appointment = {
            patient: patientId,
            primaryClinic: values.primaryClinic,
            schedule: new Date(values.schedule),
            reason: values.reason!,
            status: "pending" as Status, // Always pending when creating
            note: values.note,
        };

        try {
            const newAppointment = await createAppointment(appointment);

            if (newAppointment) {
                setIsDialogOpen(false); // Close the modal after success
                form.reset();
                revalidatePath("/admin");
            }
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Submit Appointment</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create an appointment to get started</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
                        <section className="mb-6 space-y-2">
                            <h1 className="header">New Appointment</h1>
                            <p className="text-dark-700">
                                Request a new appointment in 10 seconds.
                            </p>
                        </section>

                        <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name="primaryClinic"
                            label="Clinic"
                            placeholder="Select a clinic"
                        >
                            {clinics.map((clinic, i) => (
                                <SelectItem key={clinic.name + i} value={clinic.name}>
                                    <div className="flex cursor-pointer items-center gap-2">
                                        <Hospital />
                                        <p>{clinic.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>

                        <CustomFormField
                            fieldType={FormFieldType.DATE_PICKER}
                            control={form.control}
                            name="schedule"
                            label="Expected appointment date"
                            showTimeSelect
                            dateFormat="MM/dd/yyyy  -  h:mm aa"
                        />

                        <div className="flex flex-col gap-6 xl:flex-row">
                            <CustomFormField
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name="reason"
                                label="Appointment reason"
                                placeholder="Annual monthly check-up"
                            />

                            <CustomFormField
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name="note"
                                label="Comments/notes"
                                placeholder="Prefer afternoon appointments, if possible"
                            />
                        </div>

                        <SubmitButton
                            isLoading={isLoading}
                            className="shad-primary-btn w-full"
                        >
                            Submit Appointment
                        </SubmitButton>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

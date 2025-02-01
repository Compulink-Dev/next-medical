'use client';
import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScheduleAppointmentSchema } from '@/lib/validation';
import { Appointment } from '@/types/appwrite.types';
import { Clock, Hospital, Hourglass, User } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

interface ViewModalProps {
    defaultValues: Appointment; // Expect defaultValues always present for updating
    children: React.ReactNode;
    patientId: string;
}

function ViewAppointmentModal({ children, defaultValues }: ViewModalProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog state

    const form = useForm<z.infer<typeof ScheduleAppointmentSchema>>({
        resolver: zodResolver(ScheduleAppointmentSchema),
        defaultValues: {
            ...defaultValues,
            cancellationReason: defaultValues.cancellationReason ?? undefined, // Convert null to undefined
        },
    });

    // Sync defaultValues when they change
    useEffect(() => {
        if (defaultValues) {
            //@ts-ignore
            form.reset(defaultValues);
        }
    }, [defaultValues, form]);


    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto p-4 bg-color">
                <DialogHeader>
                    <DialogTitle>View Clinic</DialogTitle>
                    <div className="py-6 flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <User size={16} />
                            <p className="">{defaultValues.patient.name}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Hourglass size={16} />
                            <p className="capitalize">{defaultValues.status}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <p className="">{`${formatDateTime(defaultValues.schedule).dateTime}`}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Hospital size={16} />
                            <p className="">{defaultValues.primaryClinic}</p>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default ViewAppointmentModal;

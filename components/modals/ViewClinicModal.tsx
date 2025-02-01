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
import { UserClinicValidation } from '@/lib/validation';
import { Clinic } from '@/types/appwrite.types';
import { Hospital, LocateIcon, Mail, Phone } from 'lucide-react';

interface EditClinicModalProps {
    defaultValues: Clinic; // Expect defaultValues always present for updating
    children: React.ReactNode;
    clinicId: string;
}

function ViewClinicModal({ children, defaultValues }: EditClinicModalProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog state

    const form = useForm<z.infer<typeof UserClinicValidation>>({
        resolver: zodResolver(UserClinicValidation),
        defaultValues: defaultValues || {
            name: "",
            email: "",
            phone: "",
            address: "",
        }, // Set defaultValues for clinic, used only in update scenario
    });

    // Sync defaultValues when they change
    useEffect(() => {
        if (defaultValues) {
            form.reset(defaultValues);
        }
    }, [defaultValues, form]);


    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto p-4">
                <DialogHeader>
                    <DialogTitle>View Clinic</DialogTitle>
                    <div className="py-6 flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <Hospital />
                            <p className="">{defaultValues.name}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail />
                            <p className="">{defaultValues.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <LocateIcon />
                            <p className="">{defaultValues.address}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone />
                            <p className="">{defaultValues.phone}</p>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default ViewClinicModal;

'use client';
import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from '@/components/CustomFormField';
import SubmitButton from '@/components/SubmitButton';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatientFormValidation } from '@/lib/validation';
import { revalidatePath } from 'next/cache';
import { SelectItem } from '../ui/select';
import { GenderOptions, IdentificationTypes, } from '@/constants';
import { updatePatient } from '@/lib/actions/user.actions';
import { FileUploader } from '../FileUploader';
import { getAllClinics } from '@/lib/actions/clinic.actions';
import { Hospital } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Patient } from '@/types/appwrite.types';




function PatientModal({ children, defaultValues }: { children: React.ReactNode, defaultValues?: z.infer<typeof PatientFormValidation> }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog state
    const [clinics, setClinics] = useState<{ name: string }[]>([]);
    const [patient, setPatient] = useState<Patient | null>(null);



    const form = useForm<z.infer<typeof PatientFormValidation>>({
        resolver: zodResolver(PatientFormValidation),
        defaultValues: defaultValues || {
            treatmentConsent: false,
            disclosureConsent: false,
            // Ensure identificationDocument is a File[] or undefined, not FormData
            identificationDocument: patient?.identificationDocument instanceof FileList
                ? Array.from(patient.identificationDocument)
                : undefined,
        },

    });

    // Sync defaultValues when they change
    useEffect(() => {
        if (defaultValues) {
            form.reset(defaultValues);
            setPatient(defaultValues as Patient);
        }
    }, [defaultValues, form]);


    useEffect(() => {
        const fetchClinics = async () => {
            try {
                const data = await getAllClinics();
                setClinics(data || []);
            } catch (error) {
                console.error("Error fetching clinics:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchClinics();
    }, []);


    const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
        setIsLoading(true);



        // Handle file upload for identificationDocument
        let formData;
        if (values.identificationDocument && values.identificationDocument.length > 0) {
            const blobFile = new Blob([values.identificationDocument[0]], {
                type: values.identificationDocument[0].type,
            });

            formData = new FormData();
            formData.append("blobFile", blobFile);
            formData.append("fileName", values.identificationDocument[0].name);
        }

        try {
            const patient = {
                id: values.$id,
                name: values.name,
                email: values.email,
                phone: values.phone,
                birthDate: new Date(values.birthDate),
                gender: values.gender,
                address: values.address,
                occupation: values.occupation,
                emergencyContactName: values.emergencyContactName,
                emergencyContactNumber: values.emergencyContactNumber,
                primaryClinic: values.primaryClinic,
                insuranceProvider: values.insuranceProvider,
                insurancePolicyNumber: values.insurancePolicyNumber,
                allergies: values.allergies || 'No allergies',
                currentMedication: values.currentMedication || "N/A",
                familyMedicalHistory: values.familyMedicalHistory || 'N/A',
                pastMedicalHistory: values.pastMedicalHistory || 'N/A',
                identificationType: values.identificationType,
                identificationNumber: values.identificationNumber,
                identificationDocument: values.identificationDocument
                    ? formData
                    : undefined,
                privacyConsent: values.privacyConsent,
                password: "default-password", // Add the required password field
            };

            // Ensure patient ID is provided before updating
            if (!values?.$id) {
                throw new Error("Missing patient ID.");
            }

            const updatedPatient = await updatePatient(values.$id, patient);

            if (updatedPatient) {
                setIsDialogOpen(false); // Close the modal after success
                revalidatePath("/admin");
            }
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
                    <DialogTitle>Update patient</DialogTitle>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex-1 space-y-12"
                        >

                            <section className="space-y-6">
                                <div className="mb-9 space-y-1">
                                    <h2 className="sub-header">Personal Information</h2>
                                </div>

                                {/* NAME */}

                                <CustomFormField
                                    fieldType={FormFieldType.INPUT}
                                    control={form.control}
                                    name="name"
                                    placeholder="Enter name"
                                    iconSrc="/assets/icons/user.svg"
                                    iconAlt="user"
                                />

                                {/* EMAIL & PHONE */}
                                <div className="flex flex-col gap-6 xl:flex-row">
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        control={form.control}
                                        name="email"
                                        label="Email address"
                                        placeholder="Enter email"
                                        iconSrc="/assets/icons/email.svg"
                                        iconAlt="email"
                                    />

                                    <CustomFormField
                                        fieldType={FormFieldType.PHONE_INPUT}
                                        control={form.control}
                                        name="phone"
                                        label="Phone Number"
                                        placeholder="Enter phone number"
                                    />
                                </div>

                                {/* BirthDate & Gender */}
                                <div className="flex flex-col gap-6 xl:flex-row">
                                    <CustomFormField
                                        fieldType={FormFieldType.DATE_PICKER}
                                        control={form.control}
                                        name="birthDate"
                                        label="Date of birth"
                                    />

                                    <CustomFormField
                                        fieldType={FormFieldType.SKELETON}
                                        control={form.control}
                                        name="gender"
                                        label="Gender"
                                        renderSkeleton={(field) => (
                                            <FormControl>
                                                <RadioGroup
                                                    className="flex h-11 gap-6 xl:justify-between"
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    {GenderOptions.map((option, i) => (
                                                        <div key={option + i} className="radio-group">
                                                            <RadioGroupItem value={option} id={option} />
                                                            <Label htmlFor={option} className="cursor-pointer">
                                                                {option}
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        )}
                                    />
                                </div>

                                {/* Address & Occupation */}
                                <div className="flex flex-col gap-6 xl:flex-row">
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        control={form.control}
                                        name="address"
                                        label="Address"
                                        placeholder="Enter address"
                                    />

                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        control={form.control}
                                        name="occupation"
                                        label="Occupation"
                                        placeholder="Enter occupation"
                                    />
                                </div>

                                {/* Emergency Contact Name & Emergency Contact Number */}
                                <div className="flex flex-col gap-6 xl:flex-row">
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        control={form.control}
                                        name="emergencyContactName"
                                        label="Emergency contact name"
                                        placeholder="Guardian's name"
                                    />

                                    <CustomFormField
                                        fieldType={FormFieldType.PHONE_INPUT}
                                        control={form.control}
                                        name="emergencyContactNumber"
                                        label="Emergency contact number"
                                        placeholder="Enter phone number"
                                    />
                                </div>
                            </section>

                            <section className="space-y-6">
                                <div className="mb-9 space-y-1">
                                    <h2 className="sub-header">Medical Information</h2>
                                </div>

                                {/* PRIMARY CARE PHYSICIAN */}
                                <CustomFormField
                                    fieldType={FormFieldType.SELECT}
                                    control={form.control}
                                    name="primaryClinic"
                                    label="Primary care clinic"
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

                                {/* INSURANCE & POLICY NUMBER */}
                                <div className="flex flex-col gap-6 xl:flex-row">
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        control={form.control}
                                        name="insuranceProvider"
                                        label="Insurance provider"
                                        placeholder="Enter insurance provider"
                                    />

                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        control={form.control}
                                        name="insurancePolicyNumber"
                                        label="Insurance policy number"
                                        placeholder="Enter policy number"
                                    />
                                </div>

                                {/* ALLERGY & CURRENT MEDICATIONS */}
                                <div className="flex flex-col gap-6 xl:flex-row">
                                    <CustomFormField
                                        fieldType={FormFieldType.TEXTAREA}
                                        control={form.control}
                                        name="allergies"
                                        label="Allergies (if any)"
                                        placeholder="Enter allergies"
                                    />

                                    <CustomFormField
                                        fieldType={FormFieldType.TEXTAREA}
                                        control={form.control}
                                        name="currentMedication"
                                        label="Current medications"
                                        placeholder="Enter current medications"
                                    />
                                </div>

                                {/* FAMILY MEDICATION & PAST MEDICATIONS */}
                                <div className="flex flex-col gap-6 xl:flex-row">
                                    <CustomFormField
                                        fieldType={FormFieldType.TEXTAREA}
                                        control={form.control}
                                        name="familyMedicalHistory"
                                        label=" Family medical history (if relevant)"
                                        placeholder="Enter family medical history"
                                    />

                                    <CustomFormField
                                        fieldType={FormFieldType.TEXTAREA}
                                        control={form.control}
                                        name="pastMedicalHistory"
                                        label="Past medical history"
                                        placeholder="Enter past medical history"
                                    />
                                </div>
                            </section>

                            <section className="space-y-6">
                                <div className="mb-9 space-y-1">
                                    <h2 className="sub-header">Identification and Verification</h2>
                                </div>

                                <CustomFormField
                                    fieldType={FormFieldType.SELECT}
                                    control={form.control}
                                    name="identificationType"
                                    label="Identification Type"
                                    placeholder="Select identification type"
                                >
                                    {IdentificationTypes.map((type, i) => (
                                        <SelectItem key={type + i} value={type}>
                                            {type}
                                        </SelectItem>
                                    ))}
                                </CustomFormField>

                                <CustomFormField
                                    fieldType={FormFieldType.INPUT}
                                    control={form.control}
                                    name="identificationNumber"
                                    label="Identification Number"
                                    placeholder="Enter identification number"
                                />

                                <CustomFormField
                                    fieldType={FormFieldType.SKELETON}
                                    control={form.control}
                                    name="identificationDocument"
                                    label="Scanned Copy of Identification Document"
                                    renderSkeleton={(field) => (
                                        <FormControl>
                                            <FileUploader files={field.value} onChange={field.onChange} />
                                        </FormControl>
                                    )}
                                />
                            </section>

                            <section className="space-y-6">
                                <div className="mb-9 space-y-1">
                                    <h2 className="sub-header">Consent and Privacy</h2>
                                </div>

                                <CustomFormField
                                    fieldType={FormFieldType.CHECKBOX}
                                    control={form.control}
                                    name="treatmentConsent"
                                    label="I consent to receive treatment for my health condition."
                                />

                                <CustomFormField
                                    fieldType={FormFieldType.CHECKBOX}
                                    control={form.control}
                                    name="disclosureConsent"
                                    label="I consent to the use and disclosure of my health
            information for treatment purposes."
                                />

                                <CustomFormField
                                    fieldType={FormFieldType.CHECKBOX}
                                    control={form.control}
                                    name="privacyConsent"
                                    label="I acknowledge that I have reviewed and agree to the
            privacy policy"
                                />
                            </section>

                            <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default PatientModal;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Nurse, Patient, Medicine, Treatment } from "@/types/appwrite.types";
import "react-datepicker/dist/react-datepicker.css";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import { createTreatment } from "@/lib/actions/treatment.actions";
import { TreatmentValidation } from "@/lib/validation";
import { SelectItem } from "@/components/ui/select";

export const TreatmentForm = ({
  userId,
  patientId,
  treatment,
  nurses,
  patients,
  medicines,
}: {
  userId: string;
  patientId?: string;
  treatment?: Treatment;
  nurses: Nurse[];
  patients: Patient[];
  medicines: Medicine[];
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null
  );
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const nurse = nurses.find((n) => n.userId === userId);
  const clinicName = nurse?.clinic?.name ?? "";

  const form = useForm<z.infer<typeof TreatmentValidation>>({
    resolver: zodResolver(TreatmentValidation),
    defaultValues: {
      patient: treatment?.patient?.id || patientId || "",
      medicine: treatment?.medicine || "",
      dosage: treatment?.dosage || "",
      primaryClinic: treatment?.primaryClinic || clinicName,
      primaryNurse: treatment?.primaryNurse || nurse?.name || "",
      startDate: treatment ? new Date(treatment.startDate) : new Date(),
      endDate: treatment ? new Date(treatment.endDate) : new Date(),
      status: treatment?.status || "",
      description: treatment?.description || "",
      phone: treatment?.phone || "",
    },
  });

  // Auto-populate phone when patient is selected
  useEffect(() => {
    if (selectedPatient) {
      form.setValue("phone", selectedPatient.phone); // Populate the phone number
    }
  }, [selectedPatient, form]);

  // Auto-populate dosage and description when medicine is selected
  useEffect(() => {
    if (selectedMedicine) {
      form.setValue("dosage", selectedMedicine.dosage); // Populate dosage
    }
  }, [selectedMedicine, form]);

  const onSubmit = async (values: z.infer<typeof TreatmentValidation>) => {
    setIsLoading(true);

    try {
      const treatmentData = {
        patient: values.patient,
        medicine: values.medicine,
        dosage: values.dosage,
        primaryClinic: values.primaryClinic,
        primaryNurse: values.primaryNurse,
        startDate: new Date(values.startDate),
        endDate: new Date(values.endDate),
        description: values.description ?? "",
        status: values.status,
        phone: values.phone ?? "",
      };

      const newTreatment = await createTreatment(treatmentData);

      console.log("New Treatment :", newTreatment);

      if (newTreatment) {
        form.reset();
        router.push(`/dashboard/health`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {/* <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="treatment"
          label="Treatment"
          placeholder="Enter treatment details"
          iconSrc="/assets/icons/medicine.svg"
          iconAlt="treatment"
        /> */}

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="description"
          label="Description"
        />
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="patient"
          label="Patient"
          onChange={(value: any) => {
            const selectedPatient = patients.find(
              (patient) => patient.$id === value // Use the value directly
            );
            setSelectedPatient(selectedPatient || null); // Set selected patient
          }}
        >
          {patients.map((patient) => (
            <SelectItem key={patient.$id} value={patient.$id}>
              {patient.name}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="medicine"
          label="Medicine"
          onChange={(value: any) => {
            const selectedMedicine = medicines.find(
              (medicine) => medicine.$id === value // Use the value directly
            );
            setSelectedMedicine(selectedMedicine || null); // Set selected medicine
          }}
        >
          {medicines.map((medicine) => (
            <SelectItem key={medicine.$id} value={medicine.$id}>
              {medicine.name}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="dosage"
          label="Dosage"
          disabled
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="primaryClinic"
          label="Clinic"
          disabled
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="primaryNurse"
          label="Nurse"
          disabled
        />

        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="startDate"
          label="Start Date"
        />
        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="endDate"
          label="End Date"
        />

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="status"
          label="Status"
        >
          {["Finish", "On course", "Defaulted"].map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="phone"
          label="Phone"
        />

        <SubmitButton isLoading={isLoading} className="shad-primary-btn w-full">
          Submit Treatment
        </SubmitButton>
      </form>
    </Form>
  );
};

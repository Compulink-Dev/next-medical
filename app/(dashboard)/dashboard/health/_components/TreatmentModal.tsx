"use client";

import { useState } from "react";
import { Medicine, Nurse, Patient, Treatment } from "@/types/appwrite.types";
import "react-datepicker/dist/react-datepicker.css";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TreatmentForm } from "./TreatmentForm";
import { Plus } from "lucide-react";

export const TreatmentModal = ({
  patientId,
  nurses,
  userId,
  medicines,
  patients,
  treatment,
}: {
  userId: string;
  medicines: Medicine[];
  patients: Patient[];
  patientId: string;
  nurses: Nurse[];
  treatment?: Treatment;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog state

  console.log("Patient ID :", patientId);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus size={12} />
          <p className="">Treatment</p>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto p-4 bg-color">
        <DialogHeader>
          <DialogTitle>Create treatment for a patient</DialogTitle>
        </DialogHeader>
        <TreatmentForm
          userId={userId} // Pass the userId prop
          patients={patients} // Pass the patients prop
          medicines={medicines} // Pass the medicines prop
          patientId={patientId}
          treatment={treatment}
          nurses={nurses}
        />
      </DialogContent>
    </Dialog>
  );
};

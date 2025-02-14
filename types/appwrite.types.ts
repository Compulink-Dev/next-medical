import { Models } from "node-appwrite";

export interface Patient extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryClinic: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  privacyConsent: boolean;
  treatmentConsent?: boolean;
  disclosureConsent?: boolean;
}

export interface Nurse extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryClinic: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  privacyConsent: boolean;
}

export interface Treatment extends Models.Document {
  patient: Patient;
  startDate: Date;
  endDate: Date;
  status: Status;
  description: string;
  userId: string;
  primaryClinic: string;
  reason: string;
  phone: string | undefined;
}

export interface Appointment extends Models.Document {
  patient: Patient;
  schedule: Date;
  status: Status;
  primaryClinic: string;
  reason: string;
  note: string;
  userId: string;
  cancellationReason?: string | null;
}

export interface Clinic extends Models.Document {
  name: string;
  email: string;
  address: string | undefined;
  phone: string | undefined;
}

export interface Medicine extends Models.Document {
  name: string;
  dosage: string;
  stock: string | undefined;
  description: string | undefined;
}

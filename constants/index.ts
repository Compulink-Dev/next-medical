export const GenderOptions = ["Male", "Female", "Other"];

export const PatientFormDefaultValues = {
  $id: "", // Ensure ID exists
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const NurseFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "Nurse",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryClinic: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Student ID Card",
  "Voter ID Card",
];

export const Status = [
  "In Stock",
  "Out Stock",
  "Low Stock",
  "Expired",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "DR Murwira",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Pamela Muza",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "David Parerenyatwa",
  },
];

export const Clinics = [
  {
    image: "/assets/images/dr-green.png",
    name: "Mpilo Central Hospital",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Baines Intercare",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "Parerenyatwa Hospital",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};

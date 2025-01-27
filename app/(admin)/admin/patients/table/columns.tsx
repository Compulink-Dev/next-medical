"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Patient } from "@/types/appwrite.types";



export const columns: ColumnDef<Patient>[] = [
  {
    header: "#",
    meta: { width: "50px" },
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    meta: { width: "450px" },
    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.name}</p>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    meta: { width: "450px" },
    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.email}</p>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    meta: { width: "450px" },

    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.phone}</p>;
    },
  },
  // {
  //   accessorKey: "birthDate",
  //   header: "Birth",
  //   meta: { width: "450px" },

  //   cell: ({ row }) => {
  //     const patient = row.original;
  //     return <p className="text-14-medium ">{patient.}</p>;
  //   },
  // },
  {
    accessorKey: "primaryClinic",
    header: "Clinic",
    meta: { width: "450px" },

    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.primaryClinic}</p>;
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    meta: { width: "450px" },

    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.gender}</p>;
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    meta: { width: "450px" },

    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.address}</p>;
    },
  },
  {
    accessorKey: "occupation",
    header: "Occupation",
    meta: { width: "450px" },

    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.occupation}</p>;
    },
  },
  {
    accessorKey: "emergencyName",
    header: "Emergency Name",
    meta: { width: "450px" },

    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.emergencyContactName}</p>;
    },
  },
  {
    accessorKey: "emergencyContactNumber",
    header: "Emergency Contact Number",
    meta: { width: "450px" },

    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.emergencyContactNumber}</p>;
    },
  },
  {
    accessorKey: "insuranceProvider",
    header: "Insurance Provider",
    meta: { width: "450px" },

    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.insuranceProvider}</p>;
    },
  },
  {
    accessorKey: "currentMedication",
    header: "Current Medication",
    meta: { width: "450px" },

    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.currentMedication || 'No current medication'}</p>;
    },
  },
  {
    accessorKey: "pastMedicalHistory",
    header: "Past Medical History",
    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.pastMedicalHistory || 'No medical history'}</p>;
    },
  },
  {
    accessorKey: "identificationType",
    header: "Identification Type",
    meta: { width: "450px" },

    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.identificationType}</p>;
    },
  },

  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: () => {


      return (
        <div className=""></div>
      );
    },
  },
];

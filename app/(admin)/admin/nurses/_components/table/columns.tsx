"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Nurse } from "@/types/appwrite.types";
import ActionButtons from "@/app/(admin)/_components/ActionButtons";



export const columns: ColumnDef<Nurse>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.name}</p>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.email}</p>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.phone}</p>;
    },
  },
  {
    accessorKey: "birthDate",
    header: "Birth",
    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.email}</p>;
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.gender}</p>;
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.address}</p>;
    },
  },
  {
    accessorKey: "occupation",
    header: "Occupation",
    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.occupation}</p>;
    },
  },
  {
    accessorKey: "emergencyName",
    header: "Emergency Name",
    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.emergencyName}</p>;
    },
  },
  {
    accessorKey: "emergencyContactNumber",
    header: "Emergency Contact Number",
    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.emergencyContactNumber}</p>;
    },
  },
  {
    accessorKey: "insuranceProvider",
    header: "Insurance Provider",
    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.insuranceProvider}</p>;
    },
  },
  {
    accessorKey: "currentMedication",
    header: "Current Medication",
    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.currentMedication}</p>;
    },
  },
  {
    accessorKey: "pastMedicalHistory",
    header: "Past Medical History",
    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.pastMedicalHistory}</p>;
    },
  },
  {
    accessorKey: "identificationType",
    header: "Identification Type",
    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.identificationType}</p>;
    },
  },
  // {
  //   accessorKey: "schedule",
  //   header: "Appointment",
  //   cell: ({ row }) => {
  //     const appointment = row.original;
  //     return (
  //       <p className="text-14-regular min-w-[100px]">
  //         {formatDateTime(appointment.schedule).dateTime}
  //       </p>
  //     );
  //   },
  // },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: () => {

      return (
        <div className="flex gap-1">
          <ActionButtons />
        </div>
      );
    },
  },
];

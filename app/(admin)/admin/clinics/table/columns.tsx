"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Patient } from "@/types/appwrite.types";
import { Button } from "@/components/ui/button";
import { Pen, Trash } from "lucide-react";
import ActionButtons from "@/app/(admin)/_components/ActionButtons";


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
    accessorKey: "address",
    header: "Address",
    meta: { width: "450px" },

    cell: ({ row }) => {
      const patient = row.original;
      return <p className="text-14-medium ">{patient.address}</p>;
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
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: () => {


      return (
        <ActionButtons />
      );
    },
  },
];

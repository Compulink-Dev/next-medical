"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Patient } from "@/types/appwrite.types";
import { Button } from "@/components/ui/button";
import { Pen, Trash } from "lucide-react";


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
        <div className="flex gap-4 items-center ">
          <Button className="bg-slate-400 hover:bg-slate-500 text-slate-950">
            <Pen size={10} />
            <p className="text-xs">Edit</p>
          </Button>
          <Button variant={'destructive'} className="bg-red-700 hover:bg-red-500">
            <Trash size={10} />
            <p className="text-xs">Delete</p>
          </Button>
        </div>
      );
    },
  },
];

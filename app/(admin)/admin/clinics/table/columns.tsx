"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Clinic } from "@/types/appwrite.types";
import ActionButtons from "@/app/(admin)/_components/ActionButtons";
import EditClinicModal from "@/components/modals/edit/EditClinicModal";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";


export const columns: ColumnDef<Clinic>[] = [
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
    cell: ({ row }) => {

      const patient = row.original;
      return (

        <ActionButtons clinicId={patient.$id} >
          <EditClinicModal defaultValues={patient} clinicId={patient.$id}>
            <Button variant={'outline'} className="border-slate-400 hover:bg-slate-500">
              <Pen size={10} />
              <p className="text-xs">Edit</p>
            </Button>
          </EditClinicModal>
        </ActionButtons>
      );
    },
  },
];

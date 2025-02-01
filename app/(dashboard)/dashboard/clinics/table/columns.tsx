"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Clinic } from "@/types/appwrite.types";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import ViewClinicModal from "@/components/modals/ViewClinicModal";


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
      const clinic = row.original;
      return <p className="text-14-medium ">{clinic.name}</p>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    meta: { width: "450px" },
    cell: ({ row }) => {
      const clinic = row.original;
      return <p className="text-14-medium ">{clinic.email}</p>;
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    meta: { width: "450px" },

    cell: ({ row }) => {
      const clinic = row.original;
      return <p className="text-14-medium ">{clinic.address}</p>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    meta: { width: "450px" },

    cell: ({ row }) => {
      const clinic = row.original;
      return <p className="text-14-medium ">{clinic.phone}</p>;
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {

      const clinic = row.original;
      return (

        <ViewClinicModal defaultValues={clinic} clinicId={clinic.$id}>
          <Button variant={'outline'}>
            <Eye />
            <p className="">View</p>
          </Button>
        </ViewClinicModal>
      );
    },
  },
];

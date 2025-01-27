"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Medicine } from "@/types/appwrite.types";
import ActionButtons from "@/app/(admin)/_components/ActionButtons";


export const columns: ColumnDef<Medicine>[] = [
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
      const medicine = row.original;
      return <p className="text-14-medium ">{medicine.name}</p>;
    },
  },
  {
    accessorKey: "dosage",
    header: "Dosage",
    meta: { width: "450px" },
    cell: ({ row }) => {
      const medicine = row.original;
      return <p className="text-14-medium ">{medicine.dosage}</p>;
    },
  },
  {
    accessorKey: "stock",
    header: "Stock Quantity",
    meta: { width: "450px" },

    cell: ({ row }) => {
      const medicine = row.original;
      return <p className="text-14-medium ">{medicine.stock}</p>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    meta: { width: "450px" },

    cell: ({ row }) => {
      const medicine = row.original;
      return <p className="text-14-medium ">{medicine.description}</p>;
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

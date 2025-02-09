"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Medicine } from "@/types/appwrite.types";
import ActionButtons from "@/app/(admin)/_components/ActionButtons";
import EditMedicineModal from "@/components/modals/edit/EditMedicineModal";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { formatDateTime } from "@/lib/utils";


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
    accessorKey: "category",
    header: "Category",
    meta: { width: "450px" },
    cell: ({ row }) => {
      const medicine = row.original;
      return <p className="text-14-medium ">{medicine.category}</p>;
    },
  },
  {
    accessorKey: "stock",
    header: "Stock ",
    meta: { width: "450px" },

    cell: ({ row }) => {
      const medicine = row.original;
      return <p className="text-14-medium ">{medicine.stock}</p>;
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
    accessorKey: "unit",
    header: "Unit",
    meta: { width: "450px" },
    cell: ({ row }) => {
      const medicine = row.original;
      return <p className="text-14-medium ">{medicine.unit}</p>;
    },
  },
  {
    accessorKey: "frequency",
    header: "Frequency",
    meta: { width: "450px" },

    cell: ({ row }) => {
      const medicine = row.original;
      return <p className="text-14-medium ">{medicine.frequency}</p>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    meta: { width: "450px" },
    cell: ({ row }) => {
      const medicine = row.original;
      return <p className="text-14-medium ">{`$${medicine.price}`}</p>;
    },
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    meta: { width: "450px" },
    cell: ({ row }) => {
      const medicine = row.original;
      return <p className="text-14-medium ">{formatDateTime(medicine.expiryDate).dateDay}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    meta: { width: "450px" },
    cell: ({ row }) => {
      const medicine = row.original;

      // Define status colors
      const statusColors: Record<string, string> = {
        "In Stock": "text-white bg-green-700",
        "Out Stock": "text-white bg-red-700",
        "Low Stock": "text-white bg-yellow-500",
        "Expired": "text-white bg-black",
      };

      // Determine color class
      const statusClass = statusColors[medicine.status] || "text-gray-600 bg-gray-200";

      return (
        <span className={`px-2 py-1 rounded-md text-sm font-medium ${statusClass}`}>
          {medicine.status}
        </span>
      );
    },
  },

  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const medicine = row.original;

      return (
        <ActionButtons clinicId={medicine.$id} >
          <EditMedicineModal defaultValues={medicine} medicineId={medicine.$id}>
            <Button variant={'outline'} className="border-slate-400 hover:bg-slate-500">
              <Pen size={10} />
              <p className="text-xs">Edit</p>
            </Button>
          </EditMedicineModal>
        </ActionButtons>
      );
    },
  },
];

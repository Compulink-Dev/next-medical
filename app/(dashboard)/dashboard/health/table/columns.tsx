"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Treatment } from "@/types/appwrite.types";
import { formatDateTime } from "@/lib/utils";

export const columns = (userRole: string): ColumnDef<Treatment>[] => {
  const columnList: ColumnDef<Treatment>[] = [
    {
      header: "#",
      meta: { width: "50px" },
      cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
    },
    {
      accessorKey: "primaryClinic",
      header: "Clinic",
      meta: { width: "450px" },
      cell: ({ row }) => (
        <p className="text-14-medium">{row.original.primaryClinic}</p>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      meta: { width: "450px" },
      cell: ({ row }) => (
        <p className="text-14-medium">{row.original.description}</p>
      ),
    },
    {
      accessorKey: "medicine",
      header: "Medicine",
      meta: { width: "450px" },
      cell: ({ row }) => {
        const medicine = row.original.medicine;
        return (
          <p className="text-14-medium">
            {typeof medicine === "object" && medicine !== null
              ? medicine.name // Display the medicine name
              : "N/A"}
          </p>
        );
      },
    },

    {
      accessorKey: "phone",
      header: "Phone",
      meta: { width: "450px" },
      cell: ({ row }) => <p className="text-14-medium">{row.original.phone}</p>,
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      meta: { width: "450px" },
      cell: ({ row }) => (
        <p className="text-14-medium">
          {formatDateTime(row.original.startDate).dateTime}
        </p>
      ),
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      meta: { width: "450px" },
      cell: ({ row }) => (
        <p className="text-14-medium">
          {formatDateTime(row.original.endDate).dateTime}
        </p>
      ),
    },
    {
      accessorKey: "dosage",
      header: "Dosage",
      meta: { width: "450px" },
      cell: ({ row }) => (
        <p className="text-14-medium">{row.original.dosage}</p>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      meta: { width: "450px" },
      cell: ({ row }) => (
        <p className="text-14-medium">{row.original.status}</p>
      ),
    },
    {
      id: "actions",
      header: () => <div className="pl-4">Actions</div>,
      cell: () => <></>,
    },
  ];

  // Conditionally add the "Patient" column if user is NOT a nurse or doctor
  if (userRole == "nurse") {
    columnList.splice(2, 0, {
      accessorKey: "patient",
      header: "Patient",
      meta: { width: "450px" },
      cell: ({ row }) => (
        <p className="text-14-medium">{row.original.patient?.name ?? "N/A"}</p>
      ),
    });
  }

  return columnList;
};

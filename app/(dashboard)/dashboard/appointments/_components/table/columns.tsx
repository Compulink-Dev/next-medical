"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
import { Hospital } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { AppointmentModal } from "@/components/AppointmentModal";

export const columns = (userRole: string): ColumnDef<Appointment>[] => [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p className="text-14-medium ">{appointment.patient.name}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={appointment.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(appointment.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "primaryClinic",
    header: "Clinic",
    cell: ({ row }) => {
      const appointment = row.original;

      const doctor = Doctors.find(
        (doctor) => doctor.name === appointment.primaryClinic
      );

      return (
        <div className="flex items-center gap-3">
          <Hospital />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  // Conditionally show actions column
  ...(userRole === "doctor" || userRole === "nurse"
    ? [
      {
        id: "actions",
        header: () => <div className="pl-4">Actions</div>,
        cell: ({ row }: any) => {
          const appointment = row.original;
          return (
            <div className="flex gap-1">
              <AppointmentModal
                patientId={appointment.patient.$id}
                userId={appointment.userId}
                appointment={appointment}
                type="schedule"
                title="Schedule Appointment"
                description="Please confirm the following details to schedule."
              />
              <AppointmentModal
                patientId={appointment.patient.$id}
                userId={appointment.userId}
                appointment={appointment}
                type="cancel"
                title="Cancel Appointment"
                description="Are you sure you want to cancel your appointment?"
              />
            </div>
          );
        },
      },
    ]
    : [
      {
        id: "actions",
        header: () => <div className="pl-4">Actions</div>,
        cell: ({ row }: any) => {
          const appointment = row.original;
          return (
            <div className="flex gap-1">
              <AppointmentModal
                patientId={appointment.patient.$id}
                userId={appointment.userId}
                appointment={appointment}
                type="schedule"
                title="View Appointment"
                description="View appointment details."
              />
            </div>
          );
        },
      },
    ]),
];

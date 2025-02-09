"use client";
// import { StatCard } from "@/components/StatCard";
import { getAllPatients, getNurse } from "@/lib/actions/user.actions";
import { useAuth } from "@/lib/providers/AuthProvider";
import React, { useEffect, useState } from "react";
import { columns } from "../table/columns";
import { DataTable } from "@/components/table/DataTable";
import { TreatmentModal } from "./TreatmentModal";
import { Nurse } from "@/types/appwrite.types";

function TreatmentClient({ treatments, nurses, patients, medicines }: any) {
  const { user } = useAuth();
  const [patient, setPatient] = useState<any | []>([]);
  const [maid, setMaid] = useState<Nurse | null>(null);

  console.log(maid);

  const userId = user?.userId ?? "";
  console.log("User ID :", userId);

  //@ts-ignore
  const userRole = user?.label ?? "";

  useEffect(() => {
    if (!userId) return;

    const fetchNurse = async () => {
      try {
        const data = await getNurse(userId);
        setMaid(data);
      } catch (error) {
        console.error("Failed to fetch nurse data:", error);
      }
    };

    fetchNurse();
  }, [userId]);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const data = await getAllPatients();
        setPatient(data);
      } catch (error) {
        console.error("Failed to fetch patient data:", error);
      }
    };

    fetchPatient();
  }, [userId]);

  // Find the nurse by userId
  const nurse = nurses.find((n: any) => n.userId === userId);
  console.log("Found Nurse:", nurse);

  // Extract clinic name if nurse exists
  const clinicName = nurse?.clinic?.name ?? "Unknown Clinic";
  console.log("Clinic Name:", clinicName);

  // 🔥 Filter Treatments based on User Role
  const filteredTreatments =
    userRole === "doctor" || userRole === "nurse"
      ? treatments.filter((t: any) => t.primaryClinic === clinicName) // Show treatments for clinic
      : treatments.filter((t: any) => t.patient && t.patient.userId === userId); // Show only the user's treatments (if patient exists)

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14 mt-6">
      <main className="admin-main pt-6">
        <section className="w-full space-y-4 flex items-center justify-between">
          <div className="">
            <h1 className="header">Treatments</h1>
            <p className="text-color">
              {userRole === "doctor" || userRole === "nurse"
                ? `Manage all treatments at ${clinicName}`
                : "View your treatments"}
            </p>
          </div>
          {userRole === "doctor" || userRole === "nurse" ? (
            <TreatmentModal
              userId={userId}
              medicines={medicines}
              patients={patients}
              nurses={nurses}
              patientId={patient?.$id ?? ""}
            />
          ) : null}
        </section>

        {/* <section className="admin-stat">
          {userRole === "doctor" || userRole === "nurse" ? (
            // Doctors & nurses see all appointment statistics
            <>
              <StatCard
                type="appointments"
                count={treatments.scheduledCount}
                label="Scheduled appointments"
                icon={"/assets/icons/appointments.svg"}
              />
              <StatCard
                type="pending"
                count={appointments.pendingCount}
                label="Pending appointments"
                icon={"/assets/icons/pending.svg"}
              />
              <StatCard
                type="cancelled"
                count={appointments.cancelledCount}
                label="Cancelled appointments"
                icon={"/assets/icons/cancelled.svg"}
              />
            </>
          ) : (
            // Patients see only their own appointments
            <>
              <StatCard
                type="appointments"
                count={
                  appointments.documents.filter(
                    (appointment: any) =>
                      appointment.patient.userId === userId &&
                      appointment.status === "scheduled"
                  ).length
                }
                label="Your Scheduled Appointments"
                icon={"/assets/icons/appointments.svg"}
              />
              <StatCard
                type="pending"
                count={
                  appointments.documents.filter(
                    (appointment: any) =>
                      appointment.patient.userId === userId &&
                      appointment.status === "pending"
                  ).length
                }
                label="Your Pending Appointments"
                icon={"/assets/icons/pending.svg"}
              />
              <StatCard
                type="cancelled"
                count={
                  appointments.documents.filter(
                    (appointment: any) =>
                      appointment.patient.userId === userId &&
                      appointment.status === "cancelled"
                  ).length
                }
                label="Your Cancelled Appointments"
                icon={"/assets/icons/cancelled.svg"}
              />
            </>
          )}
        </section> */}

        <DataTable columns={columns(userRole)} data={filteredTreatments} />
      </main>
    </div>
  );
}

export default TreatmentClient;

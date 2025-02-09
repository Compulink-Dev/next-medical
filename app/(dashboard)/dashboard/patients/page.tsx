"use client";

import { getAllPatients, getNurse } from "@/lib/actions/user.actions";
import { useAuth } from "@/lib/providers/AuthProvider";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/table/DataTable";

import { Nurse } from "@/types/appwrite.types";
import { columns } from "./table/columns";

function PatientsClient() {
  const { user } = useAuth();
  const [patients, setPatients] = useState<any[]>([]);
  const [nurse, setNurse] = useState<Nurse | null>(null);

  const userId = user?.userId ?? "";
  //@ts-ignore
  const userRole = user?.label ?? ""; // Example: "nurse", "doctor"

  useEffect(() => {
    if (!userId) return;

    const fetchNurse = async () => {
      try {
        const nurseData = await getNurse(userId);
        setNurse(nurseData);
      } catch (error) {
        console.error("Failed to fetch nurse data:", error);
      }
    };

    fetchNurse();
  }, [userId]);

  useEffect(() => {
    if (!nurse?.clinic?.$id) return; // Ensure clinic exists

    const fetchPatients = async () => {
      try {
        const data = await getAllPatients();
        //@ts-ignore
        setPatients(data);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    };

    fetchPatients();
  }, [nurse]);

  console.log("Patients Data:", nurse?.clinic?.$id);

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14 mt-6">
      <main className="admin-main pt-6">
        <section className="w-full space-y-4 flex items-center justify-between">
          <div>
            <h1 className="header">Patients</h1>
            <p className="text-dark-700">
              {userRole === "doctor" || userRole === "nurse"
                ? `Managing patients at ${
                    nurse?.clinic?.name ?? "Unknown Clinic"
                  }`
                : "Your Patients"}
            </p>
          </div>
        </section>

        <DataTable columns={columns(userRole)} data={patients} />
      </main>
    </div>
  );
}

export default PatientsClient;

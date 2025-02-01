"use client";
import { AppointmentModal } from "@/components/modals/NewAppointmentModal";
import { StatCard } from "@/components/StatCard";
import { getPatient } from "@/lib/actions/user.actions";
import { useAuth } from "@/lib/providers/AuthProvider";
import { useEffect, useState } from "react";
import { DataTable } from "../dashboard/appointments/_components/table/DataTable";
import { columns } from "../dashboard/appointments/_components/table/columns";

interface Patient {
    $id: string;
    name?: string;
    email?: string;
    // Add other fields if necessary
}


const AdminPageClient = ({
    appointments,
    clinics,
}: {
    appointments: any;
    clinics: any;
}) => {
    const { user } = useAuth(); // This works only in the client-side
    const [patient, setPatient] = useState<Patient | null>(null);

    console.log("Appointments:", user);

    const userId = user?.userId ?? ""; // Use optional chaining with nullish coalescing
    //@ts-ignore
    const userRole = user?.label ?? ""; // Assuming `label` stores the role

    useEffect(() => {
        if (!userId) return;

        const fetchPatient = async () => {
            try {
                const data = await getPatient(userId);
                setPatient(data);
            } catch (error) {
                console.error("Failed to fetch patient data:", error);
            }
        };

        fetchPatient();
    }, [userId]);


    console.log('Appointments Patients:', appointments);

    // Filter appointments if user is NOT a doctor or nurse
    const filteredAppointments =
        userRole === "doctor" || userRole === "nurse"
            ? appointments.documents // Show all
            : appointments.documents.filter(
                (appointment: any) => appointment.patient.userId === userId
            ); // Show only user's appointments



    return (
        <div className="mx-auto flex max-w-7xl flex-col space-y-14">
            <main className="admin-main pt-6">
                <section className="w-full space-y-4 flex items-center justify-between">
                    <div className="">
                        <h1 className="header">Appointments</h1>
                        <p className="text-dark-700">
                            {userRole === "doctor" || userRole === "nurse"
                                ? "Manage all appointments"
                                : "View your appointments"}
                        </p>
                    </div>
                    {userRole === "doctor" || userRole === "nurse" ? (
                        null
                    ) : <AppointmentModal
                        clinics={clinics}
                        patientId={patient?.$id ?? ""}
                    />}
                </section>

                <section className="admin-stat">
                    {userRole === "doctor" || userRole === "nurse" ? (
                        // Doctors & nurses see all appointment statistics
                        <>
                            <StatCard
                                type="appointments"
                                count={appointments.scheduledCount}
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
                </section>




                <DataTable columns={columns(userRole)} data={filteredAppointments} />

            </main>
        </div>
    );
};

export default AdminPageClient;

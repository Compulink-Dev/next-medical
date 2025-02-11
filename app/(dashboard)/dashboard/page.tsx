"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getSession } from "@/lib/actions/login";
import Chart from "../_components/Charts";
import Loading from "@/components/Loading";
import { StatCard } from "@/app/(admin)/admin/_components/StatCard";
import { getRecentPatientsList } from "@/lib/actions/user.actions";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { getRecentTreatmentList } from "@/lib/actions/treatment.actions";
import { getRecentMedicineList } from "@/lib/actions/medicine.action";
import StatChart from "../_components/StatCharts";

const Dashboard = () => {
  const [user, setUser] = useState<{
    userId: string;
    email: string;
    name: string;
    label: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    patients: 0,
    appointments: 0,
    treatments: 0,
    medicines: 0,
  });

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        toast.error("No active session found. Redirecting...");
        router.push("/login");
        return;
      }

      try {
        const userData = await getSession(userId);
        setUser(userData);
        toast.success("Session active");
      } catch (error) {
        console.error(error);
        toast.error("Session expired. Redirecting...");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    const fetchStats = async () => {
      try {
        const [patients, appointments, treatments, medicines] =
          await Promise.all([
            getRecentPatientsList(),
            getRecentAppointmentList(),
            getRecentTreatmentList(),
            getRecentMedicineList(),
          ]);
        setStats({
          patients: patients?.totalCount || 0,
          appointments: appointments?.totalCount || 0,
          treatments: treatments?.totalCount || 0,
          medicines: medicines?.totalCount || 0,
        });
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
      }
    };

    fetchUser();
    fetchStats();
  }, [router]);

  if (loading) return <Loading />;

  return (
    <div className="container my-8 text-dark-400">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Render StatCards only for doctors and nurses */}
      {(user?.label === "doctor" || user?.label === "nurse") && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
          <StatCard
            count={stats.patients}
            label="Total Patients"
            icon="/assets/icons/patient.svg"
            href="/dashboard/patients"
          />
          <StatCard
            count={stats.appointments}
            label="Appointments"
            icon="/assets/icons/appointments.svg"
            href="/dashboard/appointments"
          />
          <StatCard
            count={stats.treatments}
            label="Treatments"
            icon="/assets/icons/injection.svg"
            href="/dashboard/treatments"
          />
          <StatCard
            count={stats.medicines}
            label="Medicines"
            icon="/assets/icons/medicine.svg"
            href="/dashboard/medicines"
          />
        </div>
      )}

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Overview Chart</h2>
        <StatChart stats={stats} />
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Appointments Chart</h2>
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;

import React from "react";
import { getRecentClinicList } from "@/lib/actions/clinic.actions";
import { StatCard } from "./_components/StatCard";
import { getRecentNursesList, getRecentPatientsList } from "@/lib/actions/user.actions";
import { getRecentMedicineList } from "@/lib/actions/medicine.action";

const AdminPage = async () => {
  const clinics = await getRecentClinicList();
  const patients = await getRecentPatientsList()
  const nurses = await getRecentNursesList()
  const medicines = await getRecentMedicineList()

  console.log('Nurses:', nurses);


  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <main className="admin-main pt-6">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">Admin</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
            <StatCard
              count={clinics?.totalCount || 0} // Fallback to 0 if clinics is undefined
              label="Clinics"
              icon="/assets/icons/clinic.svg"
              href="/admin/clinics"
            />
            <StatCard
              count={patients?.totalCount || 0} // Fallback to 0 if clinics is undefined
              label="Patients"
              icon="/assets/icons/patient.svg"
              href="/admin/patients"
            />
            <StatCard
              count={nurses?.totalCount || 0} // Fallback to 0 if clinics is undefined
              label="Nurses"
              icon="/assets/icons/nurse.svg"
              href="/admin/nurses"
            />
            <StatCard
              count={medicines?.totalCount || 0} // Fallback to 0 if clinics is undefined
              label="Medicines"
              icon="/assets/icons/medicine.svg"
              href="/admin/medicines"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPage;

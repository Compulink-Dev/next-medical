import { DataTable } from "@/components/table/DataTable";
import { getAllPatients } from "@/lib/actions/user.actions";
import React from "react";
import { columns } from "./table/columns";

async function Patients() {
  const patients = await getAllPatients();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14 mt-6">
      <main className="admin-main pt-6">
        <section className="w-full space-y-4">
          <h1 className="header">Patients</h1>
          <p className="text-dark-700">Start the day with managing patients</p>
        </section>
        <DataTable columns={columns} data={patients!} />
      </main>
    </div>
  );
}

export default Patients;

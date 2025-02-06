import { DataTable } from "@/components/table/DataTable";
import { getAllNurses } from "@/lib/actions/user.actions";
import React from "react";
import { columns } from "./_components/table/columns";

async function Nurses() {
  const nurses = await getAllNurses();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14 mt-6">
      <main className="admin-main pt-6">
        <section className="w-full  flex items-center justify-between">
          <div className="space-y-4">
            <h1 className="header">Nurses </h1>
            <p className="text-dark-700">
              Start the day with managing our nurses
            </p>
          </div>

          {/* <Link
                        className='flex gap-2 items-center border py-2 px-4 border-slate-700 hover:border-slate-200 rounded'
                        href='/admin/nurses/new-clinic'>
                        <Plus size={14} />
                        <p className="text-sm">Add Nurse</p>
                    </Link> */}
        </section>

        <DataTable columns={columns} data={nurses!} />
      </main>
    </div>
  );
}

export default Nurses;

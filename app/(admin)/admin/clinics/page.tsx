
import ClinicModal from '@/components/modals/ClinicModal';
import { getAllClinics } from '@/lib/actions/clinic.actions'
import { Plus } from 'lucide-react'

import React from 'react'
import { columns } from './table/columns';
import { DataTable } from '@/components/table/DataTable';

async function Clinics() {

    const clinics = await getAllClinics()

    console.log('Clinics:', clinics);


    return (
        <div className='mx-auto flex max-w-7xl flex-col space-y-14 mt-6'>
            <main className="admin-main pt-6">
                <section className="w-full  flex items-center justify-between">
                    <div className="space-y-4">
                        <h1 className="header">Clinics </h1>
                        <p className="text-dark-700">
                            Start the day with managing our clinics
                        </p>
                    </div>

                    <ClinicModal>
                        <button className='flex gap-2 items-center border py-2 px-4 border-slate-700 hover:border-slate-200 rounded'>
                            <Plus size={14} />
                            <p className="text-sm">Add Clinics</p>
                        </button>
                    </ClinicModal>

                    {/* <Link
                        className='flex gap-2 items-center border py-2 px-4 border-slate-700 hover:border-slate-200 rounded'
                        href='/admin/clinics/new-clinic'>
                        <Plus size={14} />
                        <p className="text-sm">Add Clinic</p>
                    </Link> */}

                </section>

                <DataTable columns={columns} data={clinics!} />
            </main>
        </div>
    )
}

export default Clinics
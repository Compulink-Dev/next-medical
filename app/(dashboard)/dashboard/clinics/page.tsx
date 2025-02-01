

import { getAllClinics } from '@/lib/actions/clinic.actions'
import React from 'react'
import { columns } from './table/columns';
import { DataTable } from '@/components/table/DataTable';

async function Clinics() {

    const clinics = await getAllClinics()

    return (
        <div className='mx-auto flex max-w-7xl flex-col space-y-14 mt-6'>
            <main className="admin-main pt-6">
                <section className="w-full  flex items-center justify-between">
                    <div className="space-y-4">
                        <h1 className="header">Clinics </h1>
                        <p className="text-dark-700">
                            View our clinics
                        </p>
                    </div>


                </section>

                <DataTable columns={columns} data={clinics!} />
            </main>
        </div>
    )
}

export default Clinics
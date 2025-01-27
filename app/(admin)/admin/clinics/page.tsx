import ClinicModal from '@/components/forms/ClinicModal'
import { getAllClinics } from '@/lib/actions/clinic.actions'
import { Plus } from 'lucide-react'

import React from 'react'

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

                <section className="w-full">
                    {clinics && clinics.length > 0 ? (
                        <div className="space-y-4">
                            {clinics.map((clinic, index) => (
                                <div key={index} className="bg-slate-900 p-4 rounded shadow-sm">
                                    <h2 className="text-lg font-bold">{clinic.name}</h2>
                                    <p className="text-dark-700 text-sm">{clinic.address}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No clinics found.</p>
                    )}
                </section>
            </main>
        </div>
    )
}

export default Clinics
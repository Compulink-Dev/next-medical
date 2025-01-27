import MedicineModal from '@/components/modals/MedicineModal'
import { DataTable } from '@/components/table/DataTable';
import { getAllMedicines } from '@/lib/actions/medicine.action';
import { Plus } from 'lucide-react'
import React from 'react'
import { columns } from './table/columns';

async function Medicines() {

    const medicines = await getAllMedicines()

    console.log('medicines:', medicines);
    return (
        <div className='mx-auto flex max-w-7xl flex-col space-y-14 mt-6'>
            <main className="admin-main pt-6">
                <section className="w-full space-y-4 flex items-center justify-between">
                    <div className="">
                        <h1 className="header">Medicines </h1>
                        <p className="text-dark-700">
                            Start the day with managing medicines inventory
                        </p>
                    </div>
                    <MedicineModal>
                        <button className='flex gap-2 items-center border py-2 px-4 border-slate-700 hover:border-slate-200 rounded'>
                            <Plus size={14} />
                            <p className="text-sm">Add Medicine</p>
                        </button>
                    </MedicineModal>
                </section>

                <DataTable columns={columns} data={medicines!} />
            </main>
        </div>
    )
}

export default Medicines
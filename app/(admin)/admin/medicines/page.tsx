import MedicineModal from '@/components/modals/MedicineModal'
import { getAllMedicines } from '@/lib/actions/medicine.action';
import { Plus } from 'lucide-react'
import React from 'react'

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

                <section className="w-full">
                    {medicines && medicines.length > 0 ? (
                        <div className="space-y-4">
                            {medicines.map((medicine, index) => (
                                <div key={index} className="bg-slate-900 p-4 rounded shadow-sm">
                                    <h2 className="text-lg font-bold">{medicine.name}</h2>
                                    <p className="text-dark-700 text-sm">{medicine.dosgae}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No medicines found.</p>
                    )}
                </section>
            </main>
        </div>
    )
}

export default Medicines
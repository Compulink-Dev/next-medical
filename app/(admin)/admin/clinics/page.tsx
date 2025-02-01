
import ClinicModal from '@/components/modals/ClinicModal';
import { getAllClinics } from '@/lib/actions/clinic.actions'
import { Download, Filter, Plus } from 'lucide-react'

import React from 'react'
import { columns } from './table/columns';
import { DataTable } from '@/components/table/DataTable';
import { StatCard } from '../_components/StatCard';
import { getRecentNursesList } from '@/lib/actions/user.actions';
import { getRecentMedicineList } from '@/lib/actions/medicine.action';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { InputSelect } from '@/components/InputSelect';
import { SelectItem } from '@/components/ui/select';

async function Clinics() {

    const clinics = await getRecentMedicineList()
    const clinicData = await getAllClinics()
    const nurses = await getRecentNursesList()
    const medicines = await getRecentMedicineList()

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

                </section>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    <StatCard
                        count={clinics?.totalCount || 0} // Fallback to 0 if clinics is undefined
                        label="Clinic"
                        icon="/assets/icons/clinic.svg"
                        href="/admin/clinics"
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

                <div className="w-full flex items-center gap-2">
                    <div className="flex-1">
                        <Input placeholder="Search" />
                    </div>
                    <div className="flex items-center gap-2">
                        <InputSelect
                            placeholder='All Clinics'
                        >
                            {
                                clinicData?.map((clinic, index) => (
                                    <SelectItem key={index} value={clinic.name}>{clinic.name}</SelectItem>
                                ))
                            }
                        </InputSelect>
                        <Button>
                            <Filter />
                            <p className="">More Filter</p>
                        </Button>
                        <Button>
                            <Download />
                            <p className="">Export</p>
                        </Button>
                    </div>
                </div>

                <DataTable columns={columns} data={clinicData!} />
            </main>
        </div>
    )
}

export default Clinics
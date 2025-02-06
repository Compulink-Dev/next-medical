import { DataTable } from "@/components/table/DataTable";
import {
  getAllMedicines,
  getRecentMedicineList,
} from "@/lib/actions/medicine.action";
import { Download, Filter, Plus } from "lucide-react";
import React from "react";
import { columns } from "./table/columns";
import { StatCard } from "../_components/StatCard";
import { Input } from "@/components/ui/input";
import { InputSelect } from "@/components/InputSelect";
import { SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import MedicineModal from "@/components/modals/MedicineModal";

async function Medicines() {
  const medicines = await getAllMedicines();
  const medicalData = await getRecentMedicineList();

  // Calculate statistics
  const lowStockCount =
    medicalData?.documents?.filter((med) => med.status === "Low Stock")
      .length || 0;
  const outOfStockCount =
    medicalData?.documents?.filter((med) => parseInt(med.stock) === 0).length ||
    0;
  const expiredCount =
    medicalData?.documents?.filter(
      (med) => new Date(med.expiryDate) < new Date()
    ).length || 0;
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14 mt-6">
      <main className="admin-main pt-6">
        <section className="w-full  flex items-center justify-between">
          <div className="space-y-4">
            <h1 className="header">Medicines </h1>
            <p className="text-dark-700">
              Start the day with managing medicines inventory
            </p>
          </div>
          <MedicineModal>
            <button className="flex gap-2 items-center border py-2 px-4 border-slate-700 hover:border-slate-200 rounded">
              <Plus size={14} />
              <p className="text-sm">Add Medicine</p>
            </button>
          </MedicineModal>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
          <StatCard
            count={medicalData?.totalCount || 0} // Fallback to 0 if clinics is undefined
            label="Total Medicines"
            icon="/assets/icons/medicine.svg"
            href="/admin/medicines"
          />
          <StatCard
            count={lowStockCount}
            label="Low Stock"
            icon="/assets/icons/alert.png"
            href="/admin/medicines"
          />
          <StatCard
            count={outOfStockCount}
            label="Out of Stock"
            icon="/assets/icons/cancelled.svg"
            href="/admin/medicines"
          />
          <StatCard
            count={expiredCount}
            label="Expired Items"
            icon="/assets/icons/repeat.png"
            href="/admin/medicines"
          />
        </div>

        <div className="w-full flex items-center gap-2">
          <div className="flex-1">
            <Input placeholder="Search medicines" />
          </div>
          <div className="flex items-center gap-2">
            <InputSelect placeholder="Medicine Category">
              {medicines?.map((clinic, index) => (
                <SelectItem key={index} value={clinic.category}>
                  {clinic.category}
                </SelectItem>
              ))}
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

        <DataTable columns={columns} data={medicines!} />
      </main>
    </div>
  );
}

export default Medicines;

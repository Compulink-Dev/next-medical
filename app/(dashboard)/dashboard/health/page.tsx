import React from "react";
import TreatmentClient from "./_components/TreatmentClient";
import { getAllTreatments } from "@/lib/actions/treatment.actions";
import { getAllNurses, getAllPatients } from "@/lib/actions/user.actions";
import { getAllMedicines } from "@/lib/actions/medicine.action";

async function Health() {
  const treatments = await getAllTreatments();
  const nurses = (await getAllNurses()) || [];
  const patients = (await getAllPatients()) || [];
  const medicines = (await getAllMedicines()) || [];

  return (
    <TreatmentClient
      patients={patients}
      medicines={medicines}
      treatments={treatments}
      nurses={nurses}
    />
  );
}

export default Health;

"use client";
import { Accessibility, Stethoscope } from "lucide-react";
import { redirect, useParams } from "next/navigation";
import SelectCard from "../_components/SelectCard";
import { getNurse, getPatient } from "@/lib/actions/user.actions";

const Selection = () => {
  const { userId } = useParams();
  if (!userId) {
    // Handle the case where userId is undefined or an array
    // You could redirect to an error page or throw an error
    throw new Error("User ID  a must and required");
  }

  const userIdString = Array.isArray(userId) ? userId[0] : userId.toString();

  const handleGetUser = async () => {
    const patient = await getPatient(userIdString);
    const nurse = await getNurse(userIdString);

    if (nurse) redirect("/dashboard");
    if (patient) redirect("/dashboard");
  };

  handleGetUser();

  return (
    <div className="flex flex-col gap-6 h-screen w-screen items-center justify-center">
      <p className="text-3xl font-bold">Want to login as</p>
      <div className="flex items-center justify-center gap-4">
        <SelectCard name="Patient" userId={userIdString} type="patients">
          <Accessibility size={100} />
        </SelectCard>
        <SelectCard name="Nurse" userId={userIdString} type="nurse">
          <Stethoscope size={100} />
        </SelectCard>
      </div>
    </div>
  );
};

export default Selection;

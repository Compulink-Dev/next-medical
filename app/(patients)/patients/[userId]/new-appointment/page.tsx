import { getPatient } from "@/lib/actions/user.actions";
import { AppointmentClient } from "../../_components/AppointmentClient";
import { getAllClinics } from "@/lib/actions/clinic.actions";

// Define the type for route params
type Params = {
  userId: string;
};

type SearchParamProps = {
  params: Promise<Params>; // Update the type to Promise<Params>
};

const AppointmentPage = async ({ params }: SearchParamProps) => {
  const { userId } = await params; // Await the promise to get the params

  const clinics = await getAllClinics() || [];

  let patient = null;

  try {
    patient = await getPatient(userId);
  } catch (error) {
    console.error("Failed to fetch patient data:", error);
  }

  return (
    <AppointmentClient
      clinics={clinics}
      patientId={patient?.$id || ""}
      userId={userId}
      hasError={!patient}
    />
  );
};

export default AppointmentPage;
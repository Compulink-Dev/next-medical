import { getPatient } from "@/lib/actions/user.actions";
import { AppointmentClient } from "../../_components/AppointmentClient";

// Define the type for route params
type Params = {
  userId: string;
};

type SearchParamProps = {
  params: Promise<Params>; // Update the type to Promise<Params>
};

const AppointmentPage = async ({ params }: SearchParamProps) => {
  const { userId } = await params; // Await the promise to get the params

  let patient = null;

  try {
    patient = await getPatient(userId);
  } catch (error) {
    console.error("Failed to fetch patient data:", error);
  }

  return (
    <AppointmentClient
      patientId={patient?.$id || ""}
      userId={userId}
      hasError={!patient}
    />
  );
};

export default AppointmentPage;
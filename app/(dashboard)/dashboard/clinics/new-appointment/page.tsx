import { getPatient } from "@/lib/actions/user.actions";
import { AppointmentClient } from "../../_components/AppointmentClient";

type Params = {
  userId: string;
};

const AppointmentPage = async ({ params }: { params: Params }) => {
  const { userId } = params; // ✅ Correctly use params without async issues

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

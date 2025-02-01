
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { getAllClinics } from "@/lib/actions/clinic.actions";
import AdminPageClient from "../../_components/AdminPageClient";

const AdminPage = async () => {
    const appointments = await getRecentAppointmentList();
    const clinics = await getAllClinics() || [];

    // Pass the fetched data as props to the Client Component
    return <AdminPageClient appointments={appointments} clinics={clinics} />;
};

export default AdminPage;

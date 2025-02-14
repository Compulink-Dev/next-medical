import Image from "next/image";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/user.actions";
import { getAllClinics } from "@/lib/actions/clinic.actions";

type SearchParamProps = {
  params: Promise<{ userId: string }>;
};

const Register = async ({ params }: SearchParamProps) => {
  const { userId } = await params;
  const user = await getUser(userId);
  const patient = await getPatient(userId);
  const clinics = (await getAllClinics()) || [];

  console.log("Clinic data:", clinics);

  if (patient) redirect(`/dashboard`);

  return (
    <div className="flex h-screen max-h-screen bg-color">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/healthcare_logo.png"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-2 h-20 w-fit"
          />

          <RegisterForm clinics={clinics} user={user} />

          <p className="copyright py-12"> 2025 Health Care</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;

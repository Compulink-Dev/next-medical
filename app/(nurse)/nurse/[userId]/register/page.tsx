import Image from "next/image";
import { redirect } from "next/navigation";
import { getNurse, getUser } from "@/lib/actions/user.actions";
import RegisterForm from "../../_components/RegisterForm";

type SearchParamProps = {
  params: Promise<{ userId: string }>;
};

const Register = async ({ params }: SearchParamProps) => {
  const { userId } = await params;
  const user = await getUser(userId);
  const nurse = await getNurse(userId);

  if (nurse) redirect(`/dashboard`);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/healthcare_logo.png"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-2 h-20 w-fit"
          />

          <RegisterForm user={user} />

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

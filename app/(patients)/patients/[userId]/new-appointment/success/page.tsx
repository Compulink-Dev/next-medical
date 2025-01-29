import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import { Hospital } from "lucide-react";

type SearchParamProps = {
  searchParams: Promise<{ [key: string]: string }>;
  params: Promise<{ userId: string }>;
};

const RequestSuccess = async ({ searchParams, params }: SearchParamProps) => {
  const { userId } = await params;
  const searchParamsObj = await searchParams;
  const appointmentId = (searchParamsObj?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  return (
    <div className=" flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/healthcare_logo.png"
            height={1000}
            width={1000}
            alt="logo"
            className="h-20 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <Hospital />
            <p className="whitespace-nowrap">{appointment.primaryClinic}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright"> 2025 Health Care</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
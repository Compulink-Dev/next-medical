"use client";

import Image from "next/image";
import { AppointmentForm } from "@/components/forms/AppointmentForm";

type AppointmentClientProps = {
    patientId: string;
    userId: string;
    hasError: boolean;
};

export const AppointmentClient = ({
    patientId,
    userId,
    hasError,
}: AppointmentClientProps) => {
    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[860px] flex-1 justify-between">
                    <Image
                        src="/assets/icons/healthcare_logo.png"
                        height={1000}
                        width={1000}
                        alt="CarePluse Logo"
                        className="mb-2 h-20 w-fit"
                        priority
                    />

                    {hasError ? (
                        <p className="text-center text-red-500">
                            Failed to load patient data. Please try again later.
                        </p>
                    ) : (
                        <AppointmentForm patientId={patientId} userId={userId} type="create" />
                    )}

                    <p className="copyright mt-10 py-12 text-gray-500">
                        © 2025 Health Care
                    </p>
                </div>
            </section>

            <Image
                src="/assets/images/appointment-img.png"
                height={1500}
                width={1500}
                alt="Appointment Illustration"
                className="side-img max-w-[390px] bg-bottom"
            />
        </div>
    );
};

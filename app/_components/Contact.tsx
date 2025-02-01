"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import Title from "./Title";


const ContactFormValidation = z.object({
    name: z.string().min(2, "Full Name is required"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(3, "Subject is required"),
    phone: z.string().min(7, "Phone number is required"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

const ContactSection = () => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof ContactFormValidation>>({
        resolver: zodResolver(ContactFormValidation),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            phone: "",
            message: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof ContactFormValidation>) => {
        setIsLoading(true);

        try {
            console.log("Form submitted with values:", values);
            // Add API call or logic to handle form submission
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        setIsLoading(false);
    };

    return (
        <section className="relative" id="contact">
            {/* Shape Backgrounds */}
            <div className="absolute top-5 left-5">
                <Image className="animate-bounce" src="/assets/icons/medical.svg" alt="shape1" width={50} height={50} />
            </div>
            <div className="absolute bottom-8 right-8">
                <Image className="animate-bounce" src="/assets/icons/medicalkit.svg" alt="shape2" width={50} height={50} />
            </div>

            {/* Section Container */}
            <div className="container mx-auto py-20">
                {/* Section Heading */}
                <Title
                    title="Stay Connected With Us"
                    subtitle="Reach out for any inquiries or support."
                />

                {/* Contact Form */}
                <div className="max-w-4xl mx-auto mt-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="name" label="Full Name" placeholder="John Doe" />
                            <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="email" label="Email Address" placeholder="example@gmail.com" />
                            <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="subject" label="Subject" placeholder="Write subject" />
                            <CustomFormField fieldType={FormFieldType.PHONE_INPUT} control={form.control} name="phone" label="Phone" placeholder="+00 376 12 465" />
                            <div className="sm:col-span-2 w-ful">
                                <CustomFormField fieldType={FormFieldType.TEXTAREA} control={form.control} name="message" label="Your Message" placeholder="Write something here..." />
                            </div>
                            <div className="sm:col-span-2 w-full">
                                <SubmitButton isLoading={isLoading} className="shad-primary-btn w-full">Send Message</SubmitButton>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;

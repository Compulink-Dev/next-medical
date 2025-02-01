"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/lib/actions/login";
import { LoginFormValidation } from "@/lib/validation";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import toast from "react-hot-toast";

export const LoginForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof LoginFormValidation>>({
        resolver: zodResolver(LoginFormValidation),
        defaultValues: {
            email: "", // Ensures the input starts as a controlled component
            password: "",
        },
    });

    const handleLogin = async (values: z.infer<typeof LoginFormValidation>) => {
        setIsLoading(true);
        try {
            const session = await login(values.email, values.password);
            console.log("Login successful:", session);
            toast.success("Login successful");

            // Store user ID in sessionStorage
            sessionStorage.setItem("userId", session.userId);

            // Wait for session storage to complete
            await new Promise(resolve => setTimeout(resolve, 500));

            // Redirect user to the dashboard
            router.push("/dashboard");
        } catch (error: any) {
            console.error("Login failed:", error.message);
            toast.error("Login failed");
            form.setError("email", {
                type: "manual",
                message: error.message || "Invalid credentials",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="flex-1 space-y-6 text-gray-600">
                <h1 className="text-xl font-bold">Login to your account</h1>
                <p className="">Access your dashboard now.</p>

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="Enter email address"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="Email"
                />
                <CustomFormField
                    fieldType={FormFieldType.PASSWORD}
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder="Enter password"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="Password"
                />
                <SubmitButton isLoading={isLoading} className="shad-primary-btn w-full">
                    Login
                </SubmitButton>
                {form.formState.errors.email && (
                    <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
                )}
            </form>
        </Form>
    );
};

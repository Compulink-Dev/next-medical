'use client';
import { Button } from "@/components/ui/button";
// login/page.tsx
import { LoginForm } from "../_components/LoginForm";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PasskeyModal } from "@/components/PasskeyModal";
const LoginPage = () => {
    const searchParams = useSearchParams();
    const isAdmin = searchParams.get('admin') === 'true';;

    return (
        <div className="flex h-screen max-h-screen">
            {isAdmin && <PasskeyModal />}
            <section className="remove-scrollbar container  my-auto">
                <div className="sub-container max-w-[496px]">
                    <Image
                        src="/assets/icons/healthcare_logo.png"
                        height={1000}
                        width={1000}
                        alt="patient"
                        className="mb-2 h-20 w-fit"
                    />

                    <LoginForm />
                    <div className="mt-4 text-sm">
                        <p className="">{"Don't have an account ?"}
                            <span >
                                <Link className="pl-2 font-bold text-primary" href={'/register'}>Register User</Link>
                            </span></p>
                    </div>

                    <div className="text-14-regular mt-12 flex justify-between items-center">
                        <p className="justify-items-end text-600 text-color xl:text-left">
                            © 2025 Health Care
                        </p>
                        <Button className="shad-primary-btn">
                            <Link href="/?admin=true" className="">
                                Admin
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <Image
                src="/assets/images/doctor.jpg"
                height={1000}
                width={1000}
                alt="patient"
                className="side-img max-w-[50%] rounded-bl-full"
            />
        </div>
    );
};

export default LoginPage;

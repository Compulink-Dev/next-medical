'use client';
// login/page.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/actions/login";
const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const session = await login(email, password); // Log user in
            console.log("Session created:", session);

            // Redirect to dashboard after successful login
            router.push("/dashboard");
        } catch (error) {
            console.error("Login failed:", error);
            // Optionally display an error message to the user
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default LoginPage;

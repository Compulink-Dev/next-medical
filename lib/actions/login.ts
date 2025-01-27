'use server';

import { account } from "@/lib/appwrite.config";

export async function login(email: string, password: string) {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        console.log("Session created:", session);
        return session; // Contains user info and session token
    } catch (error: any) {
        console.error("Login error:", error.message);
        throw new Error(error.message || "Login failed");
    }
}

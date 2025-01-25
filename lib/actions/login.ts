// appwrite.config.ts
import { account } from "@/lib/appwrite.config";

async function login(email: string, password: string) {
    try {
        // Create a session for the user
        const session = await account.createEmailPasswordSession(email, password);
        console.log("Session created:", session);
        return session; // This session object will contain user info and session token
    } catch (error) {
        console.error("Login error:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

export { login };

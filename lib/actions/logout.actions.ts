"use server";

export async function logout() {
    try {
        // Just return success; sessionStorage should be handled on the client side
        return { success: true, message: "Logout successful" };
    } catch (error: any) {
        console.error("Logout error:", error.message);
        throw new Error(error.message || "Logout failed");
    }
}

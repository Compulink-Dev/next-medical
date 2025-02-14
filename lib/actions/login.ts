"use server";

import { users } from "@/lib/appwrite.config";

export async function login(email: string, password: string) {
  console.log(password);

  try {
    const userList = await users.list();
    const user = userList.users.find((u) => u.email === email);

    if (!user) throw new Error("User not found");

    return { userId: user.$id, email: user.email, name: user.name };
  } catch (error: any) {
    console.error("Login error:", error.message);
    throw new Error(error.message || "Login failed");
  }
}

// Function to get the current user session
export async function getSession(userId: string) {
  try {
    if (!userId) throw new Error("User ID is required");

    const user = await users.get(userId);

    // If 'label' is an array, take the first element or a default value if the array is empty
    const label = Array.isArray(user.labels)
      ? user.labels[0]
      : user.labels || "No label";

    return {
      userId: user.$id,
      email: user.email,
      name: user.name,
      label, // Ensure label is a string, not an array
    };
  } catch (error: any) {
    console.error("Session error:", error.message);
    throw new Error(error.message || "Failed to fetch session");
  }
}

// Function to log out the user
export async function logout() {
  try {
    // Clear sessionStorage (or localStorage)
    sessionStorage.removeItem("userId");
    console.log("User logged out");

    return { success: true, message: "Logout successful" };
  } catch (error: any) {
    console.error("Logout error:", error.message);
    throw new Error(error.message || "Logout failed");
  }
}

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getSession } from "@/lib/actions/login";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Define the context type
type AuthContextType = {
  user: { userId: string; email: string; name: string } | null;
  logout: () => Promise<void>;
};

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ userId: string; email: string; name: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        toast.error("No active session found. Redirecting...");
        router.push("/login");
        return;
      }

      try {
        const userData = await getSession(userId);
        setUser(userData);
        toast.success("Session active");
      } catch (error) {
        console.log(error);

        toast.error("Session expired. Redirecting...");
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  // Logout Function
  const logout = async () => {
    sessionStorage.removeItem("userId");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

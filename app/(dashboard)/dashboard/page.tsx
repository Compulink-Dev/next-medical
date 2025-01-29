"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getSession } from "@/lib/actions/login";
import Loading from "@/components/Loading";


const Dashboard = () => {
  const [user, setUser] = useState<{ userId: string; email: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) return <Loading />;

  return (
    <div className="container my-8">
      <h1>Welcome to the Dashboard</h1>
      {user && (
        <div>
          <h2>Hello, {user.name}</h2>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

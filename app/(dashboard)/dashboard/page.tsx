"use client";

import { useEffect, useState } from "react";
import { Models } from "node-appwrite";
import { account } from "@/lib/appwrite.config";
import { useRouter } from "next/navigation";

type Preferences = {
  notificationsEnabled: boolean;
  preferredLanguage: string;
};

type User = Models.User<Preferences>;

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserSession() {
      try {
        console.log("Checking user session...");

        // Fetch user session
        const user: User = await account.get();
        console.log("Fetched user:", user);

        // Set user in state
        setUser(user);
      } catch (error: any) {
        console.error("Failed to fetch user session:", error);
        setError("You are not authenticated. Redirecting to login...");


        // Redirect to login if not authenticated
        router.push("/entry");
      } finally {
        setLoading(false);
      }
    }

    fetchUserSession();
  }, [router]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {user && (
        <div>
          <h2>Hello, {user.name}!</h2>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

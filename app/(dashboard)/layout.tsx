import { AuthProvider } from "@/lib/providers/AuthProvider";
import Header from "./_components/Header";


export const metadata = {
  title: "Health Care Dashboard",
  description: "Health Care Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Header />
      <main className="text-dark-400">
        {children}
      </main>
    </AuthProvider>
  );
}

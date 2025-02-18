import Header from "@/components/dashboard/header";
import { Toaster } from "@/components/ui/toaster";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";

export default async function DashboardPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  return (
    <div>
      <SessionProvider>
        <Header />
        <div className="mt-16">{children}</div>
        <Toaster />
      </SessionProvider>
    </div>
  );
}

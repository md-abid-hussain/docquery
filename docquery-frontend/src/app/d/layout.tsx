import Header from "@/components/dashboard/header";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardPageLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Header />
            <div className="mt-20">
                {children}
            </div>
            <Toaster />
        </div>
    )
}
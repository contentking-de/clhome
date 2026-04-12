import { auth } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar active="dashboard" />
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}

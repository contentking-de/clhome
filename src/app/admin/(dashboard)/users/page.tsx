import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import UserManagement from "@/components/admin/UserManagement";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/admin/login");
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (currentUser?.role !== "ADMIN") {
    redirect("/admin");
  }

  return (
    <div className="max-w-4xl">
      <UserManagement currentUserId={session.user.id} />
    </div>
  );
}

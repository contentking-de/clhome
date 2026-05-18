import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import MarketResearchChat from "@/components/admin/research/MarketResearchChat";

export const dynamic = "force-dynamic";

export default async function ResearchPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/admin/login");

  return (
    <div>
      <h1 className="text-2xl font-bold text-on-background mb-6">Research</h1>
      <MarketResearchChat />
    </div>
  );
}

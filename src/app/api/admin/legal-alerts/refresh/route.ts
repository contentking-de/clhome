import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { refreshEdition } from "@/lib/skynet";

export async function POST() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const edition = await refreshEdition();

    return NextResponse.json({
      success: true,
      id: edition.id,
      generatedAt: edition.generatedAt,
      period: edition.period,
      reports: Object.keys(edition.reports as Record<string, string>),
    });
  } catch (error) {
    console.error("Manual legal-alerts refresh failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { refreshEdition, getCurrentEdition } from "@/lib/skynet";
import { notifySubscribers } from "@/lib/notify-subscribers";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const edition = await refreshEdition();

    const editionView = await getCurrentEdition();
    let notified = 0;
    if (editionView) {
      notified = await notifySubscribers(editionView);
    }

    return NextResponse.json({
      success: true,
      generatedAt: edition.generatedAt,
      reports: Object.keys(edition.reports as Record<string, string>),
      subscribersNotified: notified,
    });
  } catch (error) {
    console.error("Cron legal-alerts failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}

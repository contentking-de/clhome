import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const BASE_URL = "https://skynet42.de/clever-legal";

function getAuthHeader(): string {
  const user = process.env.SKYNET42_USERNAME;
  const pass = process.env.SKYNET42_PASSWORD;
  if (!user || !pass) throw new Error("SKYNET42 credentials missing");
  return "Basic " + Buffer.from(`${user}:${pass}`).toString("base64");
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const feedRes = await fetch(`${BASE_URL}/feed.json`, {
      headers: { Authorization: getAuthHeader() },
      cache: "no-store",
    });
    if (!feedRes.ok) throw new Error(`Feed fetch failed: ${feedRes.status}`);
    const feed = await feedRes.json();

    const reportContents: Record<string, string> = {};
    for (const [key, filename] of Object.entries(feed.reports as Record<string, string>)) {
      const res = await fetch(`${BASE_URL}/${filename}`, {
        headers: { Authorization: getAuthHeader() },
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Report ${filename} fetch failed: ${res.status}`);
      reportContents[key] = await res.text();
    }

    await prisma.$transaction([
      prisma.legalAlertEdition.updateMany({
        where: { isCurrent: true },
        data: { isCurrent: false },
      }),
      prisma.legalAlertEdition.create({
        data: {
          generatedAt: new Date(feed.generatedAt),
          period: feed.period,
          runDay: feed.runDay,
          stats: feed.stats,
          reports: reportContents,
          feedJson: JSON.parse(JSON.stringify(feed)),
          isCurrent: true,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      generatedAt: feed.generatedAt,
      reports: Object.keys(reportContents),
    });
  } catch (error) {
    console.error("Cron legal-alerts failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

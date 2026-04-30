import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const base = process.env.NEXTAUTH_URL || "https://www.clever.legal";

  if (!token) {
    return NextResponse.redirect(`${base}/legal-alerts`);
  }

  try {
    await prisma.alertSubscriber.delete({ where: { token } });
  } catch {
    // token not found — already unsubscribed
  }

  return NextResponse.redirect(`${base}/legal-alerts?unsubscribed=1`);
}

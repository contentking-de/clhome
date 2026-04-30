import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return redirectToResult("missing");
  }

  const subscriber = await prisma.alertSubscriber.findUnique({
    where: { token },
  });

  if (!subscriber) {
    return redirectToResult("invalid");
  }

  if (subscriber.confirmedAt) {
    return redirectToResult("already");
  }

  await prisma.alertSubscriber.update({
    where: { token },
    data: { confirmedAt: new Date() },
  });

  return redirectToResult("success");
}

function redirectToResult(status: string) {
  const base = process.env.NEXTAUTH_URL || "https://www.clever.legal";
  return NextResponse.redirect(`${base}/legal-alerts/alert-bestaetigt?status=${status}`);
}

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Name und E-Mail sind Pflichtfelder." },
        { status: 400 },
      );
    }

    const emailNorm = email.trim().toLowerCase();

    const existing = await prisma.alertSubscriber.findUnique({
      where: { email: emailNorm },
    });

    if (existing?.confirmedAt) {
      return NextResponse.json({ alreadyConfirmed: true });
    }

    const subscriber = existing
      ? await prisma.alertSubscriber.update({
          where: { email: emailNorm },
          data: { name: name.trim(), token: crypto.randomUUID() },
        })
      : await prisma.alertSubscriber.create({
          data: {
            name: name.trim(),
            email: emailNorm,
            token: crypto.randomUUID(),
          },
        });

    const baseUrl = process.env.NEXTAUTH_URL || "https://clever.legal";
    const confirmUrl = `${baseUrl}/api/alerts/confirm?token=${subscriber.token}`;

    await resend.emails.send({
      from: process.env.EMAIL_FROM || "clever.legal <noreply@clever.legal>",
      to: emailNorm,
      subject: "Legal Alert bestätigen — clever.legal",
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 520px; margin: 0 auto; color: #1a1a1a;">
          <p>Hallo ${subscriber.name},</p>
          <p>Sie haben sich für die <strong>Legal Alerts</strong> von clever.legal angemeldet.
             Bitte bestätigen Sie Ihre E-Mail-Adresse:</p>
          <p style="margin: 32px 0;">
            <a href="${confirmUrl}"
               style="display: inline-block; padding: 14px 28px; background: #1a1a1a; color: #c8ff00; font-weight: 600; text-decoration: none; letter-spacing: 0.02em;">
              E-Mail bestätigen →
            </a>
          </p>
          <p style="font-size: 13px; color: #666;">
            Falls Sie diese Anmeldung nicht angefordert haben, können Sie diese E-Mail ignorieren.
          </p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 32px 0 16px;" />
          <p style="font-size: 11px; color: #999;">clever.legal GmbH · Legal Alerts</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Alert subscribe error:", error);
    return NextResponse.json(
      { error: "Anmeldung fehlgeschlagen." },
      { status: 500 },
    );
  }
}

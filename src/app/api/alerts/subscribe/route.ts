import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import {
  subscribeSchema,
  escapeHtml,
  isBot,
  rateLimit,
  getClientIp,
} from "@/lib/validation";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export async function POST(request: Request) {
  try {
    const raw = await request.json();

    const parsed = subscribeSchema.safeParse(raw);
    if (!parsed.success) {
      const first = parsed.error.issues[0]?.message ?? "Ungültige Eingabe.";
      return NextResponse.json({ error: first }, { status: 400 });
    }

    const { name, email, _hp } = parsed.data;

    if (isBot(_hp)) {
      return NextResponse.json({ success: true });
    }

    const ip = getClientIp(request);
    if (!rateLimit(`subscribe:${ip}`, { maxRequests: 3, windowMs: 60_000 })) {
      return NextResponse.json(
        { error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." },
        { status: 429 },
      );
    }

    const existing = await prisma.alertSubscriber.findUnique({
      where: { email },
    });

    if (existing?.confirmedAt) {
      return NextResponse.json({ alreadyConfirmed: true });
    }

    const subscriber = existing
      ? await prisma.alertSubscriber.update({
          where: { email },
          data: { name, token: crypto.randomUUID() },
        })
      : await prisma.alertSubscriber.create({
          data: { name, email, token: crypto.randomUUID() },
        });

    const baseUrl = process.env.NEXTAUTH_URL || "https://www.clever.legal";
    const confirmUrl = `${baseUrl}/api/alerts/confirm?token=${subscriber.token}`;
    const safeName = escapeHtml(subscriber.name);

    await resend.emails.send({
      from: process.env.EMAIL_FROM || "clever.legal <noreply@clever.legal>",
      to: email,
      subject: "Legal Alert bestätigen — clever.legal",
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 520px; margin: 0 auto; color: #1a1a1a;">
          <p>Hallo ${safeName},</p>
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

import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import type { EditionView } from "@/lib/skynet";
import { escapeHtml } from "@/lib/validation";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export async function notifySubscribers(edition: EditionView) {
  const subscribers = await prisma.alertSubscriber.findMany({
    where: { confirmedAt: { not: null } },
  });

  if (subscribers.length === 0) return 0;

  const baseUrl = process.env.NEXTAUTH_URL || "https://clever.legal";
  const date = new Date(edition.generatedAt).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  let sent = 0;

  for (const sub of subscribers) {
    try {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || "clever.legal <noreply@clever.legal>",
        to: sub.email,
        subject: `Neue Legal Alerts vom ${date}`,
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 520px; margin: 0 auto; color: #1a1a1a;">
            <p>Hallo ${escapeHtml(sub.name)},</p>
            <p>es gibt neue <strong>Legal Alerts</strong> — Zeitraum: ${edition.period}.</p>
            <p style="margin: 24px 0;">
              <a href="${baseUrl}/legal-alerts/fruehwarnung"
                 style="display: inline-block; padding: 14px 28px; background: #1a1a1a; color: #c8ff00; font-weight: 600; text-decoration: none; letter-spacing: 0.02em;">
                Frühwarnung ansehen →
              </a>
            </p>
            <p style="margin: 12px 0;">
              <a href="${baseUrl}/legal-alerts/hot-topics"
                 style="display: inline-block; padding: 14px 28px; border: 1px solid #1a1a1a; color: #1a1a1a; font-weight: 600; text-decoration: none; letter-spacing: 0.02em;">
                Hot Topics ansehen →
              </a>
            </p>
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 32px 0 16px;" />
            <p style="font-size: 11px; color: #999;">
              clever.legal GmbH · Legal Alerts<br/>
              <a href="${baseUrl}/api/alerts/unsubscribe?token=${sub.token}" style="color: #999;">Abmelden</a>
            </p>
          </div>
        `,
      });
      sent++;
    } catch (error) {
      console.error(`Failed to notify ${sub.email}:`, error);
    }
  }

  return sent;
}

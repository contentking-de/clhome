import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import {
  contactSchema,
  isBot,
  rateLimit,
  getClientIp,
} from "@/lib/validation";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export async function POST(request: Request) {
  try {
    const raw = await request.json();

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const first = parsed.error.issues[0]?.message ?? "Ungültige Eingabe.";
      return NextResponse.json({ error: first }, { status: 400 });
    }

    const { name, kanzlei, email, gebiet, service, msg, _hp } = parsed.data;

    if (isBot(_hp)) {
      return NextResponse.json({ success: true, id: "ok" });
    }

    const ip = getClientIp(request);
    if (!rateLimit(`contact:${ip}`, { maxRequests: 5, windowMs: 60_000 })) {
      return NextResponse.json(
        { error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." },
        { status: 429 },
      );
    }

    const [lead] = await Promise.all([
      prisma.lead.create({
        data: {
          name,
          kanzlei: kanzlei || null,
          email,
          gebiet: gebiet || null,
          service: service || null,
          message: msg,
        },
      }),
      resend.emails.send({
        from: process.env.EMAIL_FROM || "clever.legal <noreply@clever.legal>",
        to: "kontakt@clever.legal",
        replyTo: email,
        subject: `Kontaktanfrage von ${name}${kanzlei ? ` (${kanzlei})` : ""}`,
        text: [
          `Name: ${name}`,
          `Kanzlei: ${kanzlei || "–"}`,
          `E-Mail: ${email}`,
          `Rechtsgebiet / Region: ${gebiet || "–"}`,
          `Interesse an: ${service || "–"}`,
          "",
          "Nachricht:",
          msg,
        ].join("\n"),
      }),
    ]);

    return NextResponse.json({ success: true, id: lead.id });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Nachricht konnte nicht gesendet werden." },
      { status: 500 },
    );
  }
}

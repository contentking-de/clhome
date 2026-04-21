import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

interface ContactBody {
  name: string;
  kanzlei: string;
  email: string;
  gebiet: string;
  msg: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactBody = await request.json();

    if (!body.name || !body.email || !body.msg) {
      return NextResponse.json(
        { error: "Name, E-Mail und Nachricht sind Pflichtfelder." },
        { status: 400 }
      );
    }

    const [lead] = await Promise.all([
      prisma.lead.create({
        data: {
          name: body.name,
          kanzlei: body.kanzlei || null,
          email: body.email,
          gebiet: body.gebiet || null,
          message: body.msg,
        },
      }),
      resend.emails.send({
        from: process.env.EMAIL_FROM || "clever.legal <noreply@clever.legal>",
        to: "kontakt@clever.legal",
        replyTo: body.email,
        subject: `Kontaktanfrage von ${body.name}${body.kanzlei ? ` (${body.kanzlei})` : ""}`,
        text: [
          `Name: ${body.name}`,
          `Kanzlei: ${body.kanzlei || "–"}`,
          `E-Mail: ${body.email}`,
          `Rechtsgebiet / Region: ${body.gebiet || "–"}`,
          "",
          "Nachricht:",
          body.msg,
        ].join("\n"),
      }),
    ]);

    return NextResponse.json({ success: true, id: lead.id });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Nachricht konnte nicht gesendet werden." },
      { status: 500 }
    );
  }
}

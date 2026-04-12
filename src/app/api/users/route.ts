import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (currentUser?.role !== "ADMIN") {
    return NextResponse.json({ error: "Keine Berechtigung" }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      bio: true,
      jobTitle: true,
      avatar: true,
      emailVerified: true,
      createdAt: true,
      _count: { select: { posts: true } },
    },
  });

  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (currentUser?.role !== "ADMIN") {
    return NextResponse.json({ error: "Keine Berechtigung" }, { status: 403 });
  }

  const body = await req.json();
  const { email, role, name } = body;

  if (!email) {
    return NextResponse.json(
      { error: "E-Mail-Adresse ist erforderlich." },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "Ein Nutzer mit dieser E-Mail existiert bereits." },
      { status: 409 }
    );
  }

  const user = await prisma.user.create({
    data: {
      email,
      name: name || null,
      role: role === "ADMIN" ? "ADMIN" : "EDITOR",
    },
  });

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "clever.legal <noreply@clever.legal>",
      to: email,
      subject: "Einladung zu clever.legal",
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="color: #1a1a1a; margin-bottom: 16px;">Sie wurden eingeladen</h2>
          <p style="color: #555; line-height: 1.6;">
            ${currentUser!.name || currentUser!.email} hat Sie als <strong>${role === "ADMIN" ? "Administrator" : "Redakteur"}</strong> zu clever.legal eingeladen.
          </p>
          <p style="color: #555; line-height: 1.6;">
            Melden Sie sich an, um loszulegen:
          </p>
          <a href="${process.env.NEXTAUTH_URL}/admin/login"
             style="display: inline-block; background: #4f46e5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 8px;">
            Zum Admin-Bereich
          </a>
          <p style="color: #999; font-size: 13px; margin-top: 24px;">
            Verwenden Sie die E-Mail-Adresse <strong>${email}</strong> zur Anmeldung.
          </p>
        </div>
      `,
    });
  } catch {
    // User was created but email failed – not a blocking error
  }

  return NextResponse.json(user, { status: 201 });
}

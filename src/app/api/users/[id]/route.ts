import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const { id } = await params;
  const body = await req.json();
  const { role, name, bio, bioEn, jobTitle, jobTitleEn, avatar } = body;

  if (role && id === session.user.id) {
    return NextResponse.json(
      { error: "Sie können Ihre eigene Rolle nicht ändern." },
      { status: 400 }
    );
  }

  const data: Record<string, unknown> = {};
  if (role) data.role = role === "ADMIN" ? "ADMIN" : "EDITOR";
  if (name !== undefined) data.name = name || null;
  if (bio !== undefined) data.bio = bio || null;
  if (bioEn !== undefined) data.bioEn = bioEn || null;
  if (jobTitle !== undefined) data.jobTitle = jobTitle || null;
  if (jobTitleEn !== undefined) data.jobTitleEn = jobTitleEn || null;
  if (avatar !== undefined) data.avatar = avatar || null;

  const user = await prisma.user.update({ where: { id }, data });

  return NextResponse.json(user);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const { id } = await params;

  if (id === session.user.id) {
    return NextResponse.json(
      { error: "Sie können sich nicht selbst löschen." },
      { status: 400 }
    );
  }

  await prisma.user.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}

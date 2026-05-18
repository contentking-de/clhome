import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { del } from "@vercel/blob";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    const file = await prisma.mediaFile.findUnique({
      where: { id },
      include: {
        uploadedBy: { select: { id: true, name: true, email: true, avatar: true } },
        folder: true,
      },
    });

    if (!file) return NextResponse.json({ error: "File not found" }, { status: 404 });

    return NextResponse.json(file);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch file" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const { name, folderId } = body;

    const file = await prisma.mediaFile.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(folderId !== undefined && { folderId: folderId || null }),
      },
      include: {
        uploadedBy: { select: { id: true, name: true, email: true, avatar: true } },
      },
    });

    return NextResponse.json(file);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update file" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    const file = await prisma.mediaFile.findUnique({ where: { id } });
    if (!file) return NextResponse.json({ error: "File not found" }, { status: 404 });

    await del(file.url);
    await prisma.mediaFile.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
  }
}

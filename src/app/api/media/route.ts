import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { put } from "@vercel/blob";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const folderId = searchParams.get("folderId");

    const files = await prisma.mediaFile.findMany({
      where: {
        folderId: folderId ?? null,
      },
      include: {
        uploadedBy: { select: { id: true, name: true, email: true, avatar: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(files);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch media files" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folderId = formData.get("folderId") as string | null;

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const blob = await put(file.name, file, { access: "public" });

    const mediaFile = await prisma.mediaFile.create({
      data: {
        name: file.name,
        url: blob.url,
        size: file.size,
        contentType: file.type,
        folderId: folderId || null,
        uploadedById: session.user.id,
      },
      include: {
        uploadedBy: { select: { id: true, name: true, email: true, avatar: true } },
      },
    });

    return NextResponse.json(mediaFile, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { del } from "@vercel/blob";

async function deleteFolderBlobs(folderId: string) {
  const files = await prisma.mediaFile.findMany({
    where: { folderId },
    select: { url: true },
  });

  for (const file of files) {
    await del(file.url);
  }

  const children = await prisma.mediaFolder.findMany({
    where: { parentId: folderId },
    select: { id: true },
  });

  for (const child of children) {
    await deleteFolderBlobs(child.id);
  }
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    const folder = await prisma.mediaFolder.findUnique({
      where: { id },
      include: {
        children: {
          include: { _count: { select: { files: true, children: true } } },
          orderBy: { order: "asc" },
        },
        files: {
          include: {
            uploadedBy: { select: { id: true, name: true, email: true, avatar: true } },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!folder) return NextResponse.json({ error: "Folder not found" }, { status: 404 });

    return NextResponse.json(folder);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch folder" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const { name, parentId, order } = body;

    const folder = await prisma.mediaFolder.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(parentId !== undefined && { parentId: parentId || null }),
        ...(order !== undefined && { order }),
      },
      include: {
        _count: { select: { files: true, children: true } },
      },
    });

    return NextResponse.json(folder);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update folder" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    const folder = await prisma.mediaFolder.findUnique({ where: { id } });
    if (!folder) return NextResponse.json({ error: "Folder not found" }, { status: 404 });

    await deleteFolderBlobs(id);
    await prisma.mediaFolder.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete folder" }, { status: 500 });
  }
}

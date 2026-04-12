import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: { select: { name: true, email: true } } },
  });

  if (!post) {
    return NextResponse.json(
      { error: "Beitrag nicht gefunden." },
      { status: 404 }
    );
  }

  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { title, slug, excerpt, content, coverImage, published } = body;

  if (!title || !slug || !content) {
    return NextResponse.json(
      { error: "Titel, Slug und Inhalt sind Pflichtfelder." },
      { status: 400 }
    );
  }

  const existing = await prisma.post.findUnique({ where: { slug } });
  if (existing && existing.id !== id) {
    return NextResponse.json(
      { error: "Ein anderer Beitrag mit diesem Slug existiert bereits." },
      { status: 409 }
    );
  }

  const post = await prisma.post.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      coverImage: coverImage || null,
      published: published ?? false,
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const { id } = await params;

  await prisma.post.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}

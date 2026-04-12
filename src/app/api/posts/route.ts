import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true, email: true } } },
  });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const body = await req.json();
  const { title, slug, excerpt, content, coverImage, published } = body;

  if (!title || !slug || !content) {
    return NextResponse.json(
      { error: "Titel, Slug und Inhalt sind Pflichtfelder." },
      { status: 400 }
    );
  }

  const existing = await prisma.post.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json(
      { error: "Ein Beitrag mit diesem Slug existiert bereits." },
      { status: 409 }
    );
  }

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      coverImage: coverImage || null,
      published: published || false,
      authorId: session.user.id,
    },
  });

  return NextResponse.json(post, { status: 201 });
}

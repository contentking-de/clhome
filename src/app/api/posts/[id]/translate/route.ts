import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const { id } = await params;

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) {
    return NextResponse.json(
      { error: "Beitrag nicht gefunden." },
      { status: 404 }
    );
  }

  if (post.locale !== "de") {
    return NextResponse.json(
      { error: "Nur deutsche Beiträge können übersetzt werden." },
      { status: 400 }
    );
  }

  const existingTranslation = await prisma.post.findFirst({
    where: { translationOfId: id, locale: "en" },
  });
  if (existingTranslation) {
    return NextResponse.json(
      {
        error: "Übersetzung existiert bereits.",
        translationId: existingTranslation.id,
      },
      { status: 409 }
    );
  }

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 8000,
    messages: [
      {
        role: "user",
        content: `Translate the following German blog post into English. Keep the same HTML structure, formatting, and tone. The translation should be natural and professional, not literal. Return ONLY a JSON object with exactly these keys: "title", "excerpt", "content". The "content" value must be the translated HTML.

Title: ${post.title}
Excerpt: ${post.excerpt || ""}
Content (HTML):
${post.content}`,
      },
    ],
  });

  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    return NextResponse.json(
      { error: "Keine Antwort vom AI-Service erhalten." },
      { status: 500 }
    );
  }

  let translated: { title: string; excerpt: string; content: string };
  try {
    const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found");
    translated = JSON.parse(jsonMatch[0]);
  } catch {
    return NextResponse.json(
      { error: "AI-Antwort konnte nicht verarbeitet werden." },
      { status: 500 }
    );
  }

  let enSlug = slugify(translated.title);
  const slugExists = await prisma.post.findUnique({
    where: { slug: enSlug },
  });
  if (slugExists) {
    enSlug = `${enSlug}-en`;
  }

  const newPost = await prisma.post.create({
    data: {
      title: translated.title,
      slug: enSlug,
      excerpt: translated.excerpt || null,
      content: translated.content,
      coverImage: post.coverImage,
      published: false,
      authorId: post.authorId,
      locale: "en",
      translationOfId: id,
    },
  });

  return NextResponse.json({ id: newPost.id, slug: newPost.slug }, { status: 201 });
}

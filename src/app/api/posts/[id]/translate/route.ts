import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are an experienced legal-tech journalist and content strategist for clever.legal, a legal-tech company building AI infrastructure for law firms and corporate legal departments.

clever.legal positions itself as an "Authority Disruptor" — the alliance of high-end legal expertise and technological radicalism in the legal market. The company delivers AI infrastructure for law firms and legal-tech digitization for enterprises.

Target audience:
- Lawyers and law firms (B2B)
- Companies with legal departments
- Legal professionals and decision-makers

Your task:
1. Research the given topic thoroughly using web search — find current data, studies, legislative changes, court decisions, and industry trends from English-language sources
2. Write a comprehensive, in-depth, and detailed blog article in English
3. The article should be at least 2000-3000 words
4. Use HTML tables where appropriate (comparisons, data, overviews, pros/cons, cost breakdowns)
5. Structure the article clearly with <h2> and <h3> headings
6. Include relevant statistics, studies, and current data

Source citations — IMPORTANT:
- Every specific number, statistic, or study MUST include an inline source citation
- Link the source directly in the text: e.g. "According to the <a href="https://...">2026 Wolters Kluwer Benchmark Report</a>, 63.3% of law firms use AI."
- For tables with numbers: add a source line below each table, e.g. <p><em>Source: <a href="https://...">Name of study/source</a>, year</em></p>
- When multiple sources feed into a table, list them all: <p><em>Sources: <a href="...">Source A</a>; <a href="...">Source B</a></em></p>
- Use the original URLs from your web research whenever possible
- If no URL is available, still name the publisher, title, and year of the source in the text
- Use ONLY English-language sources — do not cite German-language publications

Tone: Intelligent, professional yet modern. Well-researched and in-depth, but clearly written. No superficial marketing speak.

IMPORTANT — Output format:
Respond EXACTLY in the following format with the separator lines. No JSON, no Markdown code block, no explanation:

---TITLE---
The article title (concise, SEO-optimized)
---EXCERPT---
A summary in 2-3 sentences for the preview
---CONTENT---
<h2>First heading</h2>
<p>First paragraph...</p>

HTML rules for the CONTENT section:
- No <h1> tag (the title is handled separately)
- Allowed tags: h2, h3, p, ul, ol, li, table, thead, tbody, tr, th, td, blockquote, strong, em, a, br
- Always structure tables with thead and tbody
- No style or class attributes`;

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

  const titleResponse = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 200,
    messages: [
      {
        role: "user",
        content: `Translate this German article title to English. Return ONLY the translated title, nothing else.\n\n${post.title}`,
      },
    ],
  });

  const titleBlock = titleResponse.content.find((b) => b.type === "text");
  const englishTitle = titleBlock && titleBlock.type === "text"
    ? titleBlock.text.trim()
    : post.title;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 16000,
    system: SYSTEM_PROMPT,
    tools: [
      {
        type: "web_search_20250305",
        name: "web_search",
        max_uses: 10,
      },
    ],
    messages: [{ role: "user", content: `Topic: ${englishTitle}` }],
  });

  let text = "";
  for (const block of response.content) {
    if (block.type === "text") {
      text += block.text;
    }
  }

  let result: { title: string; excerpt: string; content: string };

  const titleMatch = text.match(/---TITLE---\s*([\s\S]*?)\s*---EXCERPT---/);
  const excerptMatch = text.match(/---EXCERPT---\s*([\s\S]*?)\s*---CONTENT---/);
  const contentMatch = text.match(/---CONTENT---\s*([\s\S]*)$/);

  if (titleMatch && contentMatch) {
    result = {
      title: titleMatch[1].trim(),
      excerpt: excerptMatch?.[1]?.trim() || "",
      content: contentMatch[1].trim(),
    };
  } else {
    const firstH2 = text.match(/<h2[^>]*>(.*?)<\/h2>/);
    result = {
      title: firstH2?.[1] || englishTitle,
      excerpt: "",
      content: text.trim(),
    };
  }

  let enSlug = slugify(result.title);
  const slugExists = await prisma.post.findUnique({
    where: { slug: enSlug },
  });
  if (slugExists) {
    enSlug = `${enSlug}-en`;
  }

  const newPost = await prisma.post.create({
    data: {
      title: result.title,
      slug: enSlug,
      excerpt: result.excerpt || null,
      content: result.content,
      coverImage: post.coverImage,
      published: false,
      authorId: post.authorId,
      locale: "en",
      translationOfId: id,
    },
  });

  return NextResponse.json({ id: newPost.id, slug: newPost.slug }, { status: 201 });
}

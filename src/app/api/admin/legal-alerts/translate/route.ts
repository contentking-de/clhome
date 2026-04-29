import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const { editionId } = await req.json();
  if (!editionId) {
    return NextResponse.json({ error: "editionId fehlt" }, { status: 400 });
  }

  const edition = await prisma.legalAlertEdition.findUnique({
    where: { id: editionId },
  });
  if (!edition) {
    return NextResponse.json({ error: "Ausgabe nicht gefunden" }, { status: 404 });
  }

  if (edition.reportsEn) {
    return NextResponse.json({ error: "Englische Übersetzung existiert bereits" }, { status: 409 });
  }

  const reports = edition.reports as Record<string, string>;
  const translatedReports: Record<string, string> = {};

  for (const [key, content] of Object.entries(reports)) {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8000,
      messages: [
        {
          role: "user",
          content: `Translate the following German legal report into English. Keep the same markdown/HTML structure, formatting, and professional legal tone. The translation should be natural and suitable for an international legal audience. Return ONLY the translated text, no additional commentary.

${content}`,
        },
      ],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    if (textBlock && textBlock.type === "text") {
      translatedReports[key] = textBlock.text;
    }
  }

  await prisma.legalAlertEdition.update({
    where: { id: editionId },
    data: { reportsEn: translatedReports },
  });

  return NextResponse.json({ ok: true, keys: Object.keys(translatedReports) });
}

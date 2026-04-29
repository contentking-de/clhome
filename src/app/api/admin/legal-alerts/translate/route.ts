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
    include: { items: true },
  });
  if (!edition) {
    return NextResponse.json({ error: "Ausgabe nicht gefunden" }, { status: 404 });
  }

  const needReports = !edition.reportsEn;
  const untranslatedItems = edition.items.filter((item) => !item.summaryEn);
  const needItems = untranslatedItems.length > 0;

  if (!needReports && !needItems) {
    return NextResponse.json({ error: "Alles bereits übersetzt" }, { status: 409 });
  }

  const translatedReportKeys: string[] = [];

  if (needReports) {
    const reports = edition.reports as Record<string, string>;
    const translatedReports: Record<string, string> = {};

    for (const [key, content] of Object.entries(reports)) {
      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 8000,
        messages: [
          {
            role: "user",
            content: `Translate the following German legal report into English. Keep the same markdown/HTML structure, formatting, and professional legal tone. The translation should be natural and suitable for an international legal audience. Return ONLY the translated text, no additional commentary.\n\n${content}`,
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
    translatedReportKeys.push(...Object.keys(translatedReports));
  }

  let translatedItemCount = 0;

  if (needItems) {
    const BATCH_SIZE = 15;
    for (let i = 0; i < untranslatedItems.length; i += BATCH_SIZE) {
      const batch = untranslatedItems.slice(i, i + BATCH_SIZE);

      const summariesBlock = batch
        .map((item, idx) => `[${idx}] ${item.summary}`)
        .join("\n\n");

      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 8000,
        messages: [
          {
            role: "user",
            content: `Translate each of the following numbered German legal alert summaries into English. Keep the professional legal tone and factual accuracy. Return ONLY the translations in the same numbered format [0], [1], etc. — one translation per numbered block, no extra commentary.\n\n${summariesBlock}`,
          },
        ],
      });

      const textBlock = message.content.find((b) => b.type === "text");
      if (textBlock && textBlock.type === "text") {
        const translations = parseNumberedTranslations(textBlock.text, batch.length);

        for (let j = 0; j < batch.length; j++) {
          if (translations[j]) {
            await prisma.legalAlertItem.update({
              where: { id: batch[j].id },
              data: { summaryEn: translations[j] },
            });
            translatedItemCount++;
          }
        }
      }
    }
  }

  return NextResponse.json({
    ok: true,
    reports: translatedReportKeys,
    items: translatedItemCount,
  });
}

function parseNumberedTranslations(text: string, expectedCount: number): Record<number, string> {
  const result: Record<number, string> = {};
  const regex = /\[(\d+)\]\s*/g;
  const matches: { index: number; num: number }[] = [];

  let match;
  while ((match = regex.exec(text)) !== null) {
    matches.push({ index: match.index + match[0].length, num: parseInt(match[1]) });
  }

  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index;
    const end = i + 1 < matches.length ? text.lastIndexOf("[", matches[i + 1].index) : text.length;
    const content = text.slice(start, end).trim();
    if (content && matches[i].num < expectedCount) {
      result[matches[i].num] = content;
    }
  }

  return result;
}

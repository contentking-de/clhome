import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@/lib/auth";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  let body: { current?: string[] } = {};
  try {
    body = await req.json();
  } catch {
    // no body is fine
  }

  const currentTopics = body.current ?? [];
  const avoidClause =
    currentTopics.length > 0
      ? `\n\nVermeide diese bereits vorhandenen Themen:\n${currentTopics.map((t) => `- ${t}`).join("\n")}`
      : "";

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      tools: [
        {
          type: "web_search_20250305",
          name: "web_search",
          max_uses: 5,
        },
      ],
      messages: [
        {
          role: "user",
          content: `Du bist Content-Stratege für clever.legal, ein Legal-Tech-Unternehmen im deutschsprachigen Raum.

Recherchiere aktuelle Legal-Tech-Trends, Gesetzesänderungen und relevante Themen und generiere genau 6 frische, konkrete Blog-Artikel-Titel auf Deutsch.

Anforderungen:
- Jeder Titel soll ein konkretes, aktuelles Thema aufgreifen
- Mix aus: Legal Tech, KI & Recht, Digitalisierung, aktuelle Gesetzgebung, Praxis-Tipps
- Titel sollen prägnant und klickstark sein (max. 80 Zeichen)
- Zielgruppe: Anwälte, Kanzleien, Rechtsabteilungen${avoidClause}

Antworte NUR mit den 6 Titeln, einer pro Zeile. Keine Nummerierung, keine Erklärung, kein anderer Text.`,
        },
      ],
    });

    let text = "";
    for (const block of response.content) {
      if (block.type === "text") {
        text += block.text;
      }
    }

    const suggestions = text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 10 && l.length < 120);

    return Response.json({ suggestions: suggestions.slice(0, 6) });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unbekannter Fehler";
    return Response.json({ error: message }, { status: 500 });
  }
}

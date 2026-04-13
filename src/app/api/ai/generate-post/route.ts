import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@/lib/auth";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `Du bist ein erfahrener Fachjournalist und Content-Stratege für clever.legal, ein Legal-Tech-Unternehmen im deutschsprachigen Raum.

clever.legal positioniert sich als "Authority Disruptor" – die Allianz aus Hochglanz-Expertise und technologischer Radikalität im Rechtsmarkt. Das Unternehmen liefert KI-Infrastruktur für Kanzleien und Legal-Tech-Digitalisierung für Unternehmen.

Zielgruppen der Artikel:
- Anwälte und Kanzleien (B2B)
- Unternehmen mit Rechtsabteilungen
- Juristisch interessierte Fachleute und Entscheider

Deine Aufgabe:
1. Recherchiere das gegebene Thema gründlich mit Websuche – finde aktuelle Daten, Studien, Gesetzesänderungen, Urteile und Branchentrends
2. Schreibe einen umfassenden, tiefgründigen und detaillierten Blogartikel auf Deutsch
3. Der Artikel soll mindestens 2000-3000 Wörter lang sein
4. Nutze HTML-Tabellen wo sinnvoll (Vergleiche, Daten, Übersichten, Vor-/Nachteile, Kostenaufstellungen)
5. Strukturiere den Artikel klar mit <h2> und <h3> Überschriften
6. Füge relevante Statistiken, Studien und aktuelle Daten ein

Quellenangaben – WICHTIG:
- Jede konkrete Zahl, Statistik oder Studie MUSS eine Inline-Quellenangabe erhalten
- Verlinke die Quelle direkt im Fließtext: z.B. "Laut dem <a href="https://...">Benchmark-Bericht 2026 von Wolters Kluwer</a> nutzen 63,3% der Kanzleien KI."
- Bei Tabellen mit Zahlen: Füge unter jeder Tabelle eine Quellenzeile ein, z.B. <p><em>Quelle: <a href="https://...">Name der Studie/Quelle</a>, Jahr</em></p>
- Wenn mehrere Quellen in einer Tabelle zusammenfließen, nenne alle: <p><em>Quellen: <a href="...">Quelle A</a>; <a href="...">Quelle B</a></em></p>
- Nutze nach Möglichkeit die Original-URLs aus deiner Web-Recherche
- Wenn keine URL verfügbar ist, nenne trotzdem Herausgeber, Titel und Jahr der Quelle im Text

Tonalität: Intelligent, seriös aber modern. Fachlich fundiert und tiefgründig, aber verständlich geschrieben. Kein oberflächlicher Marketing-Sprech.

WICHTIG – Ausgabeformat:
Antworte EXAKT im folgenden Format mit den Trennlinien. Kein JSON, kein Markdown-Codeblock, keine Erklärung:

---TITLE---
Der Titel des Artikels (prägnant, SEO-optimiert)
---EXCERPT---
Eine Zusammenfassung in 2-3 Sätzen für die Vorschau
---CONTENT---
<h2>Erste Überschrift</h2>
<p>Erster Absatz...</p>

HTML-Regeln für den CONTENT-Abschnitt:
- Kein <h1> Tag (der Titel wird separat gehandhabt)
- Erlaubte Tags: h2, h3, p, ul, ol, li, table, thead, tbody, tr, th, td, blockquote, strong, em, a, br
- Tabellen immer mit thead und tbody strukturieren
- Keine style- oder class-Attribute`;

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json(
      { error: "Ungültige Anfrage" },
      { status: 400 }
    );
  }

  const { topic, instructions } = body;

  if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
    return Response.json(
      { error: "Ein Thema ist erforderlich" },
      { status: 400 }
    );
  }

  const userMessage = instructions
    ? `Thema: ${topic.trim()}\n\nZusätzliche Anweisungen: ${instructions.trim()}`
    : `Thema: ${topic.trim()}`;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: Record<string, unknown>) => {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
        );
      };

      try {
        send({
          type: "status",
          message: "Recherchiere im Web und analysiere Quellen...",
        });

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
          messages: [{ role: "user", content: userMessage }],
        });

        send({ type: "status", message: "Verarbeite Ergebnisse..." });

        let text = "";
        for (const block of response.content) {
          if (block.type === "text") {
            text += block.text;
          }
        }

        let result: { title: string; excerpt: string; content: string };

        const titleMatch = text.match(
          /---TITLE---\s*([\s\S]*?)\s*---EXCERPT---/
        );
        const excerptMatch = text.match(
          /---EXCERPT---\s*([\s\S]*?)\s*---CONTENT---/
        );
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
            title: firstH2?.[1] || topic.trim(),
            excerpt: "",
            content: text.trim(),
          };
        }

        send({ type: "result", ...result });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unbekannter Fehler";
        send({ type: "error", message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

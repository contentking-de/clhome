import SubpageShell from "@/components/landing/SubpageShell";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowSvg } from "@/components/landing/Icons";

export const metadata: Metadata = {
  title: "Unsere Story | clever.legal",
  description:
    "Von Primaten zu Prozessen. Wie ein Spaziergang am Affenberg zur Geburt von clever.legal führte.",
};

const founders = [
  {
    name: "Marc Ellerbrock",
    role: "Massenklage-Stratege",
    code: "MEK",
    tag: "LEGAL",
    image:
      "https://suudphdtlchxrc5q.public.blob.vercel-storage.com/landing/expert-marc-ellerbrock.webp",
  },
  {
    name: "Nico Sacotte",
    role: "Content-Stratege",
    code: "NSA",
    tag: "CONTENT",
    image:
      "https://suudphdtlchxrc5q.public.blob.vercel-storage.com/landing/expert-nico-sacotte.webp",
  },
  {
    name: "Thorsten Loth",
    role: "Performance Marketing",
    code: "TLO",
    tag: "GROWTH",
    image:
      "https://suudphdtlchxrc5q.public.blob.vercel-storage.com/landing/expert-thorsten-loth.webp",
  },
  {
    name: "Christoph Ehrke",
    role: "IT-Architekt",
    code: "CEH",
    tag: "TECH",
    image:
      "https://suudphdtlchxrc5q.public.blob.vercel-storage.com/landing/expert-christoph-ehrke.webp",
  },
];

export default function StoryPage() {
  return (
    <SubpageShell>
      {/* Hero */}
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px 64px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>
            Unsere Geschichte
          </div>
          <h1
            className="display"
            style={{
              fontSize: "clamp(48px, 7vw, 120px)",
              fontWeight: 800,
              marginBottom: 24,
            }}
          >
            Von Primaten
            <br />
            <span style={{ color: "var(--accent)" }}>zu Prozessen.</span>
          </h1>
          <p
            style={{
              color: "var(--ink-2)",
              fontSize: 20,
              lineHeight: 1.55,
              maxWidth: 640,
            }}
          >
            Die meisten bahnbrechenden Ideen entstehen in verglasten
            Konferenzräumen. Unsere begann mit dem Versuch, genau das Gegenteil
            zu tun.
          </p>
        </div>
      </section>

      {/* Kapitel 1 */}
      <section style={{ borderBottom: "1px solid var(--line-2)", background: "var(--bg-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div
            className="l-grid-sh"
            style={{
              alignItems: "start",
            }}
          >
            <div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 16 }}>
                KAPITEL 01
              </div>
              <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 700, marginBottom: 32 }}>
                Der Digital Detox, der nach hinten losging.
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 24, color: "var(--ink-2)", fontSize: 17, lineHeight: 1.65 }}>
                <p>
                  Eigentlich wollten Nico und Thorsten abschalten. Kein Slack, kein LinkedIn,
                  keine Dashboards. Der Plan war simpel: Quality Time — Ein Spaziergang
                  mit den Familien im Wald am Affenberg, um zwischen Berberaffen den Kopf
                  frei zu bekommen.
                </p>
                <p>
                  Doch das Schicksal hatte andere Pläne. Statt der erhofften digitalen
                  Entgiftung kam die Erkenntnis wie ein Paukenschlag:
                </p>
              </div>
            </div>
            <div style={{ border: "1px solid var(--line-2)", padding: 36, background: "var(--bg-3)" }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 20 }}>
                AFFENBERG · 2024
              </div>
              <p className="display" style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.02em" }}>
                „Während wir uns hier über die Evolution der Primaten wundern,
                steckt das deutsche Rechtssystem noch in der analogen Kreidezeit
                fest."
              </p>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.1em", marginTop: 20 }}>
                — Nico &amp; Thorsten
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zwei Fragen */}
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 16 }}>
              DIE INITIALZÜNDUNG
            </div>
            <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700 }}>
              Zwei Fragen, die alles verändert haben.
            </h2>
          </div>
          <div className="l-grid-half" style={{ gap: 24, maxWidth: 900, margin: "0 auto" }}>
            <div style={{ border: "1px solid var(--line-2)", padding: 36, background: "var(--bg-2)" }}>
              <p style={{ fontSize: 18, color: "var(--ink)", fontWeight: 500, lineHeight: 1.45 }}>
                Warum dauert „Recht bekommen" in einer Welt der Echtzeit-Daten
                immer noch Monate?
              </p>
            </div>
            <div style={{ border: "1px solid var(--line-2)", padding: 36, background: "var(--bg-2)" }}>
              <p style={{ fontSize: 18, color: "var(--ink)", fontWeight: 500, lineHeight: 1.45 }}>
                Warum wälzen hochbezahlte Juristen stapelweise Akten, während KI
                bereits komplexe Muster in Sekunden erkennen kann?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kapitel 2 — Vertrauen */}
      <section style={{ borderBottom: "1px solid var(--line-2)", background: "var(--bg-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 16 }}>
            KAPITEL 02
          </div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 700, marginBottom: 48 }}>
            Vertrauen als Betriebssystem.
          </h2>

          <div className="l-grid-half" style={{ gap: 24 }}>
            <div style={{ border: "1px solid var(--line-2)", padding: 36, background: "var(--bg)" }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 16 }}>
                DIE NACHBARN — NICO &amp; MARC
              </div>
              <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55 }}>
                Nico holte Marc dazu. Die beiden sind Freunde, quasi Nachbarn und langjährige
                Weggefährten. Nico hatte das Projekt zockerhelden.de technisch umgesetzt und
                beim Gang zur „Höhle der Löwen" begleitet. Marc, der erfahrene Massenklage-Stratege,
                lieferte das juristische Gewissen.
              </p>
              <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
                {[founders[1], founders[0]].map((f) => (
                  <div
                    key={f.code}
                    style={{
                      width: 48,
                      height: 48,
                      overflow: "hidden",
                      border: "1px solid var(--line-2)",
                    }}
                  >
                    <img
                      src={f.image}
                      alt={f.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)" }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ border: "1px solid var(--line-2)", padding: 36, background: "var(--bg)" }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 16 }}>
                DIE TECH-PARTNER — THORSTEN &amp; CHRISTOPH
              </div>
              <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55 }}>
                Thorsten brachte Christoph an Bord. Die beiden führen seit Jahren als eingespieltes
                Team die Agenturen OMlocal und OMfire. Christoph ist der IT-Architekt, der nicht in
                Paragraphen, sondern in hochperformanter, skalierbarer Logik denkt.
              </p>
              <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
                {[founders[2], founders[3]].map((f) => (
                  <div
                    key={f.code}
                    style={{
                      width: 48,
                      height: 48,
                      overflow: "hidden",
                      border: "1px solid var(--line-2)",
                    }}
                  >
                    <img
                      src={f.image}
                      alt={f.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kapitel 3 — Kanzlei der Zukunft */}
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 16 }}>
            KAPITEL 03
          </div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 700, marginBottom: 32 }}>
            Die Kanzlei der Zukunft.
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 18, lineHeight: 1.55, maxWidth: 720, marginBottom: 48 }}>
            Heute kombinieren wir mit der clever.legal GmbH Marketing-Power, juristische Exzellenz
            und eine IT-Architektur, die auf jahrelanger gemeinsamer Erfahrung basiert.
          </p>

          <div className="l-grid-4 l-team-cards" style={{ gap: 0, border: "1px solid var(--line-2)" }}>
            {founders.map((f, i) => (
              <div key={f.code} style={{ padding: 24, borderRight: i < 3 ? "1px solid var(--line-2)" : "none", background: "var(--bg-2)", textAlign: "center" }}>
                <div style={{ width: 64, height: 64, overflow: "hidden", margin: "0 auto 16px", border: "1px solid var(--line-2)" }}>
                  <img src={f.image} alt={f.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)" }} />
                </div>
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 8 }}>#{f.tag}</div>
                <div className="display" style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{f.name}</div>
                <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.1em" }}>{f.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px", textAlign: "center" }}>
          <h2 className="display" style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 700, marginBottom: 16 }}>
            Wir verkaufen keine Software –{" "}
            <span style={{ color: "var(--accent)" }}>wir verkaufen den Marktvorsprung von morgen.</span>
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 18, marginBottom: 36 }}>
            Das System ist langsam. Wir sind es nicht.
          </p>
          <Link href="/kontakt" className="l-btn l-btn-primary">
            Strategie-Gespräch anfordern
            <ArrowSvg />
          </Link>
        </div>
      </section>
    </SubpageShell>
  );
}

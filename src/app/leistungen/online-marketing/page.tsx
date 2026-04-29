import SubpageShell from "@/components/landing/SubpageShell";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowSvg, IconMegaphone, IconTrend, IconTarget, IconCode } from "@/components/landing/Icons";

export const metadata: Metadata = {
  title: "Online-Marketing Services für Kanzleien | clever.legal",
  description:
    "SEO, Local SEO, SEA & Social Media für Kanzleien. Systematischer Aufbau digitaler Sichtbarkeit mit +340% mehr Reichweite und 6.2× ROI.",
};

const benefits = [
  {
    title: "Explosive Sichtbarkeit",
    metric: "+340%",
    metricLabel: "Sichtbarkeit",
    description:
      "Unsere Kanzlei-Partner verzeichnen im Durchschnitt eine Steigerung der organischen Sichtbarkeit um 340% innerhalb von 12 Monaten.",
  },
  {
    title: "Jeder Euro arbeitet",
    metric: "6.2×",
    metricLabel: "Ø ROI",
    description:
      "Datengetriebene Kampagnen mit klar definiertem ROI. Kein Budget-Verbrennen — jeder investierte Euro bringt nachweislich Mandate.",
  },
  {
    title: "Lokale Dominanz",
    metric: "Top 3",
    metricLabel: "Google Maps",
    description:
      "Local SEO sorgt dafür, dass Ihre Kanzlei in der Google-Map-Suche ganz oben steht — dort, wo Mandanten heute zuerst suchen.",
  },
];

const modules = [
  {
    Icon: IconTrend,
    tag: "SEO",
    title: "SEO & Local SEO",
    description:
      "Topplatzierungen in Google — lokal und überregional. Technische Optimierung, Content-Strategie und Local-SEO als Dreiklang für nachhaltige organische Reichweite.",
  },
  {
    Icon: IconTarget,
    tag: "SEA",
    title: "Google Ads (SEA)",
    description:
      "Performance-Kampagnen mit klar definiertem ROI und laufender Optimierung. Wir managen Ihre Budgets so, dass jeder Klick zählt.",
  },
  {
    Icon: IconMegaphone,
    tag: "SOCIAL",
    title: "Social Media",
    description:
      "Content-Strategien, die Ihre Expertise sichtbar machen und Mandanten anziehen. LinkedIn, Instagram und Co. — professionell bespielt.",
  },
  {
    Icon: IconCode,
    tag: "TECHSEO",
    title: "Technical Foundation",
    description:
      "Core Web Vitals, Schema Markup, Crawl-Optimierung — das technische Fundament, auf dem Ihre Sichtbarkeit steht. Unsichtbar für Mandanten, entscheidend für Google.",
  },
];

export default function OnlineMarketingPage() {
  return (
    <SubpageShell>
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px 64px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>SRV.04 — Online-Marketing</div>
          <h1 className="display" style={{ fontSize: "clamp(48px, 6vw, 100px)", fontWeight: 800, marginBottom: 24 }}>
            Sichtbarkeit ist{" "}
            <span style={{ color: "var(--accent)" }}>kein Zufall.</span>
          </h1>
          <p style={{ color: "var(--ink-2)", fontSize: 20, lineHeight: 1.55, maxWidth: 700, marginBottom: 36 }}>
            Wir bauen die digitale Präsenz Ihrer Kanzlei systematisch aus — mit organischer Reichweite,
            bezahltem Traffic und Social-Media-Strategien, die Autorität und Vertrauen aufbauen.
          </p>
          <Link href="/kontakt" className="l-btn l-btn-primary">
            Marketing-Audit anfordern
            <ArrowSvg />
          </Link>
        </div>
      </section>

      <section style={{ borderBottom: "1px solid var(--line-2)", background: "var(--bg-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>Ihre Vorteile</div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 700, marginBottom: 48 }}>
            Handwerk, nicht Hoffnung.
          </h2>
          <div className="l-grid-3 l-sat-cards" style={{ gap: 0, border: "1px solid var(--line-2)" }}>
            {benefits.map((b, i) => (
              <div key={b.title} style={{ padding: 36, borderRight: i < 2 ? "1px solid var(--line-2)" : "none" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 20 }}>
                  <span className="display" style={{ fontSize: 48, fontWeight: 800, color: "var(--accent)" }}>{b.metric}</span>
                  <span className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-3)" }}>{b.metricLabel}</span>
                </div>
                <h3 className="display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>{b.title}</h3>
                <p style={{ color: "var(--ink-2)", fontSize: 14, lineHeight: 1.55 }}>{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>Unsere Kanäle</div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 700, marginBottom: 16 }}>
            Vier Hebel. Volle Kontrolle.
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 18, maxWidth: 600, marginBottom: 48 }}>
            Jeder Kanal wird isoliert optimiert und im Zusammenspiel orchestriert — für maximale Wirkung.
          </p>
          <div className="l-grid-half l-modules" style={{ gap: 0, border: "1px solid var(--line-2)" }}>
            {modules.map((mod, i) => (
              <div
                key={mod.tag}
                style={{
                  padding: 36,
                  borderRight: i % 2 === 0 ? "1px solid var(--line-2)" : "none",
                  borderBottom: i < 2 ? "1px solid var(--line-2)" : "none",
                  background: i === 0 ? "var(--bg-3)" : "transparent",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <mod.Icon size={20} style={{ color: i === 0 ? "var(--accent)" : "var(--ink-3)" }} />
                  <span className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-3)" }}>#{mod.tag}</span>
                </div>
                <h3 className="display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>{mod.title}</h3>
                <p style={{ color: "var(--ink-2)", fontSize: 14, lineHeight: 1.55 }}>{mod.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px", textAlign: "center" }}>
          <h2 className="display" style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 700, marginBottom: 16 }}>
            Bereit, gefunden zu werden?
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 18, maxWidth: 600, margin: "0 auto 36px" }}>
            Starten Sie mit einem kostenlosen Marketing-Audit. Wir zeigen Ihnen, wo Ihre Kanzlei Sichtbarkeit verschenkt.
          </p>
          <Link href="/kontakt" className="l-btn l-btn-primary">
            Marketing-Audit anfordern
            <ArrowSvg />
          </Link>
        </div>
      </section>
    </SubpageShell>
  );
}

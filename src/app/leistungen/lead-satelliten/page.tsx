import SubpageShell from "@/components/landing/SubpageShell";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowSvg, IconSat, IconTarget, IconFilter, IconChart } from "@/components/landing/Icons";

export const metadata: Metadata = {
  title: "Lead-Satelliten für Kanzleien | clever.legal",
  description:
    "Hochkonvertierende Landingpages für jedes Rechtsgebiet. Vollautomatisierter Funnel vom Erstkontakt bis zur digitalen Vollmacht. CAC −62%.",
};

const benefits = [
  {
    title: "Akquise auf Autopilot",
    metric: "−62%",
    metricLabel: "CAC",
    description:
      "Performance-optimierte Kampagnen senken Ihren Cost-per-Acquisition um bis zu 62% unter den Marktdurchschnitt.",
  },
  {
    title: "Conversion-Maschine",
    metric: "8.4%",
    metricLabel: "Conv. Rate",
    description:
      "Während der Branchendurchschnitt bei unter 2% liegt, konvertieren unsere Satelliten mit über 8% — dank spezialisiertem Funnel-Design.",
  },
  {
    title: "Mandate, nicht Klicks",
    metric: "< 5",
    metricLabel: "Min. bis Mandat",
    description:
      "Vom Erstkontakt über die automatische Fallprüfung bis zur digitalen Vollmacht — in unter 5 Minuten.",
  },
];

const modules = [
  {
    Icon: IconSat,
    tag: "DOMAIN",
    title: "Spezialisierte Domains",
    description:
      "Für jedes Rechtsgebiet eine eigene Domain mit maximaler Sichtbarkeit. Diesel-Skandal, Fluggastrechte, Mietrecht — jeder Satellit spricht die Sprache seiner Zielgruppe.",
  },
  {
    Icon: IconFilter,
    tag: "FUNNEL",
    title: "Vollautomatisierter Funnel",
    description:
      "Vom ersten Klick über die Fallprüfung bis zur digitalen Vollmacht — alles automatisiert. Kein manuelles Nachfassen, keine verlorenen Leads.",
  },
  {
    Icon: IconTarget,
    tag: "TRAFFIC",
    title: "SEO + SEA Dual-Jagd",
    description:
      "Organische Reichweite für nachhaltiges Wachstum, bezahlter Traffic für sofortige Ergebnisse. Beide Kanäle orchestriert auf ein Ziel: qualifizierte Mandate.",
  },
  {
    Icon: IconChart,
    tag: "ANALYTICS",
    title: "Performance Dashboard",
    description:
      "Echtzeit-Transparenz über jeden Euro: Leads, Conversion, CAC, ROI. Sie wissen immer genau, was funktioniert — und wo optimiert wird.",
  },
];

export default function LeadSatellitenPage() {
  return (
    <SubpageShell>
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px 64px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>SRV.03 — Lead-Satelliten</div>
          <h1 className="display" style={{ fontSize: "clamp(48px, 6vw, 100px)", fontWeight: 800, marginBottom: 24 }}>
            Mandate.{" "}
            <span style={{ color: "var(--accent)" }}>Auf Autopilot.</span>
          </h1>
          <p style={{ color: "var(--ink-2)", fontSize: 20, lineHeight: 1.55, maxWidth: 700, marginBottom: 36 }}>
            Für jedes Rechtsgebiet eine eigene, hochkonvertierende Landingpage — Ihre „Satelliten".
            Spezialisiert, SEO-optimiert und mit automatisierten Funnels ausgestattet, die qualifizierte
            Mandate auf Autopilot liefern.
          </p>
          <Link href="/kontakt" className="l-btn l-btn-primary">
            Satelliten-Liste anfordern
            <ArrowSvg />
          </Link>
        </div>
      </section>

      <section style={{ borderBottom: "1px solid var(--line-2)", background: "var(--bg-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>Ihre Vorteile</div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 700, marginBottom: 48 }}>
            Industrialisierte Mandatsgewinnung.
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
          <div className="l-label" style={{ marginBottom: 18 }}>Das System</div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 700, marginBottom: 16 }}>
            Vier Bausteine. Ein Fließband.
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 18, maxWidth: 600, marginBottom: 48 }}>
            Jeder Satellit ist ein vollständiges Akquise-System — von der Domain bis zum Dashboard.
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
            Welche Satelliten passen zu Ihnen?
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 18, maxWidth: 600, margin: "0 auto 36px" }}>
            Fordern Sie unsere aktuelle Satelliten-Liste an und erfahren Sie, welche Rechtsgebiete in Ihrer Region noch verfügbar sind.
          </p>
          <Link href="/kontakt" className="l-btn l-btn-primary">
            Satelliten-Liste anfordern
            <ArrowSvg />
          </Link>
        </div>
      </section>
    </SubpageShell>
  );
}

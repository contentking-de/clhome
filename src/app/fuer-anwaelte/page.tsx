import SubpageShell from "@/components/landing/SubpageShell";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowSvg, IconCpu, IconShield, IconBolt, IconSat, IconDoc } from "@/components/landing/Icons";

export const metadata: Metadata = {
  title: "Für Anwälte | clever.legal",
  description:
    "Die KI-Infrastruktur für die Kanzlei der Zukunft. Prüfzeit um 90 % reduziert, Massenverfahren ohne Massenaufwand.",
};

const benefits = [
  {
    title: "Vom Sichten zum Entscheiden",
    metric: "−90 %",
    metricLabel: "Prüfzeit",
    description:
      "Unsere KI reduziert die Prüfzeit von Mandanten-Dokumenten um bis zu 90 %. Sie lesen keine PDFs mehr – Sie validieren nur noch Ergebnisse.",
  },
  {
    title: "Ende der Fleißarbeit",
    metric: "0",
    metricLabel: "Schriftsatz-Stunden",
    description:
      "Massenverfahren ohne Massenaufwand. Wir automatisieren den Schriftsatz-Wahnsinn, damit Sie sich auf die juristische Strategie konzentrieren können.",
  },
  {
    title: "Ready-to-File",
    metric: "< 5 Min",
    metricLabel: "bis zur Klage",
    description:
      "Vom Erstkontakt bis zur fertigen Klage in unter 5 Minuten. Skalieren Sie Ihre Kanzlei, ohne Ihr Team vergrößern zu müssen.",
  },
];

const engineModules = [
  {
    Icon: IconCpu,
    tag: "INTAKE",
    title: "Custom Intake AI",
    description:
      "Automatische Extraktion von Kerndaten. OCR-Erkennung eliminiert händisches Abtippen komplett.",
  },
  {
    Icon: IconDoc,
    tag: "DRAFTING",
    title: "Auto-Drafting Engine",
    description:
      "Generiert fertige Schriftsätze auf Basis bewährter Erfolgs-Templates. Individuell – aber in Sekunden.",
  },
  {
    Icon: IconBolt,
    tag: "SATELLITE",
    title: "Performance-Satelliten",
    description:
      "Spezialisierte Landingpages füllen Ihre Kapazität sofort mit qualifizierten Mandanten.",
  },
  {
    Icon: IconSat,
    tag: "WORKSHOP",
    title: "The Workshop",
    description:
      "48-Stunden-Vollintegration Ihres Teams. Wir gehen erst, wenn das System läuft.",
  },
];

export default function FuerAnwaeltePage() {
  return (
    <SubpageShell>
      {/* Hero */}
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px 64px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>Für Anwälte &amp; Kanzleien</div>
          <h1 className="display" style={{ fontSize: "clamp(48px, 6vw, 100px)", fontWeight: 800, marginBottom: 24 }}>
            Bauen Sie die Kanzlei,{" "}
            <span style={{ color: "var(--accent)" }}>die man nicht mehr ersetzen kann.</span>
          </h1>
          <p style={{ color: "var(--ink-2)", fontSize: 20, lineHeight: 1.55, maxWidth: 700, marginBottom: 36 }}>
            Keine Beratung. Keine Experimente. Wir installieren die KI-Infrastruktur, mit der Sie
            Massenverfahren skalieren, während Ihre Konkurrenz noch Akten sortiert.
          </p>
          <Link href="/kontakt" className="l-btn l-btn-primary">
            Strategie-Gespräch anfordern
            <ArrowSvg />
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ borderBottom: "1px solid var(--line-2)", background: "var(--bg-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>Ihre Vorteile</div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 700, marginBottom: 48 }}>
            Die Fokus-Garantie.
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

      {/* Engine Module */}
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>Die Engine</div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 700, marginBottom: 16 }}>
            Ihre Kanzlei auf Steroiden.
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 18, maxWidth: 600, marginBottom: 48 }}>
            Vier Module, die ineinandergreifen. Von der Mandats-Prüfung bis zur Mandanten-Akquise.
          </p>
          <div className="l-grid-half l-modules" style={{ gap: 0, border: "1px solid var(--line-2)" }}>
            {engineModules.map((mod, i) => (
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

      {/* CTA */}
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px", textAlign: "center" }}>
          <h2 className="display" style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 700, marginBottom: 16 }}>
            Nur ein Partner pro Rechtsgebiet.
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 18, maxWidth: 600, margin: "0 auto 36px" }}>
            Wir vergeben pro Rechtsgebiet und Region nur eine Lizenz. Sichern Sie sich Ihren Marktvorsprung.
          </p>
          <Link href="/kontakt" className="l-btn l-btn-primary">
            Verfügbarkeit prüfen
            <ArrowSvg />
          </Link>
        </div>
      </section>
    </SubpageShell>
  );
}

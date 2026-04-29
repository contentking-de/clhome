import SubpageShell from "@/components/landing/SubpageShell";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowSvg, IconCircuit, IconCpu, IconDoc, IconSliders } from "@/components/landing/Icons";

export const metadata: Metadata = {
  title: "KI-Integration für Kanzleien | clever.legal",
  description:
    "Wir analysieren Ihre Kanzlei-Workflows und installieren KI dort, wo sie den größten Hebel hat. Prüfzeit −90%, Genauigkeit 99,4%.",
};

const benefits = [
  {
    title: "Prüfzeit eliminiert",
    metric: "−90%",
    metricLabel: "Prüfzeit",
    description:
      "Dokumente, die vorher Stunden kosteten, werden in Sekunden analysiert. OCR, Extraktion und Klassifikation laufen vollautomatisch.",
  },
  {
    title: "Chirurgische Präzision",
    metric: "99.4%",
    metricLabel: "Genauigkeit",
    description:
      "Unsere Modelle sind auf juristische Texte trainiert. Keine generischen Chatbots — sondern spezialisierte KI für Ihren Anwendungsfall.",
  },
  {
    title: "Zero New Hires",
    metric: "0",
    metricLabel: "Neueinstellungen",
    description:
      "Mehr Fälle bearbeiten bei gleichbleibenden Kosten. KI skaliert Ihre Kapazität, ohne Ihr Payroll zu belasten.",
  },
];

const modules = [
  {
    Icon: IconCpu,
    tag: "AUDIT",
    title: "Prozess-Audit",
    description:
      "Wir durchleuchten Ihre Workflows und identifizieren Automatisierungs-Potenzial. Jeder Handgriff wird analysiert — jeder Zeitfresser markiert.",
  },
  {
    Icon: IconCircuit,
    tag: "INTEGRATION",
    title: "Custom-Integration",
    description:
      "LLMs, OCR und Dokumenten-KI werden nahtlos in Ihre bestehende Infrastruktur eingebaut. Keine Medienbrüche, keine Doppelsysteme.",
  },
  {
    Icon: IconDoc,
    tag: "DRAFTING",
    title: "Auto-Drafting Engine",
    description:
      "Generiert fertige Schriftsätze auf Basis bewährter Erfolgs-Templates. Individuell angepasst — aber in Sekunden erstellt.",
  },
  {
    Icon: IconSliders,
    tag: "MONITORING",
    title: "Laufende Optimierung",
    description:
      "Dashboard-Zugang, Performance-Monitoring und kontinuierliches Feintuning. Ihre KI wird besser, je länger sie läuft.",
  },
];

export default function KiIntegrationPage() {
  return (
    <SubpageShell>
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px 64px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>SRV.02 — KI-Integration</div>
          <h1 className="display" style={{ fontSize: "clamp(48px, 6vw, 100px)", fontWeight: 800, marginBottom: 24 }}>
            Ihre Kanzlei.{" "}
            <span style={{ color: "var(--accent)" }}>Auf Steroiden.</span>
          </h1>
          <p style={{ color: "var(--ink-2)", fontSize: 20, lineHeight: 1.55, maxWidth: 700, marginBottom: 36 }}>
            Wir analysieren Ihre bestehenden Abläufe und installieren KI dort, wo sie den größten Hebel hat.
            Keine Spielerei — sondern messbar weniger Aufwand, mehr Kapazität und schnellere Durchlaufzeiten.
          </p>
          <Link href="/kontakt" className="l-btn l-btn-primary">
            Prozess-Audit anfordern
            <ArrowSvg />
          </Link>
        </div>
      </section>

      <section style={{ borderBottom: "1px solid var(--line-2)", background: "var(--bg-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>Ihre Vorteile</div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 700, marginBottom: 48 }}>
            Messbare Transformation.
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
          <div className="l-label" style={{ marginBottom: 18 }}>Die Engine</div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 700, marginBottom: 16 }}>
            Vier Module. Ein System.
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 18, maxWidth: 600, marginBottom: 48 }}>
            Von der Bestandsaufnahme bis zum laufenden Betrieb — ein geschlossener Integrationsprozess.
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
            Bereit für den Umbau?
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 18, maxWidth: 600, margin: "0 auto 36px" }}>
            Starten Sie mit einem kostenlosen Prozess-Audit. Wir zeigen Ihnen exakt, wo KI in Ihrer Kanzlei den größten Impact hat.
          </p>
          <Link href="/kontakt" className="l-btn l-btn-primary">
            Prozess-Audit anfordern
            <ArrowSvg />
          </Link>
        </div>
      </section>
    </SubpageShell>
  );
}

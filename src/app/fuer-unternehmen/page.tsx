import SubpageShell from "@/components/landing/SubpageShell";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowSvg } from "@/components/landing/Icons";

export const metadata: Metadata = {
  title: "Für Unternehmen | clever.legal",
  description:
    "Die Efficiency Engine für Ihre Rechtsabteilung. Durchlaufzeiten halbiert, Flaschenhals eliminiert.",
};

const benefits = [
  {
    title: "Legal Dept. on Steroids",
    metric: "−50 %",
    metricLabel: "Durchlaufzeit",
    description:
      "Wir eliminieren den Flaschenhals ‚Rechtsabteilung'. Automatisierte Workflows sorgen dafür, dass Standard-Prüfungen in Echtzeit stattfinden.",
  },
  {
    title: "Prozess-Beschleuniger",
    metric: "2×",
    metricLabel: "schneller",
    description:
      "Zeit ist Risiko. clever.legal digitalisiert Ihre Legal-Struktur so tiefgreifend, dass Durchlaufzeiten halbiert werden.",
  },
  {
    title: "Compliance auf Autopilot",
    metric: "24/7",
    metricLabel: "Monitoring",
    description:
      "Automatisierte Regelprüfung und Dokumentation. Reduzieren Sie Compliance-Risiken systematisch.",
  },
];

const features = [
  {
    tag: "01",
    title: "Automatisierte Vertragsprüfung",
    description:
      "KI-gestützte Analyse von Verträgen in Sekunden statt Tagen. Risiken werden identifiziert, bevor sie zu Problemen werden.",
  },
  {
    tag: "02",
    title: "Workflow-Integration",
    description:
      "Nahtlose Anbindung an bestehende Systeme. Keine Insellösung, sondern tiefe Integration in Ihre Prozesslandschaft.",
  },
  {
    tag: "03",
    title: "Echtzeit-Reporting",
    description:
      "Dashboard mit allen relevanten KPIs. Transparenz über Kosten, Durchlaufzeiten und Risiken auf einen Blick.",
  },
  {
    tag: "04",
    title: "Maßgeschneiderte KI-Modelle",
    description:
      "Trainiert auf Ihre branchenspezifischen Anforderungen. Keine generische Lösung, sondern Ihr individueller Wettbewerbsvorteil.",
  },
];

export default function FuerUnternehmenPage() {
  return (
    <SubpageShell>
      {/* Hero */}
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px 64px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>Für Unternehmen</div>
          <h1 className="display" style={{ fontSize: "clamp(48px, 6vw, 100px)", fontWeight: 800, marginBottom: 24 }}>
            Die Efficiency Engine{" "}
            <span style={{ color: "var(--accent)" }}>für Ihre Rechtsabteilung.</span>
          </h1>
          <p style={{ color: "var(--ink-2)", fontSize: 20, lineHeight: 1.55, maxWidth: 700, marginBottom: 36 }}>
            Beratung und Implementierung von Legal-Tech-Tools zur Inhouse-Digitalisierung.
            Wir transformieren Ihre Rechtsabteilung von der Kostenstelle zum strategischen Wettbewerbsvorteil.
          </p>
          <Link href="/kontakt" className="l-btn l-btn-primary">
            Beratungsgespräch vereinbaren
            <ArrowSvg />
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ borderBottom: "1px solid var(--line-2)", background: "var(--bg-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>Ihre Vorteile</div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 700, marginBottom: 48 }}>
            Schluss mit dem Flaschenhals.
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

      {/* Features */}
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>Features</div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 700, marginBottom: 16 }}>
            Was wir implementieren.
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 18, maxWidth: 600, marginBottom: 48 }}>
            Keine Billig-SaaS. Eine massive Transformation Ihrer Legal-Infrastruktur.
          </p>
          <div className="l-grid-half l-modules" style={{ gap: 0, border: "1px solid var(--line-2)" }}>
            {features.map((f, i) => (
              <div
                key={f.tag}
                style={{
                  padding: 36,
                  borderRight: i % 2 === 0 ? "1px solid var(--line-2)" : "none",
                  borderBottom: i < 2 ? "1px solid var(--line-2)" : "none",
                  background: i === 0 ? "var(--bg-3)" : "transparent",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span className="display" style={{ fontSize: 36, fontWeight: 800, color: i === 0 ? "var(--accent)" : "var(--ink-3)" }}>{f.tag}</span>
                </div>
                <h3 className="display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>{f.title}</h3>
                <p style={{ color: "var(--ink-2)", fontSize: 14, lineHeight: 1.55 }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px", textAlign: "center" }}>
          <h2 className="display" style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 700, marginBottom: 16 }}>
            Bereit, den Flaschenhals zu eliminieren?
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 18, maxWidth: 600, margin: "0 auto 36px" }}>
            Lassen Sie uns analysieren, wo Ihre Rechtsabteilung die meiste Zeit verliert.
          </p>
          <Link href="/kontakt" className="l-btn l-btn-primary">
            Beratungsgespräch vereinbaren
            <ArrowSvg />
          </Link>
        </div>
      </section>
    </SubpageShell>
  );
}

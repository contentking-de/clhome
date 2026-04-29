import SubpageShell from "@/components/landing/SubpageShell";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowSvg, IconGraduate, IconTarget, IconBolt, IconCheck } from "@/components/landing/Icons";

export const metadata: Metadata = {
  title: "KI-Schulungen & Workshops für Kanzleien | clever.legal",
  description:
    "Praxisnahe KI-Workshops für Kanzleien. Ihr Team lernt Prompt Engineering, Vertragsanalyse und juristische Recherche mit KI — ab Tag 1 produktiv.",
};

const benefits = [
  {
    title: "Ab Tag 1 produktiv",
    metric: "100%",
    metricLabel: "Adoption",
    description:
      "Wir gehen erst, wenn jede Kraft im Haus die Tools beherrscht. Keine PowerPoint-Theorie — nur echte Hands-on-Praxis mit Ihren eigenen Fällen.",
  },
  {
    title: "Maßgeschneidert",
    metric: "1–2",
    metricLabel: "Tage",
    description:
      "Workshops vor Ort oder remote, exakt auf Ihre Rechtsgebiete zugeschnitten. Vom Einzelanwalt bis zur Großkanzlei.",
  },
  {
    title: "Sofort messbar",
    metric: "3×",
    metricLabel: "Output",
    description:
      "Teilnehmer berichten von einer Verdreifachung der Recherche-Geschwindigkeit bereits in der ersten Woche nach dem Workshop.",
  },
];

const modules = [
  {
    Icon: IconGraduate,
    tag: "FOUNDATION",
    title: "KI-Grundlagen für Juristen",
    description:
      "Verständnis aufbauen, Berührungsängste abbauen. Was kann KI wirklich — und wo liegen die Grenzen im juristischen Kontext?",
  },
  {
    Icon: IconTarget,
    tag: "PROMPTING",
    title: "Prompt Engineering",
    description:
      "Die Kunst der richtigen Frage. Spezifische Techniken für Vertragsanalyse, Recherche, Schriftsatzerstellung und Mandantenkommunikation.",
  },
  {
    Icon: IconBolt,
    tag: "WORKFLOW",
    title: "Workflow-Integration",
    description:
      "KI in bestehende Kanzlei-Abläufe einbetten. Von der Fallprüfung über die Dokumentenanalyse bis zur Fristenkontrolle.",
  },
  {
    Icon: IconCheck,
    tag: "COMPLIANCE",
    title: "Ethik & Compliance",
    description:
      "Datenschutz, Berufsrecht, Halluzinationen — wir adressieren die Risiken offen und zeigen Ihnen sichere Einsatzwege.",
  },
];

export default function KiSchulungenPage() {
  return (
    <SubpageShell>
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px 64px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>SRV.01 — KI-Schulungen &amp; Workshops</div>
          <h1 className="display" style={{ fontSize: "clamp(48px, 6vw, 100px)", fontWeight: 800, marginBottom: 24 }}>
            Ihr Team.{" "}
            <span style={{ color: "var(--accent)" }}>KI-ready.</span>
          </h1>
          <p style={{ color: "var(--ink-2)", fontSize: 20, lineHeight: 1.55, maxWidth: 700, marginBottom: 36 }}>
            Ihr Team lernt nicht nur, was KI kann — es lernt, wie man sie im juristischen Alltag
            souverän einsetzt. Praxisnah, auf Ihre Rechtsgebiete zugeschnitten, produktiv ab Tag 1.
          </p>
          <Link href="/kontakt" className="l-btn l-btn-primary">
            Workshop anfragen
            <ArrowSvg />
          </Link>
        </div>
      </section>

      <section style={{ borderBottom: "1px solid var(--line-2)", background: "var(--bg-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>Ihre Vorteile</div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 700, marginBottom: 48 }}>
            Kein Seminar. Eine Transformation.
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
          <div className="l-label" style={{ marginBottom: 18 }}>Workshop-Module</div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 700, marginBottom: 16 }}>
            Vier Module. Ein Ziel.
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 18, maxWidth: 600, marginBottom: 48 }}>
            Jeder Workshop wird individuell zusammengestellt — aus diesen vier Kernmodulen.
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
            Bereit für den nächsten Schritt?
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 18, maxWidth: 600, margin: "0 auto 36px" }}>
            Lassen Sie uns in einem kurzen Gespräch herausfinden, welches Workshop-Format zu Ihrer Kanzlei passt.
          </p>
          <Link href="/kontakt" className="l-btn l-btn-primary">
            Workshop anfragen
            <ArrowSvg />
          </Link>
        </div>
      </section>
    </SubpageShell>
  );
}

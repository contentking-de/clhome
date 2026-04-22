import { Icons } from "./Icons";

function EngineModule({
  num,
  icon,
  title,
  desc,
  metrics,
  featured,
}: {
  num: string;
  icon: string;
  title: string;
  desc: string;
  metrics: { l: string; v: string }[];
  featured?: boolean;
}) {
  const IconComponent = Icons[icon];
  return (
    <div
      style={{
        border: "1px solid var(--line-2)",
        padding: "32px 32px 28px",
        background: featured
          ? "color-mix(in oklab, var(--accent), var(--bg) 94%)"
          : "var(--bg-2)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        minHeight: 320,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            color: featured ? "var(--accent)" : "var(--ink)",
          }}
        >
          {IconComponent && <IconComponent size={28} />}
        </div>
        <span
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.14em",
            color: "var(--ink-3)",
          }}
        >
          MOD.{num}
        </span>
      </div>
      <h3
        className="display"
        style={{
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "var(--ink-2)" }}>
        {desc}
      </p>
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          gap: 18,
          paddingTop: 16,
          borderTop: "1px dashed var(--line-2)",
        }}
      >
        {metrics.map((m, i) => (
          <div key={i}>
            <div
              className="mono"
              style={{
                fontSize: 10,
                color: "var(--ink-3)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              {m.l}
            </div>
            <div
              className="display"
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: featured ? "var(--accent)" : "var(--ink)",
              }}
            >
              {m.v}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const MODULES = [
  {
    num: "01",
    icon: "IconCpu",
    title: "Custom Intake AI",
    desc: "OCR extrahiert Kerndaten aus Mandanten-Dokumenten in Sekunden. Vertragsnummern, Beträge, Fristen — strukturiert, validiert, archiviert.",
    metrics: [
      { l: "Genauigkeit", v: "99.4%" },
      { l: "Ø Zeit", v: "12s" },
    ],
    featured: true,
  },
  {
    num: "02",
    icon: "IconDoc",
    title: "Auto-Drafting Engine",
    desc: "Fertige Schriftsätze auf Basis Ihrer Erfolgs-Templates. Jeder Mandant einzigartig, jeder Schriftsatz individuell — aber in Minuten, nicht Tagen.",
    metrics: [
      { l: "Output", v: "< 5 min" },
      { l: "Templates", v: "∞" },
    ],
  },
  {
    num: "03",
    icon: "IconSat",
    title: "Performance-Satelliten",
    desc: "Spezialisierte Landingpages für Ihre Rechtsgebiete. Thorsten jagt Traffic, Nico baut Autorität, der Funnel liefert qualifizierte Mandate.",
    metrics: [
      { l: "CAC", v: "−62%" },
      { l: "Conv.", v: "8.4%" },
    ],
  },
  {
    num: "04",
    icon: "IconGavel",
    title: "The Workshop",
    desc: "48 Stunden Vollintegration. Vor Ort. Ihr Team, unser System. Wir gehen erst, wenn jede Kraft im Haus die Engine beherrscht.",
    metrics: [
      { l: "Dauer", v: "48 h" },
      { l: "Adoption", v: "100%" },
    ],
  },
];

export default function EngineSection() {
  return (
    <section
      id="engine"
      style={{
        borderBottom: "1px solid var(--line-2)",
        background: "var(--bg)",
      }}
    >
      <div className="l-container" style={{ padding: "96px 32px 64px" }}>
        <div
          className="l-grid-sh"
        >
          <div>
            <div className="l-label" style={{ marginBottom: 18 }}>
              § 02 — Die Engine
            </div>
            <div className="l-chip" style={{ marginBottom: 24 }}>
              <span className="dot" />
              Vier Module · ein geschlossenes System
            </div>
          </div>
          <h2
            className="display"
            style={{
              fontSize: "clamp(44px, 5.5vw, 88px)",
              fontWeight: 700,
            }}
          >
            Ihre Kanzlei
            <br />
            <span style={{ color: "var(--ink-2)" }}>auf</span>{" "}
            <span style={{ color: "var(--accent)" }}>Steroiden.</span>
          </h2>
        </div>
      </div>
      <div className="l-container" style={{ padding: "0 32px 96px" }}>
        <div
          className="l-grid-half l-modules"
          style={{
            gap: 0,
            border: "1px solid var(--line-2)",
          }}
        >
          {MODULES.map((m, i) => (
            <div
              key={m.num}
              style={{
                borderRight:
                  i % 2 === 0 ? "1px solid var(--line-2)" : "none",
                borderBottom:
                  i < 2 ? "1px solid var(--line-2)" : "none",
              }}
            >
              <EngineModule {...m} />
            </div>
          ))}
        </div>
        <div
          className="l-engine-bar"
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 24px",
            border: "1px solid var(--line-2)",
            background: "var(--bg-2)",
          }}
        >
          <span
            className="mono"
            style={{
              fontSize: 12,
              letterSpacing: "0.1em",
              color: "var(--ink-2)",
            }}
          >
            <span style={{ color: "var(--accent)" }}>▸</span>&nbsp; Intake →
            Draft → File → Follow-up. Ein Flow. Kein Medienbruch.
          </span>
          <a
            href="#kontakt"
            className="mono"
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            Architektur-Deck anfordern →
          </a>
        </div>
      </div>
    </section>
  );
}

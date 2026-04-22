function Row({
  left,
  right,
  highlight,
}: {
  left: string;
  right: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="l-grid-half"
      style={{
        borderTop: "1px solid var(--line-2)",
      }}
    >
      <div
        style={{
          padding: "22px 28px",
          color: "var(--ink-3)",
          display: "flex",
          gap: 14,
          alignItems: "baseline",
        }}
        className="l-compare-cell"
      >
        <span
          className="mono"
          style={{
            fontSize: 11,
            color: "var(--ink-3)",
            minWidth: 60,
            letterSpacing: "0.14em",
          }}
        >
          STATUS&nbsp;QUO
        </span>
        <span style={{ fontSize: 16, lineHeight: 1.5 }}>{left}</span>
      </div>
      <div
        className="l-split-border l-compare-cell"
        style={{
          padding: "22px 28px",
          borderLeft: "1px solid var(--line-2)",
          background: highlight
            ? "color-mix(in oklab, var(--accent), var(--bg) 92%)"
            : "transparent",
          display: "flex",
          gap: 14,
          alignItems: "baseline",
        }}
      >
        <span
          className="mono"
          style={{
            fontSize: 11,
            color: "var(--accent)",
            minWidth: 80,
            letterSpacing: "0.14em",
          }}
        >
          CLEVER.LEGAL
        </span>
        <span style={{ fontSize: 16, lineHeight: 1.5, color: "var(--ink)" }}>
          {right}
        </span>
      </div>
    </div>
  );
}

const ROWS = [
  {
    l: "Junioren lesen PDFs, die Uhr tickt, die Marge schrumpft.",
    r: "KI validiert. Sie entscheiden. In Sekunden, nicht Stunden.",
    h: true,
  },
  {
    l: "Massenverfahren = Massenaufwand. Team skaliert nicht mit.",
    r: "Massenverfahren ohne Massenaufwand. Schriftsätze auf Autopilot.",
    h: false,
  },
  {
    l: "Mandanten-Akquise per Flyer und Hoffnung.",
    r: "Performance-Satelliten liefern qualifizierte Leads auf Knopfdruck.",
    h: false,
  },
  {
    l: '„KI-Strategie" als Powerpoint. Seit 18 Monaten.',
    r: "48-Stunden-Vollintegration. Wir gehen erst, wenn das System läuft.",
    h: false,
  },
  {
    l: "Fachkräftemangel stoppt Wachstum.",
    r: "Kapazität pro Mitarbeiter × 10. Personal bleibt optional.",
    h: false,
  },
];

const PAINS = [
  {
    n: "01",
    t: "Margen-Killer",
    d: "Manuelle Fallprüfung ist unwirtschaftlich. Jede Stunde in PDFs ist eine Stunde weniger Strategie.",
  },
  {
    n: "02",
    t: "Personal-Falle",
    d: "Fachkräftemangel stoppt Wachstum. Neue Mandate brauchen neue Menschen. Oder: neue Systeme.",
  },
  {
    n: "03",
    t: "Innovations-Angst",
    d: "Die Konkurrenz schläft nicht. Sie automatisiert bereits. AI-FoMo ist real.",
  },
];

export default function ProblemSection() {
  return (
    <section
      id="problem"
      style={{ borderBottom: "1px solid var(--line-2)" }}
    >
      <div className="l-container" style={{ padding: "88px 32px 0" }}>
        <div
          className="l-grid-sh-w"
          style={{
            paddingBottom: 48,
          }}
        >
          <div>
            <div className="l-label" style={{ marginBottom: 18 }}>
              § 01 — Das Problem
            </div>
            <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>
              Automatisierte Exzellenz gegen analoge Trägheit
            </div>
          </div>
          <h2
            className="display"
            style={{
              fontSize: "clamp(44px, 5.5vw, 88px)",
              fontWeight: 700,
            }}
          >
            Das System ist langsam.
            <br />
            <span style={{ color: "var(--accent)" }}>
              Wir sind es nicht.
            </span>
          </h2>
        </div>
      </div>

      <div className="l-container" style={{ padding: "0 32px" }}>
        <div
          style={{
            border: "1px solid var(--line-2)",
            borderBottom: "none",
          }}
        >
          <div
            className="l-grid-half"
            style={{
              background: "var(--bg-2)",
            }}
          >
            <div style={{ padding: "14px 28px" }} className="mono">
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                }}
              >
                Analoge Trägheit
              </span>
            </div>
            <div
              style={{
                padding: "14px 28px",
                borderLeft: "1px solid var(--line-2)",
              }}
              className="mono l-split-border"
            >
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                }}
              >
                Automatisierte Exzellenz
              </span>
            </div>
          </div>
          {ROWS.map((r, i) => (
            <Row key={i} left={r.l} right={r.r} highlight={r.h} />
          ))}
          <div
            className="l-problem-footer"
            style={{
              borderTop: "1px solid var(--line-2)",
              padding: "20px 28px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                color: "var(--ink-3)",
              }}
            >
              — Anwaltliche Sorgfalt ist keine Ausrede für analoge Trägheit.
            </span>
            <span
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                color: "var(--ink-3)",
              }}
            >
              [ 05 / 05 ]
            </span>
          </div>
        </div>
      </div>

      <div className="l-container" style={{ padding: "56px 32px 88px" }}>
        <div
          className="l-grid-3"
          style={{
            gap: 24,
          }}
        >
          {PAINS.map((p) => (
            <div
              key={p.n}
              style={{
                borderLeft: "1px solid var(--line)",
                paddingLeft: 24,
                paddingTop: 4,
              }}
            >
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  color: "var(--accent)",
                  letterSpacing: "0.14em",
                  marginBottom: 16,
                }}
              >
                PAIN · {p.n}
              </div>
              <div
                className="display"
                style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}
              >
                {p.t}
              </div>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: "var(--ink-2)",
                }}
              >
                {p.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

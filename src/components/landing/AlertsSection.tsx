import Link from "next/link";
import { ArrowSvg } from "./Icons";

const ALERTS = [
  {
    sev: "HIGH",
    tag: "DSGVO",
    t: "Meta Scraping — BGH Urteil v. 03.04.2026",
    d: "Ca. 500 Mio. betroffene Datensätze. Signifikantes Volumen für Sammelklagen.",
  },
  {
    sev: "MED",
    tag: "DIESELGATE 2.0",
    t: "EA288 — KBA Rückruf ausgeweitet",
    d: "17 neue Quellen / 24h. Verjährungsfristen aktiv.",
  },
  {
    sev: "MED",
    tag: "COOKIE-CONSENT",
    t: "EuGH C-473/25 — Hearing 28.04.2026",
    d: "Pre-ticked-boxes Folgeverfahren. Relevant für E-Commerce-Mandate.",
  },
  {
    sev: "LOW",
    tag: "COACHING",
    t: "§ 656 BGB — Rückforderungsklagen",
    d: "Stetig wachsendes Volumen. Template-Workflow verfügbar.",
  },
];

const SEV_COLOR: Record<string, string> = {
  HIGH: "var(--danger)",
  MED: "var(--warn)",
  LOW: "var(--accent)",
};

export default function AlertsSection() {
  return (
    <section
      id="alerts"
      style={{ borderBottom: "1px solid var(--line-2)" }}
    >
      <div className="l-container" style={{ padding: "96px 32px" }}>
        <div
          className="l-grid-sh"
          style={{
            paddingBottom: 40,
          }}
        >
          <div>
            <div className="l-label" style={{ marginBottom: 18 }}>
              § 05 — Legal Alerts
            </div>
            <div className="l-chip">
              <span className="dot" style={{ background: "var(--danger)" }} />
              LIVE FEED · wöchentlich
            </div>
          </div>
          <h2
            className="display"
            style={{
              fontSize: "clamp(44px, 5.5vw, 88px)",
              fontWeight: 700,
            }}
          >
            Immer einen
            <br />
            Schritt <span style={{ color: "var(--accent)" }}>voraus.</span>
          </h2>
        </div>

        <div
          className="l-grid-alerts"
        >
          <div role="table" aria-label="Aktuelle Legal Alerts" style={{ border: "1px solid var(--line-2)" }}>
            <div
              role="row"
              className="mono l-grid-alerts-row"
              style={{
                padding: "14px 24px",
                background: "var(--bg-2)",
                borderBottom: "1px solid var(--line-2)",
              }}
            >
              <span
                role="columnheader"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--ink-3)",
                }}
              >
                SEV
              </span>
              <span
                role="columnheader"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--ink-3)",
                }}
              >
                CLUSTER
              </span>
              <span
                role="columnheader"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--ink-3)",
                }}
              >
                SIGNAL
              </span>
              <span
                role="columnheader"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--ink-3)",
                  textAlign: "right",
                }}
              >
                DETAIL
              </span>
            </div>
            {ALERTS.map((a, i) => (
              <div
                key={i}
                role="row"
                className="l-grid-alerts-row"
                style={{
                  padding: "22px 24px",
                  borderBottom:
                    i < ALERTS.length - 1
                      ? "1px solid var(--line-2)"
                      : "none",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <span
                  role="cell"
                  className="mono"
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: SEV_COLOR[a.sev],
                    letterSpacing: "0.14em",
                  }}
                >
                  <span aria-hidden="true">■</span> {a.sev}
                </span>
                <span
                  role="cell"
                  className="mono"
                  style={{
                    fontSize: 11,
                    color: "var(--ink-3)",
                    letterSpacing: "0.14em",
                  }}
                >
                  {a.tag}
                </span>
                <div role="cell">
                  <div
                    style={{
                      fontSize: 15,
                      color: "var(--ink)",
                      fontWeight: 500,
                      marginBottom: 4,
                    }}
                  >
                    {a.t}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--ink-3)" }}>
                    {a.d}
                  </div>
                </div>
                <Link
                  href="/legal-alerts"
                  role="cell"
                  aria-label={`Öffnen: ${a.t}`}
                  className="mono"
                  style={{
                    fontSize: 11,
                    color: "var(--accent)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    textAlign: "right",
                  }}
                >
                  Öffnen →
                </Link>
              </div>
            ))}
          </div>

          <div
            style={{
              border: "1px solid var(--line-2)",
              background: "var(--bg-2)",
              padding: 32,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--ink-3)",
                  marginBottom: 20,
                }}
              >
                WEEKLY INTEL
              </div>
              <div
                className="display"
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  lineHeight: 1.15,
                  marginBottom: 16,
                }}
              >
                Nie wieder kalte Mandate.
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--ink-2)",
                  lineHeight: 1.55,
                  marginBottom: 24,
                }}
              >
                Kuratierte Frühwarnungen zu Sammelklagen, regulatorischen
                Signalen und Trends — bevor der Markt reagiert.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                <div>
                  <div
                    className="display"
                    style={{ fontSize: 28, fontWeight: 800 }}
                  >
                    317
                  </div>
                  <div
                    className="mono"
                    style={{
                      fontSize: 10,
                      color: "var(--ink-3)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    QUELLEN
                  </div>
                </div>
                <div>
                  <div
                    className="display"
                    style={{
                      fontSize: 28,
                      fontWeight: 800,
                      color: "var(--accent)",
                    }}
                  >
                    24/7
                  </div>
                  <div
                    className="mono"
                    style={{
                      fontSize: 10,
                      color: "var(--ink-3)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    MONITORING
                  </div>
                </div>
              </div>
            </div>
            <Link href="/legal-alerts" className="l-btn l-btn-primary">
              Zugang sichern
              <ArrowSvg />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

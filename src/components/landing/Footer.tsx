import Link from "next/link";
import { Logo } from "./Header";

const COLS = [
  {
    t: "Produkt",
    l: [
      { label: "Engine", href: "/#engine" },
      { label: "Custom Intake AI", href: "/#engine" },
      { label: "Auto-Drafting", href: "/#engine" },
      { label: "Performance-Satelliten", href: "/#engine" },
      { label: "The Workshop", href: "/#engine" },
    ],
  },
  {
    t: "Zielgruppen",
    l: [
      { label: "Anwälte", href: "/#anwaelte" },
      { label: "Unternehmen", href: "/#anwaelte" },
      { label: "Privatkunden / Satelliten", href: "/#anwaelte" },
    ],
  },
  {
    t: "Ressourcen",
    l: [
      { label: "Legal Alerts", href: "/legal-alerts" },
      { label: "Blog", href: "/blog" },
      { label: "Story", href: "/story" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  {
    t: "Recht",
    l: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
      { label: "AGB", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg)" }}>
      {/* Mega statement */}
      <div
        style={{
          borderTop: "1px solid var(--line-2)",
          borderBottom: "1px solid var(--line-2)",
          padding: "96px 0",
        }}
      >
        <div className="l-container" style={{ textAlign: "center" }}>
          <div className="l-label" style={{ marginBottom: 24 }}>
            EPILOG
          </div>
          <h3
            className="display"
            style={{
              fontSize: "clamp(48px, 8vw, 148px)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
          >
            Recht haben dauert Sekunden.
            <br />
            <span style={{ color: "var(--accent)" }}>
              Recht bekommen ab jetzt auch.
            </span>
          </h3>
        </div>
      </div>

      <div className="l-container" style={{ padding: "64px 32px 32px" }}>
        <div
          className="l-grid-footer"
          style={{
            paddingBottom: 48,
            borderBottom: "1px solid var(--line-2)",
          }}
        >
          <div>
            <Logo />
            <p
              style={{
                fontSize: 13,
                color: "var(--ink-3)",
                lineHeight: 1.55,
                marginTop: 16,
                maxWidth: 280,
              }}
            >
              Legal-Enabler und Tech-Hub. Infrastruktur für die Rechtsberatung
              der nächsten Generation.
            </p>
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: "var(--ink-3)",
                letterSpacing: "0.1em",
                marginTop: 32,
              }}
            >
              EST. 2024 · MARKDORF, DE
            </div>
          </div>
          {COLS.map((c) => (
            <div key={c.t}>
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: 20,
                }}
              >
                {c.t}
              </div>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {c.l.map((li) => (
                  <li
                    key={li.label}
                    style={{ fontSize: 14, color: "var(--ink-2)" }}
                  >
                    {li.href.startsWith("/") ? (
                      <Link href={li.href} style={{ color: "inherit" }}>
                        {li.label}
                      </Link>
                    ) : (
                      <a href={li.href} style={{ color: "inherit" }}>
                        {li.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          style={{
            padding: "24px 0 8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div
            className="mono"
            style={{
              fontSize: 11,
              color: "var(--ink-3)",
              letterSpacing: "0.1em",
            }}
          >
            © 2026 clever.legal GmbH i. Gr. · Alle Rechte vorbehalten
          </div>
          <div
            className="mono"
            style={{
              fontSize: 11,
              color: "var(--ink-3)",
              letterSpacing: "0.1em",
              display: "flex",
              gap: 20,
            }}
          >
            <span>SYS:READY</span>
            <span>beA:ONLINE</span>
            <span>v.26.04 / BUILD 0421</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

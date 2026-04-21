"use client";

import { useState } from "react";
import { ArrowSvg } from "./Icons";

const CLUSTERS = [
  {
    id: "anwaelte",
    tag: "B2B · Kanzleien",
    title: "Die Fokus-Garantie",
    lead: "Vom Sichten zum Entscheiden. Ihre KI reduziert Prüfzeiten um bis zu 90%. Sie lesen keine PDFs mehr — Sie validieren Ergebnisse.",
    bullets: [
      "Massenverfahren ohne Massenaufwand",
      "Vom Erstkontakt zur Klage in < 5 Minuten",
      "Gebiets- und Nischenschutz — 1 Partner pro Region",
      "beA-Integration, OCR, Fristenkontrolle on rails",
    ],
    metric: { v: "−90%", l: "Prüfzeit" },
    cta: "Strategie-Gespräch",
  },
  {
    id: "unternehmen",
    tag: "B2B · Corporate Legal",
    title: "Legal Dept. on Steroids",
    lead: 'Wir eliminieren den Flaschenhals „Rechtsabteilung". Automatisierte Workflows verschieben Standard-Prüfungen in Echtzeit — nicht in Wochen.',
    bullets: [
      "Automatisierte Vertragsprüfung",
      "Durchlaufzeiten halbiert",
      "DSGVO · Compliance · Audit-Trail",
      "Nahtlos integriert in bestehende Stacks",
    ],
    metric: { v: "0.5×", l: "Durchlaufzeit" },
    cta: "Digitalisierungs-Audit",
  },
  {
    id: "privat",
    tag: "D2C · Satelliten",
    title: "Massenverfahren, industrialisiert",
    lead: "Satelliten-Domains bündeln Betroffene hocheffizient. Traffic rein, Mandat raus, Schriftsatz automatisch — das Fließband für Recht bekommen.",
    bullets: [
      "Themenspezifische Landingpages",
      "SEO + SEA Dual-Jagd",
      "Selbst-Service Onboarding für Mandanten",
      "CAC um 62 % unter Marktdurchschnitt",
    ],
    metric: { v: "8.4%", l: "Conversion" },
    cta: "Satelliten-Liste",
  },
];

export default function ClusterSection() {
  const [active, setActive] = useState(0);
  const c = CLUSTERS[active];

  return (
    <section
      id="anwaelte"
      style={{ borderBottom: "1px solid var(--line-2)" }}
    >
      <div className="l-container" style={{ padding: "96px 32px 0" }}>
        <div
          className="l-grid-sh"
          style={{
            paddingBottom: 40,
          }}
        >
          <div>
            <div className="l-label" style={{ marginBottom: 18 }}>
              § 03 — Zielgruppen
            </div>
            <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>
              Keine Weiche — drei Cluster.
            </div>
          </div>
          <h2
            className="display"
            style={{
              fontSize: "clamp(44px, 5.5vw, 88px)",
              fontWeight: 700,
            }}
          >
            Drei Fronten.
            <br />
            <span style={{ color: "var(--accent)" }}>Eine Infrastruktur.</span>
          </h2>
        </div>
      </div>

      <div className="l-container" style={{ padding: "0 32px 96px" }}>
        <div
          className="l-cluster-tabs"
          style={{
            display: "flex",
            border: "1px solid var(--line-2)",
            borderBottom: "none",
          }}
        >
          {CLUSTERS.map((cl, i) => (
            <button
              key={cl.id}
              onClick={() => setActive(i)}
              style={{
                flex: 1,
                padding: "20px 24px",
                textAlign: "left",
                background: active === i ? "var(--bg-2)" : "transparent",
                borderRight:
                  i < CLUSTERS.length - 1
                    ? "1px solid var(--line-2)"
                    : "none",
                borderTop:
                  active === i
                    ? "2px solid var(--accent)"
                    : "2px solid transparent",
                transition: "all .15s",
              }}
            >
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: active === i ? "var(--accent)" : "var(--ink-3)",
                  marginBottom: 8,
                }}
              >
                [ 0{i + 1} ] {cl.tag}
              </div>
              <div
                className="display"
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: active === i ? "var(--ink)" : "var(--ink-2)",
                }}
              >
                {cl.title}
              </div>
            </button>
          ))}
        </div>

        <div
          className="l-grid-cluster"
          style={{
            border: "1px solid var(--line-2)",
            background: "var(--bg-2)",
          }}
        >
          <div
            className="l-split-border"
            style={{
              padding: "48px 48px 40px",
              borderRight: "1px solid var(--line-2)",
            }}
          >
            <p
              style={{
                fontSize: 22,
                lineHeight: 1.45,
                color: "var(--ink)",
                fontWeight: 500,
                maxWidth: 640,
                marginBottom: 32,
              }}
            >
              {c.lead}
            </p>
            <ul style={{ listStyle: "none", display: "grid", gap: 14 }}>
              {c.bullets.map((b, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "baseline",
                    fontSize: 16,
                    color: "var(--ink-2)",
                  }}
                >
                  <span
                    className="mono"
                    style={{ color: "var(--accent)", fontSize: 12 }}
                  >
                    ›
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            style={{
              padding: 48,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 32,
            }}
          >
            <div>
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                  marginBottom: 18,
                }}
              >
                Kern-KPI
              </div>
              <div
                className="display"
                style={{
                  fontSize: "clamp(56px, 10vw, 96px)",
                  fontWeight: 800,
                  color: "var(--accent)",
                  letterSpacing: "-0.05em",
                  lineHeight: 0.9,
                }}
              >
                {c.metric.v}
              </div>
              <div
                className="mono"
                style={{
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  color: "var(--ink-2)",
                  marginTop: 10,
                  textTransform: "uppercase",
                }}
              >
                {c.metric.l}
              </div>
            </div>
            <a
              href="#kontakt"
              className="l-btn l-btn-primary"
              style={{ alignSelf: "flex-start" }}
            >
              {c.cta}
              <ArrowSvg />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

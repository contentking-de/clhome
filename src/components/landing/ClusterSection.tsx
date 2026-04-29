"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowSvg } from "./Icons";

export default function ClusterSection() {
  const t = useTranslations("Cluster");
  const [active, setActive] = useState(0);

  const CLUSTERS = [
    {
      id: "anwaelte",
      tag: t("cluster1Tag"),
      title: t("cluster1Title"),
      lead: t("cluster1Lead"),
      bullets: [
        t("cluster1Bullet1"),
        t("cluster1Bullet2"),
        t("cluster1Bullet3"),
        t("cluster1Bullet4"),
      ],
      metric: { v: t("cluster1MetricValue"), l: t("cluster1MetricLabel") },
      cta: t("cluster1Cta"),
    },
    {
      id: "unternehmen",
      tag: t("cluster2Tag"),
      title: t("cluster2Title"),
      lead: t("cluster2Lead"),
      bullets: [
        t("cluster2Bullet1"),
        t("cluster2Bullet2"),
        t("cluster2Bullet3"),
        t("cluster2Bullet4"),
      ],
      metric: { v: t("cluster2MetricValue"), l: t("cluster2MetricLabel") },
      cta: t("cluster2Cta"),
    },
    {
      id: "privat",
      tag: t("cluster3Tag"),
      title: t("cluster3Title"),
      lead: t("cluster3Lead"),
      bullets: [
        t("cluster3Bullet1"),
        t("cluster3Bullet2"),
        t("cluster3Bullet3"),
        t("cluster3Bullet4"),
      ],
      metric: { v: t("cluster3MetricValue"), l: t("cluster3MetricLabel") },
      cta: t("cluster3Cta"),
    },
  ];

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
              {t("sectionLabel")}
            </div>
            <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>
              {t("subline")}
            </div>
          </div>
          <h2
            className="display"
            style={{
              fontSize: "clamp(44px, 5.5vw, 88px)",
              fontWeight: 700,
            }}
          >
            {t("headingLine1")}
            <br />
            <span style={{ color: "var(--accent)" }}>{t("headingLine2Accent")}</span>
          </h2>
        </div>
      </div>

      <div className="l-container" style={{ padding: "0 32px 96px" }}>
        <div
          className="l-cluster-tabs"
          role="tablist"
          aria-label="Zielgruppen-Auswahl"
          style={{
            display: "flex",
            border: "1px solid var(--line-2)",
            borderBottom: "none",
          }}
        >
          {CLUSTERS.map((cl, i) => (
            <button
              key={cl.id}
              role="tab"
              aria-selected={active === i}
              aria-controls={`tabpanel-${cl.id}`}
              id={`tab-${cl.id}`}
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
          role="tabpanel"
          id={`tabpanel-${c.id}`}
          aria-labelledby={`tab-${c.id}`}
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
                {t("kpiHeading")}
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

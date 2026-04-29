import { getTranslations } from "next-intl/server";
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

export default async function EngineSection() {
  const t = await getTranslations("Engine");

  const MODULES = [
    {
      num: "01",
      icon: "IconCpu",
      title: t("module01Title"),
      desc: t("module01Desc"),
      metrics: [
        { l: t("module01Metric1Label"), v: t("module01Metric1Value") },
        { l: t("module01Metric2Label"), v: t("module01Metric2Value") },
      ],
      featured: true,
    },
    {
      num: "02",
      icon: "IconDoc",
      title: t("module02Title"),
      desc: t("module02Desc"),
      metrics: [
        { l: t("module02Metric1Label"), v: t("module02Metric1Value") },
        { l: t("module02Metric2Label"), v: t("module02Metric2Value") },
      ],
    },
    {
      num: "03",
      icon: "IconSat",
      title: t("module03Title"),
      desc: t("module03Desc"),
      metrics: [
        { l: t("module03Metric1Label"), v: t("module03Metric1Value") },
        { l: t("module03Metric2Label"), v: t("module03Metric2Value") },
      ],
    },
    {
      num: "04",
      icon: "IconGavel",
      title: t("module04Title"),
      desc: t("module04Desc"),
      metrics: [
        { l: t("module04Metric1Label"), v: t("module04Metric1Value") },
        { l: t("module04Metric2Label"), v: t("module04Metric2Value") },
      ],
    },
  ];

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
              {t("sectionLabel")}
            </div>
            <div className="l-chip" style={{ marginBottom: 24 }}>
              <span className="dot" />
              {t("chip")}
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
            <span style={{ color: "var(--accent)" }}>{t("headingLine2")}</span>
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
            <span style={{ color: "var(--accent)" }}>▸</span>&nbsp; {t("barTagline")}
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
            {t("barCta")}
          </a>
        </div>
      </div>
    </section>
  );
}

import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { IconGraduate, IconCircuit, IconSat, IconMegaphone } from "./Icons";
import { ArrowSvg } from "./Icons";

function ServiceCard({
  num,
  slug,
  Icon,
  title,
  subtitle,
  desc,
  bullets,
  metrics,
  linkCta,
  featured,
}: {
  num: string;
  slug: string;
  Icon: typeof IconGraduate;
  title: string;
  subtitle: string;
  desc: string;
  bullets: string[];
  metrics: { l: string; v: string }[];
  linkCta: string;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/leistungen/${slug}`}
      style={{
        border: "1px solid var(--line-2)",
        padding: "36px 32px 32px",
        background: featured
          ? "color-mix(in oklab, var(--accent), var(--bg) 94%)"
          : "var(--bg-2)",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        textDecoration: "none",
        color: "inherit",
        transition: "background 0.2s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ color: featured ? "var(--accent)" : "var(--ink)" }}>
          <Icon size={28} />
        </div>
        <span
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.14em",
            color: "var(--ink-3)",
          }}
        >
          SRV.{num}
        </span>
      </div>

      <div>
        <span
          className="mono"
          style={{
            fontSize: 10,
            letterSpacing: "0.14em",
            color: featured ? "var(--accent)" : "var(--ink-3)",
            display: "block",
            marginBottom: 10,
          }}
        >
          {subtitle}
        </span>
        <h3
          className="display"
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h3>
      </div>

      <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-2)" }}>
        {desc}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {bullets.map((b, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "baseline",
            }}
          >
            <span
              style={{
                color: featured ? "var(--accent)" : "var(--ink-3)",
                fontSize: 12,
                flexShrink: 0,
              }}
            >
              ▸
            </span>
            <span
              style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--ink-2)" }}
            >
              {b}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingTop: 16,
          borderTop: "1px dashed var(--line-2)",
        }}
      >
        <div style={{ display: "flex", gap: 18 }}>
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
        <span
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.14em",
            color: "var(--accent)",
          }}
        >
          {linkCta}
        </span>
      </div>
    </Link>
  );
}

export default async function ServicesSection() {
  const t = await getTranslations("Services");

  const SERVICES = [
    {
      num: "01",
      slug: "ki-schulungen",
      Icon: IconGraduate,
      title: t("service1Title"),
      subtitle: t("service1Subtitle"),
      desc: t("service1Desc"),
      bullets: [
        t("service1Bullet1"),
        t("service1Bullet2"),
        t("service1Bullet3"),
      ],
      metrics: [
        { l: t("service1Metric1Label"), v: t("service1Metric1Value") },
        { l: t("service1Metric2Label"), v: t("service1Metric2Value") },
      ],
    },
    {
      num: "02",
      slug: "ki-integration",
      Icon: IconCircuit,
      title: t("service2Title"),
      subtitle: t("service2Subtitle"),
      desc: t("service2Desc"),
      bullets: [
        t("service2Bullet1"),
        t("service2Bullet2"),
        t("service2Bullet3"),
      ],
      metrics: [
        { l: t("service2Metric1Label"), v: t("service2Metric1Value") },
        { l: t("service2Metric2Label"), v: t("service2Metric2Value") },
      ],
    },
    {
      num: "03",
      slug: "lead-satelliten",
      Icon: IconSat,
      title: t("service3Title"),
      subtitle: t("service3Subtitle"),
      desc: t("service3Desc"),
      bullets: [
        t("service3Bullet1"),
        t("service3Bullet2"),
        t("service3Bullet3"),
      ],
      metrics: [
        { l: t("service3Metric1Label"), v: t("service3Metric1Value") },
        { l: t("service3Metric2Label"), v: t("service3Metric2Value") },
      ],
    },
    {
      num: "04",
      slug: "online-marketing",
      Icon: IconMegaphone,
      title: t("service4Title"),
      subtitle: t("service4Subtitle"),
      desc: t("service4Desc"),
      bullets: [
        t("service4Bullet1"),
        t("service4Bullet2"),
        t("service4Bullet3"),
      ],
      metrics: [
        { l: t("service4Metric1Label"), v: t("service4Metric1Value") },
        { l: t("service4Metric2Label"), v: t("service4Metric2Value") },
      ],
    },
  ];

  return (
    <section
      id="services"
      style={{
        borderBottom: "1px solid var(--line-2)",
        background: "var(--bg)",
      }}
    >
      <div className="l-container" style={{ padding: "96px 32px 64px" }}>
        <div className="l-grid-sh">
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
            <span style={{ color: "var(--accent)" }}>{t("headingLine2Accent")}</span>
          </h2>
        </div>
      </div>

      <div className="l-container" style={{ padding: "0 32px 48px" }}>
        <p
          style={{
            maxWidth: 720,
            fontSize: 17,
            lineHeight: 1.65,
            color: "var(--ink-2)",
          }}
        >
          {t("intro")}
        </p>
      </div>

      <div className="l-container" style={{ padding: "0 32px 96px" }}>
        <div
          className="l-grid-services"
          style={{
            gap: 0,
            border: "1px solid var(--line-2)",
          }}
        >
          {SERVICES.map((s, i) => (
            <div
              key={s.num}
              style={{
                borderRight:
                  i % 2 === 0 ? "1px solid var(--line-2)" : "none",
                borderBottom:
                  i < 2 ? "1px solid var(--line-2)" : "none",
              }}
            >
              <ServiceCard {...s} linkCta={t("cardLinkCta")} featured={i === 0} />
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
            <span style={{ color: "var(--accent)" }}>▸</span>&nbsp;
            {t("engineBarText")}
          </span>
          <a
            href="#kontakt"
            className="mono"
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--accent)",
              whiteSpace: "nowrap",
            }}
          >
            {t("engineBarCta")}
          </a>
        </div>
      </div>
    </section>
  );
}

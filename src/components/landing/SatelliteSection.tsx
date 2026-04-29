import { getTranslations } from "next-intl/server";
import { IconSat, IconShield, IconGavel, IconTarget } from "./Icons";

const SATELLITES = [
  {
    Icon: IconShield,
    tag: "DATENSCHUTZ",
    domain: "meta-datenschutzklage.de",
    href: "https://meta-datenschutzklage.de",
  },
  {
    Icon: IconGavel,
    tag: "COACHING-RECHT",
    domain: "coachinganwalt.com",
    href: "https://coachinganwalt.com",
  },
  {
    Icon: IconTarget,
    tag: "GLÜCKSSPIELRECHT",
    domain: "zockerhelden.de",
    href: "https://zockerhelden.de",
  },
];

export default async function SatelliteSection() {
  const t = await getTranslations("Satellite");

  const STEPS = [
    {
      num: "01",
      title: t("step1Title"),
      text: t("step1Text"),
    },
    {
      num: "02",
      title: t("step2Title"),
      text: t("step2Text"),
    },
    {
      num: "03",
      title: t("step3Title"),
      text: t("step3Text"),
    },
  ];

  return (
    <section id="satelliten" style={{ borderBottom: "1px solid var(--line-2)" }}>
      <div className="l-container" style={{ padding: "96px 32px" }}>
        {/* Header */}
        <div className="l-label" style={{ marginBottom: 18 }}>
          {t("sectionLabel")}
        </div>
        <h2
          className="display"
          style={{
            fontSize: "clamp(40px, 4.5vw, 72px)",
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          {t("headingPart1")}
          <span style={{ color: "var(--accent)" }}>{t("headingAccent")}</span>
        </h2>
        <p
          style={{
            color: "var(--ink-2)",
            fontSize: 18,
            lineHeight: 1.55,
            maxWidth: 680,
            marginBottom: 56,
          }}
        >
          {t("intro")}
        </p>

        {/* Satellite cards */}
        <div
          className="l-grid-3 l-sat-cards"
          style={{
            gap: 0,
            border: "1px solid var(--line-2)",
            marginBottom: 64,
          }}
        >
          {SATELLITES.map((s, i) => (
            <a
              key={s.tag}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: 36,
                borderRight: i < 2 ? "1px solid var(--line-2)" : "none",
                display: "flex",
                flexDirection: "column",
                gap: 20,
                transition: "background 0.15s",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid var(--line)",
                  background: "var(--bg-2)",
                }}
              >
                <s.Icon size={22} style={{ color: "var(--ink-2)" }} />
              </div>
              <div
                className="mono"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  color: "var(--ink-3)",
                }}
              >
                {s.tag}
              </div>
              <div
                className="display"
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                {s.domain}
              </div>
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--accent)",
                  marginTop: "auto",
                }}
              >
                {t("visitCta")}
              </div>
            </a>
          ))}
        </div>

        {/* Flow / Steps */}
        <div
          style={{
            border: "1px solid var(--line-2)",
            background: "var(--bg-2)",
          }}
        >
          <div
            style={{
              padding: "48px 48px 32px",
              borderBottom: "1px solid var(--line-2)",
            }}
          >
            <h3
              className="display"
              style={{
                fontSize: "clamp(28px, 3vw, 44px)",
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              {t("flowHeading")}
            </h3>
            <p style={{ color: "var(--ink-2)", fontSize: 16, maxWidth: 600 }}>
              {t("flowSubtext")}
            </p>
          </div>

          <div
            className="l-grid-3 l-sat-steps"
            style={{
              gap: 0,
            }}
          >
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                style={{
                  padding: "36px 48px",
                  borderRight: i < 2 ? "1px solid var(--line-2)" : "none",
                  position: "relative",
                }}
              >
                {/* Step indicator with connecting line */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 20,
                  }}
                >
                  <span
                    className="mono"
                    style={{
                      width: 28,
                      height: 28,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "var(--accent)",
                      color: "var(--accent-ink)",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      flexShrink: 0,
                    }}
                  >
                    {step.num}
                  </span>
                  {i < 2 && (
                    <div
                      style={{
                        flex: 1,
                        height: 1,
                        background: "var(--line)",
                      }}
                    />
                  )}
                </div>
                <div
                  className="display"
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    marginBottom: 10,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {step.title}
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--ink-2)",
                    lineHeight: 1.55,
                  }}
                >
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

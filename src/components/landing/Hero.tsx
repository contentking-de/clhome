import { getTranslations } from "next-intl/server";
import { ArrowSvg } from "./Icons";
import HeroHeadline from "./HeroHeadline";
import LiveCounter from "./LiveCounter";

function HeroStat({
  label,
  value,
  sub,
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
}) {
  return (
    <div style={{ padding: "20px 0", borderTop: "1px solid var(--line-2)" }}>
      <div
        className="mono"
        style={{
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--ink-3)",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        className="display"
        style={{ fontSize: 34, fontWeight: 700, color: "var(--ink)" }}
      >
        {value}
      </div>
      {sub && (
        <div
          className="mono"
          style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 6 }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

export default async function Hero() {
  const t = await getTranslations("Hero");
  const lines = [t("headlineLine1"), t("headlineLine2"), t("headlineLine3")];

  return (
    <section
      id="hero"
      style={{ position: "relative", borderBottom: "1px solid var(--line-2)" }}
    >
      {/* subtle grid */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          className="grid-bg"
          style={{
            position: "absolute",
            inset: 0,
            maskImage:
              "radial-gradient(ellipse at 70% 40%, black, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 70% 40%, black, transparent 70%)",
          }}
        />
      </div>

      <div
        className="l-container"
        style={{
          position: "relative",
          padding: "72px 32px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginBottom: 28,
            flexWrap: "wrap",
          }}
        >
          <span className="l-chip">
            <span className="dot" />
            {t("chip")}
          </span>
          <span
            className="mono"
            style={{
              fontSize: 11,
              color: "var(--ink-3)",
              letterSpacing: "0.1em",
            }}
          >
            {t("chipMeta")}
          </span>
        </div>

        <HeroHeadline lines={lines} reveal={t("headlineReveal")} />
      </div>

      <div
        className="l-container l-grid-hero"
        style={{
          position: "relative",
          padding: "56px 32px 56px",
        }}
      >
        <div>
          <p
            style={{
              maxWidth: 560,
              fontSize: 18,
              lineHeight: 1.55,
              color: "var(--ink-2)",
            }}
          >
            {t.rich("leadParagraph", {
              emphasis: (chunks) => (
                <span style={{ color: "var(--ink)", fontWeight: 600 }}>
                  {chunks}
                </span>
              ),
            })}
          </p>

          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 36,
              flexWrap: "wrap",
            }}
          >
            <a
              href="#kontakt"
              className="l-btn l-btn-primary"
            >
              {t("ctaPrimary")}
              <ArrowSvg />
            </a>
            <a
              href="#engine"
              className="l-btn"
            >
              {t("ctaSecondary")}
            </a>
          </div>
        </div>

        {/* Terminal mock */}
        <div
          style={{
            border: "1px solid var(--line)",
            background: "var(--bg-2)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 14px",
              borderBottom: "1px solid var(--line-2)",
              background: "var(--bg-3)",
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--ink-2)",
              }}
            >
              /intake/run — live
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  background: "var(--line)",
                }}
              />
              <span
                style={{
                  width: 8,
                  height: 8,
                  background: "var(--line)",
                }}
              />
              <span
                style={{
                  width: 8,
                  height: 8,
                  background: "var(--accent)",
                }}
              />
            </div>
          </div>
          <div
            className="mono"
            style={{
              padding: 22,
              fontSize: 12.5,
              lineHeight: 1.8,
              color: "var(--ink-2)",
            }}
          >
            <div>
              <span style={{ color: "var(--ink-3)" }}>$</span> clever{" "}
              <span style={{ color: "var(--accent)" }}>intake</span> --file
              mandate_0812.pdf
            </div>
            <div style={{ color: "var(--ink-3)" }}>
              [OCR] extracting 14 pages ........{" "}
              <span style={{ color: "var(--accent)" }}>OK</span>
            </div>
            <div style={{ color: "var(--ink-3)" }}>
              [PARSE] claim vectors 31 / 31 ...{" "}
              <span style={{ color: "var(--accent)" }}>OK</span>
            </div>
            <div style={{ color: "var(--ink-3)" }}>
              [MATCH] § 826 BGB · § 280 BGB · DSGVO 82
            </div>
            <div style={{ color: "var(--ink-3)" }}>
              [DRAFT] Schriftsatz v.1.2 →{" "}
              <span style={{ color: "var(--ink)" }}>Ready-to-File</span>
            </div>
            <div
              style={{
                marginTop: 12,
                paddingTop: 12,
                borderTop: "1px dashed var(--line-2)",
              }}
            >
              <span style={{ color: "var(--ink-3)" }}>elapsed</span>&nbsp;{" "}
              <span style={{ color: "var(--accent)" }}>00:04:12</span>
              &nbsp;&nbsp;
              <span style={{ color: "var(--ink-3)" }}>vs. manual</span>&nbsp;{" "}
              <span
                style={{
                  color: "var(--ink-2)",
                  textDecoration: "line-through",
                }}
              >
                02:40:00
              </span>
            </div>
            <div style={{ marginTop: 8 }}>
              <span style={{ color: "var(--ink-3)" }}>$</span>{" "}
              <span className="l-blink">▌</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div
        className="l-container"
        style={{ position: "relative", padding: "0 32px 48px" }}
      >
        <div className="l-grid-stats">
          <HeroStat
            label={t("stat1Label")}
            value={t("stat1Value")}
            sub={t("stat1Sub")}
          />
          <HeroStat
            label={t("stat2Label")}
            value={t("stat2Value")}
            sub={t("stat2Sub")}
          />
          <HeroStat
            label={t("stat3Label")}
            value={<LiveCounter />}
            sub={t("stat3Sub")}
          />
          <HeroStat
            label={t("stat4Label")}
            value={t("stat4Value")}
            sub={t("stat4Sub")}
          />
        </div>
      </div>
    </section>
  );
}

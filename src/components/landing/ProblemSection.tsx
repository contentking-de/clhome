import { getTranslations } from "next-intl/server";

function Row({
  left,
  right,
  highlight,
  statusQuoLabel,
  cleverLabel,
}: {
  left: string;
  right: string;
  highlight?: boolean;
  statusQuoLabel: string;
  cleverLabel: string;
}) {
  return (
    <div
      role="row"
      className="l-grid-half"
      style={{
        borderTop: "1px solid var(--line-2)",
      }}
    >
      <div
        role="cell"
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
          {statusQuoLabel}
        </span>
        <span style={{ fontSize: 16, lineHeight: 1.5 }}>{left}</span>
      </div>
      <div
        role="cell"
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
          {cleverLabel}
        </span>
        <span style={{ fontSize: 16, lineHeight: 1.5, color: "var(--ink)" }}>
          {right}
        </span>
      </div>
    </div>
  );
}

export default async function ProblemSection() {
  const t = await getTranslations("Problem");

  const ROWS = [
    {
      l: t("compareRow1Left"),
      r: t("compareRow1Right"),
      h: true,
    },
    {
      l: t("compareRow2Left"),
      r: t("compareRow2Right"),
      h: false,
    },
    {
      l: t("compareRow3Left"),
      r: t("compareRow3Right"),
      h: false,
    },
    {
      l: t("compareRow4Left"),
      r: t("compareRow4Right"),
      h: false,
    },
    {
      l: t("compareRow5Left"),
      r: t("compareRow5Right"),
      h: false,
    },
  ];

  const PAINS = [
    {
      n: "01",
      t: t("pain01Title"),
      d: t("pain01Body"),
    },
    {
      n: "02",
      t: t("pain02Title"),
      d: t("pain02Body"),
    },
    {
      n: "03",
      t: t("pain03Title"),
      d: t("pain03Body"),
    },
  ];

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
              {t("sectionLabel")}
            </div>
            <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>
              {t("monoSubtitle")}
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
            <span style={{ color: "var(--accent)" }}>
              {t("headingLine2")}
            </span>
          </h2>
        </div>
      </div>

      <div className="l-container" style={{ padding: "0 32px" }}>
        <div
          role="table"
          aria-label="Vergleich: Status Quo vs. clever.legal"
          style={{
            border: "1px solid var(--line-2)",
            borderBottom: "none",
          }}
        >
          <div
            role="row"
            className="l-grid-half"
            style={{
              background: "var(--bg-2)",
            }}
          >
            <div role="columnheader" style={{ padding: "14px 28px" }} className="mono">
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                }}
              >
                {t("columnHeaderLeft")}
              </span>
            </div>
            <div
              role="columnheader"
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
                {t("columnHeaderRight")}
              </span>
            </div>
          </div>
          {ROWS.map((r, i) => (
            <Row
              key={i}
              left={r.l}
              right={r.r}
              highlight={r.h}
              statusQuoLabel={t("rowLabelStatusQuo")}
              cleverLabel={t("rowLabelClever")}
            />
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
              {t("footerQuote")}
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

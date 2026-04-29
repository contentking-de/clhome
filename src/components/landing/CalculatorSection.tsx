"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div style={{ marginBottom: 28 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 10,
        }}
      >
        <label htmlFor={id} style={{ fontSize: 14, color: "var(--ink-2)" }}>{label}</label>
        <span
          className="mono display"
          style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)" }}
        >
          {value.toLocaleString("de-DE")}&nbsp;
          <span
            style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 400 }}
          >
            {unit}
          </span>
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        aria-valuetext={`${value.toLocaleString("de-DE")} ${unit}`}
        style={{
          width: "100%",
          accentColor: "oklch(0.72 0.19 245)",
          height: 4,
        }}
      />
    </div>
  );
}

export default function CalculatorSection() {
  const t = useTranslations("Calculator");
  const [cases, setCases] = useState(80);
  const [mins, setMins] = useState(120);
  const [rate, setRate] = useState(280);

  const manualHours = (cases * mins) / 60;
  const savedHours = manualHours * 0.9;
  const savedEuro = savedHours * rate;
  const fmt = (n: number) => Math.round(n).toLocaleString("de-DE");

  return (
    <section
      id="calculator"
      style={{
        borderBottom: "1px solid var(--line-2)",
        background: "var(--bg)",
      }}
    >
      <div className="l-container" style={{ padding: "96px 32px" }}>
        <div
          className="l-grid-sh"
          style={{
            paddingBottom: 48,
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
            <span style={{ color: "var(--ink-2)" }}>{t("headingLine2Muted")}</span>{" "}
            <span style={{ color: "var(--accent)" }}>{t("headingLine3Accent")}</span>
          </h2>
        </div>

        <div
          className="l-grid-half"
          style={{
            gap: 0,
            border: "1px solid var(--line-2)",
          }}
        >
          <div
            className="l-split-border"
            style={{
              padding: 48,
              borderRight: "1px solid var(--line-2)",
              background: "var(--bg-2)",
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--ink-3)",
                marginBottom: 32,
              }}
            >
              {t("inputPanelLabel")}
            </div>
            <Slider
              label={t("sliderCasesLabel")}
              value={cases}
              min={10}
              max={500}
              step={5}
              unit={t("sliderCasesUnit")}
              onChange={setCases}
            />
            <Slider
              label={t("sliderMinsLabel")}
              value={mins}
              min={30}
              max={360}
              step={10}
              unit={t("sliderMinsUnit")}
              onChange={setMins}
            />
            <Slider
              label={t("sliderRateLabel")}
              value={rate}
              min={80}
              max={600}
              step={10}
              unit={t("sliderRateUnit")}
              onChange={setRate}
            />
          </div>
          <div
            style={{
              padding: 48,
              background:
                "color-mix(in oklab, var(--accent), var(--bg) 92%)",
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
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: 32,
                }}
              >
                {t("outputPanelLabel")}
              </div>
              <div style={{ marginBottom: 32 }}>
                <div
                  className="mono"
                  style={{
                    fontSize: 11,
                    color: "var(--ink-3)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {t("savedHoursLabel")}
                </div>
                <div
                  className="display"
                  style={{
                    fontSize: "clamp(56px, 10vw, 96px)",
                    fontWeight: 800,
                    color: "var(--accent)",
                    letterSpacing: "-0.05em",
                    lineHeight: 1,
                  }}
                >
                  {fmt(savedHours)}
                  <span style={{ fontSize: 32, color: "var(--ink-2)", marginLeft: "0.25em" }}>
                    {t("hoursSuffix")}
                  </span>
                </div>
              </div>
              <div>
                <div
                  className="mono"
                  style={{
                    fontSize: 11,
                    color: "var(--ink-3)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {t("savedMarginLabel")}
                </div>
                <div
                  className="display"
                  style={{
                    fontSize: "clamp(44px, 8vw, 72px)",
                    fontWeight: 800,
                    letterSpacing: "-0.05em",
                    lineHeight: 1,
                    color: "var(--ink)",
                  }}
                >
                  €&thinsp;{fmt(savedEuro)}
                </div>
              </div>
            </div>
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: "var(--ink-3)",
                letterSpacing: "0.1em",
                lineHeight: 1.6,
                marginTop: 24,
                paddingTop: 20,
                borderTop: "1px dashed var(--line-2)",
              }}
            >
              {t("footnote")}
              <br />
              {t("footnotePerYear")}{" "}
              <span style={{ color: "var(--accent)" }}>
                + €&thinsp;{fmt(savedEuro * 12)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

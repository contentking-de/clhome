"use client";

import { useState, useEffect } from "react";
import { ArrowSvg } from "./Icons";

function LiveCounter() {
  const [n, setN] = useState(52882);
  useEffect(() => {
    const t = setInterval(
      () => setN((v) => v + Math.floor(Math.random() * 3 + 1)),
      1200
    );
    return () => clearInterval(t);
  }, []);
  return <span>{n.toLocaleString("de-DE")}</span>;
}

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

export default function Hero() {
  const lines = ["Recht haben", "dauert Sekunden.", "Recht bekommen"];
  const fullText = lines.join("\n");
  const [typedCount, setTypedCount] = useState(0);
  const [showReveal, setShowReveal] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setTypedCount(fullText.length);
      setShowReveal(true);
      return;
    }
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < fullText.length) {
        i++;
        setTypedCount(i);
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setShowReveal(true), 2000);
      }
    }, 45);
    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCursorVisible((b) => !b), 530);
    return () => clearInterval(t);
  }, []);

  let offset = 0;
  const lineRanges = lines.map((line) => {
    const start = offset;
    offset += line.length + 1;
    return { start, end: start + line.length };
  });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el)
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
  };

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
            Authority Disruptor // Edition 2026
          </span>
          <span
            className="mono"
            style={{
              fontSize: 11,
              color: "var(--ink-3)",
              letterSpacing: "0.1em",
            }}
          >
            N = 4 Gründer · 50+ Jahre Erfahrung
          </span>
        </div>

        <h1
          className="display"
          style={{
            fontSize: "clamp(56px, 9vw, 148px)",
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            textAlign: "center",
            minHeight: "4.2em",
          }}
        >
          {lines.map((line, lineIdx) => {
            const { start, end } = lineRanges[lineIdx];
            const charsTyped = Math.max(0, Math.min(line.length, typedCount - start));
            const typedPart = line.slice(0, charsTyped);
            const untypedPart = line.slice(charsTyped);
            const showCursorHere =
              !showReveal && typedCount >= start && typedCount <= end;
            const isAccent = lineIdx === 2;

            const content = (
              <>
                {typedPart}
                {showCursorHere && (
                  <span
                    aria-hidden="true"
                    style={{ opacity: cursorVisible ? 1 : 0 }}
                  >
                    _
                  </span>
                )}
                {untypedPart && (
                  <span style={{ visibility: "hidden" }}>{untypedPart}</span>
                )}
              </>
            );

            return (
              <span key={lineIdx}>
                {isAccent ? (
                  <span style={{ color: "var(--accent)" }}>{content}</span>
                ) : (
                  content
                )}
                <br />
              </span>
            );
          })}
          <span
            style={{
              color: "var(--ink-2)",
              visibility: showReveal ? "visible" : "hidden",
              opacity: showReveal ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          >
            ab jetzt auch.
          </span>
        </h1>
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
            Wir verkaufen keine Software, sondern{" "}
            <span style={{ color: "var(--ink)", fontWeight: 600 }}>
              Kapazität & Zeit
            </span>
            . clever.legal installiert die KI-Infrastruktur, mit der Sie
            Einzelmandanten und Massenverfahren gleichermaßen vereinfachen und skalieren — während Ihre Konkurrenz noch PDFs
            sortiert.
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
              onClick={(e) => {
                e.preventDefault();
                scrollTo("kontakt");
              }}
              className="l-btn l-btn-primary"
            >
              Strategie-Gespräch anfordern
              <ArrowSvg />
            </a>
            <a
              href="#engine"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("engine");
              }}
              className="l-btn"
            >
              Engine ansehen
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
            label="Prüfzeit reduziert um"
            value="−90%"
            sub="Ø Mandanten-Dokument"
          />
          <HeroStat
            label="Intake → Ready-to-File"
            value="< 5 min"
            sub="war: 2h 40m"
          />
          <HeroStat
            label="Fälle automatisiert"
            value={<LiveCounter />}
            sub="Netzwerk gesamt · live"
          />
          <HeroStat
            label="Lizenz pro Gebiet"
            value="1"
            sub="Scharfschützen-Policy"
          />
        </div>
      </div>
    </section>
  );
}

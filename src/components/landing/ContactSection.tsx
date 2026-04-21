"use client";

import { useState, FormEvent, InputHTMLAttributes } from "react";
import { ArrowSvg } from "./Icons";

function TField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  multi,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  multi?: boolean;
}) {
  const commonStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid var(--line)",
    padding: "10px 0 8px",
    fontSize: 16,
    color: "var(--ink)",
    outline: "none",
    fontFamily: "inherit",
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.target.style.borderBottomColor = "var(--accent)";
  };
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.target.style.borderBottomColor = "var(--line)";
  };

  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span
        className="mono"
        style={{
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--ink-3)",
        }}
      >
        {label}
      </span>
      {multi ? (
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required
          style={{ ...commonStyle, resize: "none" }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required
          style={commonStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}
    </label>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    kanzlei: "",
    email: "",
    gebiet: "",
    msg: "",
  });
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="kontakt"
      style={{
        borderBottom: "1px solid var(--line-2)",
        background: "var(--bg-2)",
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
              § 08 — Kontakt
            </div>
            <div className="l-chip">
              <span className="dot" />
              Nur 1 Partner pro Rechtsgebiet
            </div>
          </div>
          <h2
            className="display"
            style={{
              fontSize: "clamp(44px, 5.5vw, 88px)",
              fontWeight: 700,
            }}
          >
            Verfügbarkeit
            <br />
            <span style={{ color: "var(--accent)" }}>prüfen.</span>
          </h2>
        </div>

        <div
          className="l-grid-contact"
          style={{
            gap: 0,
            border: "1px solid var(--line-2)",
            background: "var(--bg)",
          }}
        >
          <div
            className="l-split-border"
            style={{
              padding: 48,
              borderRight: "1px solid var(--line-2)",
            }}
          >
            {sent ? (
              <div
                style={{
                  minHeight: 400,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 16,
                }}
              >
                <div
                  className="mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    color: "var(--accent)",
                  }}
                >
                  [ OK ] TRANSMISSION COMPLETE
                </div>
                <div
                  className="display"
                  style={{ fontSize: 36, fontWeight: 700 }}
                >
                  Nachricht empfangen.
                </div>
                <p style={{ fontSize: 15, color: "var(--ink-2)" }}>
                  Marc oder Nico melden sich innerhalb von 24 Stunden
                  persönlich.
                </p>
              </div>
            ) : (
              <form
                onSubmit={submit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                }}
              >
                <TField
                  label="Name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                />
                <TField
                  label="Kanzlei"
                  value={form.kanzlei}
                  onChange={(v) => setForm({ ...form, kanzlei: v })}
                />
                <div
                  className="l-grid-half"
                  style={{
                    gap: 24,
                  }}
                >
                  <TField
                    label="E-Mail"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                  />
                  <TField
                    label="Rechtsgebiet / Region"
                    value={form.gebiet}
                    onChange={(v) => setForm({ ...form, gebiet: v })}
                    placeholder="z.B. Datenschutz / NRW"
                  />
                </div>
                <TField
                  label="Nachricht"
                  value={form.msg}
                  onChange={(v) => setForm({ ...form, msg: v })}
                  multi
                />
                <button
                  type="submit"
                  className="l-btn l-btn-primary"
                  style={{ alignSelf: "flex-start", marginTop: 8 }}
                >
                  Strategie-Gespräch anfordern
                  <ArrowSvg />
                </button>
              </form>
            )}
          </div>
          <div
            style={{
              padding: 48,
              display: "flex",
              flexDirection: "column",
              gap: 32,
              background:
                "color-mix(in oklab, var(--accent), var(--bg) 96%)",
            }}
          >
            <div>
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--ink-3)",
                  marginBottom: 10,
                }}
              >
                BASE
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink)" }}>
                <div style={{ fontWeight: 600 }}>
                  clever.legal GmbH i. Gr.
                </div>
                Florianweg 1
                <br />
                88677 Markdorf
              </div>
            </div>
            <div>
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--ink-3)",
                  marginBottom: 10,
                }}
              >
                KANAL
              </div>
              <a
                href="mailto:info@clever.legal"
                className="mono"
                style={{
                  fontSize: 14,
                  color: "var(--accent)",
                  display: "block",
                }}
              >
                info@clever.legal
              </a>
            </div>
            <div>
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--ink-3)",
                  marginBottom: 10,
                }}
              >
                GF
              </div>
              <div style={{ fontSize: 15, color: "var(--ink)" }}>
                RA Marc Ellerbrock
              </div>
            </div>
            <div
              className="mono"
              style={{
                marginTop: "auto",
                paddingTop: 24,
                borderTop: "1px dashed var(--line-2)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "var(--ink-3)",
                  letterSpacing: "0.1em",
                  lineHeight: 1.7,
                }}
              >
                SLA RESPONSE &nbsp; 24h
                <br />
                SIGNAL-CHECK &nbsp; &lt; 7 TAGE
                <br />
                NDA OPTIONAL &nbsp; JA
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    kanzlei: "",
    email: "",
    gebiet: "",
    msg: "",
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Senden fehlgeschlagen");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Senden fehlgeschlagen");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
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
        <div className="display" style={{ fontSize: 36, fontWeight: 700 }}>
          Nachricht empfangen.
        </div>
        <p style={{ fontSize: 15, color: "var(--ink-2)" }}>
          Marc oder Nico melden sich innerhalb von 24 Stunden persönlich.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      style={{ display: "flex", flexDirection: "column", gap: 24 }}
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
      <div className="l-grid-half" style={{ gap: 24 }}>
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
        disabled={sending}
        className="l-btn l-btn-primary"
        style={{ alignSelf: "flex-start", marginTop: 8, opacity: sending ? 0.6 : 1 }}
      >
        {sending ? "Wird gesendet…" : "Strategie-Gespräch anfordern"}
        {!sending && <ArrowSvg />}
      </button>
      {error && (
        <p style={{ color: "var(--danger)", fontSize: 14, marginTop: 4 }}>{error}</p>
      )}
    </form>
  );
}

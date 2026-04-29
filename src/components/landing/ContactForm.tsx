"use client";

import { useState, FormEvent, InputHTMLAttributes } from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("ContactForm");

  const [form, setForm] = useState({
    name: "",
    kanzlei: "",
    email: "",
    gebiet: "",
    service: "",
    msg: "",
    _hp: "",
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
        throw new Error(data.error || t("errorSendFailed"));
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errorSendFailed"));
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
          {t("statusTransmissionComplete")}
        </div>
        <div className="display" style={{ fontSize: 36, fontWeight: 700 }}>
          {t("successTitle")}
        </div>
        <p style={{ fontSize: 15, color: "var(--ink-2)" }}>
          {t("successBody")}
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
        label={t("labelName")}
        value={form.name}
        onChange={(v) => setForm({ ...form, name: v })}
      />
      <TField
        label={t("labelKanzlei")}
        value={form.kanzlei}
        onChange={(v) => setForm({ ...form, kanzlei: v })}
      />
      <div className="l-grid-half" style={{ gap: 24 }}>
        <TField
          label={t("labelEmail")}
          type="email"
          value={form.email}
          onChange={(v) => setForm({ ...form, email: v })}
        />
        <TField
          label={t("labelRechtsgebietRegion")}
          value={form.gebiet}
          onChange={(v) => setForm({ ...form, gebiet: v })}
          placeholder={t("placeholderRechtsgebiet")}
        />
      </div>
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
          {t("labelInteresseAn")}
        </span>
        <select
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          required
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            borderBottom: "1px solid var(--line)",
            padding: "10px 0 8px",
            fontSize: 16,
            color: form.service ? "var(--ink)" : "var(--ink-3)",
            outline: "none",
            fontFamily: "inherit",
            cursor: "pointer",
            appearance: "none",
            WebkitAppearance: "none",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0 center",
          }}
          onFocus={(e) => { e.target.style.borderBottomColor = "var(--accent)"; }}
          onBlur={(e) => { e.target.style.borderBottomColor = "var(--line)"; }}
        >
          <option value="" disabled>{t("selectPleaseChoose")}</option>
          <option value="KI-Schulungen & Workshops">{t("optionKiSchulungen")}</option>
          <option value="KI-Integration in Kanzleien">{t("optionKiIntegration")}</option>
          <option value="Lead-Satelliten">{t("optionLeadSatelliten")}</option>
          <option value="Online-Marketing Services">{t("optionOnlineMarketing")}</option>
          <option value="Sonstiges">{t("optionSonstiges")}</option>
        </select>
      </label>
      <TField
        label={t("labelNachricht")}
        value={form.msg}
        onChange={(v) => setForm({ ...form, msg: v })}
        multi
      />
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden", tabIndex: -1 } as React.CSSProperties}>
        <input
          type="text"
          name="_hp"
          autoComplete="off"
          tabIndex={-1}
          value={form._hp}
          onChange={(e) => setForm({ ...form, _hp: e.target.value })}
        />
      </div>
      <button
        type="submit"
        disabled={sending}
        className="l-btn l-btn-primary"
        style={{ alignSelf: "flex-start", marginTop: 8, opacity: sending ? 0.6 : 1 }}
      >
        {sending ? t("submitSending") : t("submitDefault")}
        {!sending && <ArrowSvg />}
      </button>
      {error && (
        <p role="alert" style={{ color: "var(--danger)", fontSize: 14, marginTop: 4 }}>{error}</p>
      )}
    </form>
  );
}

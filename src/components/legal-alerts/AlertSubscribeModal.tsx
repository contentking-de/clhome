"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AlertSubscribeModal({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already" | "error">("idle");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const t = useTranslations("AlertSubscribe");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/alerts/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), _hp: hp }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus(data.alreadyConfirmed ? "already" : "success");
    } catch {
      setStatus("error");
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setHp("");
    setStatus("idle");
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="alert-modal"
      aria-labelledby="alert-dialog-title"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="alert-modal-inner">
        <button onClick={onClose} className="alert-modal-close" aria-label={t("closeLabel")}>✕</button>

        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>📬</div>
            <h2 className="display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
              {t("successTitle")}
            </h2>
            <p style={{ color: "var(--ink-2)", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
              {t("successText")}
            </p>
            <button onClick={handleReset} className="l-btn l-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              {t("successButton")}
            </button>
          </div>
        ) : status === "already" ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
            <h2 className="display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
              {t("alreadyTitle")}
            </h2>
            <p style={{ color: "var(--ink-2)", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
              {t("alreadyText")}
            </p>
            <button onClick={handleReset} className="l-btn l-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              {t("alreadyButton")}
            </button>
          </div>
        ) : (
          <>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 12 }}>
              LEGAL ALERTS
            </div>
            <h2 id="alert-dialog-title" className="display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
              {t("modalTitle")}
            </h2>
            <p style={{ color: "var(--ink-2)", fontSize: 13, lineHeight: 1.5, marginBottom: 24 }}>
              {t("modalLead")}
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label htmlFor="alert-name" className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)" }}>
                  {t("nameLabel")}
                </label>
                <input
                  id="alert-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("namePlaceholder")}
                  required
                  className="alert-modal-input"
                  aria-required="true"
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label htmlFor="alert-email" className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)" }}>
                  {t("emailLabel")}
                </label>
                <input
                  id="alert-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  required
                  className="alert-modal-input"
                  aria-required="true"
                  aria-describedby={status === "error" ? "alert-error" : undefined}
                />
              </div>

              {status === "error" && (
                <div id="alert-error" role="alert" style={{ fontSize: 12, color: "var(--danger)" }}>
                  {t("errorMessage")}
                </div>
              )}

              <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
                <input
                  type="text"
                  name="_hp"
                  autoComplete="off"
                  tabIndex={-1}
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="l-btn l-btn-primary"
                style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
              >
                {status === "loading" ? t("submitLoading") : t("submitLabel")}
              </button>
            </form>

            <p className="mono" style={{ fontSize: 9, color: "var(--ink-3)", letterSpacing: "0.06em", marginTop: 16, lineHeight: 1.6 }}>
              {t("disclaimer")}
            </p>
          </>
        )}
      </div>
    </dialog>
  );
}

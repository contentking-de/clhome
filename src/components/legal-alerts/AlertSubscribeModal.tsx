"use client";

import { useState, useRef, useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AlertSubscribeModal({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already" | "error">("idle");
  const dialogRef = useRef<HTMLDialogElement>(null);

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
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
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
    setStatus("idle");
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="alert-modal"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="alert-modal-inner">
        <button onClick={onClose} className="alert-modal-close" aria-label="Schließen">✕</button>

        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>📬</div>
            <h2 className="display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
              Bestätigungsmail gesendet
            </h2>
            <p style={{ color: "var(--ink-2)", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
              Wir haben Ihnen eine E-Mail geschickt. Bitte klicken Sie auf den
              Bestätigungslink, um Ihren Alert zu aktivieren.
            </p>
            <button onClick={handleReset} className="l-btn l-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Verstanden
            </button>
          </div>
        ) : status === "already" ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
            <h2 className="display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
              Bereits abonniert
            </h2>
            <p style={{ color: "var(--ink-2)", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
              Diese E-Mail-Adresse ist bereits für die Legal Alerts registriert.
            </p>
            <button onClick={handleReset} className="l-btn l-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Schließen
            </button>
          </div>
        ) : (
          <>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 12 }}>
              LEGAL ALERTS
            </div>
            <h2 className="display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
              Alert einrichten
            </h2>
            <p style={{ color: "var(--ink-2)", fontSize: 13, lineHeight: 1.5, marginBottom: 24 }}>
              Erhalten Sie neue Sammelklagen-Frühwarnungen und Hot Legal Topics
              direkt per E-Mail — immer wenn es neue Meldungen gibt.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ihr Name"
                required
                className="alert-modal-input"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ihre E-Mail-Adresse"
                required
                className="alert-modal-input"
              />

              {status === "error" && (
                <div style={{ fontSize: 12, color: "var(--danger)" }}>
                  Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="l-btn l-btn-primary"
                style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
              >
                {status === "loading" ? "Wird gesendet…" : "Bestätigungsmail anfordern"}
              </button>
            </form>

            <p className="mono" style={{ fontSize: 9, color: "var(--ink-3)", letterSpacing: "0.06em", marginTop: 16, lineHeight: 1.6 }}>
              Double-Opt-In · Sie erhalten eine E-Mail zur Bestätigung.
              Kein Spam, jederzeit abbestellbar.
            </p>
          </>
        )}
      </div>
    </dialog>
  );
}

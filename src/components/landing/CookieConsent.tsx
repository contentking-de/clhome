"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const CONSENT_KEY = "cl_cookie_consent";
const CONSENT_VERSION = 1;

type ConsentCategory = "necessary" | "analytics" | "marketing";

interface ConsentState {
  version: number;
  timestamp: string;
  categories: Record<ConsentCategory, boolean>;
}

const CATEGORIES: { key: ConsentCategory; label: string; desc: string; locked?: boolean }[] = [
  { key: "necessary", label: "Technisch notwendig", desc: "Session, Sicherheit, Grundfunktionen", locked: true },
  { key: "analytics", label: "Analyse", desc: "Anonyme Nutzungsstatistiken zur Verbesserung der Website" },
  { key: "marketing", label: "Marketing", desc: "Personalisierte Inhalte und Werbung" },
];

function readConsent(): ConsentState | null {
  if (typeof document === "undefined") return null;
  try {
    const raw = document.cookie
      .split("; ")
      .find((c) => c.startsWith(`${CONSENT_KEY}=`))
      ?.split("=")
      .slice(1)
      .join("=");
    if (!raw) return null;
    const parsed: ConsentState = JSON.parse(decodeURIComponent(raw));
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(categories: Record<ConsentCategory, boolean>) {
  const state: ConsentState = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    categories,
  };
  const maxAge = 365 * 24 * 60 * 60;
  document.cookie = `${CONSENT_KEY}=${encodeURIComponent(JSON.stringify(state))};path=/;max-age=${maxAge};SameSite=Lax`;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selections, setSelections] = useState<Record<ConsentCategory, boolean>>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const save = useCallback((categories: Record<ConsentCategory, boolean>) => {
    writeConsent(categories);
    setVisible(false);
    window.dispatchEvent(new CustomEvent("cookie-consent-update", { detail: categories }));
  }, []);

  const acceptAll = useCallback(() => {
    save({ necessary: true, analytics: true, marketing: true });
  }, [save]);

  const rejectOptional = useCallback(() => {
    save({ necessary: true, analytics: false, marketing: false });
  }, [save]);

  const saveCustom = useCallback(() => {
    save({ ...selections, necessary: true });
  }, [save, selections]);

  if (!visible) return null;

  return (
    <div className="consent-backdrop" role="dialog" aria-label="Cookie-Einstellungen" aria-modal="true">
      <div className="consent-banner">
        <div className="consent-header">
          <span className="mono consent-label">COOKIE-EINSTELLUNGEN</span>
        </div>

        <p className="consent-text">
          Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung zu bieten.
          Technisch notwendige Cookies sind immer aktiv. Für alle weiteren Cookies
          benötigen wir Ihre Einwilligung.{" "}
          <Link href="/datenschutz" className="consent-link">
            Datenschutzerklärung
          </Link>
        </p>

        {showDetails && (
          <div className="consent-categories">
            {CATEGORIES.map((cat) => (
              <label key={cat.key} className="consent-category">
                <div className="consent-toggle-wrap">
                  <input
                    type="checkbox"
                    checked={cat.locked ? true : selections[cat.key]}
                    disabled={cat.locked}
                    onChange={(e) =>
                      setSelections((prev) => ({ ...prev, [cat.key]: e.target.checked }))
                    }
                    className="consent-checkbox"
                  />
                  <span className={`consent-toggle ${cat.locked ? "locked" : ""}`} />
                </div>
                <div className="consent-cat-info">
                  <span className="consent-cat-label">{cat.label}</span>
                  <span className="consent-cat-desc">{cat.desc}</span>
                </div>
              </label>
            ))}
          </div>
        )}

        <div className="consent-actions">
          {showDetails ? (
            <>
              <button onClick={saveCustom} className="l-btn l-btn-primary consent-btn">
                Auswahl speichern
              </button>
              <button onClick={acceptAll} className="l-btn consent-btn">
                Alle akzeptieren
              </button>
            </>
          ) : (
            <>
              <button onClick={acceptAll} className="l-btn l-btn-primary consent-btn">
                Alle akzeptieren
              </button>
              <button onClick={rejectOptional} className="l-btn consent-btn">
                Nur notwendige
              </button>
              <button
                onClick={() => setShowDetails(true)}
                className="consent-details-btn"
              >
                Einstellungen
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function CookieSettingsButton() {
  return (
    <button
      onClick={() => {
        document.cookie = `${CONSENT_KEY}=;path=/;max-age=0`;
        window.location.reload();
      }}
      className="consent-reopen"
    >
      Cookie-Einstellungen
    </button>
  );
}

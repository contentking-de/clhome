"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const CONSENT_KEY = "cl_cookie_consent";
const CONSENT_VERSION = 1;

type ConsentCategory = "necessary" | "analytics" | "marketing";

interface ConsentState {
  version: number;
  timestamp: string;
  categories: Record<ConsentCategory, boolean>;
}

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
  const t = useTranslations("CookieConsent");
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selections, setSelections] = useState<Record<ConsentCategory, boolean>>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  const CATEGORIES: { key: ConsentCategory; label: string; desc: string; locked?: boolean }[] = [
    { key: "necessary", label: t("categoryNecessaryLabel"), desc: t("categoryNecessaryDesc"), locked: true },
    { key: "analytics", label: t("categoryAnalyticsLabel"), desc: t("categoryAnalyticsDesc") },
    { key: "marketing", label: t("categoryMarketingLabel"), desc: t("categoryMarketingDesc") },
  ];

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
    <div className="consent-backdrop" role="dialog" aria-label={t("dialogAriaLabel")} aria-modal="true">
      <div className="consent-banner">
        <div className="consent-header">
          <span className="mono consent-label">{t("bannerTitle")}</span>
        </div>

        <p className="consent-text">
          {t("bannerIntro")}{" "}
          <Link href="/datenschutz" className="consent-link">
            {t("privacyLink")}
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
                {t("saveSelection")}
              </button>
              <button onClick={acceptAll} className="l-btn consent-btn">
                {t("acceptAll")}
              </button>
            </>
          ) : (
            <>
              <button onClick={acceptAll} className="l-btn l-btn-primary consent-btn">
                {t("acceptAll")}
              </button>
              <button onClick={rejectOptional} className="l-btn consent-btn">
                {t("rejectOptional")}
              </button>
              <button
                onClick={() => setShowDetails(true)}
                className="consent-details-btn"
              >
                {t("openSettings")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function CookieSettingsButton() {
  const t = useTranslations("CookieConsent");
  return (
    <button
      onClick={() => {
        document.cookie = `${CONSENT_KEY}=;path=/;max-age=0`;
        window.location.reload();
      }}
      className="consent-reopen mono"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <circle cx="8" cy="9" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="14" cy="7.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="16" cy="13" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="10" cy="14" r="1" fill="currentColor" stroke="none" />
        <circle cx="7" cy="13" r="0.8" fill="currentColor" stroke="none" />
        <circle cx="13" cy="17" r="1" fill="currentColor" stroke="none" />
      </svg>
      {t("cookieSettingsButton")}
    </button>
  );
}

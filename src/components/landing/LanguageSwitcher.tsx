"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useAlternateUrl } from "./AlternateUrlContext";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { alternate } = useAlternateUrl();

  function switchLocale() {
    const newLocale = locale === "de" ? "en" : "de";

    if (alternate && alternate.locale === newLocale) {
      router.replace(alternate.path, { locale: newLocale });
    } else {
      router.replace(pathname, { locale: newLocale });
    }
  }

  return (
    <button
      onClick={switchLocale}
      className="mono"
      style={{
        fontSize: 11,
        letterSpacing: "0.1em",
        padding: "6px 10px",
        border: "1px solid var(--line-2)",
        background: "transparent",
        color: "var(--ink-2)",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        transition: "all 0.15s",
      }}
      aria-label={locale === "de" ? "Switch to English" : "Auf Deutsch wechseln"}
    >
      <span style={{ fontWeight: locale === "de" ? 700 : 400, color: locale === "de" ? "var(--ink)" : "var(--ink-3)" }}>
        DE
      </span>
      <span style={{ color: "var(--line)" }}>/</span>
      <span style={{ fontWeight: locale === "en" ? 700 : 400, color: locale === "en" ? "var(--ink)" : "var(--ink-3)" }}>
        EN
      </span>
    </button>
  );
}

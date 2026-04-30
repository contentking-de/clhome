"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowSvg, IconBell } from "./Icons";
import LanguageSwitcher from "./LanguageSwitcher";

function Ticker() {
  const items = [
    { k: "BGH", v: "VI ZR 14/26 — Meta-Scraping, Urt. v. 03.04.2026" },
    { k: "CASES", v: "1.284.992 automatisiert" },
    { k: "UPTIME", v: "99.982%" },
    { k: "SESSION", v: "SYS:READY // beA:ONLINE" },
    { k: "WATCH", v: "EuGH C-473/25 Cookie-Consent — Hearing 28.04" },
    { k: "DRAFT", v: "Ø 00:04:12 Intake → Ready-to-File" },
    { k: "SIGNAL", v: "Dieselgate 2.0 — 17 neue Quellen / 24h" },
    { k: "DPA", v: "LfDI BW — Bußgeldwelle §26 BDSG" },
  ];
  const doubled = [...items, ...items];
  return (
    <div
      className="hair-b"
      style={{
        background: "var(--bg-2)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            padding: "9px 14px",
            borderRight: "1px solid var(--line-2)",
            background: "var(--bg)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
          }}
        >
          <span
            className="l-blink"
            style={{
              width: 8,
              height: 8,
              background: "var(--accent)",
              display: "inline-block",
            }}
          />
          <span
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ink)",
            }}
          >
            LIVE
          </span>
        </div>
        <div style={{ flex: 1, overflow: "hidden", padding: "9px 0" }}>
          <div
            className="ticker-track mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {doubled.map((it, i) => (
              <span
                key={i}
                style={{
                  display: "inline-flex",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <span style={{ color: "var(--accent)" }}>{it.k}</span>
                <span style={{ color: "var(--ink-2)" }}>{it.v}</span>
                <span style={{ color: "var(--line)" }}>◆</span>
              </span>
            ))}
          </div>
        </div>
        <div
          className="mono l-ticker-tz"
          style={{
            padding: "9px 14px",
            borderLeft: "1px solid var(--line-2)",
            background: "var(--bg)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-3)",
            flexShrink: 0,
          }}
        >
          DE / EU &nbsp;·&nbsp; UTC+1
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <Link
      href="/"
      style={{ display: "inline-flex", alignItems: "baseline", gap: 0 }}
    >
      <span
        className="display"
        style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.04em" }}
      >
        clever
      </span>
      <span
        className="display"
        style={{
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          color: "var(--accent)",
        }}
      >
        .legal
      </span>
    </Link>
  );
}

export default function SubpageHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("Header");

  const NAV_LINKS = [
    { href: "/fuer-anwaelte", label: t("navFuerAnwaelte"), bell: false },
    { href: "/fuer-unternehmen", label: t("navUnternehmen"), bell: false },
    { href: "/legal-alerts", label: t("navLegalAlerts"), bell: true },
    { href: "/story", label: t("navStory"), bell: false },
    { href: "/blog", label: t("navBlog"), bell: false },
    { href: "/kontakt", label: t("navKontakt"), bell: false },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "color-mix(in oklab, var(--bg), transparent 10%)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--line-2)",
      }}
    >
      <Ticker />
      <div
        className="l-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <Logo />
          <nav className="hidden xl:flex" style={{ gap: 24 }}>
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="mono"
                style={{
                  fontSize: 12,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--ink-2)",
                  padding: "4px 0",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                {l.bell && <IconBell size={14} style={{ color: "var(--accent)" }} />}
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div
          className="hidden xl:flex"
          style={{ alignItems: "center", gap: 12 }}
        >
          <LanguageSwitcher />
          <Link
            href="/kontakt"
            className="l-btn l-btn-primary"
            style={{ padding: "10px 16px" }}
          >
            {t("ctaStrategieGespraech")}
            <ArrowSvg />
          </Link>
        </div>

        {/* Mobile: language switcher + burger */}
        <div className="flex items-center gap-2 xl:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={t("mobileMenuToggleAria")}
            style={{ padding: 8 }}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--ink)"
              strokeWidth={1.6}
            >
              {mobileOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            borderTop: "1px solid var(--line-2)",
            background: "var(--bg-2)",
            padding: "16px 32px",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="mono"
                style={{
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--ink-2)",
                }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/kontakt"
              onClick={() => setMobileOpen(false)}
              className="l-btn l-btn-primary"
              style={{ alignSelf: "flex-start", marginTop: 8 }}
            >
              {t("ctaStrategieGespraech")}
              <ArrowSvg />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

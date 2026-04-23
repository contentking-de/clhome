"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowSvg, IconBell } from "./Icons";

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
      role="marquee"
      aria-label="Live-Ticker mit aktuellen Rechtsnachrichten"
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
            aria-hidden="true"
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
            aria-hidden="true"
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
                <span style={{ color: "var(--line)" }} aria-hidden="true">◆</span>
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
      aria-label="clever.legal – Startseite"
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

const NAV_LINKS = [
  { id: "anwaelte", label: "Für Anwälte", bell: false, href: "/fuer-anwaelte" },
  { id: "services", label: "Services", bell: false },
  { id: "engine", label: "Engine", bell: false },
  { id: "satelliten", label: "Satelliten", bell: false },
  { id: "alerts", label: "Legal Alerts", bell: true, href: "/legal-alerts" },
  { id: "story", label: "Story", bell: false, href: "/story" },
  { id: "blog", label: "Blog", bell: false, href: "/blog" },
  { id: "kontakt", label: "Kontakt", bell: false, href: "/kontakt" },
];

export { Logo };

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el)
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    setMobileOpen(false);
  };

  const linkHref = (l: (typeof NAV_LINKS)[number]) => {
    if (l.href) return l.href;
    if (isHome) return `#${l.id}`;
    return `/#${l.id}`;
  };

  const handleClick = (e: React.MouseEvent, l: (typeof NAV_LINKS)[number]) => {
    if (l.href) return;
    if (isHome) {
      e.preventDefault();
      scrollTo(l.id);
    }
  };

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && mobileOpen) {
      setMobileOpen(false);
    }
  }, [mobileOpen]);

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  useEffect(() => {
    if (mobileOpen && mobileNavRef.current) {
      const firstLink = mobileNavRef.current.querySelector("a, button");
      if (firstLink instanceof HTMLElement) firstLink.focus();
    }
  }, [mobileOpen]);

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
          <nav
            className="hidden xl:flex"
            aria-label="Hauptnavigation"
            style={{ gap: 24 }}
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={linkHref(l)}
                onClick={(e) => handleClick(e, l)}
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
                  cursor: "pointer",
                }}
              >
                {l.bell && <IconBell size={14} aria-hidden="true" style={{ color: "var(--accent)" }} />}
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div
          className="hidden xl:flex"
          style={{ alignItems: "center", gap: 12 }}
        >
          <span
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.1em",
              color: "var(--ink-3)",
            }}
          >
            [ 178 / 250 ] Gebiete verfügbar
          </span>
          <a
            href={isHome ? "#kontakt" : "/kontakt"}
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                scrollTo("kontakt");
              }
            }}
            className="l-btn l-btn-primary"
            style={{ padding: "10px 16px" }}
          >
            Strategie-Gespräch
            <ArrowSvg />
          </a>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="xl:hidden"
          aria-label="Menü"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          style={{ padding: 8 }}
        >
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--ink)"
            strokeWidth={1.6}
            aria-hidden="true"
          >
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          ref={mobileNavRef}
          style={{
            borderTop: "1px solid var(--line-2)",
            background: "var(--bg-2)",
            padding: "16px 32px",
          }}
        >
          <nav aria-label="Mobile Navigation" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={linkHref(l)}
                onClick={(e) => { handleClick(e, l); setMobileOpen(false); }}
                className="mono"
                style={{
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--ink-2)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  cursor: "pointer",
                }}
              >
                {l.bell && <IconBell size={14} aria-hidden="true" style={{ color: "var(--accent)" }} />}
                {l.label}
              </a>
            ))}
            <a
              href={isHome ? "#kontakt" : "/kontakt"}
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  scrollTo("kontakt");
                }
                setMobileOpen(false);
              }}
              className="l-btn l-btn-primary"
              style={{ alignSelf: "flex-start", marginTop: 8 }}
            >
              Strategie-Gespräch
              <ArrowSvg />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

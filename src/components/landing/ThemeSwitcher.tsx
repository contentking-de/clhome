"use client";

import { useTheme } from "./ThemeProvider";

function SunIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx={12} cy={12} r={5} />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function ThemeSwitcher() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
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
      aria-label={theme === "dark" ? "Zum Light Mode wechseln" : "Zum Dark Mode wechseln"}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { Logo } from "./Header";
import { CookieSettingsButton } from "./CookieConsent";

export default async function Footer() {
  const t = await getTranslations("Footer");

  const COLS = [
    {
      t: t("colProductTitle"),
      l: [
        { label: t("colProductEngine"), href: "/#engine" },
        { label: t("colProductCustomIntakeAi"), href: "/#engine" },
        { label: t("colProductAutoDrafting"), href: "/#engine" },
        { label: t("colProductPerformanceSatelliten"), href: "/#engine" },
        { label: t("colProductTheWorkshop"), href: "/#engine" },
      ],
    },
    {
      t: t("colAudiencesTitle"),
      l: [
        { label: t("colAudiencesAnwaelte"), href: "/#anwaelte" },
        { label: t("colAudiencesUnternehmen"), href: "/#anwaelte" },
        { label: t("colAudiencesPrivatkunden"), href: "/#anwaelte" },
      ],
    },
    {
      t: t("colResourcesTitle"),
      l: [
        { label: t("colResourcesLegalAlerts"), href: "/legal-alerts" },
        { label: t("colResourcesBlog"), href: "/blog" },
        { label: t("colResourcesStory"), href: "/story" },
        { label: t("colResourcesKontakt"), href: "/kontakt" },
      ],
    },
    {
      t: t("colLegalTitle"),
      l: [
        { label: t("colLegalImpressum"), href: "/impressum" },
        { label: t("colLegalDatenschutz"), href: "/datenschutz" },
        { label: t("colLegalBarrierefreiheit"), href: "/barrierefreiheit" },
        { label: t("colLegalAgb"), href: "#" },
      ],
    },
  ];

  return (
    <footer style={{ background: "var(--bg)" }}>
      {/* Mega statement */}
      <div
        style={{
          borderTop: "1px solid var(--line-2)",
          borderBottom: "1px solid var(--line-2)",
          padding: "96px 0",
        }}
      >
        <div className="l-container" style={{ textAlign: "center" }}>
          <div className="l-label" style={{ marginBottom: 24 }}>
            {t("epilogLabel")}
          </div>
          <h3
            className="display"
            style={{
              fontSize: "clamp(48px, 8vw, 148px)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
          >
            {t("epilogHeadlineLine1")}
            <br />
            <span style={{ color: "var(--accent)" }}>
              {t("epilogHeadlineLine2Accent")}
            </span>
          </h3>
        </div>
      </div>

      <div className="l-container" style={{ padding: "64px 32px 32px" }}>
        <div
          className="l-grid-footer"
          style={{
            paddingBottom: 48,
            borderBottom: "1px solid var(--line-2)",
          }}
        >
          <div>
            <Logo />
            <p
              style={{
                fontSize: 13,
                color: "var(--ink-3)",
                lineHeight: 1.55,
                marginTop: 16,
                maxWidth: 280,
              }}
            >
              {t("brandDescription")}
            </p>
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: "var(--ink-3)",
                letterSpacing: "0.1em",
                marginTop: 32,
              }}
            >
              {t("establishedLine")}
            </div>
          </div>
          {COLS.map((c) => (
            <nav key={c.t} aria-label={c.t}>
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: 20,
                }}
              >
                {c.t}
              </div>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {c.l.map((li) => (
                  <li
                    key={li.label}
                    style={{ fontSize: 14, color: "var(--ink-2)" }}
                  >
                    {li.href.startsWith("/") ? (
                      <Link href={li.href} style={{ color: "inherit" }}>
                        {li.label}
                      </Link>
                    ) : (
                      <a href={li.href} style={{ color: "inherit" }}>
                        {li.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div
          style={{
            padding: "24px 0 8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div
            className="mono"
            style={{
              fontSize: 11,
              color: "var(--ink-3)",
              letterSpacing: "0.1em",
            }}
          >
            {t("copyright")}
          </div>
          <div
            className="mono"
            style={{
              fontSize: 11,
              color: "var(--ink-3)",
              letterSpacing: "0.1em",
              display: "flex",
              gap: 20,
            }}
          >
            <span>SYS:READY</span>
            <span>beA:ONLINE</span>
            <span>v.26.04 / BUILD 0421</span>
          </div>
          <CookieSettingsButton />
        </div>
      </div>
    </footer>
  );
}

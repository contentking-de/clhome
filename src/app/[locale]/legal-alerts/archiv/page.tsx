import { getArchivedEditions, getReportMeta } from "@/lib/skynet";
import { translatePeriod } from "@/lib/alert-types";
import SubpageShell from "@/components/landing/SubpageShell";
import { Link } from "@/i18n/routing";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("LegalAlertsPage");
  return buildPageMetadata({
    title: `${t("archivLabel")} | Legal Alerts | clever.legal`,
    description: t("archivBrowse"),
    path: "/legal-alerts/archiv",
    locale,
  });
}

export default async function ArchivPage() {
  const editions = await getArchivedEditions();
  const locale = await getLocale();
  const t = await getTranslations("LegalAlertsPage");
  const dateFmt = locale === "en" ? "en-US" : "de-DE";

  return (
    <SubpageShell>
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container l-article-pad" style={{ padding: "64px 32px 96px" }}>
          <Link
            href="/legal-alerts"
            className="mono"
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--accent)",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 32,
            }}
          >
            {t("backToAlerts")}
          </Link>

          <div style={{ marginBottom: 48 }}>
            <div className="l-label" style={{ marginBottom: 18 }}>{t("archivLabel")}</div>
            <h1 className="display" style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 700, marginBottom: 16 }}>
              {t("archivHeading")}
            </h1>
            <p style={{ color: "var(--ink-2)", fontSize: 18, maxWidth: 640 }}>
              {t("archivBrowse")}
            </p>
          </div>

          {editions.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.14em" }}>
                {t("archivEmpty")}
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid var(--line-2)" }}>
              {editions.map((edition, i) => {
                const date = new Date(edition.generatedAt);
                return (
                  <div
                    key={edition.id}
                    className="l-archiv-row"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 32,
                      padding: "24px 32px",
                      borderBottom: i < editions.length - 1 ? "1px solid var(--line-2)" : "none",
                    }}
                  >
                    <div className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--ink-3)", minWidth: 160 }}>
                      {date.toLocaleDateString(dateFmt, { day: "2-digit", month: "long", year: "numeric" }).toUpperCase()}
                    </div>
                    <div className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--ink-3)", minWidth: 120 }}>
                      {translatePeriod(edition.period, locale)} · {t("archivSources", { count: edition.stats.totalArticles })}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginLeft: "auto" }}>
                      {Object.keys(edition.reports).map((key) => {
                        const meta = getReportMeta(key, locale);
                        if (!meta) return null;
                        return (
                          <Link key={key} href={`/legal-alerts/archiv/${edition.id}/${meta.slug}`} className="l-chip" style={{ fontSize: 10 }}>
                            {meta.title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </SubpageShell>
  );
}

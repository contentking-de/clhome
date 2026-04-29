import {
  getCurrentEdition,
  getArchivedEditions,
  getReportKeyBySlug,
  getReportMeta,
  getAllReportMeta,
  getItemsForEdition,
  getCategoryForSlug,
  getTypesForCategory,
} from "@/lib/skynet";
import { notFound } from "next/navigation";
import SubpageShell from "@/components/landing/SubpageShell";
import MarkdownRenderer from "@/components/legal-alerts/MarkdownRenderer";
import AlertItemsView from "@/components/legal-alerts/AlertItemsView";
import AlertSubscribeButton from "@/components/legal-alerts/AlertSubscribeButton";
import { Link } from "@/i18n/routing";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("LegalAlertsPage");
  const key = getReportKeyBySlug(slug);
  if (!key) return { title: t("notFound") };
  const meta = getReportMeta(key, locale);
  if (!meta) return { title: t("notFound") };
  return {
    title: `${meta.title} | Legal Alerts | clever.legal`,
    description: meta.subtitle,
  };
}

export default async function LegalAlertDetailPage({ params }: Props) {
  const { slug } = await params;
  const key = getReportKeyBySlug(slug);
  if (!key) notFound();

  const locale = await getLocale();
  const t = await getTranslations("LegalAlertsPage");
  const meta = getReportMeta(key, locale)!;
  const dateFmt = locale === "en" ? "en-US" : "de-DE";

  const [edition, archived] = await Promise.all([
    getCurrentEdition(),
    getArchivedEditions(),
  ]);
  if (!edition) notFound();

  const category = getCategoryForSlug(slug);
  const items = category
    ? await getItemsForEdition(edition.id, category)
    : [];

  const reports =
    locale === "en" && edition.reportsEn
      ? (edition.reportsEn as Record<string, string>)
      : (edition.reports as Record<string, string>);
  const markdown = reports[key];
  const hasItems = items.length > 0;

  const generatedDate = new Date(edition.generatedAt);
  const allMeta = getAllReportMeta(locale);
  const otherReports = Object.entries(allMeta).filter(
    ([k]) => k !== key && edition.reports[k]
  );
  const archivedWithReport = archived.filter((e) => e.reports[key]);

  return (
    <SubpageShell>
      <article style={{ borderBottom: "1px solid var(--line-2)" }}>
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

          <header style={{ marginBottom: 48 }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--danger)", marginBottom: 16 }}>
              #{meta.slug.toUpperCase()}
            </div>
            <h1 className="display" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 800, marginBottom: 12 }}>
              {meta.title}
            </h1>
            <p style={{ color: "var(--ink-2)", fontSize: 16, marginBottom: 20 }}>{meta.subtitle}</p>
            <div className="mono l-meta-row" style={{ display: "flex", gap: 24, fontSize: 11, letterSpacing: "0.1em", color: "var(--ink-3)" }}>
              <span>
                {generatedDate.toLocaleDateString(dateFmt, { day: "2-digit", month: "long", year: "numeric" }).toUpperCase()}
              </span>
              <span>{edition.period.toUpperCase()}</span>
              <span>{edition.stats.totalArticles}{t("sourcesLabel")}</span>
              {hasItems && <span>{items.length} {t("messagesLabel")}</span>}
            </div>
          </header>

          {hasItems ? (
            <div className="l-grid-article-wide">
              <div>
                <AlertItemsView
                  items={items}
                  availableTypes={category ? [...getTypesForCategory(category)] : []}
                />
              </div>
              <aside className="hidden lg:block" style={{ position: "sticky", top: 80, alignSelf: "start", display: "flex", flexDirection: "column", gap: 24 }}>
                {otherReports.length > 0 && (
                  <div>
                    <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-3)", marginBottom: 12 }}>{t("otherReports")}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {otherReports.map(([k, m]) => (
                        <Link
                          key={k}
                          href={`/legal-alerts/${m.slug}`}
                          style={{ display: "block", padding: 16, border: "1px solid var(--line-2)", transition: "border-color 0.15s" }}
                        >
                          <div className="display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{m.title}</div>
                          <div style={{ fontSize: 12, color: "var(--ink-3)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {m.subtitle}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  href="/legal-alerts/archiv"
                  style={{ display: "block", padding: 16, border: "1px solid var(--line-2)" }}
                >
                  <div className="display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{t("archivSidebarTitle")}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{t("archivSidebarSubtitle")}</div>
                </Link>

                <div style={{ padding: 24, background: "var(--bg-3)", border: "1px solid var(--line-2)" }}>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 12 }}>{t("updateCycleLabel")}</div>
                  <div className="display" style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
                    {edition.runDay === "Manuell" ? t("regularlyUpdated") : t("everyDayNew", { day: edition.runDay })}
                  </div>
                  <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55, marginBottom: 16 }}>
                    {t("dontMissWave")}
                  </p>
                  <AlertSubscribeButton className="l-btn l-btn-primary" style={{ fontSize: 12, padding: "8px 14px", width: "100%", justifyContent: "center" }} />
                </div>

                <div className="mono" style={{ paddingTop: 12, borderTop: "1px dashed var(--line-2)", fontSize: 10, letterSpacing: "0.1em", color: "var(--ink-3)", lineHeight: 1.8 }}>
                  {t("feedsLabel")}: {edition.stats.feedsProcessed}<br />
                  {t("articlesLabel")}: {edition.stats.totalArticles}
                  {edition.stats.feedsFailed > 0 && (
                    <><br />{t("failuresLabel")}: {edition.stats.feedsFailed}</>
                  )}
                </div>
              </aside>
            </div>
          ) : markdown ? (
            <div className="l-grid-article">
              <div>
                <MarkdownRenderer content={markdown} className="prose-alerts" />
              </div>
              <aside className="hidden lg:block" style={{ position: "sticky", top: 80, alignSelf: "start", display: "flex", flexDirection: "column", gap: 24 }}>
                {otherReports.length > 0 && (
                  <div>
                    <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-3)", marginBottom: 12 }}>{t("otherReports")}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {otherReports.map(([k, m]) => (
                        <Link
                          key={k}
                          href={`/legal-alerts/${m.slug}`}
                          style={{ display: "block", padding: 16, border: "1px solid var(--line-2)", transition: "border-color 0.15s" }}
                        >
                          <div className="display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{m.title}</div>
                          <div style={{ fontSize: 12, color: "var(--ink-3)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {m.subtitle}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                <Link
                  href="/legal-alerts/archiv"
                  style={{ display: "block", padding: 16, border: "1px solid var(--line-2)" }}
                >
                  <div className="display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{t("archivSidebarTitle")}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{t("archivSidebarSubtitle")}</div>
                </Link>

                <div style={{ padding: 24, background: "var(--bg-3)", border: "1px solid var(--line-2)" }}>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 12 }}>{t("updateCycleLabel")}</div>
                  <div className="display" style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
                    {edition.runDay === "Manuell" ? t("regularlyUpdated") : t("everyDayNew", { day: edition.runDay })}
                  </div>
                  <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55, marginBottom: 16 }}>
                    {t("dontMissWave")}
                  </p>
                  <AlertSubscribeButton className="l-btn l-btn-primary" style={{ fontSize: 12, padding: "8px 14px", width: "100%", justifyContent: "center" }} />
                </div>

                <div className="mono" style={{ paddingTop: 12, borderTop: "1px dashed var(--line-2)", fontSize: 10, letterSpacing: "0.1em", color: "var(--ink-3)", lineHeight: 1.8 }}>
                  {t("feedsLabel")}: {edition.stats.feedsProcessed}<br />
                  {t("articlesLabel")}: {edition.stats.totalArticles}
                </div>
              </aside>
            </div>
          ) : (
            notFound()
          )}
        </div>
      </article>

      {archivedWithReport.length > 0 && (
        <section style={{ borderBottom: "1px solid var(--line-2)" }}>
          <div className="l-container" style={{ padding: "64px 32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
              <div>
                <div className="l-label" style={{ marginBottom: 8 }}>{t("archivLabel")}</div>
                <h2 className="display" style={{ fontSize: 28, fontWeight: 700 }}>
                  {t("earlierEditions")}
                </h2>
              </div>
              <span className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--ink-3)" }}>
                {archivedWithReport.length === 1
                  ? t("editionCount", { count: archivedWithReport.length })
                  : t("editionCountPlural", { count: archivedWithReport.length })}
              </span>
            </div>

            <div style={{ border: "1px solid var(--line-2)" }}>
              <div
                className="mono"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr auto",
                  padding: "14px 24px",
                  background: "var(--bg-2)",
                  borderBottom: "1px solid var(--line-2)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--ink-3)",
                }}
              >
                <span>{t("dateColumn")}</span>
                <span>{t("periodColumn")}</span>
                <span />
              </div>

              {archivedWithReport.map((arch, i) => {
                const archDate = new Date(arch.generatedAt);
                return (
                  <Link
                    key={arch.id}
                    href={`/legal-alerts/archiv/${arch.id}/${meta.slug}`}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr auto",
                      padding: "20px 24px",
                      borderBottom: i < archivedWithReport.length - 1 ? "1px solid var(--line-2)" : "none",
                      alignItems: "center",
                      transition: "background 0.15s",
                    }}
                  >
                    <span style={{ fontSize: 15, fontWeight: 500 }}>
                      {archDate.toLocaleDateString(dateFmt, {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span style={{ fontSize: 14, color: "var(--ink-2)" }}>
                      {arch.period}
                    </span>
                    <span className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)" }}>
                      {t("readCta")}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </SubpageShell>
  );
}

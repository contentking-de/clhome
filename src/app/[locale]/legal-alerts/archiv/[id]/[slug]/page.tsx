import {
  getEditionById,
  getReportKeyBySlug,
  getReportMeta,
  getAllReportMeta,
} from "@/lib/skynet";
import { translatePeriod } from "@/lib/alert-types";
import { notFound } from "next/navigation";
import SubpageShell from "@/components/landing/SubpageShell";
import MarkdownRenderer from "@/components/legal-alerts/MarkdownRenderer";
import { Link } from "@/i18n/routing";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("LegalAlertsPage");
  const key = getReportKeyBySlug(slug);
  if (!key) return { title: t("notFound") };
  const meta = getReportMeta(key, locale);
  if (!meta) return { title: t("notFound") };
  const edition = await getEditionById(id);
  if (!edition) return { title: t("notFound") };

  const dateFmt = locale === "en" ? "en-US" : "de-DE";
  const date = new Date(edition.generatedAt).toLocaleDateString(dateFmt, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return buildPageMetadata({
    title: `${meta.title} (${date}) | ${t("archivLabel")} | clever.legal`,
    description: meta.subtitle,
    path: `/legal-alerts/archiv/${id}/${slug}`,
    locale,
  });
}

export default async function ArchivedAlertPage({ params }: Props) {
  const { id, slug } = await params;
  const key = getReportKeyBySlug(slug);
  if (!key) notFound();

  const locale = await getLocale();
  const t = await getTranslations("LegalAlertsPage");
  const meta = getReportMeta(key, locale)!;
  const dateFmt = locale === "en" ? "en-US" : "de-DE";

  const edition = await getEditionById(id);
  if (!edition) notFound();

  const reports =
    locale === "en" && edition.reportsEn
      ? (edition.reportsEn as Record<string, string>)
      : (edition.reports as Record<string, string>);
  const markdown = reports[key];
  if (!markdown) notFound();

  const generatedDate = new Date(edition.generatedAt);
  const allMeta = getAllReportMeta(locale);
  const otherReports = Object.entries(allMeta).filter(
    ([k]) => k !== key && edition.reports[k]
  );

  return (
    <SubpageShell>
      <article style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container l-article-pad" style={{ padding: "64px 32px 96px" }}>
          <Link
            href="/legal-alerts/archiv"
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
            {t("backToArchiv")}
          </Link>

          <header style={{ marginBottom: 48 }}>
            <div className="l-chip" style={{ marginBottom: 16 }}>
              <span className="dot" />{t("archivChip")}
            </div>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-3)", marginBottom: 16 }}>
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
              <span>{translatePeriod(edition.period, locale).toUpperCase()}</span>
              <span>{edition.stats.totalArticles}{t("sourcesLabel")}</span>
            </div>
          </header>

          <div className="l-grid-article">
            <div>
              <MarkdownRenderer content={markdown} className="prose-alerts" />
            </div>
            <aside className="hidden lg:block" style={{ position: "sticky", top: 80, alignSelf: "start", display: "flex", flexDirection: "column", gap: 24 }}>
              {otherReports.length > 0 && (
                <div>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-3)", marginBottom: 12 }}>{t("sameEdition")}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {otherReports.map(([k, m]) => (
                      <Link
                        key={k}
                        href={`/legal-alerts/archiv/${id}/${m.slug}`}
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
                href="/legal-alerts"
                style={{ display: "block", padding: 16, border: "1px solid var(--accent)", background: "color-mix(in oklab, var(--accent), var(--bg) 96%)" }}
              >
                <div className="display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--accent)" }}>{t("currentEdition")}</div>
                <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{t("goToCurrentEdition")}</div>
              </Link>

              <Link
                href="/legal-alerts/archiv"
                style={{ display: "block", padding: 16, border: "1px solid var(--line-2)" }}
              >
                <div className="display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{t("archivSidebarTitle")}</div>
                <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{t("archivSidebarSubtitle")}</div>
              </Link>
            </aside>
          </div>
        </div>
      </article>
    </SubpageShell>
  );
}

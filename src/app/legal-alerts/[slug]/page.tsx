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
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const key = getReportKeyBySlug(slug);
  if (!key) return { title: "Nicht gefunden | clever.legal" };
  const meta = getReportMeta(key);
  if (!meta) return { title: "Nicht gefunden | clever.legal" };
  return {
    title: `${meta.title} | Legal Alerts | clever.legal`,
    description: meta.subtitle,
  };
}

export default async function LegalAlertDetailPage({ params }: Props) {
  const { slug } = await params;
  const key = getReportKeyBySlug(slug);
  if (!key) notFound();

  const meta = getReportMeta(key)!;
  const [edition, archived] = await Promise.all([
    getCurrentEdition(),
    getArchivedEditions(),
  ]);
  if (!edition) notFound();

  const category = getCategoryForSlug(slug);
  const items = category
    ? await getItemsForEdition(edition.id, category)
    : [];

  const markdown = edition.reports[key];
  const hasItems = items.length > 0;

  const generatedDate = new Date(edition.generatedAt);
  const allMeta = getAllReportMeta();
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
            ← Zurück zu Legal Alerts
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
                {generatedDate.toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" }).toUpperCase()}
              </span>
              <span>{edition.period.toUpperCase()}</span>
              <span>{edition.stats.totalArticles} QUELLEN</span>
              {hasItems && <span>{items.length} MELDUNGEN</span>}
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
                    <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-3)", marginBottom: 12 }}>WEITERE REPORTS</div>
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
                  <div className="display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Archiv</div>
                  <div style={{ fontSize: 12, color: "var(--ink-3)" }}>Alle vergangenen Ausgaben</div>
                </Link>

                <div style={{ padding: 24, background: "var(--bg-3)", border: "1px solid var(--line-2)" }}>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 12 }}>UPDATE-ZYKLUS</div>
                  <div className="display" style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
                    {edition.runDay === "Manuell" ? "Regelmäßig aktualisiert" : `Jeden ${edition.runDay} neu`}
                  </div>
                  <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55, marginBottom: 16 }}>
                    Verpassen Sie keine Klagewelle.
                  </p>
                  <AlertSubscribeButton className="l-btn l-btn-primary" style={{ fontSize: 12, padding: "8px 14px", width: "100%", justifyContent: "center" }} />
                </div>

                <div className="mono" style={{ paddingTop: 12, borderTop: "1px dashed var(--line-2)", fontSize: 10, letterSpacing: "0.1em", color: "var(--ink-3)", lineHeight: 1.8 }}>
                  FEEDS: {edition.stats.feedsProcessed}<br />
                  ARTIKEL: {edition.stats.totalArticles}
                  {edition.stats.feedsFailed > 0 && (
                    <><br />AUSFÄLLE: {edition.stats.feedsFailed}</>
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
                    <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-3)", marginBottom: 12 }}>WEITERE REPORTS</div>
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
                  <div className="display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Archiv</div>
                  <div style={{ fontSize: 12, color: "var(--ink-3)" }}>Alle vergangenen Ausgaben</div>
                </Link>

                <div style={{ padding: 24, background: "var(--bg-3)", border: "1px solid var(--line-2)" }}>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 12 }}>UPDATE-ZYKLUS</div>
                  <div className="display" style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
                    {edition.runDay === "Manuell" ? "Regelmäßig aktualisiert" : `Jeden ${edition.runDay} neu`}
                  </div>
                  <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55, marginBottom: 16 }}>
                    Verpassen Sie keine Klagewelle.
                  </p>
                  <AlertSubscribeButton className="l-btn l-btn-primary" style={{ fontSize: 12, padding: "8px 14px", width: "100%", justifyContent: "center" }} />
                </div>

                <div className="mono" style={{ paddingTop: 12, borderTop: "1px dashed var(--line-2)", fontSize: 10, letterSpacing: "0.1em", color: "var(--ink-3)", lineHeight: 1.8 }}>
                  FEEDS: {edition.stats.feedsProcessed}<br />
                  ARTIKEL: {edition.stats.totalArticles}
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
                <div className="l-label" style={{ marginBottom: 8 }}>Archiv</div>
                <h2 className="display" style={{ fontSize: 28, fontWeight: 700 }}>
                  Frühere Ausgaben
                </h2>
              </div>
              <span className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--ink-3)" }}>
                {archivedWithReport.length} AUSGABE{archivedWithReport.length !== 1 ? "N" : ""}
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
                <span>DATUM</span>
                <span>ZEITRAUM</span>
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
                      {archDate.toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span style={{ fontSize: 14, color: "var(--ink-2)" }}>
                      {arch.period}
                    </span>
                    <span className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)" }}>
                      LESEN →
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

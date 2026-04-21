import {
  getEditionById,
  getReportKeyBySlug,
  getReportMeta,
  getAllReportMeta,
} from "@/lib/skynet";
import { notFound } from "next/navigation";
import SubpageShell from "@/components/landing/SubpageShell";
import MarkdownRenderer from "@/components/legal-alerts/MarkdownRenderer";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, slug } = await params;
  const key = getReportKeyBySlug(slug);
  if (!key) return { title: "Nicht gefunden | clever.legal" };
  const meta = getReportMeta(key);
  if (!meta) return { title: "Nicht gefunden | clever.legal" };
  const edition = await getEditionById(id);
  if (!edition) return { title: "Nicht gefunden | clever.legal" };

  const date = new Date(edition.generatedAt).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return {
    title: `${meta.title} (${date}) | Archiv | clever.legal`,
    description: meta.subtitle,
  };
}

export default async function ArchivedAlertPage({ params }: Props) {
  const { id, slug } = await params;
  const key = getReportKeyBySlug(slug);
  if (!key) notFound();

  const meta = getReportMeta(key)!;
  const edition = await getEditionById(id);
  if (!edition) notFound();

  const markdown = edition.reports[key];
  if (!markdown) notFound();

  const generatedDate = new Date(edition.generatedAt);
  const allMeta = getAllReportMeta();
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
            ← Zurück zum Archiv
          </Link>

          <header style={{ marginBottom: 48 }}>
            <div className="l-chip" style={{ marginBottom: 16 }}>
              <span className="dot" />ARCHIV
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
                {generatedDate.toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" }).toUpperCase()}
              </span>
              <span>{edition.period.toUpperCase()}</span>
              <span>{edition.stats.articleCount} QUELLEN</span>
            </div>
          </header>

          <div className="l-grid-article">
            <div>
              <MarkdownRenderer content={markdown} className="prose-alerts" />
            </div>
            <aside className="hidden lg:block" style={{ position: "sticky", top: 80, alignSelf: "start", display: "flex", flexDirection: "column", gap: 24 }}>
              {otherReports.length > 0 && (
                <div>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-3)", marginBottom: 12 }}>GLEICHE AUSGABE</div>
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
                <div className="display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--accent)" }}>Aktuelle Ausgabe</div>
                <div style={{ fontSize: 12, color: "var(--ink-3)" }}>Zur neuesten Ausgabe wechseln</div>
              </Link>

              <Link
                href="/legal-alerts/archiv"
                style={{ display: "block", padding: 16, border: "1px solid var(--line-2)" }}
              >
                <div className="display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Archiv</div>
                <div style={{ fontSize: 12, color: "var(--ink-3)" }}>Alle vergangenen Ausgaben</div>
              </Link>
            </aside>
          </div>
        </div>
      </article>
    </SubpageShell>
  );
}

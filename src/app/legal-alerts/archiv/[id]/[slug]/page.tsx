import {
  getEditionById,
  getReportKeyBySlug,
  getReportMeta,
  getAllReportMeta,
} from "@/lib/skynet";
import { notFound } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
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
    <>
      <Navbar />
      <main className="pt-20">
        <article className="py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/legal-alerts/archiv"
              className="inline-flex items-center gap-1 text-surface-tint font-medium text-sm mb-8 hover:gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-lg">
                arrow_back
              </span>
              Zurück zum Archiv
            </Link>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-1.5 bg-secondary/10 text-secondary rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest">
                  <span className="material-symbols-outlined text-sm">
                    inventory_2
                  </span>
                  Archiv
                </div>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <span
                  className={`material-symbols-outlined text-5xl ${meta.accent}`}
                >
                  {meta.icon}
                </span>
                <div>
                  <h1 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight">
                    {meta.title}
                  </h1>
                  <p className="text-secondary mt-1">{meta.subtitle}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-secondary">
                <div className="inline-flex items-center gap-1.5 bg-surface-container rounded-full px-3 py-1">
                  <span className="material-symbols-outlined text-base text-surface-tint">
                    calendar_today
                  </span>
                  {generatedDate.toLocaleDateString("de-DE", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div className="inline-flex items-center gap-1.5 bg-surface-container rounded-full px-3 py-1">
                  <span className="material-symbols-outlined text-base text-surface-tint">
                    schedule
                  </span>
                  {edition.period}
                </div>
                <div className="inline-flex items-center gap-1.5 bg-surface-container rounded-full px-3 py-1">
                  <span className="material-symbols-outlined text-base text-surface-tint">
                    query_stats
                  </span>
                  {edition.stats.articleCount} Quellen
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
              <div>
                <MarkdownRenderer content={markdown} className="prose-alerts" />
              </div>

              <aside className="hidden lg:block space-y-8 sticky top-24 self-start">
                {otherReports.length > 0 && (
                  <div>
                    <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-secondary mb-4">
                      Gleiche Ausgabe
                    </h3>
                    <div className="space-y-3">
                      {otherReports.map(([k, m]) => (
                        <Link
                          key={k}
                          href={`/legal-alerts/archiv/${id}/${m.slug}`}
                          className="flex items-start gap-3 p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors border border-outline-variant/10"
                        >
                          <span
                            className={`material-symbols-outlined text-2xl ${m.accent} shrink-0`}
                          >
                            {m.icon}
                          </span>
                          <div>
                            <div className="font-semibold text-sm">
                              {m.title}
                            </div>
                            <div className="text-secondary text-xs mt-0.5 line-clamp-2">
                              {m.subtitle}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  href="/legal-alerts"
                  className="flex items-center gap-3 p-4 rounded-xl bg-surface-tint/5 hover:bg-surface-tint/10 transition-colors border border-surface-tint/20"
                >
                  <span className="material-symbols-outlined text-2xl text-surface-tint shrink-0">
                    bolt
                  </span>
                  <div>
                    <div className="font-semibold text-sm text-surface-tint">
                      Aktuelle Ausgabe
                    </div>
                    <div className="text-secondary text-xs mt-0.5">
                      Zur neuesten Ausgabe wechseln
                    </div>
                  </div>
                </Link>

                <Link
                  href="/legal-alerts/archiv"
                  className="flex items-center gap-3 p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors border border-outline-variant/10"
                >
                  <span className="material-symbols-outlined text-2xl text-secondary shrink-0">
                    inventory_2
                  </span>
                  <div>
                    <div className="font-semibold text-sm">Archiv</div>
                    <div className="text-secondary text-xs mt-0.5">
                      Alle vergangenen Ausgaben
                    </div>
                  </div>
                </Link>

                <div className="rounded-2xl p-6 border border-surface-tint/20 bg-surface-tint/5">
                  <span className="material-symbols-outlined text-3xl text-surface-tint mb-3 block">
                    rocket_launch
                  </span>
                  <h3 className="font-headline font-bold text-lg mb-2">
                    Mandanten-Satellit bestellen
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed mb-4">
                    Sie haben ein relevantes Rechtsgebiet entdeckt? Wir bauen
                    Ihnen eine spezialisierte Landingpage, die qualifizierte
                    Mandanten auf Autopilot liefert.
                  </p>
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center gap-1.5 bg-surface-tint text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:brightness-110 transition-all w-full justify-center"
                  >
                    Jetzt Satellit anfragen
                    <span className="material-symbols-outlined text-base">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

import {
  getCurrentEdition,
  getReportKeyBySlug,
  getReportMeta,
  getAllReportMeta,
} from "@/lib/skynet";
import Icon from "@/components/ui/Icon";
import { notFound } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import MarkdownRenderer from "@/components/legal-alerts/MarkdownRenderer";
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
  const edition = await getCurrentEdition();
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
              href="/legal-alerts"
              className="inline-flex items-center gap-1 text-surface-tint font-medium text-sm mb-8 hover:gap-2 transition-all"
            >
              <Icon name="arrow_back" className="text-lg" />
              Zurück zu Legal Alerts
            </Link>

            <header className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <Icon
                  name={meta.icon}
                  className={`text-5xl ${meta.accent}`}
                />
                <div>
                  <h1 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight">
                    {meta.title}
                  </h1>
                  <p className="text-secondary mt-1">{meta.subtitle}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-secondary">
                <div className="inline-flex items-center gap-1.5 bg-surface-container rounded-full px-3 py-1">
                  <Icon name="calendar_today" className="text-base text-surface-tint" />
                  {generatedDate.toLocaleDateString("de-DE", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div className="inline-flex items-center gap-1.5 bg-surface-container rounded-full px-3 py-1">
                  <Icon name="schedule" className="text-base text-surface-tint" />
                  {edition.period}
                </div>
                <div className="inline-flex items-center gap-1.5 bg-surface-container rounded-full px-3 py-1">
                  <Icon name="query_stats" className="text-base text-surface-tint" />
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
                      Weitere Reports
                    </h3>
                    <div className="space-y-3">
                      {otherReports.map(([k, m]) => (
                        <Link
                          key={k}
                          href={`/legal-alerts/${m.slug}`}
                          className="flex items-start gap-3 p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors border border-outline-variant/10"
                        >
                          <Icon
                            name={m.icon}
                            className={`text-2xl ${m.accent} shrink-0`}
                          />
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
                  href="/legal-alerts/archiv"
                  className="flex items-center gap-3 p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors border border-outline-variant/10"
                >
                  <Icon name="inventory_2" className="text-2xl text-secondary shrink-0" />
                  <div>
                    <div className="font-semibold text-sm">Archiv</div>
                    <div className="text-secondary text-xs mt-0.5">
                      Alle vergangenen Ausgaben
                    </div>
                  </div>
                </Link>

                <div className="bg-on-background text-white rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-surface-tint/20 blur-[50px] rounded-full" />
                  <div className="relative z-10">
                    <Icon name="notifications_active" className="text-3xl text-tertiary-fixed-dim mb-3 block" />
                    <h3 className="font-headline font-bold text-lg mb-2">
                      Jeden {edition.runDay} neu
                    </h3>
                    <p className="text-secondary-fixed-dim text-sm leading-relaxed mb-4">
                      Verpassen Sie keine Klagewelle. Unsere Alerts werden
                      wöchentlich aktualisiert.
                    </p>
                    <Link
                      href="/kontakt"
                      className="inline-flex items-center gap-1.5 bg-surface-tint text-white px-4 py-2 rounded-lg text-sm font-semibold hover:brightness-110 transition-all"
                    >
                      Zugang sichern
                      <Icon name="arrow_forward" className="text-base" />
                    </Link>
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10">
                  <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-secondary mb-4">
                    Datenquellen
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary">Feeds überwacht</span>
                      <span className="font-semibold">
                        {edition.stats.feedsProcessed}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary">Artikel gescannt</span>
                      <span className="font-semibold">
                        {edition.stats.articleCount}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary">Deep Scrapes</span>
                      <span className="font-semibold">
                        {edition.stats.scrapeCount}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl p-6 border border-surface-tint/20 bg-surface-tint/5">
                  <Icon name="rocket_launch" className="text-3xl text-surface-tint mb-3 block" />
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
                    <Icon name="arrow_forward" className="text-base" />
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

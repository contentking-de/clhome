import { getArchivedEditions, getReportMeta } from "@/lib/skynet";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import Icon from "@/components/ui/Icon";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Archiv | Legal Alerts | clever.legal",
  description: "Alle vergangenen Legal Alerts Ausgaben im Überblick.",
};

export default async function ArchivPage() {
  const editions = await getArchivedEditions();

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-20 px-8">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/legal-alerts"
              className="inline-flex items-center gap-1 text-surface-tint font-medium text-sm mb-8 hover:gap-2 transition-all"
            >
              <Icon name="arrow_back" className="text-lg" />
              Zurück zu Legal Alerts
            </Link>

            <div className="mb-12">
              <span className="text-surface-tint font-bold font-label uppercase tracking-widest block mb-4">
                Archiv
              </span>
              <h1 className="font-headline text-[2.5rem] font-extrabold leading-tight mb-4">
                Vergangene Ausgaben
              </h1>
              <p className="text-secondary text-lg max-w-2xl">
                Durchsuchen Sie alle bisherigen Legal Alerts. Jede Ausgabe
                enthält die Sammelklagen-Frühwarnung und Hot Legal Topics der
                jeweiligen Woche.
              </p>
            </div>

            {editions.length === 0 ? (
              <div className="text-center py-20">
                <Icon name="inventory_2" className="text-5xl text-outline mb-4 block" />
                <p className="text-secondary">
                  Noch keine archivierten Ausgaben vorhanden.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {editions.map((edition) => {
                  const date = new Date(edition.generatedAt);
                  return (
                    <div
                      key={edition.id}
                      className="bg-surface rounded-xl border border-outline-variant/10 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
                    >
                      <div className="flex items-center gap-3 md:min-w-[200px]">
                        <Icon name="calendar_today" className="text-2xl text-secondary" />
                        <div>
                          <div className="font-headline font-bold">
                            {date.toLocaleDateString("de-DE", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })}
                          </div>
                          <div className="text-secondary text-xs">
                            {edition.period}
                          </div>
                        </div>
                      </div>

                      <div className="text-sm text-secondary md:min-w-[120px]">
                        {edition.stats.articleCount} Quellen ·{" "}
                        {edition.stats.feedsProcessed} Feeds
                      </div>

                      <div className="flex flex-wrap gap-2 md:ml-auto">
                        {Object.keys(edition.reports).map((key) => {
                          const meta = getReportMeta(key);
                          if (!meta) return null;
                          return (
                            <Link
                              key={key}
                              href={`/legal-alerts/archiv/${edition.id}/${meta.slug}`}
                              className="inline-flex items-center gap-1.5 text-sm font-semibold text-surface-tint bg-surface-tint/5 px-4 py-2 rounded-lg hover:bg-surface-tint/10 transition-colors"
                            >
                              <Icon name={meta.icon} className="text-base" />
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
      </main>
      <Footer />
    </>
  );
}

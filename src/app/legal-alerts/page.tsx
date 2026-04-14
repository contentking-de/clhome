import {
  getCurrentEdition,
  getArchivedEditions,
  getAllReportMeta,
  getReportMeta,
} from "@/lib/skynet";
import Icon from "@/components/ui/Icon";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Legal Alerts | clever.legal",
  description:
    "Aktuelle Sammelklagen-Frühwarnungen, Hot Legal Topics und regulatorische Signale – wöchentlich aufbereitet für Anwälte und Kanzleien.",
};

export default async function LegalAlertsPage() {
  const edition = await getCurrentEdition();
  const archived = await getArchivedEditions();
  const allMeta = getAllReportMeta();

  if (!edition) {
    return (
      <>
        <Navbar />
        <main className="pt-20">
          <section className="py-40 px-8 text-center">
            <Icon name="hourglass_empty" className="text-5xl text-outline mb-4 block" />
            <p className="text-secondary text-lg">
              Noch keine Alerts vorhanden. Die erste Ausgabe wird in Kürze
              generiert.
            </p>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const generatedDate = new Date(edition.generatedAt);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 px-8 relative overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-surface-tint/8 blur-[120px] rounded-full" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-error/5 blur-[100px] rounded-full" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-error/10 rounded-full mb-8">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-error" />
                </span>
                <span className="text-[0.75rem] font-bold uppercase tracking-widest text-error font-label">
                  Legal Alerts
                </span>
              </div>
              <h1 className="font-headline text-[3rem] leading-[1.1] font-extrabold tracking-tight mb-6 text-on-background">
                Immer einen Schritt{" "}
                <span className="text-surface-tint">voraus.</span>
              </h1>
              <p className="text-secondary text-lg leading-relaxed mb-6">
                Wöchentlich kuratierte Intelligence-Reports zu neuen
                Sammelklagen, regulatorischen Signalen und Trends – damit Sie
                reagieren können, bevor der Markt es tut.
              </p>
              <div className="flex flex-wrap gap-6 text-sm text-secondary">
                <div className="flex items-center gap-2">
                  <Icon name="calendar_today" className="text-lg text-surface-tint" />
                  <span>
                    Aktualisiert:{" "}
                    {generatedDate.toLocaleDateString("de-DE", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="schedule" className="text-lg text-surface-tint" />
                  <span>Zeitraum: {edition.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="query_stats" className="text-lg text-surface-tint" />
                  <span>
                    {edition.stats.articleCount} Quellen analysiert
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Report Cards */}
        <section className="py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.keys(edition.reports).map((key) => {
                const meta = getReportMeta(key);
                if (!meta) return null;
                return (
                  <Link
                    key={key}
                    href={`/legal-alerts/${meta.slug}`}
                    className="group relative bg-surface p-10 rounded-2xl border border-outline-variant/10 hover:border-surface-tint/30 transition-all duration-300 hover:shadow-lg hover:shadow-surface-tint/5 overflow-hidden"
                  >
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-surface-tint/5 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <Icon
                        name={meta.icon}
                        className={`text-5xl ${meta.accent} mb-6 block`}
                      />
                      <h2 className="font-headline text-2xl font-bold mb-3 group-hover:text-surface-tint transition-colors">
                        {meta.title}
                      </h2>
                      <p className="text-secondary leading-relaxed mb-6">
                        {meta.subtitle}
                      </p>
                      <div className="flex items-center gap-2 text-surface-tint font-semibold text-sm">
                        Report lesen
                        <Icon name="arrow_forward" className="text-lg group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-16 px-8 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-headline font-extrabold text-on-background mb-2">
                  {edition.stats.feedsProcessed}
                </div>
                <div className="text-secondary text-sm">Quellen überwacht</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-headline font-extrabold text-on-background mb-2">
                  {edition.stats.articleCount}
                </div>
                <div className="text-secondary text-sm">Artikel analysiert</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-headline font-extrabold text-on-background mb-2">
                  {Object.keys(edition.reports).length}
                </div>
                <div className="text-secondary text-sm">Reports erstellt</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-headline font-extrabold text-surface-tint mb-2">
                  Jeden {edition.runDay}
                </div>
                <div className="text-secondary text-sm">Neues Update</div>
              </div>
            </div>
          </div>
        </section>

        {/* Archiv */}
        {archived.length > 0 && (
          <section className="py-16 px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-surface-tint font-bold font-label uppercase tracking-widest block mb-2">
                    Archiv
                  </span>
                  <h2 className="font-headline text-2xl font-extrabold">
                    Vergangene Ausgaben
                  </h2>
                </div>
                <Link
                  href="/legal-alerts/archiv"
                  className="inline-flex items-center gap-1.5 text-surface-tint font-semibold text-sm hover:gap-2.5 transition-all"
                >
                  Alle anzeigen
                  <Icon name="arrow_forward" className="text-lg" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {archived.slice(0, 3).map((arch) => {
                  const archDate = new Date(arch.generatedAt);
                  return (
                    <div
                      key={arch.id}
                      className="bg-surface rounded-xl border border-outline-variant/10 p-6"
                    >
                      <div className="flex items-center gap-2 text-sm text-secondary mb-3">
                        <Icon name="calendar_today" className="text-base" />
                        {archDate.toLocaleDateString("de-DE", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                      <div className="text-xs text-secondary mb-4">
                        {arch.period} · {arch.stats.articleCount} Quellen
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {Object.keys(arch.reports).map((key) => {
                          const meta = getReportMeta(key);
                          if (!meta) return null;
                          return (
                            <Link
                              key={key}
                              href={`/legal-alerts/archiv/${arch.id}/${meta.slug}`}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-surface-tint bg-surface-tint/5 px-3 py-1.5 rounded-lg hover:bg-surface-tint/10 transition-colors"
                            >
                              <Icon name={meta.icon} className="text-sm" />
                              {meta.title}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="relative bg-on-background rounded-2xl p-12 md:p-20 overflow-hidden text-center">
              <div className="absolute -top-20 -left-20 w-60 h-60 bg-surface-tint/15 blur-[100px] rounded-full" />
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-error/10 blur-[100px] rounded-full" />
              <div className="relative z-10 max-w-2xl mx-auto">
                <Icon name="notifications_active" className="text-5xl text-tertiary-fixed-dim mb-6 block" />
                <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-white mb-6">
                  Nie wieder kalte Mandate.
                </h2>
                <p className="text-secondary-fixed-dim text-lg leading-relaxed mb-10">
                  Nutzen Sie unsere wöchentlichen Legal Alerts, um als Erster auf
                  neue Sammelklagen und Massenverfahren zu reagieren. Werden Sie
                  Teil des clever.legal Netzwerks.
                </p>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 bg-surface-tint text-white px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all"
                >
                  Jetzt Zugang sichern
                  <Icon name="arrow_forward" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

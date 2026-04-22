import { getCurrentEdition, getArchivedEditions, getAllReportMeta } from "@/lib/skynet";
import Icon from "@/components/ui/Icon";
import RefreshButton from "@/components/admin/RefreshLegalAlerts";
import ReportPreview from "@/components/admin/ReportPreview";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminLegalAlerts() {
  const [current, archived] = await Promise.all([
    getCurrentEdition(),
    getArchivedEditions(),
  ]);
  const reportMeta = getAllReportMeta();

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-headline text-2xl font-bold mb-1">Legal Alerts</h1>
        <p className="text-secondary text-sm">
          Alerts werden jeden Dienstag automatisch aktualisiert. Hier kannst du sie auch manuell neu laden.
        </p>
      </div>

      {current ? (
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="campaign" className="text-xl text-surface-tint" />
            <h2 className="font-headline text-lg font-bold">Aktuelle Ausgabe</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <div className="text-xs text-secondary uppercase tracking-wide mb-1">Zeitraum</div>
              <div className="font-medium">{current.period}</div>
            </div>
            <div>
              <div className="text-xs text-secondary uppercase tracking-wide mb-1">Stichtag</div>
              <div className="font-medium">{current.runDay}</div>
            </div>
            <div>
              <div className="text-xs text-secondary uppercase tracking-wide mb-1">Generiert am</div>
              <div className="font-medium">
                {new Date(current.generatedAt).toLocaleDateString("de-DE", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <div className="text-xs text-secondary uppercase tracking-wide mb-1">Feeds verarbeitet</div>
              <div className="text-2xl font-bold font-headline">{current.stats.feedsProcessed}</div>
            </div>
            <div>
              <div className="text-xs text-secondary uppercase tracking-wide mb-1">Artikel</div>
              <div className="text-2xl font-bold font-headline">{current.stats.totalArticles}</div>
            </div>
            <div>
              <div className="text-xs text-secondary uppercase tracking-wide mb-1">Ausfälle</div>
              <div className="text-2xl font-bold font-headline">{current.stats.feedsFailed}</div>
            </div>
          </div>

          <div className="mb-2">
            <div className="text-xs text-secondary uppercase tracking-wide mb-2">Reports</div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(current.reports).map((key) => {
                const meta = reportMeta[key];
                return (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-highest/50 rounded-lg text-sm"
                  >
                    {meta && <Icon name={meta.icon} className="text-base" />}
                    {meta?.title || key}
                  </span>
                );
              })}
            </div>
          </div>

          {current.stats.feedsFailed > 0 && (
            <div className="mt-4 p-3 rounded-lg bg-red-950/20 border border-red-500/20">
              <div className="text-sm font-semibold text-red-400 mb-1">
                {current.stats.feedsFailed} Feed(s) fehlgeschlagen
              </div>
              {current.errors.length > 0 && (
                <ul className="text-xs text-red-400/80 space-y-0.5">
                  {current.errors.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 mb-6">
          <div className="flex items-center gap-3 text-secondary">
            <Icon name="info" className="text-xl" />
            <p>Noch keine Ausgabe vorhanden. Klicke auf &quot;Jetzt aktualisieren&quot;, um die erste Ausgabe zu laden.</p>
          </div>
        </div>
      )}

      {current && Object.keys(current.reports).length > 0 && (
        <div className="mb-6">
          <h2 className="font-headline text-lg font-bold mb-3">Reports der aktuellen Ausgabe</h2>
          <div className="space-y-3">
            {Object.entries(current.reports).map(([key, content]) => {
              const meta = reportMeta[key];
              return (
                <ReportPreview
                  key={key}
                  reportKey={key}
                  title={meta?.title || key}
                  subtitle={meta?.subtitle || ""}
                  icon={meta?.icon || "description"}
                  slug={meta?.slug || key}
                  content={content}
                />
              );
            })}
          </div>
        </div>
      )}

      <RefreshButton />

      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-headline text-lg font-bold">Archiv</h2>
          <span className="text-sm text-secondary">{archived.length} Ausgabe(n)</span>
        </div>
        {archived.length > 0 ? (
          <div className="space-y-2">
            {archived.slice(0, 10).map((edition) => (
              <div
                key={edition.id}
                className="flex items-center justify-between bg-surface-container-low p-4 rounded-xl border border-outline-variant/10"
              >
                <div>
                  <span className="font-medium">{edition.period}</span>
                  <span className="text-secondary text-sm ml-3">
                    {new Date(edition.generatedAt).toLocaleDateString("de-DE")}
                  </span>
                </div>
                <Link
                  href={`/legal-alerts/archiv/${edition.id}/fruehwarnung`}
                  className="text-sm text-surface-tint hover:underline"
                >
                  Ansehen
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-secondary">Noch keine archivierten Ausgaben.</p>
        )}
      </div>
    </div>
  );
}

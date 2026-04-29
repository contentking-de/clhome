import {
  getCurrentEdition,
  getArchivedEditions,
  getAllReportMeta,
  getReportMeta,
} from "@/lib/skynet";
import SubpageShell from "@/components/landing/SubpageShell";
import AlertSubscribeButton from "@/components/legal-alerts/AlertSubscribeButton";
import { Link } from "@/i18n/routing";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ArrowSvg } from "@/components/landing/Icons";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("LegalAlertsPage");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function LegalAlertsPage() {
  const edition = await getCurrentEdition();
  const archived = await getArchivedEditions();
  const allMeta = getAllReportMeta();
  const locale = await getLocale();
  const t = await getTranslations("LegalAlertsPage");

  if (!edition) {
    return (
      <SubpageShell>
        <section style={{ padding: "160px 32px", textAlign: "center" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-3)" }}>
            {t("emptyState")}
          </div>
        </section>
      </SubpageShell>
    );
  }

  const reports =
    locale === "en" && edition.reportsEn
      ? (edition.reportsEn as Record<string, string>)
      : (edition.reports as Record<string, string>);

  const generatedDate = new Date(edition.generatedAt);

  return (
    <SubpageShell>
      {/* Hero */}
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px 64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--danger)", boxShadow: "0 0 8px var(--danger)" }} />
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--danger)" }}>LEGAL ALERTS</span>
          </div>
          <h1 className="display" style={{ fontSize: "clamp(48px, 7vw, 120px)", fontWeight: 800, marginBottom: 24 }}>
            Immer einen Schritt{" "}
            <span style={{ color: "var(--accent)" }}>voraus.</span>
          </h1>
          <p style={{ color: "var(--ink-2)", fontSize: 20, lineHeight: 1.55, maxWidth: 640, marginBottom: 32 }}>
            Wöchentlich kuratierte Intelligence-Reports zu neuen Sammelklagen, regulatorischen Signalen
            und Trends — damit Sie reagieren können, bevor der Markt es tut.
          </p>
          <div className="mono l-meta-row" style={{ display: "flex", gap: 32, fontSize: 11, letterSpacing: "0.1em", color: "var(--ink-3)" }}>
            <span>
              AKTUALISIERT:{" "}
              {generatedDate.toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }).toUpperCase()}
            </span>
            <span>ZEITRAUM: {edition.period.toUpperCase()}</span>
            <span>{edition.stats.totalArticles} QUELLEN</span>
          </div>
        </div>
      </section>

      {/* Report Cards */}
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "64px 32px" }}>
          <div className="l-grid-half l-modules" style={{ gap: 0, border: "1px solid var(--line-2)" }}>
            {Object.keys(edition.reports).map((key, i) => {
              const meta = getReportMeta(key);
              if (!meta) return null;
              return (
                <Link
                  key={key}
                  href={`/legal-alerts/${meta.slug}`}
                  style={{
                    display: "block",
                    padding: 36,
                    borderRight: i % 2 === 0 ? "1px solid var(--line-2)" : "none",
                    borderBottom: i < Object.keys(edition.reports).length - 2 ? "1px solid var(--line-2)" : "none",
                    transition: "background 0.15s",
                    background: "transparent",
                  }}
                >
                  <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 16 }}>
                    #{meta.slug.toUpperCase()}
                  </div>
                  <h2 className="display" style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
                    {meta.title}
                  </h2>
                  <p style={{ color: "var(--ink-2)", fontSize: 14, lineHeight: 1.55, marginBottom: 20 }}>
                    {meta.subtitle}
                  </p>
                  <span className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)" }}>
                    REPORT LESEN →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderBottom: "1px solid var(--line-2)", background: "var(--bg-2)" }}>
        <div className="l-container" style={{ padding: "64px 32px" }}>
          <div className="l-grid-stats" style={{ gap: 0, border: "1px solid var(--line-2)" }}>
            {[
              { value: String(edition.stats.feedsProcessed), label: "Quellen überwacht" },
              { value: String(edition.stats.totalArticles), label: "Artikel analysiert" },
              { value: String(Object.keys(edition.reports).length), label: "Reports erstellt" },
              { value: edition.runDay === "Manuell" ? "Regelmäßig" : `Jeden ${edition.runDay}`, label: "Neues Update" },
            ].map((s, i) => (
              <div key={s.label} style={{ padding: 32, textAlign: "center", borderRight: i < 3 ? "1px solid var(--line-2)" : "none" }}>
                <div className="display" style={{ fontSize: 36, fontWeight: 800, color: i === 3 ? "var(--accent)" : "var(--ink)", marginBottom: 8 }}>{s.value}</div>
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-3)" }}>{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Archiv */}
      {archived.length > 0 && (
        <section style={{ borderBottom: "1px solid var(--line-2)" }}>
          <div className="l-container" style={{ padding: "64px 32px" }}>
            <div className="l-archiv-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
              <div>
                <div className="l-label" style={{ marginBottom: 8 }}>Archiv</div>
                <h2 className="display" style={{ fontSize: 28, fontWeight: 700 }}>Vergangene Ausgaben</h2>
              </div>
              <Link href="/legal-alerts/archiv" className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)" }}>
                ALLE ANZEIGEN →
              </Link>
            </div>
            <div className="l-grid-3 l-sat-cards" style={{ gap: 0, border: "1px solid var(--line-2)" }}>
              {archived.slice(0, 3).map((arch, i) => {
                const archDate = new Date(arch.generatedAt);
                return (
                  <div key={arch.id} style={{ padding: 24, borderRight: i < 2 ? "1px solid var(--line-2)" : "none" }}>
                    <div className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--ink-3)", marginBottom: 12 }}>
                      {archDate.toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" }).toUpperCase()}
                    </div>
                    <div className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--ink-3)", marginBottom: 16 }}>
                      {arch.period} · {arch.stats.totalArticles} Quellen
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {Object.keys(arch.reports).map((key) => {
                        const meta = getReportMeta(key);
                        if (!meta) return null;
                        return (
                          <Link key={key} href={`/legal-alerts/archiv/${arch.id}/${meta.slug}`} className="l-chip" style={{ fontSize: 10 }}>
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
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px", textAlign: "center" }}>
          <h2 className="display" style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 700, marginBottom: 16 }}>
            Nie wieder kalte Mandate.
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 18, maxWidth: 600, margin: "0 auto 36px" }}>
            Nutzen Sie unsere wöchentlichen Legal Alerts, um als Erster auf neue
            Sammelklagen und Massenverfahren zu reagieren.
          </p>
          <AlertSubscribeButton className="l-btn l-btn-primary" />
        </div>
      </section>
    </SubpageShell>
  );
}

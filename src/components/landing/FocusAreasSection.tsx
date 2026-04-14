import Icon from "../ui/Icon";

export default function FocusAreasSection() {
  return (
    <section id="schwerpunkte" className="py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <span className="text-surface-tint font-bold font-label uppercase tracking-widest block mb-4">
              Was wir liefern
            </span>
            <h2 className="font-headline text-[2.5rem] font-extrabold leading-tight">
              4 Top-Experten.{" "}
              <span className="text-surface-tint">2 Schwerpunkte.</span>
            </h2>
            <p className="text-secondary text-lg mt-4 leading-relaxed">
              Wir transformieren Kanzleien an zwei entscheidenden Hebeln –
              damit Sie nicht nur effizienter arbeiten, sondern auch mehr
              Mandate gewinnen.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Schwerpunkt 1 */}
          <div className="group relative bg-on-background p-10 md:p-12 rounded-xl border border-outline-variant/10 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-surface-tint/20 blur-[60px] rounded-full" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-surface-tint/15">
                  <Icon name="psychology" className="text-3xl text-tertiary-fixed-dim" />
                </span>
                <span className="text-tertiary-fixed-dim font-label font-bold text-xs uppercase tracking-widest">
                  Schwerpunkt 01
                </span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-white mb-4">
                KI-Integration in Kanzleien
              </h3>
              <p className="text-secondary-fixed-dim leading-relaxed mb-8">
                Wir analysieren Ihre bestehenden Prozesse und bauen
                KI nahtlos in den täglichen Workflow ein. Keine
                Spielerei, sondern messbare Ergebnisse.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="check_circle" className="text-tertiary-fixed-dim text-xl mt-0.5 shrink-0" />
                  <p className="text-secondary-fixed-dim text-sm leading-relaxed">
                    <span className="font-bold text-white">
                      Prozess-Audit:
                    </span>{" "}
                    Wir durchleuchten Ihre Abläufe und identifizieren, wo KI
                    den größten Hebel hat.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="check_circle" className="text-tertiary-fixed-dim text-xl mt-0.5 shrink-0" />
                  <p className="text-secondary-fixed-dim text-sm leading-relaxed">
                    <span className="font-bold text-white">
                      Workflow-Automatisierung:
                    </span>{" "}
                    Wiederkehrende Aufgaben werden automatisiert –
                    von der Fallprüfung bis zur Dokumentenerstellung.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="check_circle" className="text-tertiary-fixed-dim text-xl mt-0.5 shrink-0" />
                  <p className="text-secondary-fixed-dim text-sm leading-relaxed">
                    <span className="font-bold text-white">
                      Skalierung:
                    </span>{" "}
                    Mehr Fälle bearbeiten, ohne mehr Personal einzustellen.
                    Ihre Kanzlei wächst, Ihre Kosten nicht.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Schwerpunkt 2 */}
          <div className="group relative bg-surface p-10 md:p-12 rounded-xl border border-outline-variant/10 hover:border-surface-tint/30 transition-all duration-500 overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-surface-tint/10">
                  <Icon name="conversion_path" className="text-3xl text-surface-tint" />
                </span>
                <span className="text-surface-tint font-label font-bold text-xs uppercase tracking-widest">
                  Schwerpunkt 02
                </span>
              </div>
              <h3 className="font-headline text-2xl font-bold mb-4">
                Durchoptimierte Lead-Flows
              </h3>
              <p className="text-secondary leading-relaxed mb-8">
                Von der digitalen Vermarktung über Lead-Generierung bis hin
                zur automatisierten Vollmacht – wir bauen den kompletten
                Mandats-Funnel.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="check_circle" className="text-surface-tint text-xl mt-0.5 shrink-0" />
                  <p className="text-secondary text-sm leading-relaxed">
                    <span className="font-bold text-on-surface">
                      Digitale Angebote:
                    </span>{" "}
                    Ihre Rechtsgebiete werden zu digitalen Produkten – 
                    sichtbar, skalierbar und rund um die Uhr verfügbar.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="check_circle" className="text-surface-tint text-xl mt-0.5 shrink-0" />
                  <p className="text-secondary text-sm leading-relaxed">
                    <span className="font-bold text-on-surface">
                      Lead-Generierung:
                    </span>{" "}
                    Performance-optimierte Kampagnen und Landingpages, die
                    qualifizierte Mandanten auf Autopilot liefern.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="check_circle" className="text-surface-tint text-xl mt-0.5 shrink-0" />
                  <p className="text-secondary text-sm leading-relaxed">
                    <span className="font-bold text-on-surface">
                      Digitale Vollmacht:
                    </span>{" "}
                    Auch bei großen Mandatsvolumen maximale Automatisierung – 
                    vom Erstkontakt bis zur unterzeichneten Vollmacht.
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <Icon name="trending_up" className="text-[12rem]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

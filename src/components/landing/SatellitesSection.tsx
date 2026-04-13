const satellites = [
  {
    domain: "meta-datenschutzklage.de",
    label: "Datenschutz",
    icon: "shield",
  },
  {
    domain: "coachinganwalt.com",
    label: "Coaching-Recht",
    icon: "psychology",
  },
  {
    domain: "zockerhelden.de",
    label: "Glücksspielrecht",
    icon: "casino",
  },
];

const flowSteps = [
  {
    icon: "ads_click",
    title: "Lead trifft Landingpage",
    description:
      "Gezielte Kampagnen leiten potenzielle Mandanten auf Ihre Satelliten-Domain – optimiert für maximale Conversion.",
  },
  {
    icon: "assignment_ind",
    title: "Automatisiertes Onboarding",
    description:
      "Der Mandant gibt alle relevanten Daten strukturiert ab. Kein E-Mail-Ping-Pong, keine Telefonate, keine Wartezeit.",
  },
  {
    icon: "draw",
    title: "Digitale Vollmacht",
    description:
      "Am Ende des Flows steht die digital signierte Vollmacht. Fertig. Sofort bearbeitbar.",
  },
];

export default function SatellitesSection() {
  return (
    <section id="satelliten" className="py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <span className="text-surface-tint font-bold font-label uppercase tracking-widest block mb-4">
              Lead-Generierung
            </span>
            <h2 className="font-headline text-[2.5rem] font-extrabold leading-tight">
              Die clever.legal{" "}
              <span className="text-surface-tint">Performance-Satelliten.</span>
            </h2>
            <p className="text-secondary text-lg mt-4 leading-relaxed">
              Individuelle Landingpages für Ihre Kanzlei-Schwerpunkte. Kein
              langweiliges Kontaktformular – sondern ein vollautomatisierter
              Lead-Flow, der echte Mandate liefert.
            </p>
          </div>
        </div>

        {/* Beispiel-Satelliten */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {satellites.map((sat) => (
            <div
              key={sat.domain}
              className="group relative bg-surface p-8 rounded-xl border border-outline-variant/10 hover:border-surface-tint/30 transition-all duration-500 overflow-hidden"
            >
              <div className="relative z-10">
                <span className="material-symbols-outlined text-3xl text-surface-tint mb-4 block">
                  {sat.icon}
                </span>
                <p className="text-secondary text-xs font-label uppercase tracking-widest mb-2">
                  {sat.label}
                </p>
                <p className="font-headline text-lg font-bold">{sat.domain}</p>
              </div>
              <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <span className="material-symbols-outlined text-[10rem]">
                  language
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Flow */}
        <div className="relative bg-on-background rounded-2xl p-12 md:p-16 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-surface-tint/20 blur-[60px] rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-tertiary-fixed-dim/10 blur-[60px] rounded-full" />

          <div className="relative z-10">
            <h3 className="font-headline text-2xl font-bold text-white mb-3">
              Vom Klick zur Vollmacht.{" "}
              <span className="text-tertiary-fixed-dim">Vollautomatisch.</span>
            </h3>
            <p className="text-secondary-fixed-dim leading-relaxed mb-10 max-w-2xl">
              Das ganze Vorgeplänkel entfällt. Kein Kontaktformular, kein
              E-Mail-Ping-Pong – Ihr Mandant onboardet sich selbst.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {flowSteps.map((step, i) => (
                <div key={step.title} className="flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-tertiary-fixed-dim/20 text-tertiary-fixed-dim font-headline font-bold text-sm">
                      {i + 1}
                    </span>
                    <span className="material-symbols-outlined text-2xl text-tertiary-fixed-dim">
                      {step.icon}
                    </span>
                    {i < flowSteps.length - 1 && (
                      <span className="hidden md:block flex-1 h-px bg-white/10 ml-2" />
                    )}
                  </div>
                  <h4 className="font-headline text-lg font-bold text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-secondary-fixed-dim text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const modules = [
  {
    icon: "neurology",
    title: "Custom Intake AI",
    description:
      "Validiert Mandate in Sekunden, nicht Stunden. Automatische Extraktion von Kerndaten, OCR-Erkennung und intelligente Fallbewertung.",
  },
  {
    icon: "edit_note",
    title: "Auto-Drafting Engine",
    description:
      "Generiert fertige Schriftsätze auf Basis bewährter Erfolgs-Templates. Vom Erstkontakt bis zur fertigen Klage in unter 5 Minuten.",
  },
  {
    icon: "rocket_launch",
    title: "Performance-Satelliten",
    description:
      "Spezialisierte Landingpages, die Ihre neue Kapazität sofort mit qualifizierten Mandanten füllen. Lead-Generierung auf Autopilot.",
  },
  {
    icon: "school",
    title: "The Workshop",
    description:
      "48-Stunden-Vollintegration Ihres Teams. Wir gehen erst, wenn das System läuft und Ihr Team es beherrscht.",
  },
];

export default function EngineSection() {
  return (
    <section id="engine" className="py-32 px-8 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <span className="text-surface-tint font-bold font-label uppercase tracking-widest block mb-4">
              Die Lösung
            </span>
            <h2 className="font-headline text-[2.5rem] font-extrabold leading-tight">
              Die clever.legal Engine.
            </h2>
            <p className="text-secondary text-lg mt-4 leading-relaxed">
              Wir verkaufen nicht nur Software, sondern{" "}
              <span className="font-bold text-on-background">Kapazität</span>.
              Während die Konkurrenz noch Akten sichtet, haben Sie bereits die
              Klageschrift generiert.
            </p>
          </div>
          <div className="flex items-center gap-3 text-secondary shrink-0">
            <span className="material-symbols-outlined text-surface-tint">
              verified
            </span>
            <span className="font-bold text-on-background">−90%</span>{" "}
            Routineaufwand
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((mod, i) => (
            <div
              key={mod.title}
              className={`group relative p-10 rounded-xl border border-outline-variant/10 transition-all duration-500 overflow-hidden ${
                i === 0
                  ? "bg-on-background text-white"
                  : "bg-surface hover:border-surface-tint/30"
              }`}
            >
              <div className="relative z-10">
                <span
                  className={`material-symbols-outlined text-4xl mb-6 block ${
                    i === 0 ? "text-tertiary-fixed-dim" : "text-surface-tint"
                  }`}
                >
                  {mod.icon}
                </span>
                <h3
                  className={`font-headline text-2xl font-bold mb-4 ${
                    i === 0 ? "text-white" : ""
                  }`}
                >
                  {mod.title}
                </h3>
                <p
                  className={`leading-relaxed ${
                    i === 0 ? "text-secondary-fixed-dim" : "text-secondary"
                  }`}
                >
                  {mod.description}
                </p>
              </div>
              {i === 0 && (
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-surface-tint/20 blur-[60px] rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

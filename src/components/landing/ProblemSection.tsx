const painPoints = [
  {
    icon: "trending_down",
    title: "Margen-Killer",
    description:
      "Manuelle Fallprüfung ist unwirtschaftlich. Jede Stunde, die ein Junior mit PDF-Lesen verbringt, ist verbranntes Kapital.",
  },
  {
    icon: "group_off",
    title: "Personal-Falle",
    description:
      "Fachkräftemangel stoppt Ihr Wachstum. Sie finden keine qualifizierten Juristen – und die wenigen, die Sie haben, verschwenden Zeit mit Routinearbeit.",
  },
  {
    icon: "speed",
    title: "Innovations-Angst",
    description:
      "Die Konkurrenz schläft nicht, sie automatisiert bereits. Wer heute nicht digitalisiert, verliert morgen den Markt.",
  },
];

export default function ProblemSection() {
  return (
    <section className="py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <span className="text-surface-tint font-bold font-label uppercase tracking-widest block mb-4">
            Das Problem
          </span>
          <h2 className="font-headline text-[2.5rem] font-extrabold leading-tight mb-6">
            Das Ende der Billable Hour.
          </h2>
          <p className="text-secondary text-lg leading-relaxed">
            Das deutsche Rechtssystem ist träge, aber die Technologie ist es
            nicht mehr. Wer heute noch Junioren dafür bezahlt, PDFs zu lesen,
            verliert gegen den Algorithmus. Wir zeigen Ihnen nicht, wie man KI
            nutzt – wir bauen Ihre Kanzlei um die KI herum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {painPoints.map((point) => (
            <div
              key={point.title}
              className="group relative bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 hover:border-surface-tint/20 transition-all duration-500"
            >
              <span className="material-symbols-outlined text-3xl text-surface-tint mb-5 block">
                {point.icon}
              </span>
              <h3 className="font-headline text-xl font-bold mb-3">
                {point.title}
              </h3>
              <p className="text-secondary leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        <div className="relative py-12 px-8 md:px-16 bg-on-background rounded-2xl overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-surface-tint/20 blur-[60px] rounded-full" />
          <blockquote className="relative z-10 text-center">
            <p className="font-headline text-2xl md:text-3xl font-extrabold text-white leading-snug">
              &ldquo;Das System ist langsam.{" "}
              <span className="text-tertiary-fixed-dim">
                Wir sind es nicht.
              </span>
              &rdquo;
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

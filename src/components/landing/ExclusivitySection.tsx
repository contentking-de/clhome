import Link from "next/link";

export default function ExclusivitySection() {
  return (
    <section className="py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-on-background rounded-2xl p-12 md:p-20 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-surface-tint/15 blur-[100px] rounded-full" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-tertiary-fixed-dim/15 blur-[100px] rounded-full" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <span className="material-symbols-outlined text-5xl text-tertiary-fixed-dim mb-6 block">
              workspace_premium
            </span>
            <h2 className="font-headline text-[2.5rem] md:text-[3rem] font-extrabold leading-tight text-white mb-6">
              Exklusivität ist unsere Policy.
            </h2>
            <p className="text-secondary-fixed-dim text-lg leading-relaxed mb-4">
              Wir skalieren keine Massenware. Wir wählen unsere Partner gezielt
              aus. Pro Rechtsgebiet und Region vergeben wir nur eine Lizenz für
              unsere Engine.
            </p>
            <p className="text-white font-bold text-lg mb-10">
              Sichern Sie sich Ihren Marktvorsprung, bevor es Ihr Nachbar tut.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-surface-tint text-white px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all"
            >
              Verfügbarkeit prüfen
              <span className="material-symbols-outlined">lock</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

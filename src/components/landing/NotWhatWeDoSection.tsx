export default function NotWhatWeDoSection() {
  return (
    <section id="abgrenzung" className="py-32 px-8 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-on-background rounded-2xl p-12 md:p-20 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-red-400/10 blur-[100px] rounded-full" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-surface-tint/10 blur-[100px] rounded-full" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-400/15">
                <span className="material-symbols-outlined text-3xl text-red-400">
                  block
                </span>
              </span>
              <span className="text-red-400 font-label font-bold text-xs uppercase tracking-widest">
                Klare Abgrenzung
              </span>
            </div>

            <h2 className="font-headline text-[2.5rem] font-extrabold leading-tight text-white mb-6">
              Was wir{" "}
              <span className="text-red-400">nicht</span>{" "}
              tun.
            </h2>

            <p className="text-secondary-fixed-dim text-lg leading-relaxed mb-10">
              Wir helfen nicht dabei, Personal abzubauen. Unser Ansatz geht in
              eine andere Richtung.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-10">
              <div className="flex items-start gap-5">
                <span className="material-symbols-outlined text-3xl text-tertiary-fixed-dim mt-1 shrink-0">
                  rocket_launch
                </span>
                <div>
                  <h3 className="font-headline text-xl font-bold text-white mb-3">
                    Mehr Mandate. Gleiches Team. Höhere Qualität.
                  </h3>
                  <p className="text-secondary-fixed-dim leading-relaxed">
                    Mit unseren Maßnahmen helfen wir Kanzleien dabei, nicht über
                    Headcount zu skalieren, sondern über Zeitersparnis – mehr
                    Mandanten mit demselben Team in gleicher oder höherer
                    Qualität bedienen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

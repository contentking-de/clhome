export default function Hero() {
  return (
    <section className="relative min-h-[870px] flex items-center px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-highest rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-surface-tint" />
            <span className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant font-label">
              Legal Tech 2.0
            </span>
          </div>
          <h1 className="font-headline text-[3.5rem] leading-[1.1] font-extrabold tracking-tight mb-8 text-on-background">
            Recht haben dauert Sekunden. <br />
            <span className="text-surface-tint">Recht bekommen</span> ab jetzt
            auch.
          </h1>
          <p className="text-secondary text-lg max-w-xl mb-10 leading-relaxed">
            Wir eliminieren die Bürokratie des Wartens. Mit algorithmischer
            Präzision und menschlicher Exzellenz transformieren wir komplexe
            Rechtslagen in sofortige Resultate.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-on-primary-container text-on-primary px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 transition-all">
              Jetzt starten
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button className="px-8 py-4 rounded-xl border border-outline-variant/30 font-bold hover:bg-surface-container-low transition-all">
              Unsere Vision
            </button>
          </div>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="relative w-full aspect-square rounded-full overflow-hidden border-[16px] border-surface-container-low">
            <img
              alt="Modernes Gebäude aus Glas und Stahl"
              className="w-full h-full object-cover grayscale"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGHru1M58SvpMA1w8Ip3qlRdpqKPhM6lYCi1vIKJbELDbQHcdvnS0sQCW3OJXiSNd1uXeCnh0uoaaGLABYt5cn0YBb8ZTv6gUz0UYFMtNgYUX5XgieaugGNaqNbYMClMfB8o9zFe4gWqkrGqqLcgygMY2P-o25zXcFnTrKcoO_UxfrLNHEu72SO7sm9cw3_vHSNpjD7rWgyG-TKPX_WSlwgmmFgCB-Xt_1wUK8RsmzdKatApHm-N2MyImjNBNf88zXChypyAUuilbN"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-surface-tint/20 to-transparent" />
          </div>
          <div className="absolute top-12 -left-8 bg-surface-container-highest/90 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-outline-variant/10 max-w-[200px]">
            <span className="material-symbols-outlined text-surface-tint mb-2 block">
              bolt
            </span>
            <div className="text-sm font-bold font-headline mb-1">
              Zeitersparnis
            </div>
            <div className="text-xs text-secondary leading-snug">
              Automatisierte Fallprüfung in unter 30 Sekunden.
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -right-24 top-1/4 w-96 h-96 bg-tertiary-fixed-dim/10 blur-[120px] rounded-full" />
    </section>
  );
}

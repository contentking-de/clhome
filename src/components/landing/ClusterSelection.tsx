export default function ClusterSelection() {
  return (
    <section id="cluster" className="py-32 px-8 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="font-headline text-3xl font-extrabold mb-4">
            Wählen Sie Ihre Ebene
          </h2>
          <div className="w-20 h-1 bg-surface-tint" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Anwälte */}
          <div
            id="anwaelte"
            className="group relative bg-surface p-10 rounded-xl border border-outline-variant/10 hover:border-surface-tint/30 transition-all duration-500 overflow-hidden"
          >
            <div className="relative z-10">
              <span className="material-symbols-outlined text-4xl text-surface-tint mb-6 block">
                swords
              </span>
              <h3 className="font-headline text-2xl font-bold mb-4">
                Anwälte
              </h3>
              <p className="text-secondary mb-8 leading-relaxed">
                Die{" "}
                <span className="font-bold text-on-surface">Waffenkammer</span>{" "}
                für moderne Kanzleien. Skalieren Sie Ihre Reichweite durch
                intelligente Automatisierung.
              </p>
              <a
                className="inline-flex items-center gap-2 text-surface-tint font-bold group-hover:gap-4 transition-all"
                href="#"
              >
                Efficiency Engine entdecken
                <span className="material-symbols-outlined text-sm">
                  chevron_right
                </span>
              </a>
            </div>
            <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <span className="material-symbols-outlined text-[12rem]">
                account_balance
              </span>
            </div>
          </div>

          {/* Unternehmen */}
          <div
            id="unternehmen"
            className="group relative bg-on-background p-10 rounded-xl border border-outline-variant/10 overflow-hidden"
          >
            <div className="relative z-10">
              <span className="material-symbols-outlined text-4xl text-tertiary-fixed-dim mb-6 block">
                precision_manufacturing
              </span>
              <h3 className="font-headline text-2xl font-bold mb-4 text-white">
                Unternehmen
              </h3>
              <p className="text-secondary-fixed-dim mb-8 leading-relaxed">
                Die{" "}
                <span className="font-bold text-white">Efficiency Engine</span>{" "}
                für Ihren Inhouse-Legal Bereich. Risikominimierung bei maximalem
                Speed.
              </p>
              <a
                className="inline-flex items-center gap-2 text-tertiary-fixed-dim font-bold group-hover:gap-4 transition-all"
                href="#"
              >
                System integrieren
                <span className="material-symbols-outlined text-sm">
                  chevron_right
                </span>
              </a>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-surface-tint/20 blur-[60px] rounded-full" />
          </div>

          {/* Privatkunden */}
          <div
            id="privatkunden"
            className="group relative bg-surface p-10 rounded-xl border border-outline-variant/10 hover:border-surface-tint/30 transition-all duration-500 overflow-hidden"
          >
            <div className="relative z-10">
              <span className="material-symbols-outlined text-4xl text-surface-tint mb-6 block">
                architecture
              </span>
              <h3 className="font-headline text-2xl font-bold mb-4">
                Privatkunden
              </h3>
              <p className="text-secondary mb-8 leading-relaxed">
                Die{" "}
                <span className="font-bold text-on-surface">Speerspitze</span>{" "}
                Ihres Rechtsanspruchs. Sofortige Hilfe ohne bürokratische
                Hürden.
              </p>
              <a
                className="inline-flex items-center gap-2 text-surface-tint font-bold group-hover:gap-4 transition-all"
                href="#"
              >
                Recht einfordern
                <span className="material-symbols-outlined text-sm">
                  chevron_right
                </span>
              </a>
            </div>
            <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <span className="material-symbols-outlined text-[12rem]">
                shield
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

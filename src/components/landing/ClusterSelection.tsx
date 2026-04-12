import Link from "next/link";

export default function ClusterSelection() {
  return (
    <section id="cluster" className="py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-surface-tint font-bold font-label uppercase tracking-widest block mb-4">
            Zielgruppen
          </span>
          <h2 className="font-headline text-[2.5rem] font-extrabold leading-tight mb-4">
            Wählen Sie Ihre Ebene.
          </h2>
          <p className="text-secondary text-lg max-w-2xl">
            Drei Cluster. Ein Ökosystem. Jede Lösung ist auf Ihre
            spezifischen Anforderungen zugeschnitten.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Anwälte */}
          <Link
            href="/fuer-anwaelte"
            className="group relative bg-surface p-10 rounded-xl border border-outline-variant/10 hover:border-surface-tint/30 transition-all duration-500 overflow-hidden"
          >
            <div className="relative z-10">
              <span className="material-symbols-outlined text-4xl text-surface-tint mb-6 block">
                swords
              </span>
              <h3 className="font-headline text-2xl font-bold mb-4">
                Für Anwälte
              </h3>
              <p className="text-secondary mb-4 leading-relaxed">
                Die{" "}
                <span className="font-bold text-on-surface">Waffenkammer</span>{" "}
                für die Kanzlei der Zukunft. Prüfzeit um 90 % reduziert,
                Massenverfahren ohne Massenaufwand.
              </p>
              <p className="text-secondary text-sm mb-8 leading-relaxed">
                Ready-to-File: Vom Erstkontakt bis zur fertigen Klage in unter 5 Minuten.
              </p>
              <span className="inline-flex items-center gap-2 text-surface-tint font-bold group-hover:gap-4 transition-all">
                Kanzlei-Transformation entdecken
                <span className="material-symbols-outlined text-sm">
                  chevron_right
                </span>
              </span>
            </div>
            <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <span className="material-symbols-outlined text-[12rem]">
                account_balance
              </span>
            </div>
          </Link>

          {/* Unternehmen */}
          <Link
            href="/fuer-unternehmen"
            className="group relative bg-on-background p-10 rounded-xl border border-outline-variant/10 overflow-hidden"
          >
            <div className="relative z-10">
              <span className="material-symbols-outlined text-4xl text-tertiary-fixed-dim mb-6 block">
                precision_manufacturing
              </span>
              <h3 className="font-headline text-2xl font-bold mb-4 text-white">
                Für Unternehmen
              </h3>
              <p className="text-secondary-fixed-dim mb-4 leading-relaxed">
                Die{" "}
                <span className="font-bold text-white">Efficiency Engine</span>{" "}
                für Ihre Rechtsabteilung. Standard-Prüfungen in Echtzeit statt in Wochen.
              </p>
              <p className="text-secondary-fixed-dim text-sm mb-8 leading-relaxed">
                Wir eliminieren den Flaschenhals &ldquo;Legal Department&rdquo; und halbieren Durchlaufzeiten.
              </p>
              <span className="inline-flex items-center gap-2 text-tertiary-fixed-dim font-bold group-hover:gap-4 transition-all">
                System integrieren
                <span className="material-symbols-outlined text-sm">
                  chevron_right
                </span>
              </span>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-surface-tint/20 blur-[60px] rounded-full" />
          </Link>

          {/* Privatkunden */}
          <Link
            href="/fuer-privatkunden"
            className="group relative bg-surface p-10 rounded-xl border border-outline-variant/10 hover:border-surface-tint/30 transition-all duration-500 overflow-hidden"
          >
            <div className="relative z-10">
              <span className="material-symbols-outlined text-4xl text-surface-tint mb-6 block">
                shield
              </span>
              <h3 className="font-headline text-2xl font-bold mb-4">
                Für Privatkunden
              </h3>
              <p className="text-secondary mb-4 leading-relaxed">
                Die{" "}
                <span className="font-bold text-on-surface">Speerspitze</span>{" "}
                Ihres Rechtsanspruchs. Automatisierte Abwicklung statt
                bürokratischer Hürden.
              </p>
              <p className="text-secondary text-sm mb-8 leading-relaxed">
                Sofortige Hilfe. Kurze Wege. Maximaler Durchsatz.
              </p>
              <span className="inline-flex items-center gap-2 text-surface-tint font-bold group-hover:gap-4 transition-all">
                Recht einfordern
                <span className="material-symbols-outlined text-sm">
                  chevron_right
                </span>
              </span>
            </div>
            <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <span className="material-symbols-outlined text-[12rem]">
                gavel
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

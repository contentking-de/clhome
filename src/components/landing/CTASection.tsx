import Link from "next/link";
import Icon from "../ui/Icon";

export default function CTASection() {
  return (
    <section className="py-24 px-8 border-t border-outline-variant/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-12">
          <div className="text-center md:text-left">
            <h3 className="font-headline text-2xl font-bold mb-2">
              Bereit für den nächsten Schritt?
            </h3>
            <p className="text-secondary max-w-lg">
              Während andere noch stempeln, haben wir schon gewonnen. Sichern
              Sie sich jetzt Ihr Strategie-Gespräch.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold font-headline text-on-background mb-1">
                −90%
              </span>
              <span className="text-xs uppercase font-label tracking-tighter text-secondary">
                Routineaufwand
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold font-headline text-on-background mb-1">
                &lt;5 Min
              </span>
              <span className="text-xs uppercase font-label tracking-tighter text-secondary">
                Bis zur Klage
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold font-headline text-on-background mb-1">
                24/7
              </span>
              <span className="text-xs uppercase font-label tracking-tighter text-secondary">
                Erreichbarkeit
              </span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 bg-on-primary-container text-on-primary px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all"
          >
            Strategie-Gespräch anfordern
            <Icon name="arrow_forward" />
          </Link>
          <p className="text-secondary text-sm mt-3">
            Nur ein Partner pro Rechtsgebiet und Region.
          </p>
        </div>
      </div>
    </section>
  );
}

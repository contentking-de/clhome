export default function CTASection() {
  return (
    <section className="py-24 px-8 border-t border-outline-variant/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="text-center md:text-left">
          <h3 className="font-headline text-2xl font-bold mb-2">
            Bereit für den nächsten Schritt?
          </h3>
          <p className="text-secondary">
            Wählen Sie Effizienz statt Warten.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-extrabold font-headline text-on-background mb-1">
              98%
            </span>
            <span className="text-xs uppercase font-label tracking-tighter text-secondary">
              Zeitersparnis
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
          <div className="flex flex-col items-center">
            <span className="text-3xl font-extrabold font-headline text-on-background mb-1">
              10k+
            </span>
            <span className="text-xs uppercase font-label tracking-tighter text-secondary">
              Gelöste Fälle
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Für Privatkunden | clever.legal",
  description:
    "Sofortige Hilfe bei Rechtsansprüchen. Automatisierte Abwicklung, kurze Wege, maximaler Durchsatz – ohne bürokratische Hürden.",
};

const steps = [
  {
    icon: "upload_file",
    title: "Fall einreichen",
    description:
      "Laden Sie Ihre Unterlagen hoch oder beantworten Sie wenige gezielte Fragen. Unsere KI erfasst Ihren Fall automatisch.",
  },
  {
    icon: "fact_check",
    title: "Sofort-Prüfung",
    description:
      "In Sekunden erhalten Sie eine Einschätzung Ihrer Erfolgschancen. Kein Warten, keine Unsicherheit.",
  },
  {
    icon: "gavel",
    title: "Automatisierte Durchsetzung",
    description:
      "Ihr Anspruch wird professionell aufbereitet und durchgesetzt. Sie lehnen sich zurück.",
  },
];

const advantages = [
  {
    icon: "timer",
    title: "Schnell",
    description:
      "Keine wochenlange Wartezeit. Von der Einreichung bis zur Ersteinschätzung vergehen Sekunden, nicht Tage.",
  },
  {
    icon: "savings",
    title: "Transparent",
    description:
      "Keine versteckten Kosten. Sie wissen von Anfang an, was Sie erwartet – finanziell und zeitlich.",
  },
  {
    icon: "verified_user",
    title: "Professionell",
    description:
      "Hinter der Technologie stehen erfahrene Juristen. Automatisierung ersetzt keine Expertise – sie macht sie zugänglich.",
  },
  {
    icon: "groups",
    title: "Für alle",
    description:
      "Egal ob Flugverspätung, Mietrecht oder Verbraucherschutz – wir machen Rechtsansprüche für jeden durchsetzbar.",
  },
];

export default function FuerPrivatkundenPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-highest rounded-full mb-8">
                <span className="w-2 h-2 rounded-full bg-surface-tint" />
                <span className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant font-label">
                  Für Privatkunden
                </span>
              </div>
              <h1 className="font-headline text-[3rem] leading-[1.1] font-extrabold tracking-tight mb-6 text-on-background">
                Ihr Recht.{" "}
                <span className="text-surface-tint">
                  Sofort durchgesetzt.
                </span>
              </h1>
              <p className="text-secondary text-lg leading-relaxed mb-10">
                Sofortige Hilfe ohne bürokratische Hürden. Wir automatisieren
                die Durchsetzung Ihrer Ansprüche – schnell, transparent und
                professionell.
              </p>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 bg-on-primary-container text-on-primary px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all"
              >
                Anspruch prüfen lassen
                <span className="material-symbols-outlined">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* So funktioniert's */}
        <section className="py-24 px-8 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="text-surface-tint font-bold font-label uppercase tracking-widest block mb-4">
                So funktioniert&apos;s
              </span>
              <h2 className="font-headline text-[2.5rem] font-extrabold leading-tight">
                Drei Schritte zum Erfolg.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <div key={step.title} className="relative">
                  <div className="bg-surface p-10 rounded-xl border border-outline-variant/10 h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-tint text-white font-headline font-bold text-lg">
                        {i + 1}
                      </span>
                      <span className="material-symbols-outlined text-3xl text-surface-tint">
                        {step.icon}
                      </span>
                    </div>
                    <h3 className="font-headline text-xl font-bold mb-3">
                      {step.title}
                    </h3>
                    <p className="text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vorteile */}
        <section className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="text-surface-tint font-bold font-label uppercase tracking-widest block mb-4">
                Warum clever.legal
              </span>
              <h2 className="font-headline text-[2.5rem] font-extrabold leading-tight">
                Recht haben reicht nicht.
              </h2>
              <p className="text-secondary text-lg max-w-2xl mt-4">
                Recht bekommen – das ist die eigentliche Herausforderung. Wir
                machen es einfach.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {advantages.map((a) => (
                <div
                  key={a.title}
                  className="flex gap-5 p-8 rounded-xl bg-surface-container-low border border-outline-variant/10"
                >
                  <span className="material-symbols-outlined text-3xl text-surface-tint shrink-0 mt-1">
                    {a.icon}
                  </span>
                  <div>
                    <h3 className="font-headline text-lg font-bold mb-2">
                      {a.title}
                    </h3>
                    <p className="text-secondary leading-relaxed">
                      {a.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-8 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="relative bg-on-background rounded-2xl p-12 md:p-20 overflow-hidden text-center">
              <div className="absolute -top-20 -left-20 w-60 h-60 bg-surface-tint/15 blur-[100px] rounded-full" />
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-tertiary-fixed-dim/15 blur-[100px] rounded-full" />
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-white mb-6">
                  Kostenlos prüfen lassen.
                </h2>
                <p className="text-secondary-fixed-dim text-lg leading-relaxed mb-10">
                  Finden Sie in Sekunden heraus, ob Ihr Anspruch berechtigt
                  ist. Ohne Risiko, ohne Verpflichtung.
                </p>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 bg-surface-tint text-white px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all"
                >
                  Anspruch jetzt prüfen
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

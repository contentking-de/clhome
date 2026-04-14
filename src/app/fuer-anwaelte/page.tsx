import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import Icon from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Für Anwälte | clever.legal",
  description:
    "Die KI-Infrastruktur für die Kanzlei der Zukunft. Prüfzeit um 90 % reduziert, Massenverfahren ohne Massenaufwand, Ready-to-File in unter 5 Minuten.",
};

const benefits = [
  {
    icon: "speed",
    title: "Vom Sichten zum Entscheiden",
    description:
      "Unsere KI reduziert die Prüfzeit von Mandanten-Dokumenten um bis zu 90 %. Sie lesen keine PDFs mehr – Sie validieren nur noch Ergebnisse.",
  },
  {
    icon: "auto_awesome",
    title: "Ende der Fleißarbeit",
    description:
      "Massenverfahren ohne Massenaufwand. Wir automatisieren den Schriftsatz-Wahnsinn, damit Sie sich auf die juristische Strategie konzentrieren können.",
  },
  {
    icon: "bolt",
    title: "Ready-to-File",
    description:
      "Vom Erstkontakt bis zur fertigen Klage in unter 5 Minuten. Skalieren Sie Ihre Kanzlei, ohne Ihr Team vergrößern zu müssen.",
  },
];

const engineModules = [
  {
    icon: "neurology",
    title: "Custom Intake AI",
    description:
      "Automatische Extraktion von Kerndaten wie Vertragsnummern und Beträge. OCR-Erkennung eliminiert händisches Abtippen komplett.",
  },
  {
    icon: "edit_note",
    title: "Auto-Drafting Engine",
    description:
      "Generiert fertige Schriftsätze auf Basis bewährter Erfolgs-Templates. Jede Klageschrift ist individuell – aber in Sekunden erstellt.",
  },
  {
    icon: "rocket_launch",
    title: "Performance-Satelliten",
    description:
      "Spezialisierte Landingpages füllen Ihre neue Kapazität sofort mit qualifizierten Mandanten. Lead-Generierung auf Autopilot.",
  },
  {
    icon: "school",
    title: "The Workshop",
    description:
      "48-Stunden-Vollintegration Ihres Teams. Wir gehen erst, wenn das System läuft und jeder Mitarbeiter es beherrscht.",
  },
];

export default function FuerAnwaeltePage() {
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
                  Für Anwälte & Kanzleien
                </span>
              </div>
              <h1 className="font-headline text-[3rem] leading-[1.1] font-extrabold tracking-tight mb-6 text-on-background">
                Bauen Sie die Kanzlei, die{" "}
                <span className="text-surface-tint">
                  man nicht mehr ersetzen kann.
                </span>
              </h1>
              <p className="text-secondary text-lg leading-relaxed mb-10">
                Keine Beratung. Keine Experimente. Wir installieren die
                KI-Infrastruktur, mit der Sie Einzelmandate und sogar Massenverfahren skalieren,
                während Ihre Konkurrenz noch Akten sortiert.
              </p>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 bg-on-primary-container text-on-primary px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all"
              >
                Strategie-Gespräch anfordern
                <Icon name="arrow_forward" />
              </Link>
            </div>
          </div>
        </section>

        {/* Nutzen */}
        <section className="py-24 px-8 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="text-surface-tint font-bold font-label uppercase tracking-widest block mb-4">
                Ihre Vorteile
              </span>
              <h2 className="font-headline text-[2.5rem] font-extrabold leading-tight">
                Die Fokus-Garantie.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="bg-surface p-10 rounded-xl border border-outline-variant/10"
                >
                  <Icon name={b.icon} className="text-4xl text-surface-tint mb-6 block" />
                  <h3 className="font-headline text-xl font-bold mb-3">
                    {b.title}
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    {b.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Engine Module */}
        <section className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="text-surface-tint font-bold font-label uppercase tracking-widest block mb-4">
                Die Engine
              </span>
              <h2 className="font-headline text-[2.5rem] font-extrabold leading-tight mb-4">
                Ihre Kanzlei auf Steroiden.
              </h2>
              <p className="text-secondary text-lg max-w-2xl">
                Vier Module, die ineinandergreifen. Von der automatisierten
                Mandats-Prüfung bis zur Mandanten-Akquise – ein geschlossenes
                System.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {engineModules.map((mod, i) => (
                <div
                  key={mod.title}
                  className={`relative p-10 rounded-xl border border-outline-variant/10 overflow-hidden ${
                    i === 0
                      ? "bg-on-background text-white"
                      : "bg-surface-container-low"
                  }`}
                >
                  <Icon
                    name={mod.icon}
                    className={`text-4xl mb-6 block ${
                      i === 0
                        ? "text-tertiary-fixed-dim"
                        : "text-surface-tint"
                    }`}
                  />
                  <h3
                    className={`font-headline text-2xl font-bold mb-4 ${
                      i === 0 ? "text-white" : ""
                    }`}
                  >
                    {mod.title}
                  </h3>
                  <p
                    className={`leading-relaxed ${
                      i === 0
                        ? "text-secondary-fixed-dim"
                        : "text-secondary"
                    }`}
                  >
                    {mod.description}
                  </p>
                  {i === 0 && (
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-surface-tint/20 blur-[60px] rounded-full" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Exklusivität + CTA */}
        <section className="py-24 px-8 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="relative bg-on-background rounded-2xl p-12 md:p-20 overflow-hidden text-center">
              <div className="absolute -top-20 -left-20 w-60 h-60 bg-surface-tint/15 blur-[100px] rounded-full" />
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-tertiary-fixed-dim/15 blur-[100px] rounded-full" />
              <div className="relative z-10 max-w-2xl mx-auto">
                <Icon name="workspace_premium" className="text-5xl text-tertiary-fixed-dim mb-6 block" />
                <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-white mb-6">
                  Nur ein Partner pro Rechtsgebiet.
                </h2>
                <p className="text-secondary-fixed-dim text-lg leading-relaxed mb-10">
                  Wir vergeben pro Rechtsgebiet und Region nur eine Lizenz.
                  Sichern Sie sich Ihren Marktvorsprung, bevor es Ihr Nachbar
                  tut.
                </p>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 bg-surface-tint text-white px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all"
                >
                  Verfügbarkeit prüfen
                  <Icon name="lock" />
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

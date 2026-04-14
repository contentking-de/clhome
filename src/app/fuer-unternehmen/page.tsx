import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import Icon from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Für Unternehmen | clever.legal",
  description:
    "Die Efficiency Engine für Ihre Rechtsabteilung. Standard-Prüfungen in Echtzeit, Durchlaufzeiten halbiert, Flaschenhals eliminiert.",
};

const benefits = [
  {
    icon: "hub",
    title: "Legal Dept. on Steroids",
    description:
      "Wir eliminieren den Flaschenhals 'Rechtsabteilung'. Automatisierte Workflows sorgen dafür, dass Standard-Prüfungen in Echtzeit stattfinden – nicht in Wochen.",
  },
  {
    icon: "timer",
    title: "Prozess-Beschleuniger",
    description:
      "Zeit ist Risiko. clever.legal digitalisiert Ihre Legal-Struktur so tiefgreifend, dass Durchlaufzeiten halbiert werden.",
  },
  {
    icon: "security",
    title: "Compliance auf Autopilot",
    description:
      "Automatisierte Regelprüfung und Dokumentation. Reduzieren Sie Compliance-Risiken systematisch, ohne zusätzliches Personal.",
  },
];

const features = [
  {
    title: "Automatisierte Vertragsprüfung",
    description:
      "KI-gestützte Analyse von Verträgen in Sekunden statt Tagen. Risiken werden identifiziert, bevor sie zu Problemen werden.",
  },
  {
    title: "Workflow-Integration",
    description:
      "Nahtlose Anbindung an bestehende Systeme. Keine Insellösung, sondern tiefe Integration in Ihre Prozesslandschaft.",
  },
  {
    title: "Echtzeit-Reporting",
    description:
      "Dashboard mit allen relevanten KPIs. Transparenz über Kosten, Durchlaufzeiten und Risiken auf einen Blick.",
  },
  {
    title: "Maßgeschneiderte KI-Modelle",
    description:
      "Trainiert auf Ihre branchenspezifischen Anforderungen. Keine generische Lösung, sondern Ihr individueller Wettbewerbsvorteil.",
  },
];

export default function FuerUnternehmenPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28">
        {/* Hero */}
        <section className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-highest rounded-full mb-8">
                <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim" />
                <span className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant font-label">
                  Für Unternehmen
                </span>
              </div>
              <h1 className="font-headline text-[3rem] leading-[1.1] font-extrabold tracking-tight mb-6 text-on-background">
                Die Efficiency Engine{" "}
                <span className="text-surface-tint">
                  für Ihre Rechtsabteilung.
                </span>
              </h1>
              <p className="text-secondary text-lg leading-relaxed mb-10">
                Beratung und Implementierung von Legal-Tech-Tools zur
                Inhouse-Digitalisierung. Wir transformieren Ihre
                Rechtsabteilung von der Kostenstelle zum strategischen
                Wettbewerbsvorteil.
              </p>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 bg-on-primary-container text-on-primary px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all"
              >
                Beratungsgespräch vereinbaren
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
                Schluss mit dem Flaschenhals.
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

        {/* Features */}
        <section className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="text-surface-tint font-bold font-label uppercase tracking-widest block mb-4">
                Features
              </span>
              <h2 className="font-headline text-[2.5rem] font-extrabold leading-tight mb-4">
                Was wir implementieren.
              </h2>
              <p className="text-secondary text-lg max-w-2xl">
                Keine Billig-SaaS. Eine massive Transformation Ihrer
                Legal-Infrastruktur, maßgeschneidert auf Ihre Prozesse.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className={`p-10 rounded-xl border border-outline-variant/10 ${
                    i === 0
                      ? "bg-on-background"
                      : "bg-surface-container-low"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`font-headline text-3xl font-extrabold ${
                        i === 0
                          ? "text-tertiary-fixed-dim"
                          : "text-surface-tint"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <h3
                      className={`font-headline text-xl font-bold ${
                        i === 0 ? "text-white" : ""
                      }`}
                    >
                      {f.title}
                    </h3>
                  </div>
                  <p
                    className={`leading-relaxed ${
                      i === 0
                        ? "text-secondary-fixed-dim"
                        : "text-secondary"
                    }`}
                  >
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-8 bg-surface-container-low">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-headline text-3xl font-extrabold mb-4">
              Bereit, den Flaschenhals zu eliminieren?
            </h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto mb-10">
              Lassen Sie uns gemeinsam analysieren, wo Ihre Rechtsabteilung
              die meiste Zeit verliert – und wie wir das in Wochen ändern.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-on-primary-container text-on-primary px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all"
            >
              Beratungsgespräch vereinbaren
              <Icon name="arrow_forward" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

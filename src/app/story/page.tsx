import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import Icon from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Unsere Story | clever.legal",
  description:
    "Von Primaten zu Prozessen. Wie ein Spaziergang am Affenberg zur Geburt von clever.legal führte – und warum vier Köpfe das Rechtssystem neu denken.",
};

const founders = [
  {
    name: "Nico",
    fullName: "Nico Sacotte",
    role: "Content-Stratege",
    icon: "edit_note",
    image:
      "https://suudphdtlchxrc5q.public.blob.vercel-storage.com/landing/expert-nico-sacotte.webp",
  },
  {
    name: "Thorsten",
    fullName: "Thorsten Loth",
    role: "Performance Marketing",
    icon: "trending_up",
    image:
      "https://suudphdtlchxrc5q.public.blob.vercel-storage.com/landing/expert-thorsten-loth.webp",
  },
  {
    name: "Marc",
    fullName: "Marc Ellerbrock",
    role: "Massenklage-Stratege",
    icon: "gavel",
    image:
      "https://suudphdtlchxrc5q.public.blob.vercel-storage.com/landing/expert-marc-ellerbrock.webp",
  },
  {
    name: "Christoph",
    fullName: "Christoph Ehrke",
    role: "IT-Architekt",
    icon: "code",
    image:
      "https://suudphdtlchxrc5q.public.blob.vercel-storage.com/landing/expert-christoph-ehrke.webp",
  },
];

export default function StoryPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-32 px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-highest rounded-full mb-8">
                <span className="w-2 h-2 rounded-full bg-surface-tint" />
                <span className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant font-label">
                  Unsere Geschichte
                </span>
              </div>
              <h1 className="font-headline text-[3.5rem] leading-[1.08] font-extrabold tracking-tight mb-8 text-on-background">
                Von Primaten <br />
                <span className="text-surface-tint">zu Prozessen.</span>
              </h1>
              <p className="text-secondary text-xl leading-relaxed max-w-2xl">
                Die meisten bahnbrechenden Ideen entstehen in verglasten
                Konferenzräumen. Unsere begann mit dem Versuch, genau das
                Gegenteil zu tun.
              </p>
            </div>
          </div>
          <div className="absolute -right-24 top-1/4 w-96 h-96 bg-tertiary-fixed-dim/10 blur-[120px] rounded-full" />
        </section>

        {/* Der Digital Detox */}
        <section className="py-24 px-8 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7">
                <span className="text-surface-tint font-bold font-label uppercase tracking-widest block mb-4">
                  Kapitel 1
                </span>
                <h2 className="font-headline text-[2.5rem] font-extrabold leading-tight mb-8">
                  Der Digital Detox, der nach hinten losging.
                </h2>
                <div className="space-y-6 text-secondary text-lg leading-relaxed">
                  <p>
                    Eigentlich wollten Nico und Thorsten abschalten. Kein Slack,
                    kein LinkedIn, keine Dashboards. Der Plan war simpel: Quality Time – Ein
                    Spaziergang mit den Familien im Wald am Affenberg, um zwischen Berberaffen
                    den Kopf frei zu bekommen und eine dringend benötigte Auszeit
                    vom digitalen Rauschen zu nehmen.
                  </p>
                  <p>
                    Doch das Schicksal hatte andere Pläne. Statt der erhofften
                    digitalen Entgiftung kam die Erkenntnis wie ein Paukenschlag:
                  </p>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="relative">
                  <div className="bg-on-background rounded-2xl p-10 text-white relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-surface-tint/20 blur-[60px] rounded-full" />
                    <Icon name="forest" className="text-5xl text-tertiary-fixed-dim mb-6 block relative z-10" />
                    <p className="text-lg leading-relaxed font-medium relative z-10">
                      &bdquo;Während wir uns hier über die Evolution der Primaten
                      wundern, steckt das deutsche Rechtssystem noch in der
                      analogen Kreidezeit fest. Irgendwie &sbquo;affig&lsquo;, dass Recht so lange
                      dauert, obwohl die Technologie eigentlich bereit
                      stünde.&ldquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Die Fragen */}
        <section className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="text-surface-tint font-bold font-label uppercase tracking-widest block mb-4">
                Die Initialzündung
              </span>
              <h2 className="font-headline text-[2rem] font-extrabold leading-tight mb-8">
                Zwei Fragen, die alles verändert haben.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-surface-container-low p-10 rounded-xl border border-outline-variant/10">
                <Icon name="schedule" className="text-4xl text-surface-tint mb-6 block" />
                <p className="text-on-background text-lg font-medium leading-relaxed">
                  Warum dauert &bdquo;Recht bekommen&ldquo; in einer Welt der
                  Echtzeit-Daten immer noch Monate?
                </p>
              </div>
              <div className="bg-surface-container-low p-10 rounded-xl border border-outline-variant/10">
                <Icon name="psychology" className="text-4xl text-surface-tint mb-6 block" />
                <p className="text-on-background text-lg font-medium leading-relaxed">
                  Warum wälzen hochbezahlte Juristen stapelweise Akten, während
                  KI bereits komplexe Muster in Sekunden erkennen kann?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vertrauen als Betriebssystem */}
        <section className="py-24 px-8 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-16">
              <span className="text-surface-tint font-bold font-label uppercase tracking-widest block mb-4">
                Kapitel 2
              </span>
              <h2 className="font-headline text-[2.5rem] font-extrabold leading-tight mb-6">
                Vertrauen als Betriebssystem.
              </h2>
              <p className="text-secondary text-lg leading-relaxed">
                Die Idee für clever.legal war geboren, aber sie brauchte mehr
                als nur einen Geistesblitz im Wald. Sie brauchte ein Fundament
                aus Vertrauen und tiefgreifender Expertise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Die Nachbarn */}
              <div className="relative bg-surface p-10 rounded-xl border border-outline-variant/10 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-surface-tint/10 blur-[60px] rounded-full" />
                <div className="relative z-10">
                  <Icon name="diversity_1" className="text-4xl text-surface-tint mb-6 block" />
                  <h3 className="font-headline text-2xl font-bold mb-2">
                    Die Nachbarn
                  </h3>
                  <p className="text-surface-tint font-label text-xs uppercase tracking-wider mb-6">
                    Nico & Marc
                  </p>
                  <p className="text-secondary leading-relaxed">
                    Nico holte Marc dazu. Die beiden sind Freunde, quasi Nachbarn und langjährige
                    Weggefährten, aber auch geschäftlich miteinander verbunden.
                    Nico hatte das Projekt zockerhelden.de technisch umgesetzt
                    und beim Gang zur &bdquo;Höhle der Löwen&ldquo; technisch
                    begleitet. Marc,
                    der erfahrene Massenklage-Stratege, lieferte das juristische
                    Gewissen und die nötige Präzision, um die Vision rechtssicher
                    zu machen.
                  </p>
                  <div className="flex gap-3 mt-8">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-surface-tint/20">
                      <img
                        alt="Nico Sacotte"
                        src={founders[0].image}
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-surface-tint/20 -ml-4">
                      <img
                        alt="Marc Ellerbrock"
                        src={founders[2].image}
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Die Tech-Partner */}
              <div className="relative bg-surface p-10 rounded-xl border border-outline-variant/10 overflow-hidden">
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-tertiary-fixed-dim/10 blur-[60px] rounded-full" />
                <div className="relative z-10">
                  <Icon name="handshake" className="text-4xl text-surface-tint mb-6 block" />
                  <h3 className="font-headline text-2xl font-bold mb-2">
                    Die Tech-Partner
                  </h3>
                  <p className="text-surface-tint font-label text-xs uppercase tracking-wider mb-6">
                    Thorsten & Christoph
                  </p>
                  <p className="text-secondary leading-relaxed">
                    Thorsten brachte Christoph an Bord. Die beiden führen seit
                    Jahren als eingespieltes Team die Agenturen OMlocal und
                    OMfire. Christoph ist der IT-Architekt, der nicht in
                    Paragraphen, sondern in hochperformanter, skalierbarer Logik
                    denkt. Beide sind im Tagesgeschäft eng vernetzt und beraten
                    sehr erfolgreich mittelständische Unternehmen und
                    Großkonzerne mit ihrem über 30-köpfigen Team.
                  </p>
                  <div className="flex gap-3 mt-8">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-surface-tint/20">
                      <img
                        alt="Thorsten Loth"
                        src={founders[1].image}
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-surface-tint/20 -ml-4">
                      <img
                        alt="Christoph Ehrke"
                        src={founders[3].image}
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blockquote – Vom Affenberg in die Cloud */}
        <section className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="relative bg-on-background rounded-2xl p-12 md:p-20 overflow-hidden">
              <div className="absolute -top-20 -left-20 w-60 h-60 bg-surface-tint/15 blur-[100px] rounded-full" />
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-tertiary-fixed-dim/15 blur-[100px] rounded-full" />
              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <Icon name="cloud_upload" className="text-5xl text-tertiary-fixed-dim mb-8 block" />
                <blockquote className="font-headline text-2xl md:text-3xl font-extrabold text-white leading-snug mb-6">
                  Vom Affenberg direkt in die Cloud.
                </blockquote>
                <p className="text-secondary-fixed-dim text-lg leading-relaxed">
                  Wir sollten das unbedingt umsetzen – das System nicht nur
                  ein bisschen besser zu machen, sondern es neu zu bauen – das
                  Team dazu haben wir!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Die Kanzlei der Zukunft */}
        <section className="py-24 px-8 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7">
                <span className="text-surface-tint font-bold font-label uppercase tracking-widest block mb-4">
                  Kapitel 3
                </span>
                <h2 className="font-headline text-[2.5rem] font-extrabold leading-tight mb-8">
                  Die Kanzlei der Zukunft.
                </h2>
                <div className="space-y-6 text-secondary text-lg leading-relaxed">
                  <p>
                    Heute kombinieren wir mit der clever.legal GmbH Marketing-Power, juristische Exzellenz
                    und eine IT-Architektur, die auf jahrelanger gemeinsamer
                    Erfahrung basiert. Wir haben die Infrastruktur gebaut, mit
                    der Kanzleien skalieren, während die Konkurrenz noch Akten
                    sortiert.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="grid grid-cols-2 gap-4">
                  {founders.map((f) => (
                    <div
                      key={f.name}
                      className="bg-surface p-6 rounded-xl border border-outline-variant/10 text-center"
                    >
                      <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 border-2 border-surface-tint/20">
                        <img
                          alt={f.fullName}
                          src={f.image}
                          className="w-full h-full object-cover grayscale"
                        />
                      </div>
                      <Icon name={f.icon} className="text-2xl text-surface-tint mb-2 block" />
                      <h4 className="font-headline text-sm font-bold">
                        {f.name}
                      </h4>
                      <p className="text-secondary text-xs mt-1">{f.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise, Erfahrung & Vertrauen */}
        <section className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-16">
              <span className="text-surface-tint font-bold font-label uppercase tracking-widest block mb-4">
                Warum wir
              </span>
              <h2 className="font-headline text-[2.5rem] font-extrabold leading-tight mb-6">
                Expertise, Erfahrung & Vertrauen.
              </h2>
              <p className="text-secondary text-lg leading-relaxed">
                Viel mehr Expertise geht nicht. Zusammen bringen wir über ein
                halbes Jahrhundert digitale Erfahrung an einen Tisch.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Marc */}
              <div className="bg-surface-container-low p-10 rounded-xl border border-outline-variant/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-surface-tint/20 shrink-0">
                    <img
                      alt="Marc Ellerbrock"
                      src={founders[2].image}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <div>
                    <h3 className="font-headline text-lg font-bold">Marc Ellerbrock</h3>
                    <p className="text-surface-tint font-label text-xs uppercase tracking-wider">
                      Massenklage-Stratege
                    </p>
                  </div>
                </div>
                <p className="text-secondary leading-relaxed mb-4">
                  Mit der Teilnahme von zockerhelden.de an der &bdquo;Höhle der
                  Löwen&ldquo; hat Marc bewiesen, wie man ein Massenverfahren
                  erfolgreich an die Zielgruppe bringt – mit Reichweite,
                  Präzision und juristischem Weitblick.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Zockerhelden", "Meta-Datenschutzklage", "Coachinganwalt", "BEMK Anwälte"].map((brand) => (
                    <span
                      key={brand}
                      className="text-[0.65rem] font-label uppercase tracking-wider text-surface-tint border border-outline-variant rounded-full px-2.5 py-1"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>

              {/* Nico */}
              <div className="bg-surface-container-low p-10 rounded-xl border border-outline-variant/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-surface-tint/20 shrink-0">
                    <img
                      alt="Nico Sacotte"
                      src={founders[0].image}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <div>
                    <h3 className="font-headline text-lg font-bold">Nico Sacotte</h3>
                    <p className="text-surface-tint font-label text-xs uppercase tracking-wider">
                      Content-Stratege
                    </p>
                  </div>
                </div>
                <p className="text-secondary leading-relaxed mb-4">
                  Seit über 25 Jahren im Online Marketing unterwegs – und das
                  nicht nur für den Mittelstand, sondern für große Konzerne,
                  Filialisten und zahlreiche Großbanken weltweit.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Commerzbank", "Raiffeisenbank", "Burda", "O2", "HRS", "Immoscout", "Fleurop"].map((brand) => (
                    <span
                      key={brand}
                      className="text-[0.65rem] font-label uppercase tracking-wider text-surface-tint border border-outline-variant rounded-full px-2.5 py-1"
                    >
                      {brand}
                    </span>
                  ))}
                  <span className="text-[0.65rem] font-label uppercase tracking-wider text-secondary border border-outline-variant/50 rounded-full px-2.5 py-1">
                    u.v.m.
                  </span>
                </div>
              </div>

              {/* Thorsten & Christoph */}
              <div className="bg-surface-container-low p-10 rounded-xl border border-outline-variant/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-surface-tint/20 shrink-0">
                      <img
                        alt="Thorsten Loth"
                        src={founders[1].image}
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-surface-tint/20 shrink-0 -ml-4">
                      <img
                        alt="Christoph Ehrke"
                        src={founders[3].image}
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-headline text-lg font-bold">Thorsten & Christoph</h3>
                    <p className="text-surface-tint font-label text-xs uppercase tracking-wider">
                      Performance & IT
                    </p>
                  </div>
                </div>
                <p className="text-secondary leading-relaxed mb-4">
                  Ebenfalls zwei Jahrzehnte erfolgreich im digitalen Geschäft
                  unterwegs. Ihr Kundenstamm liest sich wie ein Who&apos;s Who
                  der deutschen Markenlandschaft.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Apollo", "Fressnapf", "C&A", "Deichmann", "Burger King"].map((brand) => (
                    <span
                      key={brand}
                      className="text-[0.65rem] font-label uppercase tracking-wider text-surface-tint border border-outline-variant rounded-full px-2.5 py-1"
                    >
                      {brand}
                    </span>
                  ))}
                  <span className="text-[0.65rem] font-label uppercase tracking-wider text-secondary border border-outline-variant/50 rounded-full px-2.5 py-1">
                    u.v.m.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Statement + CTA */}
        <section className="py-24 px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="max-w-2xl mx-auto mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-extrabold leading-tight mb-6">
                Wir verkaufen keine Software –{" "}
                <span className="text-surface-tint">
                  wir verkaufen den Marktvorsprung von morgen.
                </span>
              </h2>
              <p className="text-secondary text-lg leading-relaxed">
                Das System ist langsam. Wir sind es nicht.
              </p>
            </div>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-on-primary-container text-on-primary px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all"
            >
              Strategie-Gespräch anfordern
              <Icon name="arrow_forward" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

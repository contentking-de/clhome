import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | clever.legal",
};

export default function ImpressumPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28">
        <div className="py-16 px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight mb-10">
              Impressum
            </h1>

            <div className="prose-blog space-y-8">
              <section>
                <h2 className="font-headline text-xl font-bold mb-3">
                  Angaben gemäß § 5 TMG
                </h2>
                <p className="text-on-background leading-relaxed">
                  clever.legal GmbH i. Gr.
                  <br />
                  Florianweg 1
                  <br />
                  88677 Markdorf
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl font-bold mb-3">
                  Vertreten durch
                </h2>
                <p className="text-on-background leading-relaxed">
                  Geschäftsführer: RA Marc Ellerbrock
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl font-bold mb-3">
                  Kontakt
                </h2>
                <p className="text-on-background leading-relaxed">
                  E-Mail: info@clever.legal
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl font-bold mb-3">
                  Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                </h2>
                <p className="text-on-background leading-relaxed">
                  RA Marc Ellerbrock
                  <br />
                  Florianweg 1
                  <br />
                  88677 Markdorf
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl font-bold mb-3">
                  Berufsbezeichnung und berufsrechtliche Regelungen
                </h2>
                <p className="text-on-background leading-relaxed">
                  Berufsbezeichnung: Rechtsanwalt (verliehen in der
                  Bundesrepublik Deutschland)
                </p>
                <p className="text-on-background leading-relaxed mt-2">
                  Zuständige Kammer: Rechtsanwaltskammer
                </p>
                <p className="text-on-background leading-relaxed mt-2">
                  Es gelten folgende berufsrechtliche Regelungen:
                </p>
                <ul className="list-disc list-inside text-on-background leading-relaxed mt-2 space-y-1">
                  <li>Bundesrechtsanwaltsordnung (BRAO)</li>
                  <li>Berufsordnung für Rechtsanwälte (BORA)</li>
                  <li>Fachanwaltsordnung (FAO)</li>
                  <li>
                    Rechtsanwaltsvergütungsgesetz (RVG)
                  </li>
                  <li>
                    Berufsregeln der Rechtsanwälte der Europäischen Union (CCBE)
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-headline text-xl font-bold mb-3">
                  EU-Streitschlichtung
                </h2>
                <p className="text-on-background leading-relaxed">
                  Die Europäische Kommission stellt eine Plattform zur
                  Online-Streitbeilegung (OS) bereit:{" "}
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-surface-tint hover:underline"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                </p>
                <p className="text-on-background leading-relaxed mt-2">
                  Wir sind nicht bereit oder verpflichtet, an
                  Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl font-bold mb-3">
                  Haftung für Inhalte
                </h2>
                <p className="text-on-background leading-relaxed">
                  Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene
                  Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                  verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                  Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                  gespeicherte fremde Informationen zu überwachen oder nach
                  Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                  hinweisen.
                </p>
                <p className="text-on-background leading-relaxed mt-2">
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                  Informationen nach den allgemeinen Gesetzen bleiben hiervon
                  unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
                  Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
                  möglich. Bei Bekanntwerden von entsprechenden
                  Rechtsverletzungen werden wir diese Inhalte umgehend
                  entfernen.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl font-bold mb-3">
                  Haftung für Links
                </h2>
                <p className="text-on-background leading-relaxed">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf
                  deren Inhalte wir keinen Einfluss haben. Deshalb können wir
                  für diese fremden Inhalte auch keine Gewähr übernehmen. Für
                  die Inhalte der verlinkten Seiten ist stets der jeweilige
                  Anbieter oder Betreiber der Seiten verantwortlich. Die
                  verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
                  mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren
                  zum Zeitpunkt der Verlinkung nicht erkennbar.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl font-bold mb-3">
                  Urheberrecht
                </h2>
                <p className="text-on-background leading-relaxed">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                  diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                  Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                  Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
                  der schriftlichen Zustimmung des jeweiligen Autors bzw.
                  Erstellers. Downloads und Kopien dieser Seite sind nur für den
                  privaten, nicht kommerziellen Gebrauch gestattet.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

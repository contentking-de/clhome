import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | clever.legal",
};

export default function DatenschutzPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="py-16 px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight mb-10">
              Datenschutzerklärung
            </h1>

            <div className="prose-blog space-y-8">
              <section>
                <h2 className="font-headline text-xl font-bold mb-3">
                  1. Datenschutz auf einen Blick
                </h2>
                <h3 className="font-headline text-lg font-semibold mb-2">
                  Allgemeine Hinweise
                </h3>
                <p className="text-on-background leading-relaxed">
                  Die folgenden Hinweise geben einen einfachen Überblick
                  darüber, was mit Ihren personenbezogenen Daten passiert, wenn
                  Sie diese Website besuchen. Personenbezogene Daten sind alle
                  Daten, mit denen Sie persönlich identifiziert werden können.
                  Ausführliche Informationen zum Thema Datenschutz entnehmen Sie
                  unserer unter diesem Text aufgeführten Datenschutzerklärung.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl font-bold mb-3">
                  2. Verantwortliche Stelle
                </h2>
                <p className="text-on-background leading-relaxed">
                  Die verantwortliche Stelle für die Datenverarbeitung auf
                  dieser Website ist:
                </p>
                <p className="text-on-background leading-relaxed mt-2">
                  clever.legal GmbH i. Gr.
                  <br />
                  Florianweg 1
                  <br />
                  88677 Markdorf
                </p>
                <p className="text-on-background leading-relaxed mt-2">
                  Geschäftsführer: RA Marc Ellerbrock
                  <br />
                  E-Mail: info@clever.legal
                </p>
                <p className="text-on-background leading-relaxed mt-2">
                  Verantwortliche Stelle ist die natürliche oder juristische
                  Person, die allein oder gemeinsam mit anderen über die Zwecke
                  und Mittel der Verarbeitung von personenbezogenen Daten (z.B.
                  Namen, E-Mail-Adressen o.Ä.) entscheidet.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl font-bold mb-3">
                  3. Datenerfassung auf dieser Website
                </h2>

                <h3 className="font-headline text-lg font-semibold mb-2">
                  Server-Log-Dateien
                </h3>
                <p className="text-on-background leading-relaxed">
                  Der Provider der Seiten erhebt und speichert automatisch
                  Informationen in so genannten Server-Log-Dateien, die Ihr
                  Browser automatisch an uns übermittelt. Dies sind:
                </p>
                <ul className="list-disc list-inside text-on-background leading-relaxed mt-2 space-y-1">
                  <li>Browsertyp und Browserversion</li>
                  <li>Verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse</li>
                </ul>
                <p className="text-on-background leading-relaxed mt-2">
                  Eine Zusammenführung dieser Daten mit anderen Datenquellen
                  wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf
                  Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
                </p>

                <h3 className="font-headline text-lg font-semibold mb-2 mt-6">
                  Cookies
                </h3>
                <p className="text-on-background leading-relaxed">
                  Diese Website verwendet technisch notwendige Cookies, die für
                  den Betrieb der Seite erforderlich sind. Hierfür ist keine
                  Einwilligung erforderlich. Die Rechtsgrundlage ist Art. 6 Abs.
                  1 lit. f DSGVO (berechtigtes Interesse).
                </p>

                <h3 className="font-headline text-lg font-semibold mb-2 mt-6">
                  Kontaktformular
                </h3>
                <p className="text-on-background leading-relaxed">
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen,
                  werden Ihre Angaben aus dem Anfrageformular inklusive der von
                  Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der
                  Anfrage und für den Fall von Anschlussfragen bei uns
                  gespeichert. Diese Daten geben wir nicht ohne Ihre
                  Einwilligung weiter. Die Verarbeitung dieser Daten erfolgt auf
                  Grundlage von Art. 6 Abs. 1 lit. b DSGVO.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl font-bold mb-3">
                  4. Hosting
                </h2>
                <p className="text-on-background leading-relaxed">
                  Diese Website wird bei einem externen Dienstleister gehostet
                  (Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723,
                  USA). Die personenbezogenen Daten, die auf dieser Website
                  erfasst werden, werden auf den Servern des Hosters
                  gespeichert. Hierbei kann es sich v.a. um IP-Adressen,
                  Kontaktanfragen, Meta- und Kommunikationsdaten,
                  Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und
                  sonstige Daten, die über eine Website generiert werden,
                  handeln.
                </p>
                <p className="text-on-background leading-relaxed mt-2">
                  Die Nutzung des Hosters erfolgt auf Grundlage von Art. 6 Abs.
                  1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer
                  möglichst zuverlässigen Darstellung unserer Website.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl font-bold mb-3">
                  5. Ihre Rechte
                </h2>
                <p className="text-on-background leading-relaxed">
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über
                  Herkunft, Empfänger und Zweck Ihrer gespeicherten
                  personenbezogenen Daten zu erhalten. Sie haben außerdem ein
                  Recht, die Berichtigung oder Löschung dieser Daten zu
                  verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung
                  erteilt haben, können Sie diese Einwilligung jederzeit für die
                  Zukunft widerrufen. Außerdem haben Sie das Recht, unter
                  bestimmten Umständen die Einschränkung der Verarbeitung Ihrer
                  personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen
                  ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
                </p>
                <p className="text-on-background leading-relaxed mt-2">
                  Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können
                  Sie sich jederzeit an uns wenden: info@clever.legal
                </p>
              </section>

              <section>
                <h2 className="font-headline text-xl font-bold mb-3">
                  6. Widerruf Ihrer Einwilligung zur Datenverarbeitung
                </h2>
                <p className="text-on-background leading-relaxed">
                  Viele Datenverarbeitungsvorgänge sind nur mit Ihrer
                  ausdrücklichen Einwilligung möglich. Sie können eine bereits
                  erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit
                  der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom
                  Widerruf unberührt.
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

import SubpageShell from "@/components/landing/SubpageShell";
import { CookieSettingsButton } from "@/components/landing/CookieConsent";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Datenschutz");
  return {
    title: t("metaTitle"),
  };
}

export default async function DatenschutzPage() {
  const t = await getTranslations("Datenschutz");
  return (
    <SubpageShell>
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>{t("label")}</div>
          <h1 className="display" style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 700, marginBottom: 12 }}>
            {t("heading")}
          </h1>
          <p className="mono" style={{ fontSize: 12, color: "var(--ink-3)", letterSpacing: "0.1em", marginBottom: 48 }}>
            {t("lastUpdated")}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

            {/* 1 */}
            <Block title={t("section1Title")}>
              <p>
                {t("section1P1")}
              </p>
              <p style={{ marginTop: 12 }}>
                <strong>clever.legal GmbH i.&nbsp;Gr.</strong><br />
                Florianweg 1<br />
                88677 Markdorf<br />
                Deutschland
              </p>
              <p style={{ marginTop: 12 }}>
                <strong>Vertretungsberechtigter Geschäftsführer:</strong> RA Marc Ellerbrock<br />
                <strong>E-Mail:</strong>{" "}
                <a href="mailto:info@clever.legal" style={{ color: "var(--accent)" }}>info@clever.legal</a><br />
                <strong>Webseite:</strong>{" "}
                <a href="https://clever.legal" style={{ color: "var(--accent)" }}>https://clever.legal</a>
              </p>
              <p style={{ marginTop: 12 }}>{t("section1P4")}</p>
              <Sub title={t("section1Sub1Title")}>
                <p>
                  {t("section1Sub1P1")}
                </p>
              </Sub>
            </Block>

            {/* 2 */}
            <Block title={t("section2Title")}>
              <p>
                {t("section2P1")}
              </p>
              <p style={{ marginTop: 12 }}>
                <strong>E-Mail:</strong>{" "}
                <a href="mailto:info@clever.legal" style={{ color: "var(--accent)" }}>info@clever.legal</a><br />
                <strong>Betreff:</strong> Datenschutz
              </p>
              <p style={{ marginTop: 12 }}>
                {t("section2P3")}
              </p>
            </Block>

            {/* 3 */}
            <Block title={t("section3Title")}>
              <Sub title={t("section3Sub1Title")}>
                <p>
                  {t("section3Sub1P1")}
                </p>
              </Sub>
              <Sub title={t("section3Sub2Title")}>
                <p>{t("section3Sub2P1")}</p>
                <Bullets items={[
                  <><strong>Art. 6 Abs. 1 lit. a DSGVO</strong> (Einwilligung) – soweit Sie uns eine Einwilligung zur Verarbeitung Ihrer personenbezogenen Daten erteilt haben;</>,
                  <><strong>Art. 6 Abs. 1 lit. b DSGVO</strong> (Vertrag / vorvertragliche Maßnahmen) – für Verarbeitungen zur Erfüllung eines Vertrages mit Ihnen oder zur Durchführung vorvertraglicher Maßnahmen;</>,
                  <><strong>Art. 6 Abs. 1 lit. c DSGVO</strong> (rechtliche Verpflichtung) – soweit eine Verarbeitung zur Erfüllung einer rechtlichen Verpflichtung erforderlich ist, der unser Unternehmen unterliegt (z.&nbsp;B. handels- und steuerrechtliche Aufbewahrungspflichten);</>,
                  <><strong>Art. 6 Abs. 1 lit. f DSGVO</strong> (berechtigte Interessen) – sofern die Verarbeitung zur Wahrung unserer berechtigten Interessen oder der eines Dritten erforderlich ist und Ihre Interessen, Grundrechte und Grundfreiheiten nicht überwiegen;</>,
                  <><strong>§ 25 Abs. 1 TDDDG</strong> (Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz, vormals TTDSG) – für das Speichern von und den Zugriff auf Informationen in Endeinrichtungen des Nutzers (Cookies, Local Storage etc.) auf Basis Ihrer Einwilligung;</>,
                  <><strong>§ 25 Abs. 2 TDDDG</strong> – für technisch unbedingt erforderliche Speicher-/Zugriffsvorgänge ohne Einwilligung.</>,
                ]} />
              </Sub>
              <Sub title={t("section3Sub3Title")}>
                <p>
                  {t("section3Sub3P1")}
                </p>
              </Sub>
            </Block>

            {/* 4 */}
            <Block title={t("section4Title")}>
              <Sub title={t("section4Sub1Title")}>
                <p>
                  {t("section4Sub1P1")}
                </p>
              </Sub>
              <Sub title={t("section4Sub2Title")}>
                <p>
                  Personenbezogene Daten werden gelöscht oder gesperrt, sobald der Zweck der Speicherung entfällt.
                  Eine Speicherung kann darüber hinaus erfolgen, wenn dies durch den europäischen oder nationalen
                  Gesetzgeber in unionsrechtlichen Verordnungen, Gesetzen oder sonstigen Vorschriften, denen der
                  Verantwortliche unterliegt, vorgesehen wurde. Eine Sperrung oder Löschung der Daten erfolgt
                  auch dann, wenn eine durch die genannten Normen vorgeschriebene Speicherfrist abläuft, es sei
                  denn, es besteht eine Erforderlichkeit zur weiteren Speicherung der Daten für einen
                  Vertragsabschluss oder eine Vertragserfüllung.
                </p>
              </Sub>
              <Sub title={t("section4Sub3Title")}>
                <p>
                  {t("section4Sub3P1")}
                </p>
                <Bullets items={[
                  t("section4Sub3Bullet1"),
                  t("section4Sub3Bullet2"),
                  t("section4Sub3Bullet3"),
                  t("section4Sub3Bullet4"),
                ]} />
              </Sub>
              <Sub title={t("section4Sub4Title")}>
                <p>
                  Eine Übermittlung personenbezogener Daten in Länder außerhalb des Europäischen Wirtschaftsraums
                  (EWR) erfolgt nur, soweit dies zur Erfüllung unserer vertraglichen Pflichten erforderlich,
                  gesetzlich vorgeschrieben oder auf Grundlage Ihrer Einwilligung zulässig ist. In Drittländern
                  ohne Angemessenheitsbeschluss der EU-Kommission stützen wir die Übermittlung auf geeignete
                  Garantien im Sinne der Art.&nbsp;44&nbsp;ff. DSGVO, insbesondere auf Standardvertragsklauseln
                  (SCC) gemäß Art.&nbsp;46 Abs.&nbsp;2 lit.&nbsp;c DSGVO in der jeweils aktuellen Fassung
                  sowie – soweit einschlägig – auf das EU-US Data Privacy Framework (Angemessenheitsbeschluss
                  der EU-Kommission vom 10.&nbsp;Juli 2023 für zertifizierte US-Unternehmen).
                </p>
              </Sub>
            </Block>

            {/* 5 */}
            <Block title={t("section5Title")}>
              <Sub title={t("section5Sub1Title")}>
                <p>
                  Bei jedem Aufruf unserer Webseite erfasst unser System bzw. das System unseres
                  Hosting-Dienstleisters automatisiert Daten und Informationen vom Computersystem des
                  aufrufenden Rechners. Folgende Daten werden dabei typischerweise erhoben:
                </p>
                <Bullets items={[
                  "IP-Adresse des Nutzers (ggf. gekürzt/anonymisiert);",
                  "Datum und Uhrzeit des Zugriffs;",
                  "Name und URL der abgerufenen Datei;",
                  "übertragene Datenmenge;",
                  "Meldung, ob der Abruf erfolgreich war (Statuscode);",
                  "Webseite, von der aus der Zugriff erfolgt (Referrer-URL);",
                  "verwendeter Browser und Browserversion;",
                  "Betriebssystem des Nutzers sowie dessen Spracheinstellung;",
                  "Name des vom Nutzer verwendeten Internet-Zugangsanbieters (ggf.).",
                ]} />
                <p style={{ marginTop: 12 }}>
                  Die Daten werden ebenfalls in den Logfiles unseres Systems gespeichert. Eine Speicherung
                  dieser Daten zusammen mit anderen personenbezogenen Daten des Nutzers findet nicht statt.
                </p>
              </Sub>
              <Sub title={t("section5Sub2Title")}>
                <p>
                  Rechtsgrundlage ist Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO (berechtigtes Interesse). Unser
                  berechtigtes Interesse besteht in der technisch fehlerfreien Bereitstellung und Optimierung
                  unserer Webseite sowie in der Gewährleistung der Systemsicherheit (Abwehr von Angriffen,
                  Missbrauchserkennung).
                </p>
              </Sub>
              <Sub title={t("section5Sub3Title")}>
                <p>
                  Die vorübergehende Speicherung der IP-Adresse durch das System ist notwendig, um eine
                  Auslieferung der Webseite an den Rechner des Nutzers zu ermöglichen. Hierfür muss die
                  IP-Adresse des Nutzers für die Dauer der Sitzung gespeichert bleiben. Logfiles werden
                  regelmäßig nach spätestens 30 Tagen gelöscht, sofern sie nicht zur Aufklärung eines
                  konkreten Sicherheitsvorfalls weiter benötigt werden. In diesem Fall werden die betroffenen
                  Daten bis zur abschließenden Klärung gespeichert und anschließend gelöscht.
                </p>
              </Sub>
              <Sub title={t("section5Sub4Title")}>
                <p>
                  {t("section5Sub4P1")}
                </p>
              </Sub>
            </Block>

            {/* 6 */}
            <Block title={t("section6Title")}>
              <p>
                Unsere Webseite wird bei der <strong>Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789,
                USA</strong> („Vercel") gehostet. Im Rahmen des Hostings verarbeitet Vercel als
                Auftragsverarbeiter personenbezogene Daten, die beim Aufruf der Webseite anfallen (insbesondere
                IP-Adressen, Browser-Informationen und Logfiles gemäß Ziff.&nbsp;5), um die Webseite technisch
                zuverlässig und performant bereitzustellen.
              </p>
              <p style={{ marginTop: 12 }}>
                <strong>Rechtsgrundlage</strong> für den Einsatz von Vercel ist Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f
                DSGVO; unser berechtigtes Interesse liegt in einer sicheren, performanten und zuverlässigen
                Bereitstellung unserer Webseite über ein global verteiltes Content-Delivery-Netzwerk.
              </p>
              <p style={{ marginTop: 12 }}>
                <strong>Drittlandübermittlung:</strong> Vercel hat seinen Hauptsitz in den USA. Eine Verarbeitung
                personenbezogener Daten in den USA und anderen Drittländern ist daher nicht auszuschließen. Mit
                Vercel haben wir einen Auftragsverarbeitungsvertrag gemäß Art.&nbsp;28 DSGVO abgeschlossen, der
                EU-Standardvertragsklauseln (SCC) gemäß Art.&nbsp;46 Abs.&nbsp;2 lit.&nbsp;c DSGVO einschließt.
                Vercel Inc. ist zudem nach dem EU-US Data Privacy Framework zertifiziert, sodass ein
                Angemessenheitsbeschluss der EU-Kommission vom 10.&nbsp;Juli 2023 die Übermittlung stützt.
              </p>
              <p style={{ marginTop: 12 }}>
                Weitere Informationen zum Datenschutz bei Vercel finden Sie unter:{" "}
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
                  https://vercel.com/legal/privacy-policy
                </a>
              </p>
            </Block>

            {/* 7 */}
            <Block title={t("section7Title")}>
              <Sub title={t("section7Sub1Title")}>
                <p>
                  Unsere Webseite verwendet – soweit erforderlich oder von Ihnen eingewilligt – Cookies und
                  ähnliche Technologien (z.&nbsp;B. Local Storage). Cookies sind kleine Textdateien, die auf
                  Ihrem Endgerät gespeichert werden und bestimmte Informationen enthalten. Sie dienen dazu,
                  unser Angebot nutzerfreundlicher, effektiver und sicherer zu gestalten.
                </p>
                <p style={{ marginTop: 12 }}>Wir unterscheiden zwischen:</p>
                <Bullets items={[
                  <><strong>Technisch notwendigen Cookies/Technologien</strong>, die für den Betrieb der Webseite zwingend erforderlich sind (z.&nbsp;B. Speicherung Ihrer Cookie-Einwilligung, Sicherheitsfunktionen, Sitzungsverwaltung);</>,
                  <><strong>Nicht notwendigen Cookies/Technologien</strong> (z.&nbsp;B. Statistik, Marketing, Komfortfunktionen, externe Medien).</>,
                ]} />
              </Sub>
              <Sub title={t("section7Sub2Title")}>
                <Bullets items={[
                  <>Für <strong>technisch notwendige</strong> Cookies/Speichervorgänge: §&nbsp;25 Abs.&nbsp;2 Nr.&nbsp;2 TDDDG (unbedingt erforderlich) i.&nbsp;V.&nbsp;m. Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO (berechtigtes Interesse an einer funktionsfähigen Webseite).</>,
                  <>Für <strong>alle übrigen</strong> Cookies und Technologien: §&nbsp;25 Abs.&nbsp;1 TDDDG i.&nbsp;V.&nbsp;m. Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO (Einwilligung).</>,
                ]} />
              </Sub>
              <Sub title={t("section7Sub3Title")}>
                <p>
                  Beim Aufruf unserer Webseite werden Sie durch ein Consent-Banner über den Einsatz von Cookies
                  und vergleichbaren Technologien informiert. Sie haben dort die Möglichkeit, in den Einsatz
                  bestimmter Kategorien einzuwilligen, Ihre Einwilligung granular anzupassen oder abzulehnen.
                  Ihre getroffene Auswahl wird in einem technisch notwendigen Cookie gespeichert, damit wir
                  Ihre Entscheidung bei künftigen Aufrufen berücksichtigen können.
                </p>
                <p style={{ marginTop: 12 }}>
                  <strong>Widerruf der Einwilligung:</strong> Sie können Ihre Einwilligung jederzeit mit Wirkung
                  für die Zukunft widerrufen oder anpassen, indem Sie im Footer unserer Webseite auf den
                  Button <CookieSettingsButton /> klicken und dort Ihre Auswahl ändern. Der Widerruf berührt
                  nicht die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung.
                </p>
              </Sub>
              <Sub title={t("section7Sub4Title")}>
                <p>
                  Eine jeweils aktuelle und detaillierte Übersicht der auf unserer Webseite eingesetzten Cookies,
                  ihrer Zwecke, Speicherdauer und Anbieter können Sie im Consent-Banner unter{" "}
                  <CookieSettingsButton /> einsehen.
                </p>
              </Sub>
            </Block>

            {/* 8 */}
            <Block title={t("section8Title")}>
              <Sub title={t("section8Sub1Title")}>
                <p>
                  Auf unserer Webseite stellen wir ein Kontaktformular bereit, über das Sie ein unverbindliches
                  Strategie-Gespräch anfordern können. Bei Nutzung des Formulars werden folgende Daten an uns
                  übermittelt und verarbeitet:
                </p>
                <Bullets items={[
                  <><strong>Pflichtangaben:</strong> Name, Kanzlei, E-Mail-Adresse, Rechtsgebiet / Region, Nachricht;</>,
                  <><strong>Automatisch erfasste Metadaten:</strong> IP-Adresse, Datum und Uhrzeit der Absendung (zur Abwehr von Missbrauch und Spam);</>,
                  <><strong>Spam-Schutz:</strong> Zur Abwehr automatisierter Anfragen setzen wir ein sog. Honeypot-Feld ein, das für Nutzer unsichtbar ist und ausschließlich durch Bots befüllt wird. Wird dieses Feld befüllt, verwerfen wir die Anfrage.</>,
                ]} />
                <p style={{ marginTop: 12 }}>
                  Alternativ können Sie uns jederzeit per <strong>E-Mail an{" "}
                  <a href="mailto:info@clever.legal" style={{ color: "var(--accent)" }}>info@clever.legal</a></strong>{" "}
                  kontaktieren. In diesem Fall werden die mit der E-Mail übermittelten personenbezogenen Daten
                  verarbeitet.
                </p>
              </Sub>
              <Sub title={t("section8Sub2Title")}>
                <p>
                  Die Verarbeitung erfolgt ausschließlich zur Bearbeitung Ihrer Anfrage und zur Kontaktaufnahme,
                  insbesondere zur Vereinbarung und Durchführung eines Strategie-Gesprächs oder zur Prüfung
                  einer Zusammenarbeit.
                </p>
              </Sub>
              <Sub title={t("section8Sub3Title")}>
                <Bullets items={[
                  "Art. 6 Abs. 1 lit. b DSGVO, wenn die Anfrage auf den Abschluss eines Vertrages gerichtet ist oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist;",
                  "Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer effizienten Beantwortung allgemeiner Anfragen sowie an der Abwehr von Spam und missbräuchlichen Anfragen).",
                ]} />
              </Sub>
              <Sub title={t("section8Sub4Title")}>
                <p>
                  Wir speichern die über das Kontaktformular bzw. per E-Mail übermittelten Daten nur so lange,
                  wie dies zur Beantwortung Ihrer Anfrage bzw. zur Anbahnung und Durchführung einer
                  Geschäftsbeziehung erforderlich ist. Kommt es zu keinem Vertragsschluss, löschen wir Ihre
                  Daten spätestens 6 Monate nach dem letzten Kontakt, sofern keine gesetzlichen
                  Aufbewahrungspflichten entgegenstehen.
                </p>
                <p style={{ marginTop: 12 }}>
                  Kommt es zu einem Vertragsschluss, werden die Daten im Rahmen der gesetzlichen
                  Aufbewahrungsfristen (insb. §&nbsp;147 AO, §&nbsp;257 HGB – grundsätzlich 6 bis 10 Jahre)
                  gespeichert und nach deren Ablauf gelöscht.
                </p>
              </Sub>
              <Sub title={t("section8Sub5Title")}>
                <p>
                  Unsere Dienstleistungen richten sich an Anwaltskanzleien. Sollten Sie uns im Rahmen Ihrer
                  Anfrage Informationen übermitteln, die der anwaltlichen Verschwiegenheitspflicht (§&nbsp;43a
                  Abs.&nbsp;2 BRAO, §&nbsp;203 StGB) oder einem sonstigen Berufsgeheimnis unterliegen, bitten
                  wir Sie dringend, dies <strong>vor</strong> einer Übermittlung zu prüfen und ggf.
                  mandatsbezogene Angaben zu anonymisieren oder pseudonymisieren. Bei Aufnahme einer
                  Geschäftsbeziehung schließen wir mit Ihnen einen gesonderten Auftragsverarbeitungsvertrag
                  gemäß Art.&nbsp;28 DSGVO sowie – soweit erforderlich – eine Vereinbarung zur Wahrung der
                  anwaltlichen Verschwiegenheit gemäß §&nbsp;43e BRAO.
                </p>
              </Sub>
            </Block>

            {/* 9 */}
            <Block title={t("section9Title")}>
              <Sub title={t("section9Sub1Title")}>
                <p>
                  Über den Bereich <strong>„Legal Alerts"</strong> (https://clever.legal/legal-alerts) bieten
                  wir Interessenten die Möglichkeit, sich Zugang zu einem wöchentlichen Informationsdienst zu
                  Sammelklagen, regulatorischen Signalen und juristischen Trends zu sichern. Für die
                  Zugangsgewährung erheben und verarbeiten wir typischerweise:
                </p>
                <Bullets items={[
                  "Name,",
                  "E-Mail-Adresse,",
                  "Kanzlei / Unternehmen,",
                  "ggf. Rechtsgebiet / Interessensschwerpunkte,",
                  "Metadaten der Anmeldung (Zeitstempel, IP-Adresse zur Dokumentation der Einwilligung nach dem Double-Opt-In-Verfahren).",
                ]} />
              </Sub>
              <Sub title={t("section9Sub2Title")}>
                <p>
                  Die Anmeldung erfolgt im sog. Double-Opt-In-Verfahren: Nach der Anmeldung erhalten Sie eine
                  E-Mail, in der Sie die Anmeldung durch Klick auf einen Bestätigungslink verifizieren müssen.
                  Dies dient dem Schutz vor missbräuchlichen Anmeldungen mit fremden E-Mail-Adressen und dem
                  Nachweis der erteilten Einwilligung.
                </p>
              </Sub>
              <Sub title={t("section9Sub3Title")}>
                <p>
                  Zweck ist der Versand der angebotenen Informationen sowie produktbezogene Mitteilungen.
                  Rechtsgrundlage ist Ihre Einwilligung gemäß Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO
                  i.&nbsp;V.&nbsp;m. §&nbsp;7 Abs.&nbsp;2 Nr.&nbsp;3 UWG.
                </p>
              </Sub>
              <Sub title={t("section9Sub4Title")}>
                <p>
                  Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen. In jeder
                  E-Mail finden Sie hierzu einen Abmeldelink. Alternativ können Sie den Widerruf formlos per
                  E-Mail an{" "}
                  <a href="mailto:info@clever.legal" style={{ color: "var(--accent)" }}>info@clever.legal</a>{" "}
                  erklären. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.
                </p>
              </Sub>
              <Sub title={t("section9Sub5Title")}>
                <p>
                  Ihre Daten werden bis zum Widerruf der Einwilligung gespeichert. Nach Widerruf werden die
                  Daten gelöscht; die E-Mail-Adresse kann jedoch ggf. in einer sog. Sperr- oder Blocklist
                  gespeichert werden, um einen erneuten, nicht gewollten Versand zu verhindern (Rechtsgrundlage:
                  Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;c und f DSGVO).
                </p>
              </Sub>
              <Sub title={t("section9Sub6Title")}>
                <p>
                  Für den Versand der Legal Alerts setzen wir ggf. einen externen Versand-Dienstleister als
                  Auftragsverarbeiter ein. Sobald ein konkreter Dienstleister eingebunden ist, werden wir diese
                  Datenschutzerklärung um den Namen, Sitz und die Datenschutzhinweise des Anbieters ergänzen.
                  Mit dem Dienstleister wird ein Auftragsverarbeitungsvertrag gemäß Art.&nbsp;28 DSGVO
                  geschlossen.
                </p>
              </Sub>
            </Block>

            {/* 10 */}
            <Block title={t("section10Title")}>
              <p>
                Im Bereich <strong>„Blog"</strong> (https://clever.legal/blog) veröffentlichen wir redaktionelle
                Beiträge rund um die Themen KI, Legal Tech und Kanzleimanagement. Beim bloßen Lesen der Beiträge
                werden keine anderen personenbezogenen Daten verarbeitet als die unter Ziff.&nbsp;5 (Logfiles) und
                Ziff.&nbsp;7 (Cookies) beschriebenen.
              </p>
              <p style={{ marginTop: 12 }}>
                Eine Kommentarfunktion wird derzeit nicht angeboten. Sollten wir eine solche Funktion zukünftig
                einführen, werden wir diese Datenschutzerklärung entsprechend ergänzen.
              </p>
            </Block>

            {/* 11 */}
            <Block title={t("section11Title")}>
              <p>
                Auf unserer Webseite verweisen wir mittels externer Links auf spezialisierte Landingpages
                (sog. „Performance-Satelliten"), u.&nbsp;a.:
              </p>
              <Bullets items={[
                <><a href="https://meta-datenschutzklage.de" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>meta-datenschutzklage.de</a></>,
                <><a href="https://coachinganwalt.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>coachinganwalt.com</a></>,
                <><a href="https://zockerhelden.de" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>zockerhelden.de</a></>,
              ]} />
              <p style={{ marginTop: 12 }}>
                Diese Seiten werden von kooperierenden Kanzleien bzw. Partnern betrieben und stellen
                eigenständige Webangebote dar. Beim Klick auf einen solchen Link verlassen Sie unsere Webseite.
                Für die Datenverarbeitung auf den verlinkten Seiten ist ausschließlich der jeweilige Betreiber
                verantwortlich. Bitte informieren Sie sich in den Datenschutzerklärungen der jeweiligen Anbieter.
              </p>
              <p style={{ marginTop: 12 }}>
                Die Links werden mit den Attributen <code style={{ color: "var(--accent)", fontSize: 13 }}>
                target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;</code> ausgeliefert, sodass beim
                Öffnen kein direkter Referrer-Datenaustausch mit unserer Webseite erfolgt.
              </p>
            </Block>

            {/* 12 */}
            <Block title={t("section12Title")}>
              <p>
                Zur einheitlichen Darstellung unserer Inhalte setzen wir die Schriftarten <strong>Inter</strong>,{" "}
                <strong>Inter Tight</strong> und <strong>JetBrains Mono</strong> ein. Diese Schriftarten werden
                direkt von unserem eigenen Server bzw. über unseren Hosting-Dienstleister Vercel ausgeliefert
                (Self-Hosting über das Next.js Font-System). <strong>Es erfolgt keine Verbindung zu Google Fonts
                oder einem vergleichbaren externen Schriftarten-Dienst.</strong> Eine Übertragung Ihrer
                IP-Adresse an Drittanbieter zur reinen Schriftdarstellung findet somit nicht statt.
              </p>
            </Block>

            {/* 13 */}
            <Block title={t("section13Title")}>
              <div style={{
                padding: "16px 20px",
                background: "color-mix(in oklab, var(--accent), var(--bg) 92%)",
                border: "1px solid var(--line-2)",
                marginBottom: 16,
              }}>
                <p>
                  <strong>Hinweis:</strong> {t("section13Hint")}
                </p>
              </div>
              <Sub title={t("section13Sub1Title")}>
                <p>
                  Sollten wir künftig <strong>Google Analytics 4</strong> (Google Ireland Limited, Gordon House,
                  Barrow Street, Dublin 4, Irland) einsetzen, geschieht dies ausschließlich auf Grundlage Ihrer
                  Einwilligung gemäß §&nbsp;25 Abs.&nbsp;1 TDDDG i.&nbsp;V.&nbsp;m. Art.&nbsp;6 Abs.&nbsp;1
                  lit.&nbsp;a DSGVO. Verarbeitet werden u.&nbsp;a. Geräte-/Browser-Informationen, gekürzte
                  IP-Adresse, Interaktionen mit der Webseite. Der Einsatz erfolgt mit IP-Anonymisierung und
                  unter Abschluss eines Auftragsverarbeitungsvertrags gemäß Art.&nbsp;28 DSGVO. Übermittlungen
                  in die USA werden durch das EU-US Data Privacy Framework abgesichert.
                </p>
              </Sub>
              {[
                t("section13Sub2Title"),
                t("section13Sub3Title"),
                t("section13Sub4Title"),
                t("section13Sub5Title"),
                t("section13Sub6Title"),
                t("section13Sub7Title"),
                t("section13Sub8Title"),
                t("section13Sub9Title"),
                t("section13Sub10Title"),
              ].map((title) => (
                <Sub key={title} title={title}>
                  <p style={{ color: "var(--ink-3)", fontStyle: "italic" }}>
                    {t("section13InactiveNote")}
                  </p>
                </Sub>
              ))}
              <p style={{ marginTop: 16 }}>
                Sobald einer oder mehrere dieser Dienste aktiviert werden, werden wir die jeweiligen Abschnitte
                mit vollständigen Angaben (Anbieter, Zweck, Rechtsgrundlage, verarbeitete Daten, Drittlandtransfer,
                Opt-out) ergänzen und das Consent-Banner entsprechend erweitern.
              </p>
            </Block>

            {/* 14 */}
            <Block title={t("section14Title")}>
              <p>
                Wir setzen geeignete technische und organisatorische Sicherheitsmaßnahmen gemäß Art.&nbsp;32
                DSGVO ein, um Ihre personenbezogenen Daten gegen Manipulationen, Verlust, Zerstörung oder den
                Zugriff unberechtigter Personen zu schützen. Hierzu zählen insbesondere:
              </p>
              <Bullets items={[
                "verschlüsselte Übertragung (TLS/HTTPS) aller über unsere Webseite übermittelten Daten;",
                "Zugriffsbeschränkungen auf Systeme und Daten nach dem Need-to-know-Prinzip;",
                "regelmäßige Aktualisierung unserer Systeme;",
                "Auswahl datenschutzkonformer Dienstleister und Abschluss entsprechender Auftragsverarbeitungsverträge.",
              ]} />
              <p style={{ marginTop: 12 }}>
                Unsere Sicherheitsmaßnahmen werden entsprechend der technologischen Entwicklung fortlaufend
                verbessert.
              </p>
            </Block>

            {/* 15 */}
            <Block title={t("section15Title")}>
              <p>
                Werden personenbezogene Daten von Ihnen verarbeitet, sind Sie Betroffener im Sinne der DSGVO
                und Ihnen stehen uns gegenüber folgende Rechte zu:
              </p>
              <Sub title={t("section15Sub1Title")}>
                <p>
                  Sie können Auskunft darüber verlangen, ob und welche personenbezogenen Daten wir von Ihnen
                  verarbeiten. Dazu gehören insbesondere die Verarbeitungszwecke, die Kategorien der Daten,
                  die Empfänger, die geplante Speicherdauer, die Herkunft der Daten sowie das Bestehen
                  automatisierter Entscheidungsfindung einschließlich Profiling.
                </p>
              </Sub>
              <Sub title={t("section15Sub2Title")}>
                <p>
                  Sie haben das Recht, die Berichtigung unrichtiger oder die Vervollständigung unvollständiger
                  personenbezogener Daten zu verlangen.
                </p>
              </Sub>
              <Sub title={t("section15Sub3Title")}>
                <p>
                  Sie haben das Recht, die Löschung Ihrer personenbezogenen Daten zu verlangen, sofern einer
                  der in Art.&nbsp;17 DSGVO genannten Gründe zutrifft und keine gesetzlichen
                  Aufbewahrungspflichten entgegenstehen.
                </p>
              </Sub>
              <Sub title={t("section15Sub4Title")}>
                <p>
                  Sie haben das Recht, eine Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu
                  verlangen, sofern die Voraussetzungen des Art.&nbsp;18 DSGVO vorliegen.
                </p>
              </Sub>
              <Sub title={t("section15Sub5Title")}>
                <p>
                  Sie haben das Recht, die Sie betreffenden personenbezogenen Daten, die Sie uns bereitgestellt
                  haben, in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten oder die
                  Übermittlung an einen anderen Verantwortlichen zu verlangen.
                </p>
              </Sub>
              <Sub title={t("section15Sub6Title")}>
                <p>
                  Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit
                  gegen die Verarbeitung Sie betreffender personenbezogener Daten, die aufgrund von Art.&nbsp;6
                  Abs.&nbsp;1 lit.&nbsp;e oder f DSGVO erfolgt, Widerspruch einzulegen.
                </p>
                <div style={{
                  padding: "16px 20px",
                  background: "color-mix(in oklab, var(--accent), var(--bg) 92%)",
                  border: "1px solid var(--line-2)",
                  marginTop: 12,
                }}>
                  <p>
                    <strong>Hinweis zum Widerspruchsrecht bei Direktwerbung:</strong> Werden personenbezogene
                    Daten verarbeitet, um Direktwerbung zu betreiben, haben Sie das Recht, jederzeit Widerspruch
                    gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten zum Zwecke derartiger
                    Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in
                    Verbindung steht.
                  </p>
                </div>
              </Sub>
              <Sub title={t("section15Sub7Title")}>
                <p>
                  Sie haben das Recht, Ihre einmal erteilte Einwilligung jederzeit mit Wirkung für die Zukunft
                  zu widerrufen. Durch den Widerruf der Einwilligung wird die Rechtmäßigkeit der aufgrund der
                  Einwilligung bis zum Widerruf erfolgten Verarbeitung nicht berührt.
                </p>
              </Sub>
              <Sub title={t("section15Sub8Title")}>
                <p>
                  Unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs steht
                  Ihnen das Recht auf Beschwerde bei einer Aufsichtsbehörde zu, wenn Sie der Ansicht sind, dass
                  die Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die DSGVO verstößt.
                </p>
                <p style={{ marginTop: 12 }}>Die für uns zuständige Aufsichtsbehörde ist:</p>
                <p style={{ marginTop: 12 }}>
                  <strong>Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit
                  Baden-Württemberg (LfDI BW)</strong><br />
                  Lautenschlagerstraße 20<br />
                  70173 Stuttgart<br />
                  Telefon: 0711/615541-0<br />
                  E-Mail:{" "}
                  <a href="mailto:poststelle@lfdi.bwl.de" style={{ color: "var(--accent)" }}>poststelle@lfdi.bwl.de</a><br />
                  Webseite:{" "}
                  <a href="https://www.baden-wuerttemberg.datenschutz.de" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
                    www.baden-wuerttemberg.datenschutz.de
                  </a>
                </p>
              </Sub>
            </Block>

            {/* 16 */}
            <Block title={t("section16Title")}>
              <p>
                Eine automatisierte Entscheidungsfindung im Sinne des Art.&nbsp;22 DSGVO, die Ihnen gegenüber
                rechtliche Wirkung entfaltet oder Sie in ähnlicher Weise erheblich beeinträchtigt, findet auf
                unserer Webseite nicht statt.
              </p>
              <p style={{ marginTop: 12 }}>
                Hinweis: Soweit wir im Rahmen unserer Dienstleistungen (z.&nbsp;B. „Custom Intake AI" oder
                „Auto-Drafting Engine") KI-gestützte Prozesse anbieten, erfolgt deren Einsatz ausschließlich
                auf Grundlage gesonderter Verträge mit unseren Kundinnen und Kunden (Kanzleien) und nicht im
                Rahmen dieser Webseite. Details hierzu werden in den jeweiligen Auftragsverarbeitungsverträgen
                und Leistungsbeschreibungen geregelt.
              </p>
            </Block>

            {/* 17 */}
            <Block title={t("section17Title")}>
              <p>
                Sie sind weder vertraglich noch gesetzlich verpflichtet, uns personenbezogene Daten zur
                Verfügung zu stellen. Die Nutzung unserer Webseite zu rein informatorischen Zwecken ist
                grundsätzlich ohne Angabe personenbezogener Daten möglich. Allerdings können bestimmte
                Funktionen (z.&nbsp;B. das Absenden einer Kontaktanfrage oder die Anmeldung zu Legal Alerts)
                ohne die Bereitstellung bestimmter Daten nicht oder nur eingeschränkt genutzt werden.
              </p>
            </Block>

            {/* 18 */}
            <Block title={t("section18Title")}>
              <p>
                Unser Angebot richtet sich grundsätzlich an Erwachsene, insbesondere an Anwaltskanzleien und
                Unternehmen (B2B). Personen unter 16 Jahren sollen ohne Zustimmung der Erziehungsberechtigten
                keine personenbezogenen Daten an uns übermitteln. Sollten wir Kenntnis davon erlangen, dass
                Minderjährige ohne entsprechende Zustimmung Daten an uns übermittelt haben, löschen wir diese
                Daten unverzüglich.
              </p>
            </Block>

            {/* 19 */}
            <Block title={t("section19Title")}>
              <p>
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen
                rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der
                Datenschutzerklärung umzusetzen, z.&nbsp;B. bei der Einführung neuer Dienste. Für Ihren
                erneuten Besuch gilt dann die neue Datenschutzerklärung. Die jeweils aktuelle Fassung finden
                Sie stets unter{" "}
                <a href="https://clever.legal/datenschutz" style={{ color: "var(--accent)" }}>
                  https://clever.legal/datenschutz
                </a>.
              </p>
            </Block>

            {/* 20 */}
            <Block title={t("section20Title")}>
              <p>
                Für Fragen und Anregungen zum Thema Datenschutz sowie zur Wahrnehmung Ihrer Rechte wenden Sie
                sich bitte an:
              </p>
              <p style={{ marginTop: 12 }}>
                <strong>clever.legal GmbH i.&nbsp;Gr.</strong><br />
                Florianweg 1, 88677 Markdorf<br />
                E-Mail:{" "}
                <a href="mailto:info@clever.legal" style={{ color: "var(--accent)" }}>info@clever.legal</a>
              </p>
            </Block>

            <div style={{ paddingTop: 20, borderTop: "1px dashed var(--line-2)" }}>
              <p className="mono" style={{ fontSize: 12, color: "var(--ink-3)", letterSpacing: "0.1em" }}>
                {t("footerDate")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </SubpageShell>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: "1px solid var(--line)", paddingLeft: 24 }}>
      <div className="display" style={{ fontSize: 22, fontWeight: 700, color: "var(--accent)", marginBottom: 14, letterSpacing: "-0.02em" }}>
        {title}
      </div>
      <div style={{ color: "var(--ink-2)", fontSize: 15, lineHeight: 1.65 }}>
        {children}
      </div>
    </div>
  );
}

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 20 }}>
      <div className="display" style={{ fontSize: 18, fontWeight: 600, marginBottom: 10, color: "var(--ink)" }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul style={{ listStyle: "none", marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
          <span className="mono" style={{ color: "var(--accent)", fontSize: 12, flexShrink: 0 }}>›</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

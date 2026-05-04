import SubpageShell from "@/components/landing/SubpageShell";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("AGB");
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/agb",
    locale,
  });
}

export default async function AGBPage() {
  const t = await getTranslations("AGB");
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

          <div style={{ maxWidth: 720, display: "flex", flexDirection: "column", gap: 40 }}>

            <div style={{
              padding: "16px 20px",
              background: "color-mix(in oklab, var(--accent), var(--bg) 92%)",
              border: "1px solid var(--line-2)",
            }}>
              <p style={{ color: "var(--ink-2)", fontSize: 15, lineHeight: 1.65 }}>
                <strong>Hinweis:</strong> Diese AGB richten sich ausschließlich an Unternehmer im Sinne des
                §&nbsp;14 BGB, juristische Personen des öffentlichen Rechts und öffentlich-rechtliche
                Sondervermögen. Verbraucher gemäß §&nbsp;13 BGB sind nicht Vertragspartner.
              </p>
            </div>

            {/* § 1 */}
            <Block title="§ 1 Geltungsbereich, Vertragspartner">
              <P>
                1.1 Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB") gelten für sämtliche Verträge
                zwischen der clever.legal GmbH i.&nbsp;Gr., c/o BEMK Rechtsanwälte PartGmbB, Florianweg 1,
                88677 Markdorf, Deutschland, vertreten durch den Geschäftsführer Marc Ellerbrock (nachfolgend
                „Anbieter"), und ihren Kunden (nachfolgend „Kunde"; gemeinsam die „Parteien") über die vom
                Anbieter erbrachten Leistungen.
              </P>
              <P>
                1.2 Die AGB gelten ausschließlich gegenüber Unternehmern (§&nbsp;14 BGB), juristischen
                Personen des öffentlichen Rechts und öffentlich-rechtlichen Sondervermögen. Ein Vertragsschluss
                mit Verbrauchern (§&nbsp;13 BGB) findet nicht statt.
              </P>
              <P>
                1.3 Entgegenstehende, abweichende oder ergänzende Allgemeine Geschäftsbedingungen des Kunden
                werden nur dann und insoweit Vertragsbestandteil, als der Anbieter ihrer Geltung ausdrücklich
                in Textform zugestimmt hat. Dies gilt auch dann, wenn der Anbieter in Kenntnis
                entgegenstehender oder abweichender Bedingungen des Kunden Leistungen vorbehaltlos erbringt.
              </P>
              <P>
                1.4 Diese AGB gelten in ihrer jeweils zum Zeitpunkt des Vertragsschlusses gültigen Fassung
                auch als Rahmenvereinbarung für alle künftigen gleichartigen Verträge mit demselben Kunden,
                ohne dass der Anbieter im Einzelfall erneut auf sie hinweisen müsste.
              </P>
              <P>
                1.5 Hinweis zur Vor-GmbH: Bis zur Eintragung der clever.legal GmbH im Handelsregister
                handelt der Anbieter als GmbH in Gründung. Mit Eintragung der GmbH treten alle bis dahin
                geschlossenen Verträge automatisch mit der eingetragenen Gesellschaft in Kraft.
              </P>
            </Block>

            {/* § 2 */}
            <Block title="§ 2 Leistungsgegenstand und Leistungsumfang">
              <P>
                2.1 Der Anbieter erbringt Leistungen aus den folgenden Leistungsbereichen, die jeweils durch
                individuelles Angebot, Auftragsbestätigung oder Leistungsbeschreibung konkretisiert werden:
              </P>
              <Bullets items={[
                <>a) <strong>KI-Schulungen &amp; Workshops</strong> (Dienstvertrag, §&nbsp;611 BGB) – praxisorientierte Vermittlung des Einsatzes künstlicher Intelligenz in juristischen Arbeitsprozessen, vor Ort oder remote;</>,
                <>b) <strong>KI-Integration in Kanzleien und Rechtsabteilungen</strong> (Werk- bzw. Werklieferungsvertrag, §&nbsp;631 BGB) – Prozessanalyse, Einrichtung und Anbindung von KI-Komponenten (insbesondere LLMs, OCR, Dokumenten-KI) an die bestehende Infrastruktur des Kunden;</>,
                <>c) <strong>Lead-Satelliten und Online-Marketing</strong> – Konzeption, Erstellung und Betrieb spezialisierter Landingpages je Rechtsgebiet, Suchmaschinenoptimierung (SEO/Local SEO), Suchmaschinenwerbung (SEA, Google Ads) sowie Social-Media-Maßnahmen;</>,
                <>d) <strong>Erstellung von Webseiten und Leadmagneten</strong> (Werkvertrag, §&nbsp;631 BGB) – individuelle Konzeption und technische Umsetzung von Webseiten, Landingpages und digitalen Leadmagneten;</>,
                <>e) <strong>Bereitstellung von SaaS-Komponenten und Tools</strong> (z.&nbsp;B. Custom Intake AI, Auto-Drafting Engine), soweit gesondert vereinbart;</>,
                <>f) <strong>Legal Alerts</strong> – kuratierte Informationsdienste zu rechtlich relevanten Entwicklungen.</>,
              ]} />
              <P>
                2.2 Maßgeblich für den konkreten Leistungsumfang sind ausschließlich die Vereinbarungen in der
                jeweiligen Auftragsbestätigung, dem Angebot oder der Leistungsbeschreibung. Werbe-, Marketing-
                und Verkaufsmaterial des Anbieters (insbesondere Inhalte der Webseite www.clever.legal) stellen
                keine Beschaffenheits- oder Haltbarkeitsgarantie dar.
              </P>
              <P>
                2.3 Statistische Angaben, Benchmarks oder Kennzahlen (z.&nbsp;B. zu Zeiteinsparung, Conversion
                Rate, Cost-per-Acquisition, Genauigkeitswerten) sind unverbindliche Erfahrungswerte und stellen
                keine zugesicherten Eigenschaften oder garantierten Erfolge dar.
              </P>
              <P>
                2.4 Der Anbieter ist berechtigt, zur Leistungserbringung Subunternehmer und Erfüllungsgehilfen
                einzusetzen.
              </P>
            </Block>

            {/* § 3 */}
            <Block title="§ 3 Keine Rechtsdienstleistung; Verantwortlichkeit des Kunden">
              <P>
                3.1 Der Anbieter ist kein Rechtsanwalt und erbringt keine Rechtsdienstleistungen im Sinne des
                Rechtsdienstleistungsgesetzes (RDG). Sämtliche Leistungen, insbesondere KI-gestützte Funktionen
                wie Dokumentenanalyse, Vertragsprüfung, Auto-Drafting, Custom Intake AI sowie Schulungen und
                Beratungen, dienen ausschließlich der technischen, organisatorischen und marketingbezogenen
                Unterstützung des Kunden.
              </P>
              <P>
                3.2 Durch die Inanspruchnahme der Leistungen kommt zwischen dem Anbieter und dem Kunden oder
                Dritten kein Mandatsverhältnis zustande. Eine rechtliche Prüfung, Beratung oder Vertretung
                erfolgt durch den Anbieter nicht.
              </P>
              <P>
                3.3 Der Kunde ist allein verantwortlich für die rechtliche Prüfung, Bewertung und Verwendung
                sämtlicher durch die Leistungen des Anbieters erzeugten oder unterstützten Inhalte (insbesondere
                Schriftsätze, Verträge, Vertragsentwürfe, Mandantenkommunikation). Der Kunde stellt sicher, dass
                er bei der Nutzung der Leistungen alle für ihn geltenden berufsrechtlichen Pflichten
                (insbesondere BRAO, BORA, FAO, RVG, Verschwiegenheitspflichten, Verbote der Vertretung
                widerstreitender Interessen) sowie datenschutzrechtliche Vorgaben einhält.
              </P>
              <P>
                3.4 Werden Ergebnisse KI-gestützter Verarbeitung bereitgestellt, weist der Anbieter darauf hin,
                dass diese fehlerhaft, unvollständig oder veraltet sein können. Der Kunde ist verpflichtet, alle
                Ergebnisse vor weiterer Verwendung anwaltlich zu prüfen und freizugeben.
              </P>
            </Block>

            {/* § 4 */}
            <Block title="§ 4 Angebot, Vertragsschluss">
              <P>
                4.1 Darstellungen von Leistungen auf der Webseite des Anbieters und in sonstigen Medien stellen
                kein bindendes Angebot, sondern eine Aufforderung zur Abgabe eines Angebots (invitatio ad
                offerendum) dar.
              </P>
              <P>
                4.2 Anfragen des Kunden über das Kontaktformular, per E-Mail oder Telefon sind für den Anbieter
                unverbindlich. Individuelle Angebote des Anbieters sind, soweit nicht anders gekennzeichnet,
                14 Tage ab Datum bindend.
              </P>
              <P>
                4.3 Der Vertrag kommt durch Auftragsbestätigung in Textform durch den Anbieter, spätestens
                jedoch durch Beginn der Leistungserbringung zustande.
              </P>
            </Block>

            {/* § 5 */}
            <Block title="§ 5 Mitwirkungspflichten des Kunden">
              <P>
                5.1 Der Kunde stellt dem Anbieter rechtzeitig, vollständig und in geeigneter Form alle
                Informationen, Unterlagen, Inhalte, Zugänge, technischen Schnittstellen und
                Mitwirkungsleistungen zur Verfügung, die für die Erbringung der Leistung erforderlich sind.
                Der Kunde benennt einen verbindlichen Ansprechpartner mit Entscheidungskompetenz.
              </P>
              <P>
                5.2 Der Kunde ist verpflichtet, ihm bereitgestellte Zugangsdaten geheim zu halten und vor
                unbefugtem Zugriff Dritter zu schützen.
              </P>
              <P>
                5.3 Der Kunde sichert zu, dass von ihm zur Verfügung gestellte Inhalte (Texte, Bilder, Logos,
                Daten) frei von Rechten Dritter sind oder dass er über die erforderlichen Nutzungsrechte
                verfügt. Er stellt den Anbieter von Ansprüchen Dritter auf erstes Anfordern frei, die wegen
                einer Verletzung von Rechten an diesen Inhalten geltend gemacht werden, einschließlich
                angemessener Kosten der Rechtsverteidigung.
              </P>
              <P>
                5.4 Verzögerungen, die auf eine Verletzung von Mitwirkungspflichten zurückzuführen sind, gehen
                nicht zu Lasten des Anbieters. Termine und Fristen verschieben sich entsprechend; nachweislich
                entstandene Mehraufwendungen kann der Anbieter gesondert in Rechnung stellen.
              </P>
            </Block>

            {/* § 6 */}
            <Block title="§ 6 Termine und Leistungserbringung">
              <P>
                6.1 Termine und Fristen sind nur verbindlich, wenn sie in Textform ausdrücklich als verbindlich
                vereinbart wurden.
              </P>
              <P>
                6.2 Bei Werkleistungen erfolgt die Abnahme nach Bereitstellung des Werkes. Erklärt der Kunde
                nicht innerhalb von 14 Kalendertagen nach Bereitstellung in Textform unter Angabe konkreter
                Mängel die Verweigerung der Abnahme, gilt das Werk als abgenommen. Auf diese Folge wird der
                Anbieter den Kunden bei Bereitstellung gesondert hinweisen.
              </P>
              <P>
                6.3 Die Inbetriebnahme oder produktive Nutzung des Werkes durch den Kunden gilt ebenfalls als
                Abnahme.
              </P>
              <P>
                6.4 Bei der Bereitstellung von Online-Diensten beträgt die angestrebte Verfügbarkeit 99&nbsp;%
                im Jahresmittel, gemessen am Zeitfenster der vereinbarten Servicezeiten. Wartungsarbeiten,
                höhere Gewalt, Störungen außerhalb des Verantwortungsbereichs des Anbieters (z.&nbsp;B. bei
                Drittanbietern, Internetdienstleistern, Hostern, Schnittstellen wie beA) sowie vom Kunden zu
                vertretende Ursachen bleiben unberücksichtigt. Eine darüberhinausgehende Verfügbarkeitsgarantie
                wird nicht zugesichert, soweit nicht ausdrücklich abweichend vereinbart.
              </P>
            </Block>

            {/* § 7 */}
            <Block title="§ 7 Vergütung, Zahlungsbedingungen">
              <P>
                7.1 Sämtliche Preise verstehen sich in Euro zuzüglich der jeweils geltenden gesetzlichen
                Umsatzsteuer.
              </P>
              <P>
                7.2 Die Vergütung richtet sich nach der in der Auftragsbestätigung oder dem Angebot getroffenen
                Vereinbarung. Sofern nichts anderes vereinbart ist, erfolgt die Abrechnung als Einmalzahlung pro
                Leistung; bei laufenden Leistungen (insbesondere SEO, Performance Marketing, Hosting,
                Tool-Bereitstellung, Legal Alerts) erfolgt die Abrechnung in monatlichen oder vereinbarten
                regelmäßigen Intervallen.
              </P>
              <P>
                7.3 Der Anbieter ist berechtigt, vor Beginn der Leistungserbringung eine angemessene Anzahlung
                oder Vorauszahlung in Rechnung zu stellen.
              </P>
              <P>
                7.4 Drittkosten (insbesondere Mediabudgets für SEA/Social Ads, Lizenzkosten für Tools, Hosting,
                Domains) werden gesondert ausgewiesen und entweder direkt vom Kunden beim Drittanbieter
                beglichen oder vom Anbieter im Auftrag des Kunden ausgelegt und 1:1 weiterberechnet.
              </P>
              <P>
                7.5 Rechnungen sind ohne Abzug innerhalb von 14 Kalendertagen ab Rechnungsdatum zur Zahlung
                fällig. Der Kunde kommt ohne weitere Mahnung in Verzug, wenn er nicht innerhalb dieser Frist
                zahlt.
              </P>
              <P>
                7.6 Im Verzugsfall schuldet der Kunde Zinsen in Höhe von 9 Prozentpunkten über dem
                Basiszinssatz sowie eine Verzugspauschale in Höhe von 40,00&nbsp;EUR (§&nbsp;288 BGB). Die
                Geltendmachung weiterer Schäden bleibt vorbehalten.
              </P>
              <P>
                7.7 Aufrechnungs- und Zurückbehaltungsrechte stehen dem Kunden nur zu, soweit seine
                Gegenforderung rechtskräftig festgestellt, unbestritten oder vom Anbieter anerkannt ist.
              </P>
            </Block>

            {/* § 8 */}
            <Block title="§ 8 Nutzungsrechte, Eigentumsvorbehalt an Werkergebnissen">
              <P>
                8.1 Soweit der Anbieter im Rahmen der Vertragserfüllung urheberrechtlich geschützte Werke
                (z.&nbsp;B. Konzepte, Texte, Designs, Code, Schulungsunterlagen, Templates) erstellt, räumt er
                dem Kunden ab vollständiger Bezahlung der vereinbarten Vergütung das einfache, zeitlich und
                örtlich unbeschränkte Recht ein, diese Werke für die vertraglich vereinbarten Zwecke zu nutzen.
                Eine Übertragung an Dritte oder die Nutzung über den Vertragszweck hinaus bedarf der gesonderten
                Vereinbarung in Textform.
              </P>
              <P>
                8.2 Bis zur vollständigen Bezahlung der Vergütung verbleiben sämtliche Nutzungsrechte beim
                Anbieter; eine Nutzung durch den Kunden ist bis dahin nur widerruflich gestattet.
              </P>
              <P>
                8.3 An standardisierten Komponenten, Frameworks, Tools, Prompts, Modellen, Bibliotheken und
                Methoden, die der Anbieter zur Leistungserbringung einsetzt und die nicht ausschließlich für den
                Kunden entwickelt wurden, behält der Anbieter sämtliche Rechte. Der Kunde erhält insoweit
                lediglich ein einfaches Nutzungsrecht im Rahmen der vertraglichen Zwecke.
              </P>
              <P>
                8.4 Der Anbieter ist berechtigt, allgemein bekannt gewordene oder vom Kunden freigegebene
                Projekte zu Referenzzwecken zu nennen und das Logo des Kunden hierfür zu verwenden, sofern der
                Kunde dem nicht in Textform widerspricht.
              </P>
            </Block>

            {/* § 9 */}
            <Block title="§ 9 Einsatz künstlicher Intelligenz, Drittleistungen">
              <P>
                9.1 Der Anbieter setzt zur Leistungserbringung KI-Komponenten Dritter (z.&nbsp;B. Large Language
                Models, OCR-Dienste) ein. Der Kunde nimmt zur Kenntnis und erkennt an, dass KI-Systeme aufgrund
                ihrer probabilistischen Natur fehlerhafte, unvollständige, voreingenommene oder veraltete
                Ergebnisse liefern können. Der Anbieter übernimmt keine Gewähr für die inhaltliche Richtigkeit,
                Vollständigkeit oder Aktualität KI-erzeugter Inhalte.
              </P>
              <P>
                9.2 Soweit der Anbieter Schnittstellen zu Drittanbietern (z.&nbsp;B. beA, Suchmaschinen,
                Social-Media-Plattformen, Hosting-Provider, Zahlungsdienstleister) bereitstellt oder integriert,
                gelten ergänzend die Bedingungen und Verfügbarkeiten dieser Drittanbieter. Für deren Leistungen,
                Verfügbarkeit und Datenschutzpraxis übernimmt der Anbieter keine Haftung.
              </P>
              <P>
                9.3 Der Kunde ist verpflichtet, vor Übermittlung mandatsbezogener oder personenbezogener Daten
                an KI-Komponenten die berufs- und datenschutzrechtliche Zulässigkeit eigenverantwortlich zu
                prüfen, erforderlichenfalls Einwilligungen einzuholen und entsprechende
                Auftragsverarbeitungsverträge mit dem Anbieter und/oder den eingesetzten Dritten abzuschließen.
              </P>
            </Block>

            {/* § 10 */}
            <Block title="§ 10 Vertraulichkeit">
              <P>
                10.1 Die Parteien verpflichten sich, alle ihnen im Rahmen der Vertragsanbahnung und
                -durchführung bekannt werdenden vertraulichen Informationen der jeweils anderen Partei
                (insbesondere Geschäfts- und Betriebsgeheimnisse, Mandantendaten, wirtschaftliche und
                technische Informationen) geheim zu halten und nur für Zwecke der Vertragserfüllung zu
                verwenden.
              </P>
              <P>
                10.2 Die Pflicht gilt für die Dauer von fünf Jahren nach Vertragsende, soweit gesetzliche
                Geheimhaltungspflichten (insbesondere die anwaltliche Verschwiegenheitspflicht des Kunden)
                keine längere Frist vorsehen.
              </P>
              <P>
                10.3 Eine separate Geheimhaltungsvereinbarung (NDA) kann auf Wunsch des Kunden abgeschlossen
                werden.
              </P>
            </Block>

            {/* § 11 */}
            <Block title="§ 11 Datenschutz, Auftragsverarbeitung">
              <P>
                11.1 Die Parteien beachten die jeweils geltenden datenschutzrechtlichen Bestimmungen,
                insbesondere die Datenschutz-Grundverordnung (DSGVO) und das Bundesdatenschutzgesetz (BDSG).
                Einzelheiten zur Verarbeitung personenbezogener Daten durch den Anbieter ergeben sich aus der
                Datenschutzerklärung unter{" "}
                <a href="/datenschutz" style={{ color: "var(--accent)" }}>
                  https://www.clever.legal/datenschutz
                </a>.
              </P>
              <P>
                11.2 Soweit der Anbieter im Rahmen seiner Leistungen personenbezogene Daten im Auftrag des
                Kunden verarbeitet (insbesondere bei der KI-Integration, Lead-Verarbeitung, Hosting), schließen
                die Parteien vor Beginn der Verarbeitung einen Vertrag zur Auftragsverarbeitung gemäß
                Art.&nbsp;28 DSGVO ab.
              </P>
            </Block>

            {/* § 12 */}
            <Block title="§ 12 Mängelrechte">
              <P>
                12.1 Bei Werkleistungen stehen dem Kunden die gesetzlichen Mängelrechte zu, soweit nachfolgend
                nichts anderes geregelt ist. Die Verjährungsfrist für Mängelansprüche beträgt zwölf Monate ab
                Abnahme; §&nbsp;13 dieser AGB bleibt unberührt.
              </P>
              <P>
                12.2 Der Anbieter leistet bei berechtigten Mängelrügen zunächst Nacherfüllung nach seiner Wahl
                durch Beseitigung des Mangels oder Neuherstellung. Schlägt die Nacherfüllung zweimal fehl, ist
                sie unzumutbar oder verweigert der Anbieter sie ernsthaft und endgültig, kann der Kunde mindern
                oder vom Vertrag zurücktreten.
              </P>
              <P>
                12.3 Schadensersatzansprüche bestehen nur nach Maßgabe von §&nbsp;13.
              </P>
              <P>
                12.4 Bei Dienstleistungen (z.&nbsp;B. Schulungen, laufende Beratung) schuldet der Anbieter ein
                fachgerechtes Tätigwerden, jedoch keinen bestimmten Erfolg.
              </P>
            </Block>

            {/* § 13 */}
            <Block title="§ 13 Haftung">
              <P>
                13.1 Der Anbieter haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit, für Schäden aus der
                Verletzung des Lebens, des Körpers oder der Gesundheit, im Rahmen einer ausdrücklich
                übernommenen Garantie sowie nach den Vorschriften des Produkthaftungsgesetzes.
              </P>
              <P>
                13.2 Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten (Kardinalpflichten –
                Pflichten, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst
                ermöglichen und auf deren Einhaltung der Vertragspartner regelmäßig vertrauen darf) ist die
                Haftung des Anbieters auf den vertragstypischen, vorhersehbaren Schaden begrenzt. Der
                vertragstypische, vorhersehbare Schaden ist insgesamt auf die Höhe der für den jeweiligen
                Auftrag vereinbarten Nettovergütung der letzten zwölf Monate, höchstens jedoch auf
                50.000,00&nbsp;EUR pro Schadensfall, begrenzt.
              </P>
              <P>
                13.3 Im Übrigen ist die Haftung des Anbieters – gleich aus welchem Rechtsgrund – ausgeschlossen.
              </P>
              <P>
                13.4 Der Anbieter haftet insbesondere nicht für:
              </P>
              <Bullets items={[
                "(i) entgangenen Gewinn, ausgebliebene Mandatsgewinnung, ausgebliebene Conversions, Reputationsschäden;",
                "(ii) Schäden infolge unzureichender Datensicherung durch den Kunden;",
                "(iii) Schäden, die auf Falscheingaben oder unzulässiger Verwendung der Tools/Ergebnisse durch den Kunden beruhen;",
                "(iv) Schäden aus der Nichtprüfung KI-erzeugter Inhalte vor deren Verwendung durch den Kunden;",
                "(v) Schäden, die aus der Nichtbeachtung berufsrechtlicher oder datenschutzrechtlicher Pflichten des Kunden resultieren;",
                "(vi) Ausfälle oder Fehler von Drittsystemen (z. B. beA, Google, Meta, Hoster).",
              ]} />
              <P>
                13.5 Die vorstehenden Haftungsbeschränkungen gelten auch zugunsten der gesetzlichen Vertreter,
                Mitarbeiter und Erfüllungsgehilfen des Anbieters.
              </P>
            </Block>

            {/* § 14 */}
            <Block title="§ 14 Vertragslaufzeit, Kündigung">
              <P>
                14.1 Bei Verträgen über einmalige Leistungen (Workshops, Webseitenerstellung, projektbezogene
                Integration) endet der Vertrag mit vollständiger Erbringung der Leistung.
              </P>
              <P>
                14.2 Verträge über laufende Leistungen (insbesondere Online-Marketing, SEO, SEA, Social Media,
                Tool-Bereitstellung, Legal Alerts) haben, soweit nicht abweichend vereinbart, eine
                Mindestlaufzeit von drei Monaten und verlängern sich anschließend auf unbestimmte Zeit. Sie
                können von beiden Parteien mit einer Frist von einem Monat zum Monatsende ordentlich gekündigt
                werden.
              </P>
              <P>
                14.3 Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.
              </P>
              <P>
                14.4 Kündigungen bedürfen der Textform.
              </P>
            </Block>

            {/* § 15 */}
            <Block title="§ 15 Höhere Gewalt">
              <P>
                Ereignisse höherer Gewalt, die dem Anbieter die Leistungserbringung wesentlich erschweren oder
                unmöglich machen, berechtigen den Anbieter, die Leistung um die Dauer der Behinderung
                hinauszuschieben. Höhere Gewalt sind insbesondere Streiks, Aussperrung, Pandemien, behördliche
                Anordnungen, Cyber-Angriffe, längerfristige Ausfälle von Telekommunikations- oder
                Energienetzen sowie Ausfälle wesentlicher Drittdienste, die der Anbieter nicht zu vertreten
                hat. Dauert die Behinderung länger als drei Monate, sind beide Parteien zur Kündigung
                berechtigt.
              </P>
            </Block>

            {/* § 16 */}
            <Block title="§ 16 Schlussbestimmungen">
              <P>
                16.1 Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts und
                der Kollisionsnormen des Internationalen Privatrechts.
              </P>
              <P>
                16.2 Ausschließlicher Gerichtsstand für sämtliche Streitigkeiten aus oder im Zusammenhang mit
                dem Vertragsverhältnis ist – soweit gesetzlich zulässig – der Sitz des Anbieters. Der Anbieter
                ist berechtigt, den Kunden auch an dessen allgemeinem Gerichtsstand zu verklagen.
              </P>
              <P>
                16.3 Erfüllungsort für sämtliche Leistungen ist der Sitz des Anbieters.
              </P>
              <P>
                16.4 Änderungen und Ergänzungen dieser AGB sowie individueller Vereinbarungen bedürfen zu ihrer
                Wirksamkeit der Textform. Dies gilt auch für die Aufhebung dieses Textformerfordernisses.
              </P>
              <P>
                16.5 Der Anbieter ist berechtigt, diese AGB mit Wirkung für die Zukunft zu ändern, soweit dies
                aus rechtlichen, technischen oder wirtschaftlichen Gründen erforderlich ist und den Kunden nicht
                unangemessen benachteiligt. Die Änderung wird dem Kunden in Textform mitgeteilt. Widerspricht
                der Kunde der Änderung nicht innerhalb von sechs Wochen nach Zugang der Mitteilung, gilt dies
                als Zustimmung. Auf die Bedeutung des Schweigens wird der Kunde in der Mitteilung gesondert
                hingewiesen.
              </P>
              <P>
                16.6 Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam oder undurchführbar
                sein oder werden, so wird hierdurch die Wirksamkeit der übrigen Bestimmungen nicht berührt. An
                die Stelle der unwirksamen oder undurchführbaren Bestimmung tritt diejenige wirksame und
                durchführbare Regelung, deren wirtschaftlicher Erfolg dem der unwirksamen oder undurchführbaren
                Bestimmung möglichst nahekommt.
              </P>
            </Block>

            <div style={{ paddingTop: 20, borderTop: "1px dashed var(--line-2)" }}>
              <p style={{ color: "var(--ink-2)", fontSize: 15, lineHeight: 1.65 }}>
                <strong>clever.legal GmbH i.&nbsp;Gr.</strong> · c/o BEMK Rechtsanwälte PartGmbB ·
                Florianweg 1 · 88677 Markdorf · Deutschland
              </p>
              <p style={{ color: "var(--ink-3)", fontSize: 14, marginTop: 8 }}>
                E-Mail:{" "}
                <a href="mailto:info@clever.legal" style={{ color: "var(--accent)" }}>info@clever.legal</a>{" "}
                · Geschäftsführer: Marc Ellerbrock
              </p>
              <p className="mono" style={{ fontSize: 12, color: "var(--ink-3)", letterSpacing: "0.1em", marginTop: 12 }}>
                STAND DER AGB: MAI 2026
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

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ marginTop: 12 }}>{children}</p>;
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

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
  const locale = await getLocale();
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
            {locale === "en" ? <ContentEN /> : <ContentDE />}
          </div>
        </div>
      </section>
    </SubpageShell>
  );
}

/* ─── German ──────────────────────────────────────────────────────────── */

function ContentDE() {
  return (
    <>
      <Hint>
        <strong>Hinweis:</strong> Diese AGB richten sich ausschließlich an Unternehmer im Sinne des
        §&nbsp;14 BGB, juristische Personen des öffentlichen Rechts und öffentlich-rechtliche
        Sondervermögen. Verbraucher gemäß §&nbsp;13 BGB sind nicht Vertragspartner.
      </Hint>

      <Block title="§ 1 Geltungsbereich, Vertragspartner">
        <P>1.1 Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB") gelten für sämtliche Verträge zwischen der clever.legal GmbH i.&nbsp;Gr., c/o BEMK Rechtsanwälte PartGmbB, Florianweg 1, 88677 Markdorf, Deutschland, vertreten durch den Geschäftsführer Marc Ellerbrock (nachfolgend „Anbieter"), und ihren Kunden (nachfolgend „Kunde"; gemeinsam die „Parteien") über die vom Anbieter erbrachten Leistungen.</P>
        <P>1.2 Die AGB gelten ausschließlich gegenüber Unternehmern (§&nbsp;14 BGB), juristischen Personen des öffentlichen Rechts und öffentlich-rechtlichen Sondervermögen. Ein Vertragsschluss mit Verbrauchern (§&nbsp;13 BGB) findet nicht statt.</P>
        <P>1.3 Entgegenstehende, abweichende oder ergänzende Allgemeine Geschäftsbedingungen des Kunden werden nur dann und insoweit Vertragsbestandteil, als der Anbieter ihrer Geltung ausdrücklich in Textform zugestimmt hat. Dies gilt auch dann, wenn der Anbieter in Kenntnis entgegenstehender oder abweichender Bedingungen des Kunden Leistungen vorbehaltlos erbringt.</P>
        <P>1.4 Diese AGB gelten in ihrer jeweils zum Zeitpunkt des Vertragsschlusses gültigen Fassung auch als Rahmenvereinbarung für alle künftigen gleichartigen Verträge mit demselben Kunden, ohne dass der Anbieter im Einzelfall erneut auf sie hinweisen müsste.</P>
        <P>1.5 Hinweis zur Vor-GmbH: Bis zur Eintragung der clever.legal GmbH im Handelsregister handelt der Anbieter als GmbH in Gründung. Mit Eintragung der GmbH treten alle bis dahin geschlossenen Verträge automatisch mit der eingetragenen Gesellschaft in Kraft.</P>
      </Block>

      <Block title="§ 2 Leistungsgegenstand und Leistungsumfang">
        <P>2.1 Der Anbieter erbringt Leistungen aus den folgenden Leistungsbereichen, die jeweils durch individuelles Angebot, Auftragsbestätigung oder Leistungsbeschreibung konkretisiert werden:</P>
        <Bullets items={[
          <>a) <strong>KI-Schulungen &amp; Workshops</strong> (Dienstvertrag, §&nbsp;611 BGB) – praxisorientierte Vermittlung des Einsatzes künstlicher Intelligenz in juristischen Arbeitsprozessen, vor Ort oder remote;</>,
          <>b) <strong>KI-Integration in Kanzleien und Rechtsabteilungen</strong> (Werk- bzw. Werklieferungsvertrag, §&nbsp;631 BGB) – Prozessanalyse, Einrichtung und Anbindung von KI-Komponenten (insbesondere LLMs, OCR, Dokumenten-KI) an die bestehende Infrastruktur des Kunden;</>,
          <>c) <strong>Lead-Satelliten und Online-Marketing</strong> – Konzeption, Erstellung und Betrieb spezialisierter Landingpages je Rechtsgebiet, Suchmaschinenoptimierung (SEO/Local SEO), Suchmaschinenwerbung (SEA, Google Ads) sowie Social-Media-Maßnahmen;</>,
          <>d) <strong>Erstellung von Webseiten und Leadmagneten</strong> (Werkvertrag, §&nbsp;631 BGB) – individuelle Konzeption und technische Umsetzung von Webseiten, Landingpages und digitalen Leadmagneten;</>,
          <>e) <strong>Bereitstellung von SaaS-Komponenten und Tools</strong> (z.&nbsp;B. Custom Intake AI, Auto-Drafting Engine), soweit gesondert vereinbart;</>,
          <>f) <strong>Legal Alerts</strong> – kuratierte Informationsdienste zu rechtlich relevanten Entwicklungen.</>,
        ]} />
        <P>2.2 Maßgeblich für den konkreten Leistungsumfang sind ausschließlich die Vereinbarungen in der jeweiligen Auftragsbestätigung, dem Angebot oder der Leistungsbeschreibung. Werbe-, Marketing- und Verkaufsmaterial des Anbieters (insbesondere Inhalte der Webseite www.clever.legal) stellen keine Beschaffenheits- oder Haltbarkeitsgarantie dar.</P>
        <P>2.3 Statistische Angaben, Benchmarks oder Kennzahlen (z.&nbsp;B. zu Zeiteinsparung, Conversion Rate, Cost-per-Acquisition, Genauigkeitswerten) sind unverbindliche Erfahrungswerte und stellen keine zugesicherten Eigenschaften oder garantierten Erfolge dar.</P>
        <P>2.4 Der Anbieter ist berechtigt, zur Leistungserbringung Subunternehmer und Erfüllungsgehilfen einzusetzen.</P>
      </Block>

      <Block title="§ 3 Keine Rechtsdienstleistung; Verantwortlichkeit des Kunden">
        <P>3.1 Der Anbieter ist kein Rechtsanwalt und erbringt keine Rechtsdienstleistungen im Sinne des Rechtsdienstleistungsgesetzes (RDG). Sämtliche Leistungen, insbesondere KI-gestützte Funktionen wie Dokumentenanalyse, Vertragsprüfung, Auto-Drafting, Custom Intake AI sowie Schulungen und Beratungen, dienen ausschließlich der technischen, organisatorischen und marketingbezogenen Unterstützung des Kunden.</P>
        <P>3.2 Durch die Inanspruchnahme der Leistungen kommt zwischen dem Anbieter und dem Kunden oder Dritten kein Mandatsverhältnis zustande. Eine rechtliche Prüfung, Beratung oder Vertretung erfolgt durch den Anbieter nicht.</P>
        <P>3.3 Der Kunde ist allein verantwortlich für die rechtliche Prüfung, Bewertung und Verwendung sämtlicher durch die Leistungen des Anbieters erzeugten oder unterstützten Inhalte (insbesondere Schriftsätze, Verträge, Vertragsentwürfe, Mandantenkommunikation). Der Kunde stellt sicher, dass er bei der Nutzung der Leistungen alle für ihn geltenden berufsrechtlichen Pflichten (insbesondere BRAO, BORA, FAO, RVG, Verschwiegenheitspflichten, Verbote der Vertretung widerstreitender Interessen) sowie datenschutzrechtliche Vorgaben einhält.</P>
        <P>3.4 Werden Ergebnisse KI-gestützter Verarbeitung bereitgestellt, weist der Anbieter darauf hin, dass diese fehlerhaft, unvollständig oder veraltet sein können. Der Kunde ist verpflichtet, alle Ergebnisse vor weiterer Verwendung anwaltlich zu prüfen und freizugeben.</P>
      </Block>

      <Block title="§ 4 Angebot, Vertragsschluss">
        <P>4.1 Darstellungen von Leistungen auf der Webseite des Anbieters und in sonstigen Medien stellen kein bindendes Angebot, sondern eine Aufforderung zur Abgabe eines Angebots (invitatio ad offerendum) dar.</P>
        <P>4.2 Anfragen des Kunden über das Kontaktformular, per E-Mail oder Telefon sind für den Anbieter unverbindlich. Individuelle Angebote des Anbieters sind, soweit nicht anders gekennzeichnet, 14 Tage ab Datum bindend.</P>
        <P>4.3 Der Vertrag kommt durch Auftragsbestätigung in Textform durch den Anbieter, spätestens jedoch durch Beginn der Leistungserbringung zustande.</P>
      </Block>

      <Block title="§ 5 Mitwirkungspflichten des Kunden">
        <P>5.1 Der Kunde stellt dem Anbieter rechtzeitig, vollständig und in geeigneter Form alle Informationen, Unterlagen, Inhalte, Zugänge, technischen Schnittstellen und Mitwirkungsleistungen zur Verfügung, die für die Erbringung der Leistung erforderlich sind. Der Kunde benennt einen verbindlichen Ansprechpartner mit Entscheidungskompetenz.</P>
        <P>5.2 Der Kunde ist verpflichtet, ihm bereitgestellte Zugangsdaten geheim zu halten und vor unbefugtem Zugriff Dritter zu schützen.</P>
        <P>5.3 Der Kunde sichert zu, dass von ihm zur Verfügung gestellte Inhalte (Texte, Bilder, Logos, Daten) frei von Rechten Dritter sind oder dass er über die erforderlichen Nutzungsrechte verfügt. Er stellt den Anbieter von Ansprüchen Dritter auf erstes Anfordern frei, die wegen einer Verletzung von Rechten an diesen Inhalten geltend gemacht werden, einschließlich angemessener Kosten der Rechtsverteidigung.</P>
        <P>5.4 Verzögerungen, die auf eine Verletzung von Mitwirkungspflichten zurückzuführen sind, gehen nicht zu Lasten des Anbieters. Termine und Fristen verschieben sich entsprechend; nachweislich entstandene Mehraufwendungen kann der Anbieter gesondert in Rechnung stellen.</P>
      </Block>

      <Block title="§ 6 Termine und Leistungserbringung">
        <P>6.1 Termine und Fristen sind nur verbindlich, wenn sie in Textform ausdrücklich als verbindlich vereinbart wurden.</P>
        <P>6.2 Bei Werkleistungen erfolgt die Abnahme nach Bereitstellung des Werkes. Erklärt der Kunde nicht innerhalb von 14 Kalendertagen nach Bereitstellung in Textform unter Angabe konkreter Mängel die Verweigerung der Abnahme, gilt das Werk als abgenommen. Auf diese Folge wird der Anbieter den Kunden bei Bereitstellung gesondert hinweisen.</P>
        <P>6.3 Die Inbetriebnahme oder produktive Nutzung des Werkes durch den Kunden gilt ebenfalls als Abnahme.</P>
        <P>6.4 Bei der Bereitstellung von Online-Diensten beträgt die angestrebte Verfügbarkeit 99&nbsp;% im Jahresmittel, gemessen am Zeitfenster der vereinbarten Servicezeiten. Wartungsarbeiten, höhere Gewalt, Störungen außerhalb des Verantwortungsbereichs des Anbieters (z.&nbsp;B. bei Drittanbietern, Internetdienstleistern, Hostern, Schnittstellen wie beA) sowie vom Kunden zu vertretende Ursachen bleiben unberücksichtigt. Eine darüberhinausgehende Verfügbarkeitsgarantie wird nicht zugesichert, soweit nicht ausdrücklich abweichend vereinbart.</P>
      </Block>

      <Block title="§ 7 Vergütung, Zahlungsbedingungen">
        <P>7.1 Sämtliche Preise verstehen sich in Euro zuzüglich der jeweils geltenden gesetzlichen Umsatzsteuer.</P>
        <P>7.2 Die Vergütung richtet sich nach der in der Auftragsbestätigung oder dem Angebot getroffenen Vereinbarung. Sofern nichts anderes vereinbart ist, erfolgt die Abrechnung als Einmalzahlung pro Leistung; bei laufenden Leistungen (insbesondere SEO, Performance Marketing, Hosting, Tool-Bereitstellung, Legal Alerts) erfolgt die Abrechnung in monatlichen oder vereinbarten regelmäßigen Intervallen.</P>
        <P>7.3 Der Anbieter ist berechtigt, vor Beginn der Leistungserbringung eine angemessene Anzahlung oder Vorauszahlung in Rechnung zu stellen.</P>
        <P>7.4 Drittkosten (insbesondere Mediabudgets für SEA/Social Ads, Lizenzkosten für Tools, Hosting, Domains) werden gesondert ausgewiesen und entweder direkt vom Kunden beim Drittanbieter beglichen oder vom Anbieter im Auftrag des Kunden ausgelegt und 1:1 weiterberechnet.</P>
        <P>7.5 Rechnungen sind ohne Abzug innerhalb von 14 Kalendertagen ab Rechnungsdatum zur Zahlung fällig. Der Kunde kommt ohne weitere Mahnung in Verzug, wenn er nicht innerhalb dieser Frist zahlt.</P>
        <P>7.6 Im Verzugsfall schuldet der Kunde Zinsen in Höhe von 9 Prozentpunkten über dem Basiszinssatz sowie eine Verzugspauschale in Höhe von 40,00&nbsp;EUR (§&nbsp;288 BGB). Die Geltendmachung weiterer Schäden bleibt vorbehalten.</P>
        <P>7.7 Aufrechnungs- und Zurückbehaltungsrechte stehen dem Kunden nur zu, soweit seine Gegenforderung rechtskräftig festgestellt, unbestritten oder vom Anbieter anerkannt ist.</P>
      </Block>

      <Block title="§ 8 Nutzungsrechte, Eigentumsvorbehalt an Werkergebnissen">
        <P>8.1 Soweit der Anbieter im Rahmen der Vertragserfüllung urheberrechtlich geschützte Werke (z.&nbsp;B. Konzepte, Texte, Designs, Code, Schulungsunterlagen, Templates) erstellt, räumt er dem Kunden ab vollständiger Bezahlung der vereinbarten Vergütung das einfache, zeitlich und örtlich unbeschränkte Recht ein, diese Werke für die vertraglich vereinbarten Zwecke zu nutzen. Eine Übertragung an Dritte oder die Nutzung über den Vertragszweck hinaus bedarf der gesonderten Vereinbarung in Textform.</P>
        <P>8.2 Bis zur vollständigen Bezahlung der Vergütung verbleiben sämtliche Nutzungsrechte beim Anbieter; eine Nutzung durch den Kunden ist bis dahin nur widerruflich gestattet.</P>
        <P>8.3 An standardisierten Komponenten, Frameworks, Tools, Prompts, Modellen, Bibliotheken und Methoden, die der Anbieter zur Leistungserbringung einsetzt und die nicht ausschließlich für den Kunden entwickelt wurden, behält der Anbieter sämtliche Rechte. Der Kunde erhält insoweit lediglich ein einfaches Nutzungsrecht im Rahmen der vertraglichen Zwecke.</P>
        <P>8.4 Der Anbieter ist berechtigt, allgemein bekannt gewordene oder vom Kunden freigegebene Projekte zu Referenzzwecken zu nennen und das Logo des Kunden hierfür zu verwenden, sofern der Kunde dem nicht in Textform widerspricht.</P>
      </Block>

      <Block title="§ 9 Einsatz künstlicher Intelligenz, Drittleistungen">
        <P>9.1 Der Anbieter setzt zur Leistungserbringung KI-Komponenten Dritter (z.&nbsp;B. Large Language Models, OCR-Dienste) ein. Der Kunde nimmt zur Kenntnis und erkennt an, dass KI-Systeme aufgrund ihrer probabilistischen Natur fehlerhafte, unvollständige, voreingenommene oder veraltete Ergebnisse liefern können. Der Anbieter übernimmt keine Gewähr für die inhaltliche Richtigkeit, Vollständigkeit oder Aktualität KI-erzeugter Inhalte.</P>
        <P>9.2 Soweit der Anbieter Schnittstellen zu Drittanbietern (z.&nbsp;B. beA, Suchmaschinen, Social-Media-Plattformen, Hosting-Provider, Zahlungsdienstleister) bereitstellt oder integriert, gelten ergänzend die Bedingungen und Verfügbarkeiten dieser Drittanbieter. Für deren Leistungen, Verfügbarkeit und Datenschutzpraxis übernimmt der Anbieter keine Haftung.</P>
        <P>9.3 Der Kunde ist verpflichtet, vor Übermittlung mandatsbezogener oder personenbezogener Daten an KI-Komponenten die berufs- und datenschutzrechtliche Zulässigkeit eigenverantwortlich zu prüfen, erforderlichenfalls Einwilligungen einzuholen und entsprechende Auftragsverarbeitungsverträge mit dem Anbieter und/oder den eingesetzten Dritten abzuschließen.</P>
      </Block>

      <Block title="§ 10 Vertraulichkeit">
        <P>10.1 Die Parteien verpflichten sich, alle ihnen im Rahmen der Vertragsanbahnung und -durchführung bekannt werdenden vertraulichen Informationen der jeweils anderen Partei (insbesondere Geschäfts- und Betriebsgeheimnisse, Mandantendaten, wirtschaftliche und technische Informationen) geheim zu halten und nur für Zwecke der Vertragserfüllung zu verwenden.</P>
        <P>10.2 Die Pflicht gilt für die Dauer von fünf Jahren nach Vertragsende, soweit gesetzliche Geheimhaltungspflichten (insbesondere die anwaltliche Verschwiegenheitspflicht des Kunden) keine längere Frist vorsehen.</P>
        <P>10.3 Eine separate Geheimhaltungsvereinbarung (NDA) kann auf Wunsch des Kunden abgeschlossen werden.</P>
      </Block>

      <Block title="§ 11 Datenschutz, Auftragsverarbeitung">
        <P>11.1 Die Parteien beachten die jeweils geltenden datenschutzrechtlichen Bestimmungen, insbesondere die Datenschutz-Grundverordnung (DSGVO) und das Bundesdatenschutzgesetz (BDSG). Einzelheiten zur Verarbeitung personenbezogener Daten durch den Anbieter ergeben sich aus der Datenschutzerklärung unter <a href="/datenschutz" style={{ color: "var(--accent)" }}>https://www.clever.legal/datenschutz</a>.</P>
        <P>11.2 Soweit der Anbieter im Rahmen seiner Leistungen personenbezogene Daten im Auftrag des Kunden verarbeitet (insbesondere bei der KI-Integration, Lead-Verarbeitung, Hosting), schließen die Parteien vor Beginn der Verarbeitung einen Vertrag zur Auftragsverarbeitung gemäß Art.&nbsp;28 DSGVO ab.</P>
      </Block>

      <Block title="§ 12 Mängelrechte">
        <P>12.1 Bei Werkleistungen stehen dem Kunden die gesetzlichen Mängelrechte zu, soweit nachfolgend nichts anderes geregelt ist. Die Verjährungsfrist für Mängelansprüche beträgt zwölf Monate ab Abnahme; §&nbsp;13 dieser AGB bleibt unberührt.</P>
        <P>12.2 Der Anbieter leistet bei berechtigten Mängelrügen zunächst Nacherfüllung nach seiner Wahl durch Beseitigung des Mangels oder Neuherstellung. Schlägt die Nacherfüllung zweimal fehl, ist sie unzumutbar oder verweigert der Anbieter sie ernsthaft und endgültig, kann der Kunde mindern oder vom Vertrag zurücktreten.</P>
        <P>12.3 Schadensersatzansprüche bestehen nur nach Maßgabe von §&nbsp;13.</P>
        <P>12.4 Bei Dienstleistungen (z.&nbsp;B. Schulungen, laufende Beratung) schuldet der Anbieter ein fachgerechtes Tätigwerden, jedoch keinen bestimmten Erfolg.</P>
      </Block>

      <Block title="§ 13 Haftung">
        <P>13.1 Der Anbieter haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit, für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit, im Rahmen einer ausdrücklich übernommenen Garantie sowie nach den Vorschriften des Produkthaftungsgesetzes.</P>
        <P>13.2 Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten (Kardinalpflichten – Pflichten, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglichen und auf deren Einhaltung der Vertragspartner regelmäßig vertrauen darf) ist die Haftung des Anbieters auf den vertragstypischen, vorhersehbaren Schaden begrenzt. Der vertragstypische, vorhersehbare Schaden ist insgesamt auf die Höhe der für den jeweiligen Auftrag vereinbarten Nettovergütung der letzten zwölf Monate, höchstens jedoch auf 50.000,00&nbsp;EUR pro Schadensfall, begrenzt.</P>
        <P>13.3 Im Übrigen ist die Haftung des Anbieters – gleich aus welchem Rechtsgrund – ausgeschlossen.</P>
        <P>13.4 Der Anbieter haftet insbesondere nicht für:</P>
        <Bullets items={[
          "(i) entgangenen Gewinn, ausgebliebene Mandatsgewinnung, ausgebliebene Conversions, Reputationsschäden;",
          "(ii) Schäden infolge unzureichender Datensicherung durch den Kunden;",
          "(iii) Schäden, die auf Falscheingaben oder unzulässiger Verwendung der Tools/Ergebnisse durch den Kunden beruhen;",
          "(iv) Schäden aus der Nichtprüfung KI-erzeugter Inhalte vor deren Verwendung durch den Kunden;",
          "(v) Schäden, die aus der Nichtbeachtung berufsrechtlicher oder datenschutzrechtlicher Pflichten des Kunden resultieren;",
          "(vi) Ausfälle oder Fehler von Drittsystemen (z. B. beA, Google, Meta, Hoster).",
        ]} />
        <P>13.5 Die vorstehenden Haftungsbeschränkungen gelten auch zugunsten der gesetzlichen Vertreter, Mitarbeiter und Erfüllungsgehilfen des Anbieters.</P>
      </Block>

      <Block title="§ 14 Vertragslaufzeit, Kündigung">
        <P>14.1 Bei Verträgen über einmalige Leistungen (Workshops, Webseitenerstellung, projektbezogene Integration) endet der Vertrag mit vollständiger Erbringung der Leistung.</P>
        <P>14.2 Verträge über laufende Leistungen (insbesondere Online-Marketing, SEO, SEA, Social Media, Tool-Bereitstellung, Legal Alerts) haben, soweit nicht abweichend vereinbart, eine Mindestlaufzeit von drei Monaten und verlängern sich anschließend auf unbestimmte Zeit. Sie können von beiden Parteien mit einer Frist von einem Monat zum Monatsende ordentlich gekündigt werden.</P>
        <P>14.3 Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.</P>
        <P>14.4 Kündigungen bedürfen der Textform.</P>
      </Block>

      <Block title="§ 15 Höhere Gewalt">
        <P>Ereignisse höherer Gewalt, die dem Anbieter die Leistungserbringung wesentlich erschweren oder unmöglich machen, berechtigen den Anbieter, die Leistung um die Dauer der Behinderung hinauszuschieben. Höhere Gewalt sind insbesondere Streiks, Aussperrung, Pandemien, behördliche Anordnungen, Cyber-Angriffe, längerfristige Ausfälle von Telekommunikations- oder Energienetzen sowie Ausfälle wesentlicher Drittdienste, die der Anbieter nicht zu vertreten hat. Dauert die Behinderung länger als drei Monate, sind beide Parteien zur Kündigung berechtigt.</P>
      </Block>

      <Block title="§ 16 Schlussbestimmungen">
        <P>16.1 Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts und der Kollisionsnormen des Internationalen Privatrechts.</P>
        <P>16.2 Ausschließlicher Gerichtsstand für sämtliche Streitigkeiten aus oder im Zusammenhang mit dem Vertragsverhältnis ist – soweit gesetzlich zulässig – der Sitz des Anbieters. Der Anbieter ist berechtigt, den Kunden auch an dessen allgemeinem Gerichtsstand zu verklagen.</P>
        <P>16.3 Erfüllungsort für sämtliche Leistungen ist der Sitz des Anbieters.</P>
        <P>16.4 Änderungen und Ergänzungen dieser AGB sowie individueller Vereinbarungen bedürfen zu ihrer Wirksamkeit der Textform. Dies gilt auch für die Aufhebung dieses Textformerfordernisses.</P>
        <P>16.5 Der Anbieter ist berechtigt, diese AGB mit Wirkung für die Zukunft zu ändern, soweit dies aus rechtlichen, technischen oder wirtschaftlichen Gründen erforderlich ist und den Kunden nicht unangemessen benachteiligt. Die Änderung wird dem Kunden in Textform mitgeteilt. Widerspricht der Kunde der Änderung nicht innerhalb von sechs Wochen nach Zugang der Mitteilung, gilt dies als Zustimmung. Auf die Bedeutung des Schweigens wird der Kunde in der Mitteilung gesondert hingewiesen.</P>
        <P>16.6 Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam oder undurchführbar sein oder werden, so wird hierdurch die Wirksamkeit der übrigen Bestimmungen nicht berührt. An die Stelle der unwirksamen oder undurchführbaren Bestimmung tritt diejenige wirksame und durchführbare Regelung, deren wirtschaftlicher Erfolg dem der unwirksamen oder undurchführbaren Bestimmung möglichst nahekommt.</P>
      </Block>

      <Footer />
    </>
  );
}

/* ─── English ─────────────────────────────────────────────────────────── */

function ContentEN() {
  return (
    <>
      <Hint>
        <strong>Note:</strong> These Terms and Conditions apply exclusively to entrepreneurs within the
        meaning of § 14 BGB (German Civil Code), legal entities under public law, and special funds
        under public law. Consumers within the meaning of § 13 BGB are not contractual partners.
      </Hint>

      <Block title="§ 1 Scope of Application, Contractual Partners">
        <P>1.1 These General Terms and Conditions (hereinafter &quot;GTC&quot;) apply to all contracts between clever.legal GmbH (in formation), c/o BEMK Rechtsanwälte PartGmbB, Florianweg 1, 88677 Markdorf, Germany, represented by managing director Marc Ellerbrock (hereinafter &quot;Provider&quot;), and its customers (hereinafter &quot;Customer&quot;; collectively the &quot;Parties&quot;) regarding the services rendered by the Provider.</P>
        <P>1.2 These GTC apply exclusively to entrepreneurs (§ 14 BGB), legal entities under public law, and special funds under public law. Contracts with consumers (§ 13 BGB) are not concluded.</P>
        <P>1.3 Conflicting, deviating, or supplementary general terms and conditions of the Customer shall only become part of the contract if and to the extent that the Provider has expressly agreed to their applicability in text form. This also applies if the Provider renders services without reservation in knowledge of conflicting or deviating terms of the Customer.</P>
        <P>1.4 These GTC, in their version valid at the time of contract conclusion, shall also apply as a framework agreement for all future contracts of the same type with the same Customer, without the Provider having to refer to them again in each individual case.</P>
        <P>1.5 Note on pre-GmbH status: Until the registration of clever.legal GmbH in the commercial register, the Provider acts as a GmbH in formation. Upon registration, all contracts concluded until that point shall automatically take effect with the registered company.</P>
      </Block>

      <Block title="§ 2 Subject Matter and Scope of Services">
        <P>2.1 The Provider renders services from the following service areas, each specified by individual offer, order confirmation, or service description:</P>
        <Bullets items={[
          <>a) <strong>AI Training &amp; Workshops</strong> (service contract, § 611 BGB) – practical training on the use of artificial intelligence in legal work processes, on-site or remote;</>,
          <>b) <strong>AI Integration in law firms and legal departments</strong> (contract for work, § 631 BGB) – process analysis, setup, and connection of AI components (particularly LLMs, OCR, document AI) to the Customer&apos;s existing infrastructure;</>,
          <>c) <strong>Lead Satellites and Online Marketing</strong> – conception, creation, and operation of specialized landing pages per legal area, search engine optimization (SEO/Local SEO), search engine advertising (SEA, Google Ads), and social media activities;</>,
          <>d) <strong>Website and lead magnet creation</strong> (contract for work, § 631 BGB) – individual conception and technical implementation of websites, landing pages, and digital lead magnets;</>,
          <>e) <strong>Provision of SaaS components and tools</strong> (e.g., Custom Intake AI, Auto-Drafting Engine), as separately agreed;</>,
          <>f) <strong>Legal Alerts</strong> – curated information services on legally relevant developments.</>,
        ]} />
        <P>2.2 The specific scope of services is determined exclusively by the agreements in the respective order confirmation, offer, or service description. Advertising, marketing, and sales materials of the Provider (particularly content on the website www.clever.legal) do not constitute quality or durability guarantees.</P>
        <P>2.3 Statistical data, benchmarks, or key figures (e.g., regarding time savings, conversion rate, cost-per-acquisition, accuracy values) are non-binding empirical values and do not constitute guaranteed properties or guaranteed outcomes.</P>
        <P>2.4 The Provider is entitled to engage subcontractors and vicarious agents for service delivery.</P>
      </Block>

      <Block title="§ 3 No Legal Services; Customer Responsibility">
        <P>3.1 The Provider is not a lawyer and does not provide legal services within the meaning of the German Legal Services Act (RDG). All services, particularly AI-powered functions such as document analysis, contract review, auto-drafting, Custom Intake AI, as well as training and consultations, serve exclusively the technical, organizational, and marketing-related support of the Customer.</P>
        <P>3.2 The use of services does not establish an attorney-client relationship between the Provider and the Customer or third parties. No legal review, advice, or representation is provided by the Provider.</P>
        <P>3.3 The Customer is solely responsible for the legal review, evaluation, and use of all content generated or supported by the Provider&apos;s services (particularly briefs, contracts, contract drafts, client communications). The Customer ensures compliance with all applicable professional obligations (particularly BRAO, BORA, FAO, RVG, confidentiality obligations, prohibitions on representing conflicting interests) and data protection requirements.</P>
        <P>3.4 Where results of AI-assisted processing are provided, the Provider notes that these may be erroneous, incomplete, or outdated. The Customer is obligated to have all results reviewed and approved by a lawyer before further use.</P>
      </Block>

      <Block title="§ 4 Offer, Contract Conclusion">
        <P>4.1 Presentations of services on the Provider&apos;s website and in other media do not constitute a binding offer, but rather an invitation to submit an offer (invitatio ad offerendum).</P>
        <P>4.2 Customer inquiries via the contact form, email, or telephone are non-binding for the Provider. Individual offers from the Provider are binding for 14 days from their date, unless otherwise indicated.</P>
        <P>4.3 The contract is concluded upon order confirmation in text form by the Provider, or at the latest upon commencement of service delivery.</P>
      </Block>

      <Block title="§ 5 Customer Cooperation Obligations">
        <P>5.1 The Customer shall provide the Provider in a timely, complete, and suitable manner with all information, documents, content, access credentials, technical interfaces, and cooperation services necessary for service delivery. The Customer shall designate a binding contact person with decision-making authority.</P>
        <P>5.2 The Customer is obligated to keep access credentials provided to them confidential and to protect them from unauthorized third-party access.</P>
        <P>5.3 The Customer warrants that content provided by them (texts, images, logos, data) is free from third-party rights or that they hold the necessary usage rights. The Customer shall indemnify the Provider on first demand against third-party claims asserted due to infringement of rights in such content, including reasonable costs of legal defense.</P>
        <P>5.4 Delays attributable to a breach of cooperation obligations shall not be to the detriment of the Provider. Deadlines and timelines shall be extended accordingly; demonstrably incurred additional expenses may be invoiced separately by the Provider.</P>
      </Block>

      <Block title="§ 6 Deadlines and Service Delivery">
        <P>6.1 Deadlines and timelines are only binding if expressly agreed as binding in text form.</P>
        <P>6.2 For work services, acceptance occurs after delivery of the work. If the Customer does not refuse acceptance in text form, specifying concrete defects, within 14 calendar days after delivery, the work shall be deemed accepted. The Provider shall specifically notify the Customer of this consequence upon delivery.</P>
        <P>6.3 The commissioning or productive use of the work by the Customer shall also constitute acceptance.</P>
        <P>6.4 For the provision of online services, the targeted availability is 99% on an annual average, measured during the agreed service times. Maintenance work, force majeure, disruptions outside the Provider&apos;s area of responsibility (e.g., at third-party providers, internet service providers, hosts, interfaces such as beA), and causes attributable to the Customer shall not be considered. No availability guarantee beyond this is assured unless expressly agreed otherwise.</P>
      </Block>

      <Block title="§ 7 Remuneration, Payment Terms">
        <P>7.1 All prices are in euros plus the applicable statutory value-added tax.</P>
        <P>7.2 Remuneration is based on the agreement made in the order confirmation or offer. Unless otherwise agreed, billing is as a one-time payment per service; for ongoing services (particularly SEO, performance marketing, hosting, tool provision, Legal Alerts), billing occurs in monthly or agreed regular intervals.</P>
        <P>7.3 The Provider is entitled to invoice a reasonable deposit or advance payment before commencing service delivery.</P>
        <P>7.4 Third-party costs (particularly media budgets for SEA/Social Ads, license costs for tools, hosting, domains) are shown separately and either paid directly by the Customer to the third-party provider or advanced by the Provider on behalf of the Customer and passed through at cost.</P>
        <P>7.5 Invoices are due for payment without deduction within 14 calendar days from the invoice date. The Customer is in default without further notice if payment is not made within this period.</P>
        <P>7.6 In the event of default, the Customer owes interest at 9 percentage points above the base rate and a flat default fee of EUR 40.00 (§ 288 BGB). The right to claim further damages is reserved.</P>
        <P>7.7 The Customer may only set off or exercise a right of retention if the counterclaim has been established by final judgment, is undisputed, or has been acknowledged by the Provider.</P>
      </Block>

      <Block title="§ 8 Usage Rights, Retention of Title to Work Results">
        <P>8.1 Insofar as the Provider creates copyrighted works (e.g., concepts, texts, designs, code, training materials, templates) in the course of contract performance, upon full payment of the agreed remuneration, the Provider grants the Customer the simple, temporally and geographically unrestricted right to use these works for the contractually agreed purposes. Transfer to third parties or use beyond the contractual purpose requires a separate agreement in text form.</P>
        <P>8.2 Until full payment of remuneration, all usage rights remain with the Provider; use by the Customer is only permitted on a revocable basis until then.</P>
        <P>8.3 The Provider retains all rights to standardized components, frameworks, tools, prompts, models, libraries, and methods used for service delivery that were not developed exclusively for the Customer. The Customer only receives a simple right of use within the scope of the contractual purposes.</P>
        <P>8.4 The Provider is entitled to name publicly known or Customer-approved projects for reference purposes and to use the Customer&apos;s logo for this purpose, unless the Customer objects in text form.</P>
      </Block>

      <Block title="§ 9 Use of Artificial Intelligence, Third-Party Services">
        <P>9.1 The Provider uses third-party AI components (e.g., Large Language Models, OCR services) for service delivery. The Customer acknowledges that AI systems, due to their probabilistic nature, may produce erroneous, incomplete, biased, or outdated results. The Provider does not guarantee the substantive accuracy, completeness, or timeliness of AI-generated content.</P>
        <P>9.2 Insofar as the Provider provides or integrates interfaces to third-party providers (e.g., beA, search engines, social media platforms, hosting providers, payment service providers), the terms and availability of these third-party providers additionally apply. The Provider assumes no liability for their services, availability, or data protection practices.</P>
        <P>9.3 The Customer is obligated to independently verify the professional and data protection law permissibility before transmitting case-related or personal data to AI components, to obtain necessary consents, and to conclude appropriate data processing agreements with the Provider and/or the engaged third parties.</P>
      </Block>

      <Block title="§ 10 Confidentiality">
        <P>10.1 The Parties undertake to keep confidential all confidential information of the other Party that becomes known to them during contract initiation and performance (particularly business and trade secrets, client data, economic and technical information) and to use it only for the purposes of contract performance.</P>
        <P>10.2 This obligation applies for a period of five years after the end of the contract, unless statutory confidentiality obligations (particularly the attorney-client privilege of the Customer) provide for a longer period.</P>
        <P>10.3 A separate non-disclosure agreement (NDA) may be concluded at the Customer&apos;s request.</P>
      </Block>

      <Block title="§ 11 Data Protection, Data Processing">
        <P>11.1 The Parties comply with the applicable data protection regulations, particularly the General Data Protection Regulation (GDPR) and the German Federal Data Protection Act (BDSG). Details on the processing of personal data by the Provider can be found in the privacy policy at <a href="/datenschutz" style={{ color: "var(--accent)" }}>https://www.clever.legal/datenschutz</a>.</P>
        <P>11.2 Insofar as the Provider processes personal data on behalf of the Customer within the scope of its services (particularly for AI integration, lead processing, hosting), the Parties shall conclude a data processing agreement pursuant to Art. 28 GDPR before processing begins.</P>
      </Block>

      <Block title="§ 12 Defect Rights">
        <P>12.1 For work services, the Customer has the statutory defect rights, unless otherwise provided below. The limitation period for defect claims is twelve months from acceptance; § 13 of these GTC remains unaffected.</P>
        <P>12.2 For justified defect notices, the Provider shall first provide subsequent performance at its choice by remedying the defect or producing a new work. If subsequent performance fails twice, is unreasonable, or the Provider seriously and definitively refuses it, the Customer may reduce the price or withdraw from the contract.</P>
        <P>12.3 Damage claims exist only in accordance with § 13.</P>
        <P>12.4 For services (e.g., training, ongoing consulting), the Provider owes professional performance but not a specific outcome.</P>
      </Block>

      <Block title="§ 13 Liability">
        <P>13.1 The Provider is liable without limitation for intent and gross negligence, for damages resulting from injury to life, body, or health, within the scope of an expressly assumed guarantee, and under the provisions of the Product Liability Act.</P>
        <P>13.2 In the case of slightly negligent breach of material contractual obligations (cardinal obligations – obligations whose fulfillment makes the proper performance of the contract possible in the first place and on whose compliance the contractual partner may regularly rely), the Provider&apos;s liability is limited to the foreseeable, contract-typical damage. The foreseeable, contract-typical damage is limited in total to the net remuneration agreed for the respective order for the last twelve months, but not exceeding EUR 50,000.00 per claim.</P>
        <P>13.3 Otherwise, the Provider&apos;s liability – regardless of legal basis – is excluded.</P>
        <P>13.4 The Provider is specifically not liable for:</P>
        <Bullets items={[
          "(i) lost profits, missed client acquisition, missed conversions, reputational damage;",
          "(ii) damages resulting from inadequate data backup by the Customer;",
          "(iii) damages based on incorrect inputs or impermissible use of tools/results by the Customer;",
          "(iv) damages from failure to review AI-generated content before use by the Customer;",
          "(v) damages resulting from the Customer's non-compliance with professional or data protection obligations;",
          "(vi) outages or errors of third-party systems (e.g., beA, Google, Meta, hosting providers).",
        ]} />
        <P>13.5 The above liability limitations also apply in favor of the Provider&apos;s legal representatives, employees, and vicarious agents.</P>
      </Block>

      <Block title="§ 14 Contract Duration, Termination">
        <P>14.1 For contracts regarding one-time services (workshops, website creation, project-based integration), the contract ends upon complete delivery of the service.</P>
        <P>14.2 Contracts for ongoing services (particularly online marketing, SEO, SEA, social media, tool provision, Legal Alerts) have, unless otherwise agreed, a minimum term of three months and thereafter continue for an indefinite period. They may be ordinarily terminated by either Party with one month&apos;s notice to the end of the month.</P>
        <P>14.3 The right to extraordinary termination for good cause remains unaffected.</P>
        <P>14.4 Terminations require text form.</P>
      </Block>

      <Block title="§ 15 Force Majeure">
        <P>Events of force majeure that materially impede or render impossible the Provider&apos;s service delivery entitle the Provider to postpone performance for the duration of the impediment. Force majeure includes in particular strikes, lockouts, pandemics, government orders, cyber-attacks, prolonged failures of telecommunications or energy networks, and failures of essential third-party services beyond the Provider&apos;s control. If the impediment lasts longer than three months, either Party is entitled to terminate.</P>
      </Block>

      <Block title="§ 16 Final Provisions">
        <P>16.1 The laws of the Federal Republic of Germany apply, excluding the UN Convention on Contracts for the International Sale of Goods and the conflict-of-laws rules of private international law.</P>
        <P>16.2 The exclusive place of jurisdiction for all disputes arising from or in connection with the contractual relationship is – to the extent legally permissible – the registered office of the Provider. The Provider is also entitled to sue the Customer at the Customer&apos;s general place of jurisdiction.</P>
        <P>16.3 The place of performance for all services is the registered office of the Provider.</P>
        <P>16.4 Amendments and supplements to these GTC as well as individual agreements require text form to be effective. This also applies to the waiver of this text form requirement.</P>
        <P>16.5 The Provider is entitled to amend these GTC with future effect, insofar as this is necessary for legal, technical, or economic reasons and does not unreasonably disadvantage the Customer. The amendment shall be communicated to the Customer in text form. If the Customer does not object to the amendment within six weeks of receipt of the notification, this shall be deemed consent. The Customer shall be specifically advised of the significance of silence in the notification.</P>
        <P>16.6 Should individual provisions of these GTC be or become wholly or partially invalid or unenforceable, the validity of the remaining provisions shall not be affected. The invalid or unenforceable provision shall be replaced by the valid and enforceable provision whose economic effect comes closest to that of the invalid or unenforceable provision.</P>
      </Block>

      <Footer />
    </>
  );
}

/* ─── Shared Components ───────────────────────────────────────────────── */

function Footer() {
  return (
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
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      padding: "16px 20px",
      background: "color-mix(in oklab, var(--accent), var(--bg) 92%)",
      border: "1px solid var(--line-2)",
    }}>
      <p style={{ color: "var(--ink-2)", fontSize: 15, lineHeight: 1.65 }}>
        {children}
      </p>
    </div>
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

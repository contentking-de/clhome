import SubpageShell from "@/components/landing/SubpageShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Erklärung zur Barrierefreiheit | clever.legal",
  description:
    "Barrierefreiheitserklärung der clever.legal GmbH gemäß Barrierefreiheitsstärkungsgesetz (BFSG) und WCAG 2.1 Level AA.",
};

export default function BarrierefreiheitPage() {
  return (
    <SubpageShell>
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>
            BFSG · EN 301 549 · WCAG 2.1 AA
          </div>
          <h1
            className="display"
            style={{
              fontSize: "clamp(40px, 5vw, 72px)",
              fontWeight: 700,
              marginBottom: 48,
            }}
          >
            Erklärung zur{" "}
            <span style={{ color: "var(--accent)" }}>Barrierefreiheit</span>
          </h1>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 40,
            }}
          >
            <Block title="Geltungsbereich">
              <p>
                Diese Erklärung zur Barrierefreiheit gilt für die öffentlich
                zugängliche Website{" "}
                <strong style={{ color: "var(--ink)" }}>clever.legal</strong>{" "}
                der clever.legal GmbH i.&nbsp;Gr., Florianweg 1, 88677 Markdorf.
              </p>
              <p style={{ marginTop: 12 }}>
                Wir verpflichten uns, unsere digitalen Angebote im Einklang mit
                dem{" "}
                <strong style={{ color: "var(--ink)" }}>
                  Barrierefreiheitsstärkungsgesetz (BFSG)
                </strong>
                , der europäischen Norm{" "}
                <strong style={{ color: "var(--ink)" }}>EN 301 549</strong> und
                den{" "}
                <strong style={{ color: "var(--ink)" }}>
                  Web Content Accessibility Guidelines (WCAG) 2.1 Level AA
                </strong>{" "}
                barrierefrei zu gestalten.
              </p>
            </Block>

            <Block title="Stand der Barrierefreiheit">
              <p>
                Diese Website ist{" "}
                <strong style={{ color: "var(--accent)" }}>
                  weitgehend konform
                </strong>{" "}
                mit WCAG 2.1 Level AA. Im April 2026 haben wir eine umfassende
                Überprüfung und Überarbeitung aller öffentlichen Seiten
                durchgeführt. Die nachfolgenden Maßnahmen wurden umgesetzt.
              </p>
            </Block>

            <Divider />

            <h2
              className="display"
              style={{
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: 700,
              }}
            >
              Umgesetzte{" "}
              <span style={{ color: "var(--accent)" }}>Maßnahmen</span>
            </h2>

            <Measure
              num="01"
              title="Sprache & Grundstruktur"
              items={[
                "Das HTML-Dokument ist mit lang=\"de\" ausgezeichnet, sodass Screenreader die korrekte Sprachausgabe verwenden.",
                "Die Seite nutzt semantische HTML5-Landmarks: header, main, nav und footer. Screenreader können damit direkt zwischen Seitenbereichen navigieren.",
                "Ein Skip-Link (\u201EZum Inhalt springen\u201C) ist als erstes interaktives Element implementiert. Bei Fokus wird er sichtbar und überspringt die Navigation.",
              ]}
            />

            <Measure
              num="02"
              title="Navigation & Tastaturzugänglichkeit"
              items={[
                "Alle interaktiven Elemente (Links, Buttons, Formularfelder, Slider) sind vollständig per Tastatur bedienbar.",
                "Der globale Focus-Indikator ist als 2px-Kontur in der Akzentfarbe definiert (:focus-visible) und auf allen Elementen sichtbar.",
                "Die Hauptnavigation und die mobile Navigation sind jeweils mit aria-label ausgezeichnet.",
                "Der mobile Menü-Button enthält aria-expanded und aria-controls. Das Menü schließt sich per Escape-Taste und der Fokus wird beim Öffnen automatisch in das Menü verschoben.",
              ]}
            />

            <Measure
              num="03"
              title="Farben & Kontraste"
              items={[
                "Alle Text-Hintergrund-Kombinationen erfüllen das WCAG-Mindest-Kontrastverhältnis von 4.5:1 für normalen Text und 3:1 für großen Text.",
                "Farbe wird nie als einziger Informationsträger verwendet — Severity-Level in der Alerts-Tabelle sind zusätzlich textlich ausgezeichnet.",
                "Die Akzentfarbe (Grün) auf dunklem Hintergrund erreicht ein Kontrastverhältnis von ca. 5.8:1.",
              ]}
            />

            <Measure
              num="04"
              title="Animationen & Bewegung"
              items={[
                "Alle Animationen (Ticker-Laufschrift, Cursor-Blinken, Glocken-Pulse, Übergänge) werden bei aktivierter Systemeinstellung prefers-reduced-motion vollständig deaktiviert.",
                "Die Typewriter-Animation im Heldenbereich wird bei reduzierter Bewegung sofort als vollständiger Text dargestellt — ohne Verzögerung.",
                "Der Ticker ist mit role=\"marquee\" und aria-label beschrieben. Der scrollende Inhalt ist für Screenreader über aria-hidden verborgen, um unnötige Wiederholungen zu vermeiden.",
              ]}
            />

            <Measure
              num="05"
              title="Formulare & Fehlermeldungen"
              items={[
                "Alle Formularfelder im Kontaktformular sind mit sichtbaren label-Elementen verknüpft.",
                "Das Alert-Abonnement-Modal nutzt sichtbare Labels, aria-required und aria-describedby zur Verknüpfung von Feldern und Fehlermeldungen.",
                "Fehlermeldungen werden mit role=\"alert\" ausgezeichnet, sodass Screenreader sie sofort vorlesen.",
                "Das Abonnement-Modal nutzt das native dialog-Element mit eingebautem Focus-Trap und ist per aria-labelledby mit seinem Titel verknüpft.",
              ]}
            />

            <Measure
              num="06"
              title="Bilder & Icons"
              items={[
                "Alle informativen Bilder (Teamfotos, Blog-Cover) tragen beschreibende Alt-Texte mit Name und Rolle.",
                "Dekorative SVG-Icons sind mit aria-hidden=\"true\" markiert und werden von Screenreadern ignoriert.",
                "Das Logo ist als Link mit aria-label=\"clever.legal – Startseite\" ausgezeichnet.",
              ]}
            />

            <Measure
              num="07"
              title="Semantische Struktur & ARIA"
              items={[
                "Die Überschriften-Hierarchie ist konsistent: eine H1 pro Seite, gefolgt von H2 für Sektionen und H3 für Unterabschnitte.",
                "Die Zielgruppen-Tabs (Cluster-Auswahl) sind mit dem vollständigen WAI-ARIA Tabs-Pattern implementiert: role=\"tablist\", role=\"tab\" mit aria-selected und aria-controls, sowie role=\"tabpanel\" mit aria-labelledby.",
                "Vergleichstabellen (Status Quo vs. clever.legal, Alerts-Übersicht) sind mit ARIA-Tabellenrollen (role=\"table\", role=\"row\", role=\"columnheader\", role=\"cell\") ausgezeichnet.",
                "Der Footer ist mit mehreren <nav>-Elementen strukturiert, jeweils mit aria-label für die Kategorie.",
              ]}
            />

            <Measure
              num="08"
              title="Links & interaktive Elemente"
              items={[
                "Wiederholt vorkommende Links (z.B. \u201E\u00D6ffnen\u201C in der Alerts-Tabelle) sind mit individuellen aria-label-Attributen versehen, die den jeweiligen Kontext enthalten.",
                "Blog-Artikel-Links tragen aria-label mit dem Artikeltitel.",
                "Range-Slider im Kostenrechner nutzen aria-valuetext, um den aktuellen Wert mit Einheit vorzulesen (z.B. \u201E80 F\u00E4lle\u201C).",
              ]}
            />

            <Divider />

            <Block title="Bekannte Einschränkungen">
              <p>
                Trotz unserer Bemühungen können einzelne Bereiche
                Einschränkungen aufweisen:
              </p>
              <ul
                style={{
                  listStyle: "none",
                  marginTop: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {[
                  "Eingebettete Inhalte Dritter (z.B. externe Widgets) unterliegen nicht unserer Kontrolle.",
                  "Ältere Blog-Beiträge können vereinzelt suboptimale Alt-Texte enthalten — wir arbeiten an einer Nachpflege.",
                  "PDF-Dokumente, die zum Download angeboten werden, sind möglicherweise noch nicht vollständig barrierefrei.",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "baseline",
                    }}
                  >
                    <span
                      className="mono"
                      style={{ color: "var(--accent)", fontSize: 12 }}
                    >
                      ›
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Testmethodik">
              <p>
                Die Barrierefreiheit wurde durch eine Kombination folgender
                Methoden geprüft:
              </p>
              <ul
                style={{
                  listStyle: "none",
                  marginTop: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {[
                  "Statische Code-Analyse aller öffentlichen Komponenten",
                  "Automatisierte Tests mit ESLint jsx-a11y-Regelwerk",
                  "Manuelle Prüfung gegen WCAG 2.1 Level AA Erfolgskriterien",
                  "Kontrastverhältnis-Prüfung aller Farbkombinationen",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "baseline",
                    }}
                  >
                    <span
                      className="mono"
                      style={{ color: "var(--accent)", fontSize: 12 }}
                    >
                      ›
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Feedback & Kontakt">
              <p>
                Sollten Sie auf Barrieren stoßen oder Verbesserungsvorschläge
                haben, freuen wir uns über Ihre Rückmeldung:
              </p>
              <div style={{ marginTop: 16 }}>
                <p>
                  <strong style={{ color: "var(--ink)" }}>
                    clever.legal GmbH i.&nbsp;Gr.
                  </strong>
                </p>
                <p>RA Marc Ellerbrock</p>
                <p>Florianweg 1, 88677 Markdorf</p>
                <p style={{ marginTop: 8 }}>
                  E-Mail:{" "}
                  <a
                    href="mailto:barrierefreiheit@clever.legal"
                    style={{ color: "var(--accent)" }}
                  >
                    barrierefreiheit@clever.legal
                  </a>
                </p>
              </div>
              <p style={{ marginTop: 16 }}>
                Wir bemühen uns, Ihre Anfrage innerhalb von 14 Tagen zu
                beantworten und etwaige Mängel zeitnah zu beheben.
              </p>
            </Block>

            <Block title="Durchsetzungsverfahren">
              <p>
                Sollte nach Ihrer Kontaktaufnahme keine zufriedenstellende
                Lösung gefunden werden, können Sie sich an die zuständige
                Durchsetzungsstelle wenden. Zuständig ist die
                Marktüberwachungsbehörde des jeweiligen Bundeslandes gemäß
                § 3 BFSG.
              </p>
            </Block>

            <div
              className="mono"
              style={{
                fontSize: 11,
                color: "var(--ink-3)",
                letterSpacing: "0.1em",
                paddingTop: 24,
                borderTop: "1px dashed var(--line-2)",
              }}
            >
              Diese Erklärung wurde am 22. April 2026 erstellt und zuletzt am
              22.&nbsp;April 2026 aktualisiert.
            </div>
          </div>
        </div>
      </section>
    </SubpageShell>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ borderLeft: "1px solid var(--line)", paddingLeft: 24 }}>
      <div
        className="mono"
        style={{
          fontSize: 11,
          letterSpacing: "0.14em",
          color: "var(--accent)",
          marginBottom: 12,
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>
      <div style={{ color: "var(--ink-2)", fontSize: 15, lineHeight: 1.65 }}>
        {children}
      </div>
    </div>
  );
}

function Measure({
  num,
  title,
  items,
}: {
  num: string;
  title: string;
  items: string[];
}) {
  return (
    <div
      style={{
        border: "1px solid var(--line-2)",
        background: "var(--bg-2)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "20px 28px",
          borderBottom: "1px solid var(--line-2)",
        }}
      >
        <span
          className="mono"
          style={{
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--accent)",
            color: "var(--accent-ink)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
            flexShrink: 0,
          }}
        >
          {num}
        </span>
        <h3
          className="display"
          style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}
        >
          {title}
        </h3>
      </div>
      <ul
        style={{
          listStyle: "none",
          padding: "20px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {items.map((item) => (
          <li
            key={item}
            style={{
              display: "flex",
              gap: 14,
              alignItems: "baseline",
              fontSize: 14,
              lineHeight: 1.6,
              color: "var(--ink-2)",
            }}
          >
            <span
              className="mono"
              style={{
                color: "var(--accent)",
                fontSize: 12,
                flexShrink: 0,
              }}
            >
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        borderTop: "1px solid var(--line-2)",
        margin: "8px 0",
      }}
    />
  );
}

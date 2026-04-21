import SubpageShell from "@/components/landing/SubpageShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | clever.legal",
};

export default function ImpressumPage() {
  return (
    <SubpageShell>
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>Recht</div>
          <h1 className="display" style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 700, marginBottom: 48 }}>
            Impressum
          </h1>

          <div style={{ maxWidth: 720, display: "flex", flexDirection: "column", gap: 40 }}>
            <Block title="Angaben gemäß § 5 TMG">
              <p>clever.legal GmbH i. Gr.<br />Florianweg 1<br />88677 Markdorf</p>
            </Block>

            <Block title="Vertreten durch">
              <p>Geschäftsführer: RA Marc Ellerbrock</p>
            </Block>

            <Block title="Kontakt">
              <p>E-Mail: <a href="mailto:info@clever.legal" style={{ color: "var(--accent)" }}>info@clever.legal</a></p>
            </Block>

            <Block title="Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV">
              <p>RA Marc Ellerbrock<br />Florianweg 1<br />88677 Markdorf</p>
            </Block>

            <Block title="Berufsbezeichnung und berufsrechtliche Regelungen">
              <p>Berufsbezeichnung: Rechtsanwalt (verliehen in der Bundesrepublik Deutschland)</p>
              <p style={{ marginTop: 8 }}>Zuständige Kammer: Rechtsanwaltskammer</p>
              <p style={{ marginTop: 8 }}>Es gelten folgende berufsrechtliche Regelungen:</p>
              <ul style={{ listStyle: "none", marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                {["Bundesrechtsanwaltsordnung (BRAO)", "Berufsordnung für Rechtsanwälte (BORA)", "Fachanwaltsordnung (FAO)", "Rechtsanwaltsvergütungsgesetz (RVG)", "Berufsregeln der Rechtsanwälte der Europäischen Union (CCBE)"].map((r) => (
                  <li key={r} style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                    <span className="mono" style={{ color: "var(--accent)", fontSize: 12 }}>›</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="EU-Streitschlichtung">
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p style={{ marginTop: 8 }}>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </Block>

            <Block title="Haftung für Inhalte">
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.
              </p>
            </Block>

            <Block title="Haftung für Links">
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
              </p>
            </Block>

            <Block title="Urheberrecht">
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.
              </p>
            </Block>
          </div>
        </div>
      </section>
    </SubpageShell>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: "1px solid var(--line)", paddingLeft: 24 }}>
      <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 12, textTransform: "uppercase" }}>
        {title}
      </div>
      <div style={{ color: "var(--ink-2)", fontSize: 15, lineHeight: 1.65 }}>
        {children}
      </div>
    </div>
  );
}

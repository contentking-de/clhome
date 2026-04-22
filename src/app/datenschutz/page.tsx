import SubpageShell from "@/components/landing/SubpageShell";
import { CookieSettingsButton } from "@/components/landing/CookieConsent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | clever.legal",
};

export default function DatenschutzPage() {
  return (
    <SubpageShell>
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>Recht</div>
          <h1 className="display" style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 700, marginBottom: 48 }}>
            Datenschutz
          </h1>

          <div style={{ maxWidth: 720, display: "flex", flexDirection: "column", gap: 40 }}>
            <Block title="1 · Datenschutz auf einen Blick">
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
              </p>
            </Block>

            <Block title="2 · Verantwortliche Stelle">
              <p>clever.legal GmbH i. Gr.<br />Florianweg 1<br />88677 Markdorf</p>
              <p style={{ marginTop: 8 }}>Geschäftsführer: RA Marc Ellerbrock<br />E-Mail: <a href="mailto:info@clever.legal" style={{ color: "var(--accent)" }}>info@clever.legal</a></p>
            </Block>

            <Block title="3 · Datenerfassung auf dieser Website">
              <Sub title="Server-Log-Dateien">
                <p>
                  Der Provider erhebt und speichert automatisch Informationen in Server-Log-Dateien:
                </p>
                <ul style={{ listStyle: "none", marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                  {["Browsertyp und Browserversion", "Verwendetes Betriebssystem", "Referrer URL", "Hostname des zugreifenden Rechners", "Uhrzeit der Serveranfrage", "IP-Adresse"].map((item) => (
                    <li key={item} style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                      <span className="mono" style={{ color: "var(--accent)", fontSize: 12 }}>›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p style={{ marginTop: 12 }}>Die Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.</p>
              </Sub>
              <Sub title="Cookies">
                <p>
                  Diese Website verwendet technisch notwendige Cookies. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
                  Weitere Cookies (z.&nbsp;B. für Analyse oder Marketing) werden nur mit Ihrer ausdrücklichen
                  Einwilligung gesetzt (Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO). Sie können Ihre Einstellungen
                  jederzeit anpassen: <CookieSettingsButton />
                </p>
              </Sub>
              <Sub title="Kontaktformular">
                <p>
                  Ihre Angaben aus dem Kontaktformular werden zwecks Bearbeitung bei uns gespeichert.
                  Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.
                </p>
              </Sub>
            </Block>

            <Block title="4 · Hosting">
              <p>
                Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet.
                Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </Block>

            <Block title="5 · Ihre Rechte">
              <p>
                Sie haben jederzeit das Recht auf Auskunft, Berichtigung oder Löschung Ihrer gespeicherten
                personenbezogenen Daten. Wenden Sie sich an:{" "}
                <a href="mailto:info@clever.legal" style={{ color: "var(--accent)" }}>info@clever.legal</a>
              </p>
            </Block>

            <Block title="6 · Widerruf Ihrer Einwilligung">
              <p>
                Bereits erteilte Einwilligungen können jederzeit widerrufen werden. Die Rechtmäßigkeit
                der bis zum Widerruf erfolgten Datenverarbeitung bleibt unberührt.
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

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 20 }}>
      <div className="display" style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--ink)" }}>
        {title}
      </div>
      {children}
    </div>
  );
}

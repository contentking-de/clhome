import { IconGraduate, IconCircuit, IconSat, IconMegaphone } from "./Icons";
import { ArrowSvg } from "./Icons";

const SERVICES = [
  {
    num: "01",
    Icon: IconGraduate,
    title: "KI-Schulungen & Workshops",
    subtitle: "FÜR KANZLEIEN",
    desc: "Ihr Team lernt nicht nur, was KI kann — es lernt, wie man sie im juristischen Alltag souverän einsetzt. Unsere Workshops sind praxisnah, auf Ihre Rechtsgebiete zugeschnitten und liefern ab Tag 1 Ergebnisse.",
    bullets: [
      "Hands-on-Workshops vor Ort oder remote — keine PowerPoint-Theorie",
      "Prompt Engineering für juristische Texte, Vertragsanalyse und Recherche",
      "Team-Adoption-Garantie: Wir gehen erst, wenn jede Kraft im Haus die Tools beherrscht",
    ],
    metrics: [
      { l: "Dauer", v: "1–2 Tage" },
      { l: "Adoption", v: "100%" },
    ],
  },
  {
    num: "02",
    Icon: IconCircuit,
    title: "KI-Integration in Kanzleien",
    subtitle: "PROZESS-TRANSFORMATION",
    desc: "Wir analysieren Ihre bestehenden Abläufe und installieren KI dort, wo sie den größten Hebel hat. Keine Spielerei, kein Buzzword-Bingo — sondern messbar weniger Aufwand, mehr Kapazität und schnellere Durchlaufzeiten.",
    bullets: [
      "Prozess-Audit: Wir durchleuchten Ihre Workflows und identifizieren Automatisierungs-Potenzial",
      "Custom-Integration von LLMs, OCR und Dokumenten-KI in Ihre bestehende Infrastruktur",
      "Skalierung ohne neues Personal: Mehr Fälle bearbeiten bei gleichbleibenden Kosten",
    ],
    metrics: [
      { l: "Prüfzeit", v: "−90%" },
      { l: "Genauigkeit", v: "99.4%" },
    ],
  },
  {
    num: "03",
    Icon: IconSat,
    title: "Lead-Satelliten",
    subtitle: "MANDATSGEWINNUNG",
    desc: "Für jedes Rechtsgebiet eine eigene, hochkonvertierende Landingpage — Ihre ‚Satelliten'. Spezialisiert, SEO-optimiert und mit automatisierten Funnels ausgestattet, die qualifizierte Mandate auf Autopilot liefern.",
    bullets: [
      "Spezialisierte Domains pro Rechtsgebiet für maximale Sichtbarkeit und Vertrauen",
      "Vollautomatisierter Funnel: Vom Erstkontakt über die Fallprüfung bis zur digitalen Vollmacht",
      "Performance-optimierte Kampagnen, die den Cost-per-Acquisition um bis zu 62% senken",
    ],
    metrics: [
      { l: "CAC", v: "−62%" },
      { l: "Conv.", v: "8.4%" },
    ],
  },
  {
    num: "04",
    Icon: IconMegaphone,
    title: "Online-Marketing Services",
    subtitle: "SEO · LOCAL SEO · SEA · SOCIAL MEDIA",
    desc: "Sichtbarkeit ist kein Zufall, sondern Handwerk. Wir bauen die digitale Präsenz Ihrer Kanzlei systematisch aus — mit organischer Reichweite, bezahltem Traffic und Social-Media-Strategien, die Autorität und Vertrauen aufbauen.",
    bullets: [
      "SEO & Local SEO: Topplatzierungen in Google — lokal und überregional, organisch und nachhaltig",
      "Google Ads (SEA): Performance-Kampagnen mit klar definiertem ROI und laufender Optimierung",
      "Social Media: Content-Strategien, die Ihre Expertise sichtbar machen und Mandanten anziehen",
    ],
    metrics: [
      { l: "Sichtbarkeit", v: "+340%" },
      { l: "Ø ROI", v: "6.2×" },
    ],
  },
];

function ServiceCard({
  num,
  Icon,
  title,
  subtitle,
  desc,
  bullets,
  metrics,
  featured,
}: {
  num: string;
  Icon: typeof IconGraduate;
  title: string;
  subtitle: string;
  desc: string;
  bullets: string[];
  metrics: { l: string; v: string }[];
  featured?: boolean;
}) {
  return (
    <div
      style={{
        border: "1px solid var(--line-2)",
        padding: "36px 32px 32px",
        background: featured
          ? "color-mix(in oklab, var(--accent), var(--bg) 94%)"
          : "var(--bg-2)",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ color: featured ? "var(--accent)" : "var(--ink)" }}>
          <Icon size={28} />
        </div>
        <span
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.14em",
            color: "var(--ink-3)",
          }}
        >
          SRV.{num}
        </span>
      </div>

      <div>
        <span
          className="mono"
          style={{
            fontSize: 10,
            letterSpacing: "0.14em",
            color: featured ? "var(--accent)" : "var(--ink-3)",
            display: "block",
            marginBottom: 10,
          }}
        >
          {subtitle}
        </span>
        <h3
          className="display"
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h3>
      </div>

      <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-2)" }}>
        {desc}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {bullets.map((b, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "baseline",
            }}
          >
            <span
              style={{
                color: featured ? "var(--accent)" : "var(--ink-3)",
                fontSize: 12,
                flexShrink: 0,
              }}
            >
              ▸
            </span>
            <span
              style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--ink-2)" }}
            >
              {b}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "auto",
          display: "flex",
          gap: 18,
          paddingTop: 16,
          borderTop: "1px dashed var(--line-2)",
        }}
      >
        {metrics.map((m, i) => (
          <div key={i}>
            <div
              className="mono"
              style={{
                fontSize: 10,
                color: "var(--ink-3)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              {m.l}
            </div>
            <div
              className="display"
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: featured ? "var(--accent)" : "var(--ink)",
              }}
            >
              {m.v}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      style={{
        borderBottom: "1px solid var(--line-2)",
        background: "var(--bg)",
      }}
    >
      <div className="l-container" style={{ padding: "96px 32px 64px" }}>
        <div className="l-grid-sh">
          <div>
            <div className="l-label" style={{ marginBottom: 18 }}>
              § 03 — Angebot & Services
            </div>
            <div className="l-chip" style={{ marginBottom: 24 }}>
              <span className="dot" />
              Vier Leistungsbereiche · ein Ziel
            </div>
          </div>
          <h2
            className="display"
            style={{
              fontSize: "clamp(44px, 5.5vw, 88px)",
              fontWeight: 700,
            }}
          >
            Was wir
            <br />
            <span style={{ color: "var(--accent)" }}>liefern.</span>
          </h2>
        </div>
      </div>

      <div className="l-container" style={{ padding: "0 32px 48px" }}>
        <p
          style={{
            maxWidth: 720,
            fontSize: 17,
            lineHeight: 1.65,
            color: "var(--ink-2)",
          }}
        >
          Wir kombinieren KI-Kompetenz, Performance Marketing und
          Kanzlei-Know-how zu einem geschlossenen System. Vier Services, die
          ineinandergreifen — damit Ihre Kanzlei nicht nur effizienter arbeitet,
          sondern auch planbarer wächst.
        </p>
      </div>

      <div className="l-container" style={{ padding: "0 32px 96px" }}>
        <div
          className="l-grid-services"
          style={{
            gap: 0,
            border: "1px solid var(--line-2)",
          }}
        >
          {SERVICES.map((s, i) => (
            <div
              key={s.num}
              style={{
                borderRight:
                  i % 2 === 0 ? "1px solid var(--line-2)" : "none",
                borderBottom:
                  i < 2 ? "1px solid var(--line-2)" : "none",
              }}
            >
              <ServiceCard {...s} featured={i === 0} />
            </div>
          ))}
        </div>

        <div
          className="l-engine-bar"
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 24px",
            border: "1px solid var(--line-2)",
            background: "var(--bg-2)",
          }}
        >
          <span
            className="mono"
            style={{
              fontSize: 12,
              letterSpacing: "0.1em",
              color: "var(--ink-2)",
            }}
          >
            <span style={{ color: "var(--accent)" }}>▸</span>&nbsp;
            Schulung → Integration → Satelliten → Marketing. Ein Ökosystem.
            Keine Insellösungen.
          </span>
          <a
            href="#kontakt"
            className="mono"
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--accent)",
              whiteSpace: "nowrap",
            }}
          >
            Leistungspaket anfragen →
          </a>
        </div>
      </div>
    </section>
  );
}

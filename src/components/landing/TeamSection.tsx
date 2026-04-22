const FOUNDERS = [
  {
    name: "Marc Ellerbrock",
    role: "Massenklage-Stratege",
    code: "MEK",
    tag: "LEGAL",
    bio: "Juristisches Gewissen. Bewies mit zockerhelden.de wie man Massenverfahren skaliert.",
    brands: ["Zockerhelden", "Meta-Klage", "Coachinganwalt", "BEMK"],
    image: "/team/marc-ellerbrock.jpeg",
  },
  {
    name: "Nico Sacotte",
    role: "Content-Stratege",
    code: "NSA",
    tag: "CONTENT",
    bio: "25+ Jahre Online Marketing. Baut organische Autorität — gegen verkrustete Strukturen.",
    brands: ["Commerzbank", "Burda", "O2", "Immoscout", "Fleurop"],
    image: "/team/nico-sacotte.png",
  },
  {
    name: "Thorsten Loth",
    role: "Performance Marketing",
    code: "TLO",
    tag: "GROWTH",
    bio: "Jagt Traffic auf Satelliten und B2B-Landingpages. Zwei Jahrzehnte Paid-Excellence.",
    brands: ["Apollo", "Fressnapf", "C&A", "Deichmann", "BK"],
    image: "/team/thorsten-loth.webp",
  },
  {
    name: "Christoph Ehrke",
    role: "IT-Architekt",
    code: "CEH",
    tag: "TECH",
    bio: "Denkt in hochperformanter Logik, nicht Paragraphen. Die Black Box, die alles möglich macht.",
    brands: ["OMlocal", "OMfire", "30+ Team"],
    image: "/team/christoph-ehrke.jpeg",
  },
];

export default function TeamSection() {
  return (
    <section
      id="story"
      style={{
        borderBottom: "1px solid var(--line-2)",
        background: "var(--bg)",
      }}
    >
      <div className="l-container" style={{ padding: "96px 32px" }}>
        <div
          className="l-grid-sh"
          style={{
            paddingBottom: 48,
          }}
        >
          <div>
            <div className="l-label" style={{ marginBottom: 18 }}>
              § 06 — Das Team
            </div>
            <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>
              Spezialeinheit · Recht × Tech × Reichweite
            </div>
          </div>
          <h2
            className="display"
            style={{
              fontSize: "clamp(44px, 5.5vw, 88px)",
              fontWeight: 700,
            }}
          >
            Vier Köpfe.
            <br />
            <span style={{ color: "var(--accent)" }}>Keine Ehrfurcht.</span>
          </h2>
        </div>

        <div
          className="l-grid-4 l-team-cards"
          style={{
            border: "1px solid var(--line-2)",
          }}
        >
          {FOUNDERS.map((f, i) => (
            <div
              key={f.code}
              style={{
                padding: 32,
                borderRight:
                  i < 3 ? "1px solid var(--line-2)" : "none",
                background: "var(--bg-2)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 24,
                }}
              >
                <span
                  className="mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    color: "var(--accent)",
                  }}
                >
                  #{f.tag}
                </span>
                <span
                  className="mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    color: "var(--ink-3)",
                  }}
                >
                  {f.code}
                </span>
              </div>
              <div
                style={{
                  aspectRatio: "3 / 4",
                  background: "var(--bg-3)",
                  marginBottom: 20,
                  position: "relative",
                  overflow: "hidden",
                  border: "1px solid var(--line-2)",
                }}
              >
                <img
                  src={f.image}
                  alt={`${f.name}, ${f.role}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "grayscale(100%)",
                  }}
                />
              </div>
              <div
                className="display"
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  lineHeight: 1.1,
                  marginBottom: 6,
                }}
              >
                {f.name}
              </div>
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--accent)",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                {f.role}
              </div>
              <p
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  color: "var(--ink-2)",
                  marginBottom: 20,
                  minHeight: 72,
                }}
              >
                {f.bio}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  paddingTop: 16,
                  borderTop: "1px dashed var(--line-2)",
                }}
              >
                {f.brands.map((b) => (
                  <span
                    key={b}
                    className="mono"
                    style={{
                      fontSize: 10,
                      padding: "3px 8px",
                      border: "1px solid var(--line-2)",
                      color: "var(--ink-3)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Origin story + experience */}
        <div
          className="l-grid-story"
          style={{
            marginTop: 64,
          }}
        >
          <div
            style={{
              padding: "32px 36px",
              border: "1px solid var(--line-2)",
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                color: "var(--accent)",
                marginBottom: 16,
              }}
            >
              ORIGIN · AFFENBERG · 2024
            </div>
            <p
              className="display"
              style={{
                fontSize: 28,
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              „Während wir uns über die Evolution der Primaten wundern, steckt
              das deutsche Rechtssystem noch in der analogen Kreidezeit fest."
            </p>
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: "var(--ink-3)",
                letterSpacing: "0.1em",
                marginTop: 20,
              }}
            >
              — Nico &amp; Thorsten, Spaziergang mit den Berberaffen
            </div>
          </div>
          <div
            style={{
              padding: "32px 36px",
              background: "var(--bg-2)",
              border: "1px solid var(--line-2)",
            }}
          >
            <div
              className="display"
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: "var(--accent)",
                lineHeight: 1,
              }}
            >
              50+
            </div>
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                color: "var(--ink-2)",
                marginTop: 10,
                textTransform: "uppercase",
              }}
            >
              Jahre kumulierte Erfahrung
            </div>
            <div
              style={{
                marginTop: 24,
                paddingTop: 24,
                borderTop: "1px dashed var(--line-2)",
              }}
            >
              <a
                href="/story"
                className="mono"
                style={{
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                }}
              >
                Ganze Story lesen →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

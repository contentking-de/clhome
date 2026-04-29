import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export default async function TeamSection() {
  const t = await getTranslations("Team");

  const FOUNDERS = [
    {
      name: t("marcName"),
      role: t("marcRole"),
      code: "MEK",
      tag: "LEGAL",
      bio: t("marcBio"),
      brands: ["Zockerhelden", "Meta-Klage", "Coachinganwalt", "BEMK"],
      image: "/team/marc-ellerbrock.jpeg",
    },
    {
      name: t("nicoName"),
      role: t("nicoRole"),
      code: "NSA",
      tag: "CONTENT",
      bio: t("nicoBio"),
      brands: ["Commerzbank", "Burda", "O2", "Immoscout", "Fleurop"],
      image: "/team/nico-sacotte.png",
    },
    {
      name: t("thorstenName"),
      role: t("thorstenRole"),
      code: "TLO",
      tag: "GROWTH",
      bio: t("thorstenBio"),
      brands: ["Apollo", "Fressnapf", "C&A", "Deichmann", "BK"],
      image: "/team/thorsten-loth.webp",
    },
    {
      name: t("christophName"),
      role: t("christophRole"),
      code: "CEH",
      tag: "TECH",
      bio: t("christophBio"),
      brands: ["OMlocal", "OMfire", "30+ Team"],
      image: "/team/christoph-ehrke.jpeg",
    },
  ];

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
              {t("sectionLabel")}
            </div>
            <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>
              {t("subline")}
            </div>
          </div>
          <h2
            className="display"
            style={{
              fontSize: "clamp(44px, 5.5vw, 88px)",
              fontWeight: 700,
            }}
          >
            {t("headlineLine1")}
            <br />
            <span style={{ color: "var(--accent)" }}>{t("headlineLine2Accent")}</span>
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
                  loading="lazy"
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
              {t("originKicker")}
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
              {t("originQuote")}
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
              {t("originAttribution")}
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
              {t("experienceYearLabel")}
            </div>
            <div
              style={{
                marginTop: 24,
                paddingTop: 24,
                borderTop: "1px dashed var(--line-2)",
              }}
            >
              <Link
                href="/story"
                className="mono"
                style={{
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                }}
              >
                {t("linkReadFullStory")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

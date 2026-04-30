import SubpageShell from "@/components/landing/SubpageShell";
import { Link } from "@/i18n/routing";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowSvg } from "@/components/landing/Icons";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("Story");
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/story",
    locale,
  });
}

export default async function StoryPage() {
  const t = await getTranslations("Story");

  const founders = [
    {
      name: t("founderMarcName"),
      role: t("founderMarcRole"),
      code: "MEK",
      tag: "LEGAL",
      image: "/team/marc-ellerbrock.jpeg",
    },
    {
      name: t("founderNicoName"),
      role: t("founderNicoRole"),
      code: "NSA",
      tag: "CONTENT",
      image: "/team/nico-sacotte.png",
    },
    {
      name: t("founderThorstenName"),
      role: t("founderThorstenRole"),
      code: "TLO",
      tag: "GROWTH",
      image: "/team/thorsten-loth.webp",
    },
    {
      name: t("founderChristophName"),
      role: t("founderChristophRole"),
      code: "CEH",
      tag: "TECH",
      image: "/team/christoph-ehrke.jpeg",
    },
  ];

  return (
    <SubpageShell>
      {/* Hero */}
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px 64px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>
            {t("heroLabel")}
          </div>
          <h1
            className="display"
            style={{
              fontSize: "clamp(48px, 7vw, 120px)",
              fontWeight: 800,
              marginBottom: 24,
            }}
          >
            {t("heroHeadingLine1")}
            <br />
            <span style={{ color: "var(--accent)" }}>{t("heroHeadingAccent")}</span>
          </h1>
          <p
            style={{
              color: "var(--ink-2)",
              fontSize: 20,
              lineHeight: 1.55,
              maxWidth: 640,
            }}
          >
            {t("heroLead")}
          </p>
        </div>
      </section>

      {/* Kapitel 1 */}
      <section style={{ borderBottom: "1px solid var(--line-2)", background: "var(--bg-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div
            className="l-grid-sh"
            style={{
              alignItems: "start",
            }}
          >
            <div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 16 }}>
                {t("chapter1Label")}
              </div>
              <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 700, marginBottom: 32 }}>
                {t("chapter1Heading")}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 24, color: "var(--ink-2)", fontSize: 17, lineHeight: 1.65 }}>
                <p>
                  {t("chapter1P1")}
                </p>
                <p>
                  {t("chapter1P2")}
                </p>
              </div>
            </div>
            <div style={{ border: "1px solid var(--line-2)", padding: 36, background: "var(--bg-3)" }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 20 }}>
                {t("quoteLabel")}
              </div>
              <p className="display" style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.02em" }}>
                {t("quoteText")}
              </p>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.1em", marginTop: 20 }}>
                {t("quoteAttribution")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zwei Fragen */}
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 16 }}>
              {t("sparkLabel")}
            </div>
            <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700 }}>
              {t("sparkHeading")}
            </h2>
          </div>
          <div className="l-grid-half" style={{ gap: 24, maxWidth: 900, margin: "0 auto" }}>
            <div style={{ border: "1px solid var(--line-2)", padding: 36, background: "var(--bg-2)" }}>
              <p style={{ fontSize: 18, color: "var(--ink)", fontWeight: 500, lineHeight: 1.45 }}>
                {t("sparkQuestion1")}
              </p>
            </div>
            <div style={{ border: "1px solid var(--line-2)", padding: 36, background: "var(--bg-2)" }}>
              <p style={{ fontSize: 18, color: "var(--ink)", fontWeight: 500, lineHeight: 1.45 }}>
                {t("sparkQuestion2")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kapitel 2 — Vertrauen */}
      <section style={{ borderBottom: "1px solid var(--line-2)", background: "var(--bg-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 16 }}>
            {t("chapter2Label")}
          </div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 700, marginBottom: 48 }}>
            {t("chapter2Heading")}
          </h2>

          <div className="l-grid-half" style={{ gap: 24 }}>
            <div style={{ border: "1px solid var(--line-2)", padding: 36, background: "var(--bg)" }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 16 }}>
                {t("neighborsLabel")}
              </div>
              <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55 }}>
                {t("neighborsText")}
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                {[founders[1], founders[0]].map((f) => (
                  <div
                    key={f.code}
                    style={{
                      width: 80,
                      height: 80,
                      overflow: "hidden",
                      border: "1px solid var(--line-2)",
                    }}
                  >
                    <img
                      src={f.image}
                      alt={f.name}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)" }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ border: "1px solid var(--line-2)", padding: 36, background: "var(--bg)" }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 16 }}>
                {t("techPartnersLabel")}
              </div>
              <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55 }}>
                {t("techPartnersText")}
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                {[founders[2], founders[3]].map((f) => (
                  <div
                    key={f.code}
                    style={{
                      width: 80,
                      height: 80,
                      overflow: "hidden",
                      border: "1px solid var(--line-2)",
                    }}
                  >
                    <img
                      src={f.image}
                      alt={f.name}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kapitel 3 — Kanzlei der Zukunft */}
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 16 }}>
            {t("chapter3Label")}
          </div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 700, marginBottom: 32 }}>
            {t("chapter3Heading")}
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 18, lineHeight: 1.55, maxWidth: 720, marginBottom: 48 }}>
            {t("chapter3Lead")}
          </p>

          <div className="l-grid-4 l-team-cards" style={{ gap: 0, border: "1px solid var(--line-2)" }}>
            {founders.map((f, i) => (
              <div key={f.code} style={{ padding: 24, borderRight: i < 3 ? "1px solid var(--line-2)" : "none", background: "var(--bg-2)", textAlign: "center" }}>
                <div style={{ width: 120, height: 120, overflow: "hidden", margin: "0 auto 16px", border: "1px solid var(--line-2)" }}>
                  <img src={f.image} alt={f.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)" }} />
                </div>
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--accent)", marginBottom: 8 }}>#{f.tag}</div>
                <div className="display" style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{f.name}</div>
                <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.1em" }}>{f.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px", textAlign: "center" }}>
          <h2 className="display" style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 700, marginBottom: 16 }}>
            {t("ctaHeadingPart1")}{" "}
            <span style={{ color: "var(--accent)" }}>{t("ctaHeadingAccent")}</span>
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 18, marginBottom: 36 }}>
            {t("ctaBody")}
          </p>
          <Link href="/kontakt" className="l-btn l-btn-primary">
            {t("ctaButton")}
            <ArrowSvg />
          </Link>
        </div>
      </section>
    </SubpageShell>
  );
}

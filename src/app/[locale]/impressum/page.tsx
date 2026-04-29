import SubpageShell from "@/components/landing/SubpageShell";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Impressum");
  return {
    title: t("metaTitle"),
  };
}

export default async function ImpressumPage() {
  const t = await getTranslations("Impressum");
  return (
    <SubpageShell>
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>{t("label")}</div>
          <h1 className="display" style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 700, marginBottom: 48 }}>
            {t("heading")}
          </h1>

          <div style={{ maxWidth: 720, display: "flex", flexDirection: "column", gap: 40 }}>
            <Block title={t("section1Title")}>
              <p style={{ whiteSpace: "pre-line" }}>{t("section1P1")}</p>
            </Block>

            <Block title={t("section2Title")}>
              <p>{t("section2P1")}</p>
            </Block>

            <Block title={t("section3Title")}>
              <p>E-Mail: <a href="mailto:info@clever.legal" style={{ color: "var(--accent)" }}>info@clever.legal</a></p>
            </Block>

            <Block title={t("section4Title")}>
              <p style={{ whiteSpace: "pre-line" }}>{t("section4P1")}</p>
            </Block>

            <Block title={t("section5Title")}>
              <p>{t("section5P1")}</p>
              <p style={{ marginTop: 8 }}>{t("section5P2")}</p>
              <p style={{ marginTop: 8 }}>{t("section5P3")}</p>
              <ul style={{ listStyle: "none", marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  t("section5Bullet1"),
                  t("section5Bullet2"),
                  t("section5Bullet3"),
                  t("section5Bullet4"),
                  t("section5Bullet5"),
                ].map((r) => (
                  <li key={r} style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                    <span className="mono" style={{ color: "var(--accent)", fontSize: 12 }}>›</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block title={t("section6Title")}>
              <p>
                {t("section6P1").replace("https://ec.europa.eu/consumers/odr/", "")}{" "}
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p style={{ marginTop: 8 }}>
                {t("section6P2")}
              </p>
            </Block>

            <Block title={t("section7Title")}>
              <p>
                {t("section7P1")}
              </p>
            </Block>

            <Block title={t("section8Title")}>
              <p>
                {t("section8P1")}
              </p>
            </Block>

            <Block title={t("section9Title")}>
              <p>
                {t("section9P1")}
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

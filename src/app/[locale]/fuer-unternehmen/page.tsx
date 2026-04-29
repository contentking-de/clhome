import SubpageShell from "@/components/landing/SubpageShell";
import { Link } from "@/i18n/routing";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowSvg } from "@/components/landing/Icons";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("FuerUnternehmen");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function FuerUnternehmenPage() {
  const t = await getTranslations("FuerUnternehmen");

  const benefits = [
    {
      title: t("benefit1Title"),
      metric: t("benefit1Metric"),
      metricLabel: t("benefit1MetricLabel"),
      description: t("benefit1Desc"),
    },
    {
      title: t("benefit2Title"),
      metric: t("benefit2Metric"),
      metricLabel: t("benefit2MetricLabel"),
      description: t("benefit2Desc"),
    },
    {
      title: t("benefit3Title"),
      metric: t("benefit3Metric"),
      metricLabel: t("benefit3MetricLabel"),
      description: t("benefit3Desc"),
    },
  ];

  const features = [
    {
      tag: t("feature1Tag"),
      title: t("feature1Title"),
      description: t("feature1Desc"),
    },
    {
      tag: t("feature2Tag"),
      title: t("feature2Title"),
      description: t("feature2Desc"),
    },
    {
      tag: t("feature3Tag"),
      title: t("feature3Title"),
      description: t("feature3Desc"),
    },
    {
      tag: t("feature4Tag"),
      title: t("feature4Title"),
      description: t("feature4Desc"),
    },
  ];

  return (
    <SubpageShell>
      {/* Hero */}
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px 64px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>{t("heroLabel")}</div>
          <h1 className="display" style={{ fontSize: "clamp(48px, 6vw, 100px)", fontWeight: 800, marginBottom: 24 }}>
            {t("heroHeadingPart1")}{" "}
            <span style={{ color: "var(--accent)" }}>{t("heroHeadingAccent")}</span>
          </h1>
          <p style={{ color: "var(--ink-2)", fontSize: 20, lineHeight: 1.55, maxWidth: 700, marginBottom: 36 }}>
            {t("heroLead")}
          </p>
          <Link href="/kontakt" className="l-btn l-btn-primary">
            {t("heroCta")}
            <ArrowSvg />
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ borderBottom: "1px solid var(--line-2)", background: "var(--bg-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>{t("benefitsLabel")}</div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 700, marginBottom: 48 }}>
            {t("benefitsHeading")}
          </h2>
          <div className="l-grid-3 l-sat-cards" style={{ gap: 0, border: "1px solid var(--line-2)" }}>
            {benefits.map((b, i) => (
              <div key={b.title} style={{ padding: 36, borderRight: i < 2 ? "1px solid var(--line-2)" : "none" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 20 }}>
                  <span className="display" style={{ fontSize: 48, fontWeight: 800, color: "var(--accent)" }}>{b.metric}</span>
                  <span className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-3)" }}>{b.metricLabel}</span>
                </div>
                <h3 className="display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>{b.title}</h3>
                <p style={{ color: "var(--ink-2)", fontSize: 14, lineHeight: 1.55 }}>{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>{t("featuresLabel")}</div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 700, marginBottom: 16 }}>
            {t("featuresHeading")}
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 18, maxWidth: 600, marginBottom: 48 }}>
            {t("featuresLead")}
          </p>
          <div className="l-grid-half l-modules" style={{ gap: 0, border: "1px solid var(--line-2)" }}>
            {features.map((f, i) => (
              <div
                key={f.tag}
                style={{
                  padding: 36,
                  borderRight: i % 2 === 0 ? "1px solid var(--line-2)" : "none",
                  borderBottom: i < 2 ? "1px solid var(--line-2)" : "none",
                  background: i === 0 ? "var(--bg-3)" : "transparent",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span className="display" style={{ fontSize: 36, fontWeight: 800, color: i === 0 ? "var(--accent)" : "var(--ink-3)" }}>{f.tag}</span>
                </div>
                <h3 className="display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>{f.title}</h3>
                <p style={{ color: "var(--ink-2)", fontSize: 14, lineHeight: 1.55 }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px", textAlign: "center" }}>
          <h2 className="display" style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 700, marginBottom: 16 }}>
            {t("ctaHeading")}
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 18, maxWidth: 600, margin: "0 auto 36px" }}>
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

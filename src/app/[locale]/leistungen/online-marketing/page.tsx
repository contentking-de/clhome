import SubpageShell from "@/components/landing/SubpageShell";
import { Link } from "@/i18n/routing";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowSvg, IconMegaphone, IconTrend, IconTarget, IconCode } from "@/components/landing/Icons";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("OnlineMarketing");
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/leistungen/online-marketing",
    locale,
  });
}

export default async function OnlineMarketingPage() {
  const t = await getTranslations("OnlineMarketing");

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

  const modules = [
    {
      Icon: IconTrend,
      tag: t("module1Tag"),
      title: t("module1Title"),
      description: t("module1Desc"),
    },
    {
      Icon: IconTarget,
      tag: t("module2Tag"),
      title: t("module2Title"),
      description: t("module2Desc"),
    },
    {
      Icon: IconMegaphone,
      tag: t("module3Tag"),
      title: t("module3Title"),
      description: t("module3Desc"),
    },
    {
      Icon: IconCode,
      tag: t("module4Tag"),
      title: t("module4Title"),
      description: t("module4Desc"),
    },
  ];

  return (
    <SubpageShell>
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px 64px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>{t("heroLabel")}</div>
          <h1 className="display" style={{ fontSize: "clamp(48px, 6vw, 100px)", fontWeight: 800, marginBottom: 24 }}>
            {t("heroHeadingPart1")}
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

      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>{t("channelsLabel")}</div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 700, marginBottom: 16 }}>
            {t("channelsHeading")}
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 18, maxWidth: 600, marginBottom: 48 }}>
            {t("channelsLead")}
          </p>
          <div className="l-grid-half l-modules" style={{ gap: 0, border: "1px solid var(--line-2)" }}>
            {modules.map((mod, i) => (
              <div
                key={mod.tag}
                style={{
                  padding: 36,
                  borderRight: i % 2 === 0 ? "1px solid var(--line-2)" : "none",
                  borderBottom: i < 2 ? "1px solid var(--line-2)" : "none",
                  background: i === 0 ? "var(--bg-3)" : "transparent",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <mod.Icon size={20} style={{ color: i === 0 ? "var(--accent)" : "var(--ink-3)" }} />
                  <span className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-3)" }}>#{mod.tag}</span>
                </div>
                <h3 className="display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>{mod.title}</h3>
                <p style={{ color: "var(--ink-2)", fontSize: 14, lineHeight: 1.55 }}>{mod.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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

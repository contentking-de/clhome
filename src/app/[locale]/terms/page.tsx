import SubpageShell from "@/components/landing/SubpageShell";
import SetAlternateUrl from "@/components/blog/SetAlternateUrl";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/metadata";
import { redirect } from "next/navigation";
import { ContentEN, Block, P, Bullets, Hint, AGBFooter } from "../agb/content";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  if (locale === "de") return {};
  const t = await getTranslations("AGB");
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/terms",
    locale,
  });
}

export default async function TermsPage() {
  const locale = await getLocale();
  if (locale === "de") redirect("/agb");

  const t = await getTranslations("AGB");
  return (
    <SubpageShell>
      <SetAlternateUrl locale="de" path="/agb" />
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>{t("label")}</div>
          <h1 className="display" style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 700, marginBottom: 12 }}>
            {t("heading")}
          </h1>
          <p className="mono" style={{ fontSize: 12, color: "var(--ink-3)", letterSpacing: "0.1em", marginBottom: 48 }}>
            {t("lastUpdated")}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            <ContentEN />
          </div>
        </div>
      </section>
    </SubpageShell>
  );
}

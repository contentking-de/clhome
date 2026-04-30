import SubpageShell from "@/components/landing/SubpageShell";
import ContactForm from "@/components/landing/ContactForm";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("Kontakt");
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/kontakt",
    locale,
  });
}

export default async function KontaktPage() {
  const t = await getTranslations("Kontakt");
  return (
    <SubpageShell>
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div className="l-grid-sh" style={{ paddingBottom: 48 }}>
            <div>
              <div className="l-label" style={{ marginBottom: 18 }}>{t("label")}</div>
              <div className="l-chip"><span className="dot" />{t("chip")}</div>
            </div>
            <h1 className="display" style={{ fontSize: "clamp(44px, 5.5vw, 88px)", fontWeight: 700 }}>
              {t("headingLine1")}<br /><span style={{ color: "var(--accent)" }}>{t("headingAccent")}</span>
            </h1>
          </div>

          <div className="l-grid-contact" style={{ gap: 0, border: "1px solid var(--line-2)", background: "var(--bg)" }}>
            <div className="l-split-border" style={{ padding: 48, borderRight: "1px solid var(--line-2)" }}>
              <ContactForm />
            </div>
            <div style={{ padding: 48, display: "flex", flexDirection: "column", gap: 32, background: "color-mix(in oklab, var(--accent), var(--bg) 96%)" }}>
              <div>
                <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-3)", marginBottom: 10 }}>{t("labelBase")}</div>
                <div style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink)" }}>
                  <div style={{ fontWeight: 600 }}>{t("companyName")}</div>
                  {t("addressLine1")}<br />{t("addressLine2")}
                </div>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-3)", marginBottom: 10 }}>{t("labelKanal")}</div>
                <a href="mailto:info@clever.legal" className="mono" style={{ fontSize: 14, color: "var(--accent)", display: "block" }}>info@clever.legal</a>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-3)", marginBottom: 10 }}>{t("labelGf")}</div>
                <div style={{ fontSize: 15, color: "var(--ink)" }}>{t("gfName")}</div>
              </div>
              <div className="mono" style={{ marginTop: "auto", paddingTop: 24, borderTop: "1px dashed var(--line-2)" }}>
                <div style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.1em", lineHeight: 1.7 }}>
                  {t("slaResponse")} &nbsp; {t("slaResponseValue")}<br />
                  {t("signalCheck")} &nbsp; {t("signalCheckValue")}<br />
                  {t("ndaOptional")} &nbsp; {t("ndaOptionalValue")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SubpageShell>
  );
}

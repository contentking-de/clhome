import SubpageShell from "@/components/landing/SubpageShell";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("LegalAlertsPage");
  return { title: `${t("confirmSuccessTitle")} | clever.legal` };
}

interface Props {
  searchParams: Promise<{ status?: string }>;
}

export default async function AlertConfirmPage({ searchParams }: Props) {
  const { status } = await searchParams;
  const t = await getTranslations("LegalAlertsPage");

  const messageMap: Record<string, { title: string; text: string }> = {
    success: { title: t("confirmSuccessTitle"), text: t("confirmSuccessText") },
    already: { title: t("confirmAlreadyTitle"), text: t("confirmAlreadyText") },
    invalid: { title: t("confirmInvalidTitle"), text: t("confirmInvalidText") },
    missing: { title: t("confirmMissingTitle"), text: t("confirmMissingText") },
  };

  const msg = messageMap[status || ""] || messageMap.invalid;
  const isSuccess = status === "success" || status === "already";

  return (
    <SubpageShell>
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "160px 32px", textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: isSuccess ? "var(--accent)" : "var(--danger)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: 24,
              color: isSuccess ? "var(--accent-ink)" : "#fff",
              fontWeight: 700,
            }}
          >
            {isSuccess ? "✓" : "!"}
          </div>
          <h1 className="display" style={{ fontSize: 36, fontWeight: 800, marginBottom: 16 }}>
            {msg.title}
          </h1>
          <p style={{ color: "var(--ink-2)", fontSize: 16, lineHeight: 1.6, marginBottom: 36 }}>
            {msg.text}
          </p>
          <Link href="/legal-alerts" className="l-btn l-btn-primary">
            {t("confirmCta")}
          </Link>
        </div>
      </section>
    </SubpageShell>
  );
}

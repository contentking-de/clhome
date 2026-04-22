import SubpageShell from "@/components/landing/SubpageShell";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alert bestätigt | clever.legal",
};

const MESSAGES: Record<string, { title: string; text: string }> = {
  success: {
    title: "Bestätigt!",
    text: "Ihre E-Mail-Adresse wurde erfolgreich bestätigt. Sie erhalten ab sofort unsere Legal Alerts.",
  },
  already: {
    title: "Bereits bestätigt",
    text: "Ihre E-Mail-Adresse wurde bereits bestätigt. Sie erhalten unsere Legal Alerts.",
  },
  invalid: {
    title: "Ungültiger Link",
    text: "Der Bestätigungslink ist ungültig oder abgelaufen.",
  },
  missing: {
    title: "Fehler",
    text: "Es fehlt ein Bestätigungstoken. Bitte verwenden Sie den Link aus der E-Mail.",
  },
};

interface Props {
  searchParams: Promise<{ status?: string }>;
}

export default async function AlertConfirmPage({ searchParams }: Props) {
  const { status } = await searchParams;
  const msg = MESSAGES[status || ""] || MESSAGES.invalid;
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
            Zu den Legal Alerts
          </Link>
        </div>
      </section>
    </SubpageShell>
  );
}

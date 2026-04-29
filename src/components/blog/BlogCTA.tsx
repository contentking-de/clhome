import { Link } from "@/i18n/routing";
import { ArrowSvg } from "../landing/Icons";

interface BlogCTAProps {
  variant?: "inline" | "end";
}

export default function BlogCTA({ variant = "inline" }: BlogCTAProps) {
  if (variant === "end") {
    return (
      <div
        style={{
          marginTop: 64,
          marginBottom: 32,
          padding: 48,
          background: "var(--bg-2)",
          border: "1px solid var(--line-2)",
          textAlign: "center",
        }}
      >
        <h3
          className="display"
          style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}
        >
          Schluss mit{" "}
          <span style={{ color: "var(--accent)" }}>#FOMO</span> – lassen Sie
          uns sprechen
        </h3>
        <p
          style={{
            color: "var(--ink-2)",
            maxWidth: 520,
            margin: "0 auto 32px",
            fontSize: 15,
            lineHeight: 1.55,
          }}
        >
          Sie haben bis hierher gelesen – das zeigt echtes Interesse an der
          Zukunft Ihrer Kanzlei. Lassen Sie uns herausfinden, wie clever.legal
          Ihnen konkret weiterhilft.
        </p>
        <Link href="/kontakt" className="l-btn l-btn-primary">
          Strategie-Gespräch vereinbaren
          <ArrowSvg />
        </Link>
        <p
          className="mono"
          style={{
            color: "var(--ink-3)",
            fontSize: 11,
            marginTop: 16,
            letterSpacing: "0.1em",
          }}
        >
          Exklusiv: Nur ein Partner pro Rechtsgebiet und Region.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        margin: "48px 0",
        padding: "24px 32px",
        border: "1px solid var(--line-2)",
        background:
          "color-mix(in oklab, var(--accent), var(--bg) 96%)",
        textAlign: "center",
      }}
    >
      <p
        className="display"
        style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}
      >
        Schluss mit <span style={{ color: "var(--accent)" }}>#FOMO</span> –
        lassen Sie uns sprechen
      </p>
      <p
        style={{
          color: "var(--ink-2)",
          fontSize: 14,
          marginBottom: 20,
          maxWidth: 480,
          margin: "0 auto 20px",
        }}
      >
        Erfahren Sie in einem persönlichen Gespräch, wie Ihre Kanzlei von
        KI-Infrastruktur profitieren kann.
      </p>
      <Link
        href="/kontakt"
        className="l-btn l-btn-primary"
        style={{ fontSize: 13, padding: "10px 18px" }}
      >
        Jetzt Kontakt aufnehmen
        <ArrowSvg />
      </Link>
    </div>
  );
}

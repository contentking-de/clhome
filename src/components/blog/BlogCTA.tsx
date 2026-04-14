import Link from "next/link";
import Icon from "../ui/Icon";

interface BlogCTAProps {
  variant?: "inline" | "end";
}

export default function BlogCTA({ variant = "inline" }: BlogCTAProps) {
  if (variant === "end") {
    return (
      <div className="mt-16 mb-8 rounded-2xl bg-gradient-to-br from-on-background to-inverse-surface p-10 text-center">
        <h3 className="font-headline text-2xl md:text-3xl font-extrabold text-white mb-3">
          Schluss mit <span className="text-primary-fixed-dim">#FOMO</span> –
          lassen Sie uns sprechen
        </h3>
        <p className="text-white/70 max-w-xl mx-auto mb-8">
          Sie haben bis hierher gelesen – das zeigt echtes Interesse an der
          Zukunft Ihrer Kanzlei. Lassen Sie uns herausfinden, wie clever.legal
          Ihnen konkret weiterhilft.
        </p>
        <Link
          href="/kontakt"
          className="inline-flex items-center gap-2 bg-white text-on-background px-8 py-4 rounded-xl font-bold hover:bg-surface-container-highest transition-all"
        >
          Strategie-Gespräch vereinbaren
          <Icon name="arrow_forward" />
        </Link>
        <p className="text-white/50 text-sm mt-4">
          Exklusiv: Nur ein Partner pro Rechtsgebiet und Region.
        </p>
      </div>
    );
  }

  return (
    <div className="my-12 rounded-xl border border-surface-tint/20 bg-gradient-to-r from-surface-tint/5 to-surface-tint/10 p-6 md:p-8 text-center">
      <p className="font-headline text-lg md:text-xl font-bold text-on-background mb-2">
        Schluss mit <span className="text-surface-tint">#FOMO</span> – lassen
        Sie uns sprechen
      </p>
      <p className="text-secondary text-sm mb-5 max-w-md mx-auto">
        Erfahren Sie in einem persönlichen Gespräch, wie Ihre Kanzlei von
        KI-Infrastruktur profitieren kann.
      </p>
      <Link
        href="/kontakt"
        className="inline-flex items-center gap-2 bg-surface-tint text-white px-6 py-3 rounded-lg font-semibold hover:brightness-110 transition-all text-sm"
      >
        Jetzt Kontakt aufnehmen
        <Icon name="arrow_forward" className="text-lg" />
      </Link>
    </div>
  );
}

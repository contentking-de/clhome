"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "../ui/Icon";

export default function TranslateLegalAlertsButton({
  editionId,
  hasEnglish,
  hasItemTranslations,
}: {
  editionId: string;
  hasEnglish: boolean;
  hasItemTranslations: boolean;
}) {
  const router = useRouter();
  const [translating, setTranslating] = useState(false);

  const fullyTranslated = hasEnglish && hasItemTranslations;

  if (fullyTranslated) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-lg text-sm font-medium">
        <Icon name="check_circle" className="text-base" />
        EN vorhanden
      </span>
    );
  }

  const label = hasEnglish && !hasItemTranslations
    ? "Items übersetzen"
    : "Ins Englische übersetzen";

  const confirmMsg = hasEnglish && !hasItemTranslations
    ? "Einzelmeldungen ins Englische übersetzen? Dies kann einige Minuten dauern."
    : "Alle Reports und Meldungen dieser Ausgabe ins Englische übersetzen? Dies kann einige Minuten dauern.";

  async function handleTranslate() {
    if (!confirm(confirmMsg)) return;

    setTranslating(true);
    try {
      const res = await fetch("/api/admin/legal-alerts/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ editionId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Übersetzung fehlgeschlagen");
      }

      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Fehler bei der Übersetzung");
    } finally {
      setTranslating(false);
    }
  }

  return (
    <div className="inline-flex items-center gap-2">
      {hasEnglish && (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 rounded text-xs font-medium">
          Reports EN ✓
        </span>
      )}
      <button
        onClick={handleTranslate}
        disabled={translating}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30 transition-colors disabled:opacity-50"
      >
        {translating ? (
          <>
            <Icon name="progress_activity" className="text-base animate-spin" />
            Wird übersetzt…
          </>
        ) : (
          <>
            <Icon name="translate" className="text-base" />
            {label}
          </>
        )}
      </button>
    </div>
  );
}

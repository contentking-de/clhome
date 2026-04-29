"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "../ui/Icon";

export default function TranslateButton({ postId }: { postId: string }) {
  const router = useRouter();
  const [translating, setTranslating] = useState(false);

  async function handleTranslate() {
    if (!confirm("Diesen Beitrag ins Englische übersetzen?")) return;

    setTranslating(true);
    try {
      const res = await fetch(`/api/posts/${postId}/translate`, {
        method: "POST",
      });

      if (!res.ok) {
        const data = await res.json();
        if (res.status === 409 && data.translationId) {
          router.push(`/admin/posts/${data.translationId}/edit`);
          return;
        }
        throw new Error(data.error || "Übersetzung fehlgeschlagen");
      }

      const data = await res.json();
      router.push(`/admin/posts/${data.id}/edit`);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Fehler bei der Übersetzung");
    } finally {
      setTranslating(false);
    }
  }

  return (
    <button
      onClick={handleTranslate}
      disabled={translating}
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold font-mono bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors disabled:opacity-50"
      title="Ins Englische übersetzen"
    >
      {translating ? (
        <Icon name="progress_activity" className="text-sm animate-spin" />
      ) : (
        <>
          <Icon name="translate" className="text-sm" />
          EN
        </>
      )}
    </button>
  );
}

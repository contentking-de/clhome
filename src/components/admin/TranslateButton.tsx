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
      className="p-2 rounded-lg text-secondary hover:text-surface-tint hover:bg-surface-tint/10 transition-colors disabled:opacity-50"
      title="Ins Englische übersetzen"
    >
      {translating ? (
        <Icon name="progress_activity" className="text-xl animate-spin" />
      ) : (
        <Icon name="translate" className="text-xl" />
      )}
    </button>
  );
}

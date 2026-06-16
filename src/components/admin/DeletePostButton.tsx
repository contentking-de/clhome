"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "../ui/Icon";

export default function DeletePostButton({
  postId,
  postTitle,
}: {
  postId: string;
  postTitle: string;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Beitrag "${postTitle}" wirklich löschen?`)) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Löschen fehlgeschlagen");
      }
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Fehler beim Löschen");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="p-2 rounded-lg text-secondary hover:text-error hover:bg-error-container/30 transition-colors disabled:opacity-50"
      title="Beitrag löschen"
    >
      {deleting ? (
        <Icon name="progress_activity" className="text-xl animate-spin" />
      ) : (
        <Icon name="delete" className="text-xl" />
      )}
    </button>
  );
}

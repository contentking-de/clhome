"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";

interface UserRef {
  id: string;
  name: string | null;
  email: string;
  avatar: string | null;
}

export default function TicketForm({ users }: { users: UserRef[] }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("BUG");
  const [priority, setPriority] = useState("MEDIUM");
  const [assigneeId, setAssigneeId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          type,
          priority,
          assigneeId: assigneeId || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ticket konnte nicht erstellt werden");
      }

      router.push("/admin/tickets");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface focus:outline-none focus:ring-2 focus:ring-surface-tint/50 text-on-background";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-500/10 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
          <Icon name="error" className="text-lg" />
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-on-background mb-1.5">
          Titel *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Kurze Beschreibung des Tickets"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-on-background mb-1.5">
          Beschreibung *
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={5}
          placeholder="Detaillierte Beschreibung..."
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-on-background mb-1.5">
            Typ
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={inputClass}
          >
            <option value="BUG">Bug</option>
            <option value="FEATURE">Feature</option>
            <option value="IDEA">Idee</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-on-background mb-1.5">
            Priorität
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={inputClass}
          >
            <option value="LOW">Niedrig</option>
            <option value="MEDIUM">Mittel</option>
            <option value="HIGH">Hoch</option>
            <option value="URGENT">Dringend</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-on-background mb-1.5">
            Zuständig
          </label>
          <select
            value={assigneeId}
            onChange={(e) => setAssigneeId(e.target.value)}
            className={inputClass}
          >
            <option value="">Nicht zugewiesen</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name || u.email}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="bg-surface-tint text-white px-6 py-3 rounded-lg font-semibold hover:brightness-110 transition-all disabled:opacity-50 inline-flex items-center gap-2"
        >
          {submitting ? (
            <>
              <Icon name="progress_activity" className="animate-spin" />
              Wird erstellt...
            </>
          ) : (
            "Ticket erstellen"
          )}
        </button>
        <a
          href="/admin/tickets"
          className="px-6 py-3 rounded-lg border border-outline-variant/30 font-semibold hover:bg-surface-container-low transition-all text-on-background"
        >
          Abbrechen
        </a>
      </div>
    </form>
  );
}

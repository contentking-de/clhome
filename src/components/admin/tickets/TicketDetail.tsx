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

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: UserRef;
}

interface TicketData {
  id: string;
  title: string;
  description: string;
  type: "BUG" | "FEATURE" | "IDEA";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  createdAt: string;
  updatedAt: string;
  reporter: UserRef | null;
  assignee: UserRef | null;
  comments: Comment[];
}

const typeBadge: Record<string, string> = {
  BUG: "bg-red-500/10 text-red-600",
  FEATURE: "bg-blue-500/10 text-blue-600",
  IDEA: "bg-purple-500/10 text-purple-600",
};

const typeLabel: Record<string, string> = {
  BUG: "Bug",
  FEATURE: "Feature",
  IDEA: "Idee",
};

const statusBadge: Record<string, string> = {
  OPEN: "bg-blue-500/10 text-blue-600",
  IN_PROGRESS: "bg-yellow-500/10 text-yellow-700",
  RESOLVED: "bg-green-500/10 text-green-600",
  CLOSED: "bg-gray-500/10 text-gray-500",
};

const statusLabel: Record<string, string> = {
  OPEN: "Offen",
  IN_PROGRESS: "In Bearbeitung",
  RESOLVED: "Gelöst",
  CLOSED: "Geschlossen",
};

const priorityBadge: Record<string, string> = {
  LOW: "bg-green-500/10 text-green-600",
  MEDIUM: "bg-blue-500/10 text-blue-600",
  HIGH: "bg-orange-500/10 text-orange-600",
  URGENT: "bg-red-500/10 text-red-600",
};

const priorityLabel: Record<string, string> = {
  LOW: "Niedrig",
  MEDIUM: "Mittel",
  HIGH: "Hoch",
  URGENT: "Dringend",
};

export default function TicketDetail({
  ticket: initialTicket,
  users,
}: {
  ticket: TicketData;
  users: UserRef[];
}) {
  const router = useRouter();
  const [ticket, setTicket] = useState(initialTicket);
  const [comments, setComments] = useState(initialTicket.comments);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [updatingAssignee, setUpdatingAssignee] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleStatusChange(newStatus: string) {
    setUpdatingStatus(true);
    try {
      const res = await fetch(`/api/tickets/${ticket.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setTicket((prev) => ({ ...prev, status: updated.status }));
      }
    } finally {
      setUpdatingStatus(false);
    }
  }

  async function handleAssigneeChange(newAssigneeId: string) {
    setUpdatingAssignee(true);
    try {
      const res = await fetch(`/api/tickets/${ticket.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assigneeId: newAssigneeId || null }),
      });
      if (res.ok) {
        const updated = await res.json();
        setTicket((prev) => ({
          ...prev,
          assigneeId: updated.assigneeId,
          assignee: updated.assignee,
        }));
      }
    } finally {
      setUpdatingAssignee(false);
    }
  }

  async function handleAddComment(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSubmittingComment(true);
    try {
      const res = await fetch(`/api/tickets/${ticket.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment }),
      });
      if (res.ok) {
        const comment = await res.json();
        setComments((prev) => [...prev, comment]);
        setNewComment("");
      }
    } finally {
      setSubmittingComment(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Ticket wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/tickets/${ticket.id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/tickets");
      }
    } finally {
      setDeleting(false);
    }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <a
          href="/admin/tickets"
          className="p-2 rounded-lg text-secondary hover:text-on-background hover:bg-surface-container-highest transition-colors"
        >
          <Icon name="arrow_back" className="text-lg" />
        </a>
        <h1 className="text-2xl font-bold text-on-background flex-1 min-w-0 truncate">
          {ticket.title}
        </h1>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="p-2 rounded-lg text-secondary hover:text-red-600 hover:bg-red-500/10 transition-colors disabled:opacity-50"
          title="Ticket löschen"
        >
          <Icon name="delete" className="text-lg" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 p-6">
            <h2 className="text-sm font-medium text-secondary mb-3">Beschreibung</h2>
            <p className="text-on-background whitespace-pre-wrap">{ticket.description}</p>
          </div>

          <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 p-6">
            <h2 className="text-sm font-medium text-secondary mb-4">
              Kommentare ({comments.length})
            </h2>

            {comments.length === 0 ? (
              <p className="text-secondary text-sm py-4 text-center">
                Noch keine Kommentare.
              </p>
            ) : (
              <div className="space-y-4 mb-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-tint/10 flex items-center justify-center shrink-0 overflow-hidden">
                      {comment.author.avatar ? (
                        <img
                          src={comment.author.avatar}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Icon name="person" className="text-xs text-surface-tint" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-on-background">
                          {comment.author.name || comment.author.email}
                        </span>
                        <span className="text-xs text-secondary">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-on-background/80 whitespace-pre-wrap bg-surface-container-highest/50 rounded-lg p-3">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleAddComment} className="flex gap-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Kommentar schreiben..."
                rows={2}
                className="flex-1 px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface focus:outline-none focus:ring-2 focus:ring-surface-tint/50 text-on-background text-sm resize-none"
              />
              <button
                type="submit"
                disabled={submittingComment || !newComment.trim()}
                className="self-end px-4 py-3 bg-surface-tint text-white rounded-lg text-sm font-medium hover:brightness-110 transition-all disabled:opacity-50"
              >
                {submittingComment ? (
                  <Icon name="progress_activity" className="animate-spin" />
                ) : (
                  "Senden"
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 p-5 space-y-4">
            <div>
              <label className="block text-xs font-medium text-secondary mb-1.5">Typ</label>
              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${typeBadge[ticket.type]}`}>
                {typeLabel[ticket.type]}
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-secondary mb-1.5">Status</label>
              <select
                value={ticket.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                disabled={updatingStatus}
                className="w-full px-3 py-2 rounded-lg border border-outline-variant/30 bg-surface text-sm text-on-background focus:outline-none focus:ring-2 focus:ring-surface-tint/50 disabled:opacity-50"
              >
                <option value="OPEN">Offen</option>
                <option value="IN_PROGRESS">In Bearbeitung</option>
                <option value="RESOLVED">Gelöst</option>
                <option value="CLOSED">Geschlossen</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-secondary mb-1.5">Priorität</label>
              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${priorityBadge[ticket.priority]}`}>
                {priorityLabel[ticket.priority]}
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-secondary mb-1.5">Zuständig</label>
              <select
                value={ticket.assignee?.id || ""}
                onChange={(e) => handleAssigneeChange(e.target.value)}
                disabled={updatingAssignee}
                className="w-full px-3 py-2 rounded-lg border border-outline-variant/30 bg-surface text-sm text-on-background focus:outline-none focus:ring-2 focus:ring-surface-tint/50 disabled:opacity-50"
              >
                <option value="">Nicht zugewiesen</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name || u.email}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-secondary mb-1.5">Erstellt von</label>
              {ticket.reporter ? (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-surface-tint/10 flex items-center justify-center overflow-hidden shrink-0">
                    {ticket.reporter.avatar ? (
                      <img
                        src={ticket.reporter.avatar}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Icon name="person" className="text-xs text-surface-tint" />
                    )}
                  </div>
                  <span className="text-sm text-on-background">
                    {ticket.reporter.name || ticket.reporter.email}
                  </span>
                </div>
              ) : (
                <span className="text-sm text-secondary">Unbekannt</span>
              )}
            </div>

            <div className="pt-3 border-t border-outline-variant/10 space-y-2 text-xs text-secondary">
              <div className="flex justify-between">
                <span>Erstellt</span>
                <span>{formatDate(ticket.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span>Aktualisiert</span>
                <span>{formatDate(ticket.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

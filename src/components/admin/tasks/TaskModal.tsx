"use client";

import { useState, useEffect } from "react";
import Icon from "@/components/ui/Icon";

type User = {
  id: string;
  name: string | null;
  email: string;
  avatar: string | null;
};

type Comment = {
  id: string;
  content: string;
  createdAt: string;
  author: User;
};

type Task = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: string | null;
  assignees: User[];
};

interface Props {
  task: Task | null;
  users: User[];
  onSave: (data: {
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: string;
    assigneeIds: string[];
  }) => void;
  onDelete?: () => void;
  onClose: () => void;
}

export default function TaskModal({ task, users, onSave, onDelete, onClose }: Props) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "BACKLOG");
  const [priority, setPriority] = useState(task?.priority || "MEDIUM");
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : ""
  );
  const [assigneeIds, setAssigneeIds] = useState<string[]>(
    task?.assignees.map((a) => a.id) || []
  );
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (task?.id) {
      fetch(`/api/tasks/${task.id}/comments`)
        .then((r) => r.json())
        .then(setComments)
        .catch(() => {});
    }
  }, [task?.id]);

  function toggleAssignee(userId: string) {
    setAssigneeIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    await onSave({ title, description, status, priority, dueDate, assigneeIds });
    setSaving(false);
  }

  async function postComment() {
    if (!newComment.trim() || !task?.id) return;
    const res = await fetch(`/api/tasks/${task.id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newComment }),
    });
    if (res.ok) {
      const comment = await res.json();
      setComments((prev) => [...prev, comment]);
      setNewComment("");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-outline-variant/10 bg-white rounded-t-2xl">
          <h2 className="text-lg font-semibold text-on-background">
            {task ? "Task bearbeiten" : "Neuer Task"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-surface-tint/10 text-secondary"
          >
            <Icon name="close" className="text-base" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-secondary mb-1">Titel</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-outline-variant/10 bg-surface-container-highest text-on-background text-sm focus:outline-none focus:ring-2 focus:ring-surface-tint/30"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-secondary mb-1">Beschreibung</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-outline-variant/10 bg-surface-container-highest text-on-background text-sm focus:outline-none focus:ring-2 focus:ring-surface-tint/30 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-secondary mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-outline-variant/10 bg-surface-container-highest text-on-background text-sm focus:outline-none focus:ring-2 focus:ring-surface-tint/30"
              >
                <option value="BACKLOG">Backlog</option>
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Arbeit</option>
                <option value="REVIEW">Review</option>
                <option value="DONE">Erledigt</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-secondary mb-1">Priorität</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-outline-variant/10 bg-surface-container-highest text-on-background text-sm focus:outline-none focus:ring-2 focus:ring-surface-tint/30"
              >
                <option value="LOW">Niedrig</option>
                <option value="MEDIUM">Mittel</option>
                <option value="HIGH">Hoch</option>
                <option value="URGENT">Dringend</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-secondary mb-1">Fälligkeitsdatum</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-outline-variant/10 bg-surface-container-highest text-on-background text-sm focus:outline-none focus:ring-2 focus:ring-surface-tint/30"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-secondary mb-1">Zugewiesen an</label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto p-2 rounded-lg border border-outline-variant/10 bg-surface-container-highest">
              {users.map((user) => (
                <label
                  key={user.id}
                  className="flex items-center gap-2 cursor-pointer text-sm text-on-background"
                >
                  <input
                    type="checkbox"
                    checked={assigneeIds.includes(user.id)}
                    onChange={() => toggleAssignee(user.id)}
                    className="rounded border-outline-variant/10 text-surface-tint focus:ring-surface-tint/30"
                  />
                  <span className="truncate">{user.name || user.email}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-surface-tint text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? "Speichert..." : task ? "Speichern" : "Erstellen"}
            </button>
            {onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="px-4 py-2 rounded-lg bg-red-500/10 text-red-600 text-sm font-medium hover:bg-red-500/20 transition-colors"
              >
                <Icon name="delete" className="text-sm" />
              </button>
            )}
          </div>
        </form>

        {task && (
          <div className="border-t border-outline-variant/10 p-4">
            <h3 className="text-sm font-semibold text-on-background mb-3">Kommentare</h3>

            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
              {comments.length === 0 && (
                <p className="text-xs text-secondary">Noch keine Kommentare.</p>
              )}
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-surface-tint/20 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-medium text-surface-tint">
                      {(comment.author.name || comment.author.email).charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-medium text-on-background">
                        {comment.author.name || comment.author.email}
                      </span>
                      <span className="text-[10px] text-secondary">
                        {new Date(comment.createdAt).toLocaleString("de-DE")}
                      </span>
                    </div>
                    <p className="text-xs text-secondary mt-0.5">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && postComment()}
                placeholder="Kommentar schreiben..."
                className="flex-1 px-3 py-1.5 rounded-lg border border-outline-variant/10 bg-surface-container-highest text-on-background text-sm focus:outline-none focus:ring-2 focus:ring-surface-tint/30"
              />
              <button
                type="button"
                onClick={postComment}
                className="px-3 py-1.5 rounded-lg bg-surface-tint text-white text-sm hover:opacity-90 transition-opacity"
              >
                <Icon name="arrow_forward" className="text-sm" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

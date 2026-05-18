"use client";

import { useState, useMemo } from "react";
import Icon from "@/components/ui/Icon";

interface UserRef {
  id: string;
  name: string | null;
  email: string;
  avatar: string | null;
}

interface Ticket {
  id: string;
  title: string;
  description: string;
  type: "BUG" | "FEATURE" | "IDEA";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  reporterId: string | null;
  assigneeId: string | null;
  createdAt: string;
  updatedAt: string;
  reporter: UserRef | null;
  assignee: UserRef | null;
  _count: { comments: number };
}

const TYPE_FILTERS = [
  { key: "ALL", label: "Alle" },
  { key: "BUG", label: "Bugs" },
  { key: "FEATURE", label: "Features" },
  { key: "IDEA", label: "Ideen" },
] as const;

const STATUS_OPTIONS = [
  { key: "ALL", label: "Alle Status" },
  { key: "OPEN", label: "Offen" },
  { key: "IN_PROGRESS", label: "In Bearbeitung" },
  { key: "RESOLVED", label: "Gelöst" },
  { key: "CLOSED", label: "Geschlossen" },
] as const;

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

export default function TicketList({
  initialTickets,
  users,
}: {
  initialTickets: Ticket[];
  users: UserRef[];
}) {
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filtered = useMemo(() => {
    return initialTickets.filter((t) => {
      if (typeFilter !== "ALL" && t.type !== typeFilter) return false;
      if (statusFilter !== "ALL" && t.status !== statusFilter) return false;
      return true;
    });
  }, [initialTickets, typeFilter, statusFilter]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex gap-1 bg-surface-container-low rounded-lg p-1 border border-outline-variant/10">
          {TYPE_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setTypeFilter(f.key)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                typeFilter === f.key
                  ? "bg-surface-tint text-white"
                  : "text-secondary hover:text-on-background"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-outline-variant/10 bg-surface-container-low text-sm text-on-background focus:outline-none focus:ring-2 focus:ring-surface-tint/50"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </select>

        <span className="text-sm text-secondary ml-auto">
          {filtered.length} {filtered.length === 1 ? "Ticket" : "Tickets"}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-surface-container-low p-12 rounded-xl border border-outline-variant/10 text-center">
          <Icon name="confirmation_number" className="text-3xl text-secondary mb-3" />
          <p className="text-secondary">Keine Tickets gefunden.</p>
        </div>
      ) : (
        <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-outline-variant/10 text-left text-secondary">
                  <th className="px-4 py-3 font-medium">Titel</th>
                  <th className="px-4 py-3 font-medium">Typ</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Priorität</th>
                  <th className="px-4 py-3 font-medium">Zuständig</th>
                  <th className="px-4 py-3 font-medium text-center">
                    <Icon name="chat" className="text-xs" />
                  </th>
                  <th className="px-4 py-3 font-medium">Erstellt</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="border-b border-outline-variant/10 last:border-b-0 hover:bg-surface-container-highest/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <a
                        href={`/admin/tickets/${ticket.id}`}
                        className="font-medium text-on-background hover:text-surface-tint transition-colors"
                      >
                        {ticket.title}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${typeBadge[ticket.type]}`}>
                        {typeLabel[ticket.type]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge[ticket.status]}`}>
                        {statusLabel[ticket.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${priorityBadge[ticket.priority]}`}>
                        {priorityLabel[ticket.priority]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {ticket.assignee ? (
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-surface-tint/10 flex items-center justify-center overflow-hidden shrink-0">
                            {ticket.assignee.avatar ? (
                              <img
                                src={ticket.assignee.avatar}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Icon name="person" className="text-xs text-surface-tint" />
                            )}
                          </div>
                          <span className="text-on-background truncate max-w-[120px]">
                            {ticket.assignee.name || ticket.assignee.email}
                          </span>
                        </div>
                      ) : (
                        <span className="text-secondary">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center text-secondary">
                      {ticket._count.comments}
                    </td>
                    <td className="px-4 py-3 text-secondary whitespace-nowrap">
                      {new Date(ticket.createdAt).toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

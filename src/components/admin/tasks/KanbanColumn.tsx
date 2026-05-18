"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableTaskCard from "./SortableTaskCard";

type User = {
  id: string;
  name: string | null;
  email: string;
  avatar: string | null;
};

type Task = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  order: number;
  dueDate: string | null;
  creatorId: string | null;
  createdAt: string;
  updatedAt: string;
  assignees: User[];
  creator: User | null;
  _count: { comments: number };
};

const COLOR_MAP: Record<string, { bg: string; text: string; badge: string }> = {
  gray: { bg: "bg-gray-500/10", text: "text-gray-600", badge: "bg-gray-200 text-gray-700" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-600", badge: "bg-blue-100 text-blue-700" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-600", badge: "bg-amber-100 text-amber-700" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-600", badge: "bg-purple-100 text-purple-700" },
  green: { bg: "bg-green-500/10", text: "text-green-600", badge: "bg-green-100 text-green-700" },
};

interface Props {
  status: string;
  title: string;
  color: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export default function KanbanColumn({ status, title, color, tasks, onTaskClick }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const colors = COLOR_MAP[color] || COLOR_MAP.gray;

  return (
    <div
      ref={setNodeRef}
      className={`flex-shrink-0 w-72 rounded-xl p-3 transition-colors ${
        isOver ? "bg-surface-tint/10" : "bg-surface-container-low"
      }`}
    >
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-semibold ${colors.text}`}>{title}</span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.badge}`}>
            {tasks.length}
          </span>
        </div>
      </div>

      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2 min-h-[60px]">
          {tasks.map((task) => (
            <SortableTaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

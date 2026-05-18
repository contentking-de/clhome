"use client";

import Icon from "@/components/ui/Icon";

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

const PRIORITY_COLORS: Record<string, string> = {
  LOW: "bg-green-100 text-green-700",
  MEDIUM: "bg-blue-100 text-blue-700",
  HIGH: "bg-orange-100 text-orange-700",
  URGENT: "bg-red-100 text-red-700",
};

const PRIORITY_LABELS: Record<string, string> = {
  LOW: "Niedrig",
  MEDIUM: "Mittel",
  HIGH: "Hoch",
  URGENT: "Dringend",
};

interface Props {
  task: Task;
  onClick?: () => void;
  isOverlay?: boolean;
}

export default function TaskCard({ task, onClick, isOverlay }: Props) {
  return (
    <div
      onClick={onClick}
      className={`rounded-lg border border-outline-variant/10 bg-surface-container-highest/50 p-3 cursor-pointer hover:shadow-md transition-shadow ${
        isOverlay ? "shadow-xl rotate-2" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-sm font-medium text-on-background leading-snug line-clamp-2">
          {task.title}
        </h3>
        <span
          className={`shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded ${PRIORITY_COLORS[task.priority]}`}
        >
          {PRIORITY_LABELS[task.priority]}
        </span>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2 text-xs text-secondary">
          {task.dueDate && (
            <span className="flex items-center gap-0.5">
              <Icon name="calendar_today" className="text-[10px]" />
              {new Date(task.dueDate).toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "short",
              })}
            </span>
          )}
          {task._count.comments > 0 && (
            <span className="flex items-center gap-0.5">
              <Icon name="chat" className="text-[10px]" />
              {task._count.comments}
            </span>
          )}
        </div>

        {task.assignees.length > 0 && (
          <div className="flex -space-x-1.5">
            {task.assignees.slice(0, 3).map((user) => (
              <div
                key={user.id}
                className="w-5 h-5 rounded-full bg-surface-tint/20 border border-white flex items-center justify-center overflow-hidden"
                title={user.name || user.email}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[9px] font-medium text-surface-tint">
                    {(user.name || user.email).charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            ))}
            {task.assignees.length > 3 && (
              <div className="w-5 h-5 rounded-full bg-surface-tint/20 border border-white flex items-center justify-center">
                <span className="text-[8px] font-medium text-surface-tint">
                  +{task.assignees.length - 3}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

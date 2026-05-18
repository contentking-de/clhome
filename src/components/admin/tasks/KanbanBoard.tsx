"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import KanbanColumn from "./KanbanColumn";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
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

const COLUMNS = [
  { status: "BACKLOG", title: "Backlog", color: "gray" },
  { status: "TODO", title: "To Do", color: "blue" },
  { status: "IN_PROGRESS", title: "In Arbeit", color: "amber" },
  { status: "REVIEW", title: "Review", color: "purple" },
  { status: "DONE", title: "Erledigt", color: "green" },
] as const;

interface Props {
  initialTasks: Task[];
  users: User[];
}

export default function KanbanBoard({ initialTasks, users }: Props) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  const getColumnTasks = useCallback(
    (status: string) => tasks.filter((t) => t.status === status),
    [tasks]
  );

  function handleDragStart(event: DragStartEvent) {
    const task = tasks.find((t) => t.id === event.active.id);
    setActiveTask(task || null);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    const overColumn = COLUMNS.find((c) => c.status === overId);
    if (overColumn && activeTask.status !== overColumn.status) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === activeId ? { ...t, status: overColumn.status } : t
        )
      );
      return;
    }

    const overTask = tasks.find((t) => t.id === overId);
    if (overTask && activeTask.status !== overTask.status) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === activeId ? { ...t, status: overTask.status } : t
        )
      );
    }
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    const columnTasks = tasks.filter((t) => t.status === activeTask.status);
    const oldIndex = columnTasks.findIndex((t) => t.id === activeId);
    const newIndex = columnTasks.findIndex((t) => t.id === overId);

    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      const reordered = arrayMove(columnTasks, oldIndex, newIndex);
      setTasks((prev) => {
        const others = prev.filter((t) => t.status !== activeTask.status);
        return [...others, ...reordered.map((t, i) => ({ ...t, order: i }))];
      });
    }

    const updatedTasks = tasks
      .filter((t) => t.status === activeTask.status)
      .map((t, i) => ({ id: t.id, status: t.status, order: i }));

    await fetch("/api/tasks/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tasks: updatedTasks }),
    });
  }

  function openCreateModal() {
    setEditingTask(null);
    setModalOpen(true);
  }

  function openEditModal(task: Task) {
    setEditingTask(task);
    setModalOpen(true);
  }

  async function handleSave(data: {
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: string;
    assigneeIds: string[];
  }) {
    if (editingTask) {
      const res = await fetch(`/api/tasks/${editingTask.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const updated = await res.json();
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTask.id
            ? { ...t, ...updated, _count: t._count }
            : t
        )
      );
    } else {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const created = await res.json();
      setTasks((prev) => [...prev, { ...created, _count: { comments: 0 } }]);
    }
    setModalOpen(false);
  }

  async function handleDelete(id: string) {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setModalOpen(false);
  }

  return (
    <>
      <div className="mb-4">
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-tint text-white font-medium hover:opacity-90 transition-opacity"
        >
          <Icon name="add" className="text-sm" />
          Neuer Task
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {COLUMNS.map((col) => (
            <KanbanColumn
              key={col.status}
              status={col.status}
              title={col.title}
              color={col.color}
              tasks={getColumnTasks(col.status)}
              onTaskClick={openEditModal}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} isOverlay /> : null}
        </DragOverlay>
      </DndContext>

      {modalOpen && (
        <TaskModal
          task={editingTask}
          users={users}
          onSave={handleSave}
          onDelete={editingTask ? () => handleDelete(editingTask.id) : undefined}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

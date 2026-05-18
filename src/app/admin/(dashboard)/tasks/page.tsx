import { prisma } from "@/lib/prisma";
import KanbanBoard from "@/components/admin/tasks/KanbanBoard";

export const dynamic = "force-dynamic";

export default async function TasksPage() {
  const tasks = await prisma.task.findMany({
    include: {
      assignees: { select: { id: true, name: true, email: true, avatar: true } },
      creator: { select: { id: true, name: true, email: true, avatar: true } },
      _count: { select: { comments: true } },
    },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, avatar: true },
  });

  const serializedTasks = tasks.map((t) => ({
    ...t,
    dueDate: t.dueDate?.toISOString() ?? null,
    createdAt: t.createdAt.toISOString(),
    updatedAt: t.updatedAt.toISOString(),
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-on-background mb-6">Tasks</h1>
      <KanbanBoard initialTasks={serializedTasks} users={users} />
    </div>
  );
}

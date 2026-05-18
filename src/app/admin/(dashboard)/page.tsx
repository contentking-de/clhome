import { auth } from "@/lib/auth";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Icon from "@/components/ui/Icon";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await auth();
  const [postCount, publishedCount, draftCount, userCount, leadCount, taskCount, openTickets] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.post.count({ where: { published: false } }),
    prisma.user.count(),
    prisma.lead.count(),
    prisma.task.count({ where: { status: { not: "DONE" } } }),
    prisma.ticket.count({ where: { status: { in: ["OPEN", "IN_PROGRESS"] } } }),
  ]);

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="font-headline text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-secondary text-sm">
          Willkommen zurück, {session?.user?.name || session?.user?.email}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 mb-10">
        <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
          <div className="text-2xl font-extrabold font-headline text-on-background mb-1">
            {postCount}
          </div>
          <div className="text-xs text-secondary">Beiträge</div>
        </div>
        <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
          <div className="text-2xl font-extrabold font-headline text-surface-tint mb-1">
            {publishedCount}
          </div>
          <div className="text-xs text-secondary">Veröffentlicht</div>
        </div>
        <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
          <div className="text-2xl font-extrabold font-headline text-on-background mb-1">
            {draftCount}
          </div>
          <div className="text-xs text-secondary">Entwürfe</div>
        </div>
        <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
          <div className="text-2xl font-extrabold font-headline text-on-background mb-1">
            {taskCount}
          </div>
          <div className="text-xs text-secondary">Offene Tasks</div>
        </div>
        <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
          <div className="text-2xl font-extrabold font-headline text-on-background mb-1">
            {openTickets}
          </div>
          <div className="text-xs text-secondary">Offene Tickets</div>
        </div>
        <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
          <div className="text-2xl font-extrabold font-headline text-on-background mb-1">
            {leadCount}
          </div>
          <div className="text-xs text-secondary">Leads</div>
        </div>
        <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
          <div className="text-2xl font-extrabold font-headline text-on-background mb-1">
            {userCount}
          </div>
          <div className="text-xs text-secondary">Nutzer</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/posts/new"
          className="bg-surface-tint text-white px-5 py-2.5 rounded-lg font-semibold hover:brightness-110 transition-all inline-flex items-center gap-2 text-sm"
        >
          <Icon name="add" className="text-lg" />
          Neuer Beitrag
        </Link>
        <Link
          href="/admin/tasks"
          className="px-5 py-2.5 rounded-lg border border-outline-variant/30 font-semibold hover:bg-surface-container-low transition-all inline-flex items-center gap-2 text-sm"
        >
          <Icon name="task_alt" className="text-lg" />
          Tasks
        </Link>
        <Link
          href="/admin/tickets"
          className="px-5 py-2.5 rounded-lg border border-outline-variant/30 font-semibold hover:bg-surface-container-low transition-all inline-flex items-center gap-2 text-sm"
        >
          <Icon name="confirmation_number" className="text-lg" />
          Tickets
        </Link>
        <Link
          href="/admin/chat"
          className="px-5 py-2.5 rounded-lg border border-outline-variant/30 font-semibold hover:bg-surface-container-low transition-all inline-flex items-center gap-2 text-sm"
        >
          <Icon name="chat" className="text-lg" />
          Chat
        </Link>
        <Link
          href="/admin/users"
          className="px-5 py-2.5 rounded-lg border border-outline-variant/30 font-semibold hover:bg-surface-container-low transition-all inline-flex items-center gap-2 text-sm"
        >
          <Icon name="group" className="text-lg" />
          Nutzer
        </Link>
      </div>
    </div>
  );
}

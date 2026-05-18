import { prisma } from "@/lib/prisma";
import TicketList from "@/components/admin/tickets/TicketList";

export default async function TicketsPage() {
  const tickets = await prisma.ticket.findMany({
    include: {
      reporter: { select: { id: true, name: true, email: true, avatar: true } },
      assignee: { select: { id: true, name: true, email: true, avatar: true } },
      _count: { select: { comments: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, avatar: true },
  });

  const serializedTickets = tickets.map((t) => ({
    ...t,
    createdAt: t.createdAt.toISOString(),
    updatedAt: t.updatedAt.toISOString(),
  }));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-on-background">Tickets</h1>
        <a
          href="/admin/tickets/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-surface-tint text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Neues Ticket
        </a>
      </div>
      <TicketList initialTickets={serializedTickets} users={users} />
    </div>
  );
}

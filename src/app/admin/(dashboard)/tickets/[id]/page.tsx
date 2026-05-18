import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TicketDetail from "@/components/admin/tickets/TicketDetail";

export default async function TicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      reporter: { select: { id: true, name: true, email: true, avatar: true } },
      assignee: { select: { id: true, name: true, email: true, avatar: true } },
      comments: {
        include: {
          author: { select: { id: true, name: true, email: true, avatar: true } },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!ticket) notFound();

  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, avatar: true },
  });

  const serialized = {
    ...ticket,
    createdAt: ticket.createdAt.toISOString(),
    updatedAt: ticket.updatedAt.toISOString(),
    comments: ticket.comments.map((c) => ({
      ...c,
      createdAt: c.createdAt.toISOString(),
    })),
  };

  return (
    <div className="p-8 max-w-4xl">
      <TicketDetail ticket={serialized} users={users} />
    </div>
  );
}

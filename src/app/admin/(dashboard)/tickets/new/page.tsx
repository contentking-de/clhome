import { prisma } from "@/lib/prisma";
import TicketForm from "@/components/admin/tickets/TicketForm";

export default async function NewTicketPage() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, avatar: true },
  });

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-on-background mb-6">
        Neues Ticket
      </h1>
      <TicketForm users={users} />
    </div>
  );
}

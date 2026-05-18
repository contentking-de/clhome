import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ChatUI from "@/components/admin/chat/ChatUI";

export const dynamic = "force-dynamic";

export default async function ChatPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/admin/login");

  const conversations = await prisma.conversation.findMany({
    where: {
      participants: { some: { userId: session.user.id } },
    },
    include: {
      participants: {
        include: {
          user: { select: { id: true, name: true, email: true, avatar: true } },
        },
      },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
        include: {
          sender: { select: { id: true, name: true, email: true, avatar: true } },
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, avatar: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-on-background mb-6">Chat</h1>
      <ChatUI
        initialConversations={conversations}
        users={users}
        currentUserId={session.user.id}
      />
    </div>
  );
}

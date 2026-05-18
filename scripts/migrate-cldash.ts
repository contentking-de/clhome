import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import dotenv from "dotenv";

dotenv.config();

const CLDASH_DATABASE_URL = process.env.CLDASH_DATABASE_URL;
const DATABASE_URL = process.env.DATABASE_URL;

if (!CLDASH_DATABASE_URL) {
  console.error("CLDASH_DATABASE_URL is not set in .env");
  process.exit(1);
}

if (!DATABASE_URL) {
  console.error("DATABASE_URL is not set in .env");
  process.exit(1);
}

function createClient(connectionString: string) {
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
}

const source = createClient(CLDASH_DATABASE_URL);
const target = createClient(DATABASE_URL);

type UserIdMap = Map<string, string>;

interface SourceUser {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

interface SourceTask {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  order: number;
  dueDate: Date | null;
  creatorId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface SourceTaskComment {
  id: string;
  content: string;
  taskId: string;
  authorId: string;
  createdAt: Date;
}

interface SourceTicket {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  priority: string;
  reporterId: string | null;
  assigneeId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface SourceTicketComment {
  id: string;
  content: string;
  ticketId: string;
  authorId: string;
  createdAt: Date;
}

interface SourceConversation {
  id: string;
  title: string | null;
  isGroup: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface SourceParticipant {
  id: string;
  conversationId: string;
  userId: string;
  joinedAt: Date;
  lastReadAt: Date;
}

interface SourceMessage {
  id: string;
  content: string;
  conversationId: string;
  senderId: string;
  createdAt: Date;
}

interface SourceMediaFolder {
  id: string;
  name: string;
  parentId: string | null;
  order: number;
  createdAt: Date;
}

interface SourceMediaFile {
  id: string;
  name: string;
  url: string;
  size: number;
  contentType: string;
  folderId: string | null;
  uploadedById: string;
  createdAt: Date;
}

interface SourceNotification {
  id: string;
  userId: string;
  type: string;
  title: string;
  body: string;
  link: string | null;
  read: boolean;
  createdAt: Date;
}

interface SourceTaskAssignee {
  A: string; // taskId
  B: string; // userId
}

async function migrateUsers(): Promise<UserIdMap> {
  console.log("Migrating users...");
  const sourceUsers = await source.$queryRaw<SourceUser[]>`
    SELECT id, name, email, "emailVerified", image, role, "createdAt", "updatedAt"
    FROM "User"
  `;
  const idMap: UserIdMap = new Map();

  for (const user of sourceUsers) {
    const existing = await target.user.findUnique({
      where: { email: user.email },
    });

    if (existing) {
      idMap.set(user.id, existing.id);
      console.log(`  User ${user.email} already exists, mapped ${user.id} -> ${existing.id}`);
    } else {
      const role = user.role === "ADMIN" ? "ADMIN" : "EDITOR";
      const created = await target.user.create({
        data: {
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          image: user.image,
          role: role as "ADMIN" | "EDITOR",
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
      idMap.set(user.id, created.id);
      console.log(`  Created user ${user.email} (${role}), mapped ${user.id} -> ${created.id}`);
    }
  }

  console.log(`  Migrated ${sourceUsers.length} users\n`);
  return idMap;
}

async function migrateTasks(userIdMap: UserIdMap) {
  console.log("Migrating tasks...");
  const tasks = await source.$queryRaw<SourceTask[]>`
    SELECT id, title, description, status, priority, "order", "dueDate", "creatorId", "createdAt", "updatedAt"
    FROM "Task"
  `;

  const taskAssignees = await source.$queryRaw<SourceTaskAssignee[]>`
    SELECT "A", "B" FROM "_TaskAssignees"
  `;

  const comments = await source.$queryRaw<SourceTaskComment[]>`
    SELECT id, content, "taskId", "authorId", "createdAt"
    FROM "TaskComment"
  `;

  for (const task of tasks) {
    const creatorId = task.creatorId ? userIdMap.get(task.creatorId) || null : null;
    const assigneeIds = taskAssignees
      .filter((a) => a.A === task.id)
      .map((a) => userIdMap.get(a.B))
      .filter(Boolean) as string[];

    const created = await target.task.create({
      data: {
        title: task.title,
        description: task.description,
        status: task.status as "BACKLOG" | "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE",
        priority: task.priority as "LOW" | "MEDIUM" | "HIGH" | "URGENT",
        order: task.order,
        dueDate: task.dueDate,
        creatorId,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        assignees: { connect: assigneeIds.map((id) => ({ id })) },
      },
    });

    const taskComments = comments.filter((c) => c.taskId === task.id);
    for (const comment of taskComments) {
      const authorId = userIdMap.get(comment.authorId);
      if (authorId) {
        await target.taskComment.create({
          data: {
            content: comment.content,
            taskId: created.id,
            authorId,
            createdAt: comment.createdAt,
          },
        });
      }
    }
  }

  console.log(`  Migrated ${tasks.length} tasks\n`);
}

async function migrateTickets(userIdMap: UserIdMap) {
  console.log("Migrating tickets...");
  const tickets = await source.$queryRaw<SourceTicket[]>`
    SELECT id, title, description, type, status, priority, "reporterId", "assigneeId", "createdAt", "updatedAt"
    FROM "Ticket"
  `;

  const comments = await source.$queryRaw<SourceTicketComment[]>`
    SELECT id, content, "ticketId", "authorId", "createdAt"
    FROM "TicketComment"
  `;

  for (const ticket of tickets) {
    const reporterId = ticket.reporterId ? userIdMap.get(ticket.reporterId) || null : null;
    const assigneeId = ticket.assigneeId ? userIdMap.get(ticket.assigneeId) || null : null;

    const created = await target.ticket.create({
      data: {
        title: ticket.title,
        description: ticket.description,
        type: ticket.type as "BUG" | "FEATURE" | "IDEA",
        status: ticket.status as "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED",
        priority: ticket.priority as "LOW" | "MEDIUM" | "HIGH" | "URGENT",
        reporterId,
        assigneeId,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
      },
    });

    const ticketComments = comments.filter((c) => c.ticketId === ticket.id);
    for (const comment of ticketComments) {
      const authorId = userIdMap.get(comment.authorId);
      if (authorId) {
        await target.ticketComment.create({
          data: {
            content: comment.content,
            ticketId: created.id,
            authorId,
            createdAt: comment.createdAt,
          },
        });
      }
    }
  }

  console.log(`  Migrated ${tickets.length} tickets\n`);
}

async function migrateConversations(userIdMap: UserIdMap) {
  console.log("Migrating conversations...");
  const conversations = await source.$queryRaw<SourceConversation[]>`
    SELECT id, title, "isGroup", "createdAt", "updatedAt"
    FROM "Conversation"
  `;

  const participants = await source.$queryRaw<SourceParticipant[]>`
    SELECT id, "conversationId", "userId", "joinedAt", "lastReadAt"
    FROM "ConversationParticipant"
  `;

  const messages = await source.$queryRaw<SourceMessage[]>`
    SELECT id, content, "conversationId", "senderId", "createdAt"
    FROM "ChatMessage"
  `;

  for (const conv of conversations) {
    const created = await target.conversation.create({
      data: {
        title: conv.title,
        isGroup: conv.isGroup,
        createdAt: conv.createdAt,
        updatedAt: conv.updatedAt,
      },
    });

    const convParticipants = participants.filter((p) => p.conversationId === conv.id);
    for (const p of convParticipants) {
      const userId = userIdMap.get(p.userId);
      if (userId) {
        await target.conversationParticipant.create({
          data: {
            conversationId: created.id,
            userId,
            joinedAt: p.joinedAt,
            lastReadAt: p.lastReadAt,
          },
        });
      }
    }

    const convMessages = messages.filter((m) => m.conversationId === conv.id);
    for (const msg of convMessages) {
      const senderId = userIdMap.get(msg.senderId);
      if (senderId) {
        await target.chatMessage.create({
          data: {
            content: msg.content,
            conversationId: created.id,
            senderId,
            createdAt: msg.createdAt,
          },
        });
      }
    }
  }

  console.log(`  Migrated ${conversations.length} conversations\n`);
}

async function migrateMedia(userIdMap: UserIdMap) {
  console.log("Migrating media folders...");
  const folders = await source.$queryRaw<SourceMediaFolder[]>`
    SELECT id, name, "parentId", "order", "createdAt"
    FROM "MediaFolder"
    ORDER BY "createdAt" ASC
  `;

  const folderIdMap = new Map<string, string>();

  for (const folder of folders) {
    const parentId = folder.parentId ? folderIdMap.get(folder.parentId) || null : null;
    const created = await target.mediaFolder.create({
      data: {
        name: folder.name,
        parentId,
        order: folder.order,
        createdAt: folder.createdAt,
      },
    });
    folderIdMap.set(folder.id, created.id);
  }

  console.log(`  Migrated ${folders.length} folders`);

  console.log("Migrating media files...");
  const files = await source.$queryRaw<SourceMediaFile[]>`
    SELECT id, name, url, size, "contentType", "folderId", "uploadedById", "createdAt"
    FROM "MediaFile"
  `;

  for (const file of files) {
    const folderId = file.folderId ? folderIdMap.get(file.folderId) || null : null;
    const uploadedById = userIdMap.get(file.uploadedById);
    if (uploadedById) {
      await target.mediaFile.create({
        data: {
          name: file.name,
          url: file.url,
          size: file.size,
          contentType: file.contentType,
          folderId,
          uploadedById,
          createdAt: file.createdAt,
        },
      });
    }
  }

  console.log(`  Migrated ${files.length} files\n`);
}

async function migrateNotifications(userIdMap: UserIdMap) {
  console.log("Migrating notifications...");
  const notifications = await source.$queryRaw<SourceNotification[]>`
    SELECT id, "userId", type, title, body, link, read, "createdAt"
    FROM "Notification"
  `;

  for (const n of notifications) {
    const userId = userIdMap.get(n.userId);
    if (userId) {
      await target.notification.create({
        data: {
          userId,
          type: n.type,
          title: n.title,
          body: n.body,
          link: n.link,
          read: n.read,
          createdAt: n.createdAt,
        },
      });
    }
  }

  console.log(`  Migrated ${notifications.length} notifications\n`);
}

async function main() {
  console.log("=== cldash -> clever-legal Migration ===\n");
  console.log(`Source: ${CLDASH_DATABASE_URL?.substring(0, 30)}...`);
  console.log(`Target: ${DATABASE_URL?.substring(0, 30)}...\n`);

  try {
    const userIdMap = await migrateUsers();
    await migrateTasks(userIdMap);
    await migrateTickets(userIdMap);
    await migrateConversations(userIdMap);
    await migrateMedia(userIdMap);
    await migrateNotifications(userIdMap);

    console.log("=== Migration complete! ===");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await source.$disconnect();
    await target.$disconnect();
  }
}

main();

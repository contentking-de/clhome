import { prisma } from "./prisma";

export async function createNotification(params: {
  userId: string;
  type: string;
  title: string;
  body: string;
  link?: string;
}) {
  return prisma.notification.create({ data: params });
}

export async function notifyAllExcept(params: {
  excludeUserId: string;
  type: string;
  title: string;
  body: string;
  link?: string;
}) {
  const users = await prisma.user.findMany({
    where: { id: { not: params.excludeUserId } },
    select: { id: true },
  });

  return prisma.notification.createMany({
    data: users.map((u) => ({
      userId: u.id,
      type: params.type,
      title: params.title,
      body: params.body,
      link: params.link,
    })),
  });
}

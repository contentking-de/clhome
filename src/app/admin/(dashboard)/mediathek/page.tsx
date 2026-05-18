import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import MediaBrowser from "@/components/admin/mediathek/MediaBrowser";

export const dynamic = "force-dynamic";

export default async function MediathekPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/admin/login");

  const folders = await prisma.mediaFolder.findMany({
    where: { parentId: null },
    include: {
      _count: { select: { files: true, children: true } },
    },
    orderBy: { order: "asc" },
  });

  const files = await prisma.mediaFile.findMany({
    where: { folderId: null },
    include: {
      uploadedBy: { select: { id: true, name: true, email: true, avatar: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-on-background mb-6">Mediathek</h1>
      <MediaBrowser initialFolders={folders} initialFiles={files} />
    </div>
  );
}

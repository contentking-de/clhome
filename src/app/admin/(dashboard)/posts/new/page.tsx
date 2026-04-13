import PostForm from "@/components/admin/PostForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  const authors = await prisma.user.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, email: true },
  });

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="font-headline text-2xl font-bold mb-1">
          Neuer Beitrag
        </h1>
        <p className="text-secondary text-sm">
          Erstellen Sie einen neuen Blogbeitrag.
        </p>
      </div>
      <PostForm authors={authors} />
    </div>
  );
}

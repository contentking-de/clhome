import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PostForm from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [post, authors] = await Promise.all([
    prisma.post.findUnique({ where: { id } }),
    prisma.user.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, email: true },
    }),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="font-headline text-2xl font-bold mb-1">
          Beitrag bearbeiten
        </h1>
        <p className="text-secondary text-sm">
          &laquo;{post.title}&raquo;
        </p>
      </div>
      <PostForm
        initialData={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt || "",
          content: post.content,
          coverImage: post.coverImage || "",
          published: post.published,
          authorId: post.authorId,
        }}
        authors={authors}
      />
    </div>
  );
}

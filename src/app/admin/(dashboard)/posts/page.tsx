import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Icon from "@/components/ui/Icon";
import TranslateButton from "@/components/admin/TranslateButton";

export const dynamic = "force-dynamic";

export default async function PostsListPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: { select: { name: true, email: true } },
      translations: { select: { id: true, locale: true } },
    },
  });

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-headline text-2xl font-bold mb-1">Beiträge</h1>
          <p className="text-secondary text-sm">
            {posts.length} {posts.length === 1 ? "Beitrag" : "Beiträge"}
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="bg-primary-fixed text-on-primary-fixed px-5 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-all inline-flex items-center gap-2"
        >
          <Icon name="add" className="text-xl" />
          Neuer Beitrag
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 bg-surface-container-low rounded-xl border border-outline-variant/10">
          <Icon name="article" className="text-5xl text-outline mb-4 block" />
          <p className="text-secondary mb-4">Noch keine Beiträge vorhanden.</p>
          <Link
            href="/admin/posts/new"
            className="text-surface-tint font-semibold hover:underline"
          >
            Ersten Beitrag erstellen
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between bg-surface-container-low p-5 rounded-xl border border-outline-variant/10 hover:border-outline-variant/30 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-headline font-bold text-on-background truncate">
                    {post.title}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${
                      post.published
                        ? "bg-surface-tint/10 text-surface-tint"
                        : "bg-outline-variant/20 text-secondary"
                    }`}
                  >
                    {post.published ? "Veröffentlicht" : "Entwurf"}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold shrink-0 font-mono ${
                      post.locale === "en"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                    }`}
                  >
                    {post.locale.toUpperCase()}
                  </span>
                </div>
                <p className="text-secondary text-sm">
                  {post.author.name || post.author.email} ·{" "}
                  {new Date(post.createdAt).toLocaleDateString("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                  {post.translationOfId && (
                    <span className="text-blue-500 ml-2">
                      (Übersetzung)
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                {post.locale === "de" &&
                  !post.translations.some((t) => t.locale === "en") && (
                    <TranslateButton postId={post.id} />
                  )}
                {post.locale === "de" &&
                  post.translations.some((t) => t.locale === "en") && (
                    <Link
                      href={`/admin/posts/${post.translations.find((t) => t.locale === "en")!.id}/edit`}
                      className="p-2 rounded-lg text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      title="EN-Version bearbeiten"
                    >
                      <Icon name="edit_note" className="text-xl" />
                    </Link>
                  )}
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="p-2 rounded-lg text-secondary hover:text-on-background hover:bg-surface-container-highest transition-colors"
                  title="Vorschau"
                >
                  <Icon name="visibility" className="text-xl" />
                </Link>
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="p-2 rounded-lg text-secondary hover:text-on-background hover:bg-surface-container-highest transition-colors"
                  title="Bearbeiten"
                >
                  <Icon name="edit" className="text-xl" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import Link from "next/link";

interface SidebarPost {
  slug: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  createdAt: Date;
}

interface RelatedPostsSidebarProps {
  posts: SidebarPost[];
}

export default function RelatedPostsSidebar({
  posts,
}: RelatedPostsSidebarProps) {
  if (posts.length === 0) return null;

  return (
    <aside className="sticky top-24">
      <h3 className="font-headline text-sm font-bold uppercase tracking-widest text-surface-tint mb-5">
        Weitere Artikel
      </h3>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block bg-surface-container-low rounded-xl border border-outline-variant/10 overflow-hidden hover:border-surface-tint/30 transition-all duration-300"
          >
            {post.coverImage && (
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-4">
              <h4 className="font-headline text-sm font-bold text-on-background group-hover:text-surface-tint transition-colors leading-snug line-clamp-2">
                {post.title}
              </h4>
              {post.excerpt && (
                <p className="text-secondary text-xs leading-relaxed mt-1.5 line-clamp-2">
                  {post.excerpt}
                </p>
              )}
              <time className="text-xs text-outline mt-2 block">
                {new Date(post.createdAt).toLocaleDateString("de-DE", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </time>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}

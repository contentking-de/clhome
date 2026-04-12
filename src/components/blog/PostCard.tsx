import Link from "next/link";

interface PostCardProps {
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  authorName: string;
  createdAt: Date;
}

export default function PostCard({
  title,
  slug,
  excerpt,
  coverImage,
  authorName,
  createdAt,
}: PostCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="bg-surface-container-low rounded-xl border border-outline-variant/10 overflow-hidden hover:border-surface-tint/30 transition-all duration-300">
        {coverImage && (
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-6">
          <h3 className="font-headline text-xl font-bold mb-2 text-on-background group-hover:text-surface-tint transition-colors">
            {title}
          </h3>
          {excerpt && (
            <p className="text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
              {excerpt}
            </p>
          )}
          <div className="flex items-center gap-2 text-xs text-secondary">
            <span>{authorName}</span>
            <span>·</span>
            <time>
              {new Date(createdAt).toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
}

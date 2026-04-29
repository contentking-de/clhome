import { Link } from "@/i18n/routing";

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
      <article
        style={{
          background: "var(--bg-2)",
          border: "1px solid var(--line-2)",
          overflow: "hidden",
          transition: "border-color 0.15s",
        }}
      >
        {coverImage && (
          <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
            <img
              src={coverImage}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s",
              }}
            />
          </div>
        )}
        <div style={{ padding: 24 }}>
          <h3
            className="display"
            style={{
              fontSize: 20,
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: 8,
              color: "var(--ink)",
            }}
          >
            {title}
          </h3>
          {excerpt && (
            <p
              style={{
                color: "var(--ink-2)",
                fontSize: 14,
                lineHeight: 1.55,
                marginBottom: 12,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {excerpt}
            </p>
          )}
          <div
            className="mono"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              color: "var(--ink-3)",
              letterSpacing: "0.1em",
            }}
          >
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

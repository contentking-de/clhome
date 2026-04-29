import { Link } from "@/i18n/routing";

interface SidebarPost {
  slug: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  createdAt: Date;
}

interface RelatedPostsSidebarProps {
  posts: SidebarPost[];
  locale?: string;
}

export default function RelatedPostsSidebar({
  posts,
  locale = "de",
}: RelatedPostsSidebarProps) {
  if (posts.length === 0) return null;

  return (
    <aside style={{ position: "sticky", top: 80 }}>
      <h3
        className="mono"
        style={{
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: 20,
        }}
      >
        {locale === "en" ? "More Articles" : "Weitere Artikel"}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{
              display: "block",
              background: "var(--bg-2)",
              border: "1px solid var(--line-2)",
              overflow: "hidden",
              transition: "border-color 0.15s",
            }}
          >
            {post.coverImage && (
              <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                <img
                  src={post.coverImage}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
            <div style={{ padding: 16 }}>
              <h4
                className="display"
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "var(--ink)",
                  lineHeight: 1.3,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {post.title}
              </h4>
              <time
                className="mono"
                style={{
                  fontSize: 10,
                  color: "var(--ink-3)",
                  marginTop: 8,
                  display: "block",
                  letterSpacing: "0.1em",
                }}
              >
                {new Date(post.createdAt).toLocaleDateString(
                  locale === "en" ? "en-US" : "de-DE",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </time>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}

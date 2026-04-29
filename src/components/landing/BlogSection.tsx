import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string | null;
  createdAt: Date;
}

export default async function BlogSection({ posts }: { posts: BlogPost[] }) {
  const t = await getTranslations("BlogSection");
  const hasReal = posts.length > 0;

  return (
    <section id="blog" style={{ borderBottom: "1px solid var(--line-2)" }}>
      <div className="l-container" style={{ padding: "96px 32px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            paddingBottom: 40,
            gap: 40,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div className="l-label" style={{ marginBottom: 18 }}>
              {t("sectionLabel")}
            </div>
            <h2
              className="display"
              style={{
                fontSize: "clamp(40px, 4.5vw, 72px)",
                fontWeight: 700,
              }}
            >
              {t("headlineBefore")}{" "}
              <span style={{ color: "var(--accent)" }}>{t("headlineAccent")}</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="mono"
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ink-2)",
            }}
          >
            {t("linkAllArticles")}
          </Link>
        </div>

        {!hasReal ? (
          <div
            style={{
              border: "1px solid var(--line-2)",
              padding: "80px 32px",
              textAlign: "center",
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                color: "var(--ink-3)",
              }}
            >
              {t("emptyState")}
            </div>
          </div>
        ) : (
          <div
            className="l-blog-posts"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(posts.length, 3)}, 1fr)`,
              gap: 0,
              border: "1px solid var(--line-2)",
            }}
          >
            {posts.slice(0, 3).map((p, i) => {
              const date = new Date(p.createdAt);
              const formatted = date.toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });
              return (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  aria-label={`Artikel lesen: ${p.title}`}
                  style={{
                    padding: 32,
                    borderRight:
                      i < Math.min(posts.length, 3) - 1
                        ? "1px solid var(--line-2)"
                        : "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                    minHeight: 320,
                    transition: "background .15s",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    className="mono"
                  >
                    <span
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.14em",
                        color: "var(--accent)",
                      }}
                    >
                      {t("tagBlog")}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.14em",
                        color: "var(--ink-3)",
                      }}
                    >
                      {formatted}
                    </span>
                  </div>
                  <div
                    className="display"
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      lineHeight: 1.2,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {p.title}
                  </div>
                  {p.excerpt && (
                    <p
                      style={{
                        fontSize: 14,
                        color: "var(--ink-2)",
                        lineHeight: 1.55,
                        marginTop: "auto",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {p.excerpt}
                    </p>
                  )}
                  <div
                    className="mono"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      color: "var(--accent)",
                    }}
                  >
                    {t("linkRead")}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

import { prisma } from "@/lib/prisma";
import { getLocale, getTranslations } from "next-intl/server";
import SubpageShell from "@/components/landing/SubpageShell";
import PostCard from "@/components/blog/PostCard";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("BlogPage");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function BlogPage() {
  const locale = await getLocale();
  const t = await getTranslations("BlogPage");

  const posts = await prisma.post.findMany({
    where: { published: true, locale },
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true, email: true } } },
  });

  return (
    <SubpageShell>
      <section
        style={{ borderBottom: "1px solid var(--line-2)" }}
      >
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div style={{ marginBottom: 48 }}>
            <div className="l-label" style={{ marginBottom: 18 }}>
              {t("label")}
            </div>
            <h1
              className="display"
              style={{
                fontSize: "clamp(40px, 5vw, 72px)",
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              {t("heading")}
              <span style={{ color: "var(--accent)" }}>{t("headingAccent")}</span>
            </h1>
            <p style={{ color: "var(--ink-2)", fontSize: 18, maxWidth: 640 }}>
              {t("intro")}
            </p>
          </div>

          {posts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
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
              className="l-grid-3 l-sat-cards"
              style={{
                gap: 0,
                border: "1px solid var(--line-2)",
              }}
            >
              {posts.map((post, i) => (
                <div
                  key={post.id}
                  style={{
                    borderRight:
                      i % 3 < 2 ? "1px solid var(--line-2)" : "none",
                    borderBottom:
                      i < posts.length - 3
                        ? "1px solid var(--line-2)"
                        : "none",
                  }}
                >
                  <PostCard
                    title={post.title}
                    slug={post.slug}
                    excerpt={post.excerpt}
                    coverImage={post.coverImage}
                    authorName={post.author.name || post.author.email}
                    createdAt={post.createdAt}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </SubpageShell>
  );
}

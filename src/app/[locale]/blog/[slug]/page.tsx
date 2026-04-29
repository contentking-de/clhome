import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import SubpageShell from "@/components/landing/SubpageShell";
import PostContent from "@/components/blog/PostContent";
import AuthorBox from "@/components/blog/AuthorBox";
import RelatedPostsSidebar from "@/components/blog/RelatedPostsSidebar";
import { Link } from "@/i18n/routing";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) return { title: "Not found | clever.legal" };

  return {
    title: `${post.title} | clever.legal Blog`,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("BlogPage");

  const post = await prisma.post.findUnique({
    where: { slug, published: true },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          bio: true,
          bioEn: true,
          jobTitle: true,
          jobTitleEn: true,
          avatar: true,
        },
      },
      translationOf: { select: { slug: true, locale: true } },
      translations: { select: { slug: true, locale: true } },
    },
  });

  if (!post) {
    notFound();
  }

  const otherLocalePost =
    post.locale === "de"
      ? post.translations.find((t) => t.locale === "en")
      : post.translationOf;

  const relatedPosts = await prisma.post.findMany({
    where: { published: true, slug: { not: slug }, locale },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      slug: true,
      title: true,
      excerpt: true,
      coverImage: true,
      createdAt: true,
    },
  });

  const dateLocale = locale === "de" ? "de-DE" : "en-US";

  return (
    <SubpageShell>
      <article style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container l-article-pad" style={{ padding: "64px 32px 96px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <Link
              href="/blog"
              className="mono"
              style={{
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--accent)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {t("backToBlog")}
            </Link>
            {otherLocalePost && (
              <Link
                href={`/blog/${otherLocalePost.slug}`}
                locale={otherLocalePost.locale as "de" | "en"}
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  padding: "6px 12px",
                  border: "1px solid var(--line-2)",
                  color: "var(--ink-2)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {otherLocalePost.locale === "en" ? "🇬🇧 EN" : "🇩🇪 DE"}
              </Link>
            )}
          </div>

          {post.coverImage && (
            <div
              className="l-grid-half"
              style={{
                gap: 32,
                marginBottom: 40,
                alignItems: "start",
              }}
            >
              <div
                style={{
                  aspectRatio: "4/3",
                  overflow: "hidden",
                  border: "1px solid var(--line-2)",
                }}
              >
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
              <div>
                <h1
                  className="display"
                  style={{
                    fontSize: "clamp(32px, 4vw, 56px)",
                    fontWeight: 800,
                    marginBottom: 16,
                  }}
                >
                  {post.title}
                </h1>
                {post.excerpt && (
                  <p
                    style={{
                      color: "var(--ink-2)",
                      lineHeight: 1.55,
                      marginBottom: 16,
                      fontSize: 16,
                      fontWeight: 700,
                    }}
                  >
                    {post.excerpt}
                  </p>
                )}
                <div
                  className="mono"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 11,
                    color: "var(--ink-3)",
                    letterSpacing: "0.1em",
                  }}
                >
                  <span>
                    {post.author.name || post.author.email}
                  </span>
                  <span>·</span>
                  <time>
                    {new Date(post.createdAt).toLocaleDateString(dateLocale, {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </div>
            </div>
          )}

          {!post.coverImage && (
            <header style={{ marginBottom: 40 }}>
              <h1
                className="display"
                style={{
                  fontSize: "clamp(32px, 4vw, 56px)",
                  fontWeight: 800,
                  marginBottom: 16,
                }}
              >
                {post.title}
              </h1>
              {post.excerpt && (
                <p
                  style={{
                    color: "var(--ink-2)",
                    lineHeight: 1.55,
                    marginBottom: 16,
                    fontSize: 16,
                    fontWeight: 700,
                  }}
                >
                  {post.excerpt}
                </p>
              )}
              <div
                className="mono"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 11,
                  color: "var(--ink-3)",
                  letterSpacing: "0.1em",
                }}
              >
                <span>{post.author.name || post.author.email}</span>
                <span>·</span>
                <time>
                  {new Date(post.createdAt).toLocaleDateString(dateLocale, {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </div>
            </header>
          )}

          <div
            className="l-grid-article"
          >
            <div>
              <PostContent content={post.content} />
              <AuthorBox
                name={post.author.name}
                email={post.author.email}
                jobTitle={post.author.jobTitle}
                jobTitleEn={post.author.jobTitleEn}
                bio={post.author.bio}
                bioEn={post.author.bioEn}
                avatar={post.author.avatar}
                locale={locale}
              />
            </div>
            {relatedPosts.length > 0 && (
              <div className="hidden lg:block">
                <RelatedPostsSidebar posts={relatedPosts} />
              </div>
            )}
          </div>
        </div>
      </article>
    </SubpageShell>
  );
}

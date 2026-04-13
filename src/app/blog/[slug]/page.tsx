import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PostContent from "@/components/blog/PostContent";
import AuthorBox from "@/components/blog/AuthorBox";
import RelatedPostsSidebar from "@/components/blog/RelatedPostsSidebar";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) return { title: "Nicht gefunden | clever.legal" };

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
  const post = await prisma.post.findUnique({
    where: { slug, published: true },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          bio: true,
          jobTitle: true,
          avatar: true,
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  const relatedPosts = await prisma.post.findMany({
    where: {
      published: true,
      slug: { not: slug },
    },
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

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <article className="py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-surface-tint font-medium text-sm mb-8 hover:gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-lg">
                arrow_back
              </span>
              Zurück zum Blog
            </Link>

            {post.coverImage ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 items-start">
                <div className="aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <header>
                  <h1 className="font-headline text-4xl font-extrabold tracking-tight mb-4">
                    {post.title}
                  </h1>
                  {post.excerpt && (
                    <p className="text-secondary leading-relaxed mb-4 font-semibold">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-secondary text-sm">
                    {post.author.avatar ? (
                      <img src={post.author.avatar} alt={post.author.name || ""} className="w-7 h-7 rounded-full object-cover" />
                    ) : (
                      <span className="w-7 h-7 rounded-full bg-surface-tint/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-surface-tint text-sm">person</span>
                      </span>
                    )}
                    <span>{post.author.name || post.author.email}</span>
                    <span>·</span>
                    <time>
                      {new Date(post.createdAt).toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                </header>
              </div>
            ) : (
              <header className="mb-10">
                <h1 className="font-headline text-4xl font-extrabold tracking-tight mb-4">
                  {post.title}
                </h1>
                {post.excerpt && (
                  <p className="text-secondary leading-relaxed mb-4 font-semibold">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-3 text-secondary text-sm">
                  {post.author.avatar ? (
                    <img src={post.author.avatar} alt={post.author.name || ""} className="w-7 h-7 rounded-full object-cover" />
                  ) : (
                    <span className="w-7 h-7 rounded-full bg-surface-tint/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-surface-tint text-sm">person</span>
                    </span>
                  )}
                  <span>{post.author.name || post.author.email}</span>
                  <span>·</span>
                  <time>
                    {new Date(post.createdAt).toLocaleDateString("de-DE", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </header>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
              <div>
                <PostContent content={post.content} />
                <AuthorBox
                  name={post.author.name}
                  email={post.author.email}
                  jobTitle={post.author.jobTitle}
                  bio={post.author.bio}
                  avatar={post.author.avatar}
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
      </main>
      <Footer />
    </>
  );
}

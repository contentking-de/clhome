import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PostContent from "@/components/blog/PostContent";
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
    include: { author: { select: { name: true, email: true } } },
  });

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <article className="py-16 px-8">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-surface-tint font-medium text-sm mb-8 hover:gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-lg">
                arrow_back
              </span>
              Zurück zum Blog
            </Link>

            {post.coverImage && (
              <div className="aspect-[16/9] rounded-xl overflow-hidden mb-10">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <header className="mb-10">
              <h1 className="font-headline text-4xl font-extrabold tracking-tight mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-3 text-secondary text-sm">
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

            <PostContent content={post.content} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

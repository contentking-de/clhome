import { prisma } from "@/lib/prisma";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PostCard from "@/components/blog/PostCard";
import type { Metadata } from "next";
import Icon from "@/components/ui/Icon";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | clever.legal",
  description:
    "Aktuelles und Insights aus der Welt des Legal Tech. Erfahren Sie, wie clever.legal das Recht vereinfacht.",
};

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true, email: true } } },
  });

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-20 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="text-surface-tint font-bold font-label uppercase tracking-widest block mb-4">
                Blog
              </span>
              <h1 className="font-headline text-[2.5rem] font-extrabold leading-tight mb-4">
                Insights & Aktuelles
              </h1>
              <p className="text-secondary text-lg max-w-2xl">
                Entdecken Sie unsere neuesten Artikel rund um Legal Tech,
                Rechtsautomatisierung und die Zukunft des Rechts.
              </p>
            </div>

            {posts.length === 0 ? (
              <div className="text-center py-20">
                <Icon name="article" className="text-5xl text-outline mb-4 block" />
                <p className="text-secondary">
                  Noch keine Beiträge vorhanden. Schauen Sie bald wieder vorbei!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    title={post.title}
                    slug={post.slug}
                    excerpt={post.excerpt}
                    coverImage={post.coverImage}
                    authorName={post.author.name || post.author.email}
                    createdAt={post.createdAt}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

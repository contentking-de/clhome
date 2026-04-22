import { prisma } from "@/lib/prisma";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import ProblemSection from "@/components/landing/ProblemSection";
import EngineSection from "@/components/landing/EngineSection";
import SatelliteSection from "@/components/landing/SatelliteSection";
import ClusterSection from "@/components/landing/ClusterSection";
import CalculatorSection from "@/components/landing/CalculatorSection";
import AlertsSection from "@/components/landing/AlertsSection";
import TeamSection from "@/components/landing/TeamSection";
import BlogSection from "@/components/landing/BlogSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
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
      <Header />
      <main id="main-content" tabIndex={-1} style={{ outline: "none" }}>
        <Hero />
        <ProblemSection />
        <EngineSection />
        <SatelliteSection />
        <ClusterSection />
        <CalculatorSection />
        <AlertsSection />
        <TeamSection />
        <BlogSection posts={posts} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

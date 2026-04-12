import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import ClusterSelection from "@/components/landing/ClusterSelection";
import ExpertsSection from "@/components/landing/ExpertsSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Hero />
        <ClusterSelection />
        <ExpertsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

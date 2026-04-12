import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import ProblemSection from "@/components/landing/ProblemSection";
import EngineSection from "@/components/landing/EngineSection";
import ClusterSelection from "@/components/landing/ClusterSelection";
import CalculatorSection from "@/components/landing/CalculatorSection";
import ExpertsSection from "@/components/landing/ExpertsSection";
import ExclusivitySection from "@/components/landing/ExclusivitySection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Hero />
        <ProblemSection />
        <EngineSection />
        <ClusterSelection />
        <CalculatorSection />
        <ExpertsSection />
        <ExclusivitySection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

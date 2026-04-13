import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import FocusAreasSection from "@/components/landing/FocusAreasSection";
import NotWhatWeDoSection from "@/components/landing/NotWhatWeDoSection";
import SatellitesSection from "@/components/landing/SatellitesSection";
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
        <FocusAreasSection />
        <NotWhatWeDoSection />
        <SatellitesSection />
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

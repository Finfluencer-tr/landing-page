import { Hero } from "@/components/Hero";
import { TeamSection } from "@/components/TeamSection";
import { BentoGrid } from "@/components/BentoGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { LiveTrends } from "@/components/LiveTrends";
import { TechArchitecture } from "@/components/TechArchitecture";
import { Footer } from "@/components/Footer";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <LanguageSwitcher className="fixed top-4 right-4" />
      <Hero />
      <BentoGrid />
      <HowItWorks />
      <LiveTrends />
      <TechArchitecture />
      <TeamSection />
      <Footer />
    </main>
  );
}

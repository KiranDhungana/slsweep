import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GamePlatforms from "@/components/GamePlatforms";
import DashboardSection from "@/components/DashboardSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <GamePlatforms />
        <DashboardSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

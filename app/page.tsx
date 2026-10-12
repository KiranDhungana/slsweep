import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LiveWinners from "@/components/LiveWinners";
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
        <LiveWinners />
        <GamePlatforms />
        <DashboardSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LiveWinners from "@/components/LiveWinners";
import GamePlatforms from "@/components/GamePlatforms";
import LatestBlog from "@/components/LatestBlog";
import DashboardSection from "@/components/DashboardSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FaqSection from "@/components/seo/FaqSection";
import { homeFaqs } from "@/lib/content";
import { SITE_DESCRIPTION, pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  path: "/",
  title: "SL Sweep – Sweepstakes Games Online | Orion Stars, Juwa",
  description: SITE_DESCRIPTION,
});

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LiveWinners />
        <GamePlatforms />
        <DashboardSection />
        <HowItWorksSection />
        <section className="bg-slate-50/60 py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-8">
            <FaqSection faqs={homeFaqs} />
          </div>
        </section>
        <LatestBlog />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

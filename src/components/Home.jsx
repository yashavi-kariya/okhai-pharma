import SiteHeader from "./SiteHeader";
import HeroSection from "../sections/HeroSection";
import AboutSection from "../sections/AboutSection";
import LeadershipSection from "../sections/LeadershipSection";
import ContactSection from "../sections/ContactSection";
import PageBottom from "./PageBottom";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <LeadershipSection />
        {/* <ContactSection /> */}
      </main>
    </div>
  );
}
import { useEffect } from "react";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { SectionsPreview } from "./SectionsPreview";
import { Footer } from "./Footer";

export function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative">
      <Navbar />
      <HeroSection />
      <SectionsPreview />
      <Footer />
    </div>
  );
}

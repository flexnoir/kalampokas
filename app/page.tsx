import Hero from "@/components/sections/Hero";
import Introduction from "@/components/sections/Introduction";
import Portfolio from "@/components/sections/Portfolio";
import Press from "@/components/sections/Press";
import Testimonials from "@/components/sections/Testimonials";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import { getPortfolioImages } from "@/lib/portfolio";

export default function Home() {
  const portfolioImages = getPortfolioImages();

  return (
    <>
      <Hero />
      <Introduction />
      <Portfolio images={portfolioImages} />
      <Press />
      <Testimonials />
      <About />
      <Contact />
    </>
  );
}

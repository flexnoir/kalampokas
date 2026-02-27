import AnimateOnScroll from "../ui/AnimateOnScroll";
import ParallaxImage from "../ui/ParallaxImage";
import SectionTitle from "../ui/SectionTitle";

export default function About() {
  return (
    <section id="about" className="py-16 md:py-40 px-6 lg:px-16 max-w-6xl mx-auto">
      <SectionTitle label="About" title="The Artist Behind the Lens" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
        <AnimateOnScroll>
          <ParallaxImage
            src="/images/about-v3.jpg"
            alt="Lefteris Kalampokas"
            aspect="4/5"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <div className="max-w-lg">
        <p className="text-warm-gray text-[15px] leading-[1.85] font-sans font-light">
  Greece gave me the light. Twelve years and three hundred weddings later, I still chase it.
</p>
<p className="mt-5 text-warm-gray text-[15px] leading-[1.85] font-sans font-light">
  I work across Europe — Mykonos, Santorini, Tuscany, Amalfi — for couples who want photographs that feel like cinema, not catalogues. No forced poses. No predictable moments. Just the real story, shot with intention.
</p>

<div className="mt-8 w-8 h-px bg-gold/40" />

<p className="mt-6 text-warm-gray/60 text-[13px] leading-relaxed font-sans font-light italic">
  Off-season: Cycladic light, strong coffee, and the company of my wife and our dog.
</p>
<p className="mt-3 text-warm-gray text-[13px] leading-relaxed font-sans font-light tracking-widest uppercase">
  Based in Greece. Available worldwide.
</p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

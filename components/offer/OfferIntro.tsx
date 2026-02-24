"use client";

import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface OfferIntroProps {
  introText: string;
  photographerName: string;
}

export default function OfferIntro({ introText, photographerName }: OfferIntroProps) {
  const paragraphs = introText.split("\n\n");

  return (
    <section className="py-16 md:py-32">
      <div className="max-w-3xl mx-auto px-6 lg:px-16">
        <AnimateOnScroll>
          <div className="text-center">
            <span className="text-[10px] uppercase tracking-[0.35em] text-warm-gray/60 font-sans font-light">
              A Personal Note
            </span>
            <div className="mt-4 w-8 h-px bg-gold/40 mx-auto" />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.15}>
          <div className="mt-10 md:mt-14 space-y-6">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="font-serif text-lg md:text-xl text-charcoal/80 font-light leading-relaxed text-center"
              >
                {p}
              </p>
            ))}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.25}>
          <div className="mt-10 text-center">
            <span className="font-serif text-lg italic text-charcoal/60">
              Warmly, {photographerName}
            </span>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

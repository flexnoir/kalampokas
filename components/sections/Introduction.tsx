import AnimateOnScroll from "../ui/AnimateOnScroll";
import ParallaxImage from "../ui/ParallaxImage";

export default function Introduction() {
  return (
    <section className="py-16 md:py-40 px-6 lg:px-16 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
        {/* Image */}
        <AnimateOnScroll>
          <ParallaxImage
            src="/images/portrait.jpg"
            alt="Lefteris Kalampokas"
            aspect="3/4"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </AnimateOnScroll>

        {/* Text */}
        <AnimateOnScroll delay={0.2}>
          <div className="max-w-lg">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-warm-gray/70 font-sans font-light">
              The Photographer
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-serif font-light text-charcoal leading-[1.3]">
              Telling Your Story
              <br />
              <span className="italic">Through Light &amp; Emotion</span>
            </h2>

            <div className="mt-5 w-8 h-px bg-gold/50" />

            <p className="mt-6 text-warm-gray text-[15px] leading-[1.85] font-sans font-light">
              Lefteris is known for his refined, fashion-inspired approach and a quiet, intentional way of seeing. With over a decade of experience, he creates imagery that feels effortless yet deeply considered.
            </p>
            <p className="mt-5 text-warm-gray text-[15px] leading-[1.85] font-sans font-light">
              His work is defined by softness, light, and emotion. Each frame is crafted with a sense of timelessness, capturing moments as they unfold naturally, without intrusion or direction.
            </p>
            <p className="mt-5 text-warm-gray text-[15px] leading-[1.85] font-sans font-light">
              Blending seamlessly into the rhythm of the day, Lefteris documents what is real - the subtle glances, the atmosphere, the in-between moments that often go unnoticed, yet hold the most meaning.
            </p>

            <div className="mt-8 w-8 h-px bg-gold/40" />

            <p className="mt-6 text-charcoal text-[15px] font-sans font-normal">
              Lefteris Kalampokas
            </p>
            <p className="mt-1 text-warm-gray text-[13px] font-sans font-light tracking-wide">
              Fine Art Wedding Photographer
            </p>
            <p className="mt-5 text-warm-gray text-[13px] leading-relaxed font-sans font-light">
              Featured in
              <span className="italic font-normal">Vogue</span>,{" "}
              <span className="italic font-normal">Style Me Pretty</span>,
              <span className="italic font-normal">Magnolia Rouge</span> & other international publications.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

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
              Telling Your Love Story
              <br />
              <span className="italic">Through Light &amp; Emotion</span>
            </h2>

            <div className="mt-5 w-8 h-px bg-gold/50" />

            <p className="mt-6 text-warm-gray text-[15px] leading-[1.85] font-sans font-light">
              With over a decade of experience capturing destination weddings across
              Greece, Italy, and Europe, I craft images that feel as
              timeless as the love they celebrate. Every frame is an heirloom - a
              quiet, honest moment preserved for generations.
            </p>
            <p className="mt-5 text-warm-gray text-[15px] leading-[1.85] font-sans font-light">
              My approach is unobtrusive and editorial. I blend into your day,
              capturing the candid glances, the joyful tears, and the golden-hour
              light that makes destination weddings unforgettable.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

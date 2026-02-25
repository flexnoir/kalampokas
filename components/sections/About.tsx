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
            src="/images/about-v2.jpg"
            alt="Lefteris Kalampokas"
            aspect="4/5"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <div className="max-w-lg">
            <p className="text-warm-gray text-[15px] leading-[1.85] font-sans font-light">
              Born and raised in Greece, I fell in love with photography while
              documenting the light of the Mediterranean - the way it dances on
              whitewashed walls, how it softens at the golden hour, how it paints
              every love story with warmth.
            </p>
            <p className="mt-5 text-warm-gray text-[15px] leading-[1.85] font-sans font-light">
              Over the past twelve years, I&apos;ve had the privilege of
              photographing over 300 weddings across Europe&apos;s most breathtaking
              destinations. From the whites of Mykonos to the vineyards of Firenze,
              I bring an editorial eye and an emotional heart to every celebration.
            </p>
            <p className="mt-5 text-warm-gray text-[15px] leading-[1.85] font-sans font-light">
              My philosophy is simple: be present, be patient, and let the story
              unfold. The best photographs are the ones you don&apos;t have to pose for - 
              the stolen glance, the joyful tear, the spontaneous laughter.
            </p>

            <div className="mt-8 w-8 h-px bg-gold/40" />

            <p className="mt-6 text-warm-gray/60 text-[13px] leading-relaxed font-sans font-light italic">
              When I’m not behind the camera, you’ll find me exploring the Cyclades, hunting for the perfect espresso, or planning my next adventure with my wife and our dog.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

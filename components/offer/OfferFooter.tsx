import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function OfferFooter() {
  return (
    <footer className="py-12 md:py-16 border-t border-warm-gray/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-16 text-center">
        <AnimateOnScroll>
          <span className="block font-serif text-xl md:text-2xl font-light text-charcoal tracking-wide">
            Kalampokas Fotografia
          </span>
          <div className="mt-4 w-6 h-px bg-gold/30 mx-auto" />
          <span className="block mt-4 text-[10px] text-warm-gray/40 font-sans font-light tracking-wider">
            This proposal is confidential and intended solely for the recipient.
          </span>
        </AnimateOnScroll>
      </div>
    </footer>
  );
}

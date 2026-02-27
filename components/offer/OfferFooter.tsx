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
          <div className="mt-5 flex items-center justify-center gap-6">
            <a
              href="https://www.instagram.com/lefteris_kalampokas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-[0.25em] text-warm-gray/40 font-sans font-light hover:text-gold/70 transition-colors duration-500"
            >
              Instagram
            </a>
            <span className="text-warm-gray/15">|</span>
            <a
              href="https://kalampokasfotografia.gr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-[0.25em] text-warm-gray/40 font-sans font-light hover:text-gold/70 transition-colors duration-500"
            >
              Website
            </a>
          </div>
          <span className="block mt-4 text-[11px] text-warm-gray/40 font-sans font-light tracking-wide">
            info@kalampokasfotografia.gr
          </span>
          <span className="block mt-3 text-[10px] text-warm-gray/30 font-sans font-light tracking-wider">
            This proposal is confidential and intended solely for the recipient.
          </span>
        </AnimateOnScroll>
      </div>
    </footer>
  );
}

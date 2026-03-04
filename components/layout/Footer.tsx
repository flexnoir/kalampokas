export default function Footer() {
  return (
    <footer className="bg-charcoal py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-16">
        {/* Logo */}
        <div className="text-center">
          <span className="font-serif text-2xl md:text-3xl text-soft-white/90 tracking-[0.05em] font-light">
            Kalampokas Fotografia
          </span>
          <p className="mt-3 text-soft-white/30 text-[12px] font-sans font-light tracking-wider">
            Featured in leading international publications including
            <span className="mt-1 block">
              <span className="italic font-normal">Vogue</span>,{" "}
              <span className="italic font-normal">Style Me Pretty</span> and{" "}
              <span className="italic font-normal">Magnolia Rouge</span>.
            </span>
          </p>
        </div>

        {/* Divider */}
        <div className="mt-10 mb-10 w-8 h-px bg-soft-white/10 mx-auto" />

        {/* Links */}
        <div className="flex items-center justify-center gap-8">
          <a
            href="https://www.instagram.com/lefteris_kalampokas"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase tracking-[0.25em] text-soft-white/40 font-sans font-light hover:text-gold/70 transition-colors duration-500 py-2"
          >
            Instagram
          </a>
          <span className="text-soft-white/10">|</span>
          <a
            href="mailto:info@kalampokasfotografia.gr"
            className="text-[11px] uppercase tracking-[0.25em] text-soft-white/40 font-sans font-light hover:text-gold/70 transition-colors duration-500 py-2"
          >
            Email
          </a>
        </div>

        {/* Email */}
        <p className="mt-4 text-center text-[11px] tracking-[0.15em] text-soft-white/25 font-sans font-light">
          info@kalampokasfotografia.gr
        </p>
        <p className="mt-2 text-center text-[11px] tracking-[0.15em] text-soft-white/25 font-sans font-light">
          +30 6979101026
        </p>

        {/* Copyright */}
        <p className="mt-10 text-center text-[10px] tracking-[0.2em] text-soft-white/20 font-sans font-light">
          &copy; {new Date().getFullYear()} Kalampokas Fotografia. All rights reserved.
        </p>

        {/* Credit */}
        <p className="mt-3 text-center text-[9px] tracking-[0.2em] text-soft-white/15 font-sans font-light">
          Crafted by{" "}
          <a
            href="https://flexnoir.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-soft-white/30 transition-colors duration-500"
          >
            flexnoir.com
          </a>
        </p>
      </div>
    </footer>
  );
}

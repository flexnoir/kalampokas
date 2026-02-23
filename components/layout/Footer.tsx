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
            Greece &middot; Italy &middot; South of France
          </p>
        </div>

        {/* Divider */}
        <div className="mt-10 mb-10 w-8 h-px bg-soft-white/10 mx-auto" />

        {/* Links */}
        <div className="flex items-center justify-center gap-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase tracking-[0.25em] text-soft-white/40 font-sans font-light hover:text-gold/70 transition-colors duration-500 py-2"
          >
            Instagram
          </a>
          <span className="text-soft-white/10">|</span>
          <a
            href="mailto:hello@kalampokasfotografia.com"
            className="text-[11px] uppercase tracking-[0.25em] text-soft-white/40 font-sans font-light hover:text-gold/70 transition-colors duration-500 py-2"
          >
            Email
          </a>
        </div>

        {/* Copyright */}
        <p className="mt-10 text-center text-[10px] tracking-[0.2em] text-soft-white/20 font-sans font-light">
          &copy; {new Date().getFullYear()} Kalampokas Fotografia. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#portfolio", label: "Portfolio" },
  { href: "#press", label: "Press" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const press = document.getElementById("press");
      if (press) {
        const rect = press.getBoundingClientRect();
        setHidden(rect.top <= 0 && rect.bottom > 0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        hidden
          ? "opacity-0 pointer-events-none -translate-y-full"
          : scrolled
            ? "bg-ivory/90 backdrop-blur-md"
            : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-16 md:h-24">
          <Link
            href="/"
            className={`font-serif text-base md:text-lg tracking-[0.2em] uppercase transition-colors duration-500 ${
              scrolled ? "text-charcoal" : "text-soft-white"
            }`}
          >
            Lefteris Kalampokas
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`link-underline text-[11px] uppercase tracking-[0.25em] font-sans font-light transition-colors duration-500 ${
                  scrolled ? "text-charcoal/70 hover:text-charcoal" : "text-soft-white/70 hover:text-soft-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-3 -mr-3 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-[5px]">
              <span
                className={`block w-5 h-px transition-all duration-500 ${
                  scrolled ? "bg-charcoal" : "bg-soft-white"
                } ${mobileOpen ? "rotate-45 translate-y-[3px]" : ""}`}
              />
              <span
                className={`block w-5 h-px transition-all duration-500 ${
                  scrolled ? "bg-charcoal" : "bg-soft-white"
                } ${mobileOpen ? "-rotate-45 -translate-y-[3px]" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

    </motion.nav>

      {/* Mobile menu — fullscreen overlay (outside nav to avoid transform issues) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden fixed inset-0 bg-ivory/98 backdrop-blur-md z-[60]"
          >
            {/* Close button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-0 right-0 p-6 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close menu"
            >
              <div className="flex flex-col gap-[5px]">
                <span className="block w-5 h-px bg-charcoal rotate-45 translate-y-[3px] transition-all duration-500" />
                <span className="block w-5 h-px bg-charcoal -rotate-45 -translate-y-[3px] transition-all duration-500" />
              </div>
            </button>

            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="text-2xl font-serif font-light text-charcoal tracking-wide hover:text-gold transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

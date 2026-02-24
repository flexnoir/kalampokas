"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden" style={{ height: "100svh" }}>
      {/* Background with parallax + slow zoom */}
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 12, ease: "easeOut" }}
        style={{ y: imageY }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero-v2.jpg"
          alt="Editorial destination wedding photography"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Cinematic gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-transparent to-charcoal/70" />

      {/* Content — fades out on scroll */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex flex-col items-center justify-end h-full text-center px-6 pb-20 md:pb-28"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2.4 }}
          className="text-soft-white/50 text-[10px] sm:text-[11px] uppercase tracking-[0.5em] font-sans font-light"
        >
          Editorial Wedding Photography
        </motion.span>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 32 }}
          transition={{ duration: 1, delay: 2.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-4 h-px bg-soft-white/30"
        />

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 3.1, ease: "easeOut" }}
          className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-soft-white tracking-wide leading-[1.2]"
        >
          Timeless Moments,
          <br />
          <span className="italic">Artfully Captured</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.6 }}
          className="mt-5 text-soft-white/40 text-[12px] sm:text-[13px] font-sans font-light tracking-[0.15em]"
        >
          Greece &middot; Worldwide
        </motion.p>

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 4.0 }}
          href="#contact"
          className="mt-10 inline-block border border-soft-white/20 text-soft-white/80 text-[10px] uppercase tracking-[0.35em] px-10 py-4 font-sans font-light hover:bg-soft-white/10 hover:border-soft-white/40 transition-all duration-700"
        >
          Inquire
        </motion.a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 4.5, duration: 1 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-soft-white origin-top"
        />
      </motion.div>
    </section>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface OfferHeroProps {
  clientName: string;
  eventDate: string;
  eventLocation: string;
  eventType: "wedding" | "christening" | "event";
}

export default function OfferHero({ clientName, eventDate, eventLocation, eventType }: OfferHeroProps) {
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
      {/* Background with parallax */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1.02 }}
        transition={{ duration: 10, ease: "easeOut" }}
        style={{ y: imageY }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero-v2.jpg"
          alt="Wedding photography"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Cinematic gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/10 to-charcoal/70" />

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex flex-col items-center justify-end h-full text-center px-6 pb-20 md:pb-28"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-soft-white/50 text-[10px] sm:text-[11px] uppercase tracking-[0.5em] font-sans font-light"
        >
          {eventType === "christening"
            ? "Christening Photography Proposal"
            : eventType === "event"
              ? "Event Photography Proposal"
              : "Wedding Photography Proposal"}
        </motion.span>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 32 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-4 h-px bg-soft-white/30"
        />

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.0, ease: "easeOut" }}
          className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-soft-white tracking-wide leading-[1.2]"
        >
          Tailored Proposal for
          <br />
          <span className="italic">{clientName}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-5 text-soft-white/40 text-[12px] sm:text-[13px] font-sans font-light tracking-[0.15em]"
        >
          {eventDate} &middot; {eventLocation}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2.0, duration: 1 }}
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

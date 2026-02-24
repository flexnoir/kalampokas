"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const pressFeatures = [
  {
    title: "Embracing Airy, Greek Summer Vibes at Ammoa Luxury Hotel & Spa Resort",
    coverImage: "/images/press-1.jpg",
    url: "https://www.stylemepretty.com/2025/03/10/embracing-airy-greek-summer-vibes-at-ammoa-luxury-hotel-spa-resort/",
    publication: "Style Me Pretty",
  },
  {
    title: "Lightness and Elegance in Corfu",
    coverImage: "/images/press-2-v2.jpg",
    url: "https://amberandmuse.com/lightness-and-elegance-in-corfu/",
    publication: "Amber & Muse",
  },
  {
    title: "A Vintage Wedding for Angeliki and Kyriakos",
    coverImage: "/images/press-3.webp",
    url: "https://caratsandcake.com/wedding/angeliki-and-kyriakos",
    publication: "Carats & Cake",
  },
];

export default function Press() {
  const containerRef = useRef<HTMLDivElement>(null);
  const count = pressFeatures.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Total scrollable width: 40vw spacer + count * 100vw, minus one screen
  const totalShift = 40 + (count - 1) * 100;
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${totalShift}vw`]);

  return (
    <section id="press">
      <div ref={containerRef} style={{ height: `${count * 100 + 40}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-black">
          <motion.div style={{ x }} className="flex h-full">
            {/* Empty spacer before first card */}
            <div className="shrink-0 w-[40vw]" />
            {pressFeatures.map((entry, i) => (
              <div
                key={entry.url}
                className="flex shrink-0 w-screen h-full"
              >
                {/* Image — left side, natural aspect ratio, full height */}
                <div className={`hidden md:block h-full py-8 pl-8 lg:pl-16`}>
                  <div className="relative h-full overflow-hidden" style={{ aspectRatio: "2 / 3" }}>
                    <Image
                      src={entry.coverImage}
                      alt={entry.title}
                      fill
                      className="object-cover"
                      sizes="40vw"
                    />
                  </div>
                </div>

                {/* Content — right side */}
                <div className="w-full md:w-[55%] h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 relative">
                  {/* Mobile image background */}
                  <div className="absolute inset-0 md:hidden">
                    <Image
                      src={entry.coverImage}
                      alt={entry.title}
                      fill
                      className="object-cover opacity-15"
                      sizes="100vw"
                    />
                  </div>

                  <div className="relative z-10">
                    <span className="text-[10px] uppercase tracking-[0.35em] text-gold/60 font-sans font-light">
                      {entry.publication}
                    </span>

                    <h3 className="mt-5 text-2xl md:text-3xl lg:text-[2.5rem] font-serif font-light text-soft-white/85 leading-[1.3] max-w-md italic">
                      {entry.title}
                    </h3>

                    <a
                      href={entry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-10 text-[10px] uppercase tracking-[0.35em] text-soft-white/40 font-sans font-light hover:text-gold/60 transition-colors duration-500"
                    >
                      Explore &rarr;
                    </a>
                  </div>

                  {/* Slide counter */}
                  <div className="absolute bottom-10 right-8 md:right-16 lg:right-24">
                    <span className="text-[11px] text-soft-white/15 font-sans font-light tracking-wider">
                      {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

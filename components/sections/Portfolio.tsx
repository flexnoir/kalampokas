"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import SectionTitle from "../ui/SectionTitle";

interface PortfolioProps {
  images: { src: string; alt: string }[];
}

export default function Portfolio({ images }: PortfolioProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Horizontal scroll: translate gallery based on vertical scroll
  const galleryX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${Math.max(0, (images.length - 2) * 20)}%`]
  );

  if (images.length === 0) return null;

  return (
    <section id="portfolio" className="py-16 md:py-40">
      <div className="px-6 lg:px-16 max-w-7xl mx-auto">
        <SectionTitle label="Portfolio" title="A Collection of Love Stories" />
      </div>

      {/* Mobile: vertical masonry */}
      <div className="md:hidden px-4">
        <div className="columns-2 gap-2">
          {images.map((img, i) => (
            <button
              key={img.src}
              onClick={() => {
                setLightboxIndex(i);
                setLightboxOpen(true);
              }}
              className="relative w-full mb-2 overflow-hidden group block"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={800}
                height={1000}
                className="w-full h-auto object-cover"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500" />
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: horizontal scroll gallery */}
      <div ref={containerRef} className="hidden md:block overflow-hidden">
        <motion.div
          style={{ x: galleryX }}
          className="flex gap-4 pl-16 pr-[20vw]"
        >
          {images.map((img, i) => (
            <motion.button
              key={img.src}
              onClick={() => {
                setLightboxIndex(i);
                setLightboxOpen(true);
              }}
              className="relative shrink-0 overflow-hidden group"
              style={{
                width: i % 3 === 0 ? "45vw" : "30vw",
                height: i % 3 === 0 ? "60vh" : "50vh",
              }}
              whileHover={{ scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="45vw"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-700" />

              {/* Image caption on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[11px] uppercase tracking-[0.25em] text-soft-white/80 font-sans font-light">
                  {img.alt}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={images.map((img) => ({ src: img.src, alt: img.alt }))}
      />
    </section>
  );
}

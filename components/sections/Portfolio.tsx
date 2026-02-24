"use client";

import { useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import SectionTitle from "../ui/SectionTitle";
import type { PortfolioImage } from "@/lib/portfolio";


interface PortfolioProps {
  images: PortfolioImage[];
}

export default function Portfolio({ images }: PortfolioProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const galleryX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "-15%"]
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
    el.style.cursor = "grabbing";
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    el.scrollLeft = scrollLeft.current - walk;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    const el = scrollRef.current;
    if (el) el.style.cursor = "grab";
  }, []);

  if (images.length === 0) return null;

  return (
    <section id="portfolio" className="py-16 md:py-40">
      <div className="px-6 lg:px-16 max-w-7xl mx-auto">
        <SectionTitle label="Portfolio" title="A Collection of Love Stories" />
      </div>

      {/* Horizontal scroll gallery */}
      <div ref={containerRef} className="overflow-hidden">
        <motion.div style={{ x: galleryX }}>
          <div
            ref={scrollRef}
            className="flex gap-3 md:gap-4 pl-4 md:pl-16 overflow-x-auto pr-4 md:pr-16 pb-4 scrollbar-hide select-none items-start [--gallery-h:55vh] md:[--gallery-h:70vh]"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              cursor: "grab",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {images.map((img) => {
              const aspect = img.width / img.height;
              return (
                <div
                  key={img.src}
                  className="relative shrink-0 overflow-hidden"
                  style={{
                    height: "var(--gallery-h)",
                    width: `calc(var(--gallery-h) * ${aspect})`,
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    draggable={false}
                    className="object-contain pointer-events-none"
                    sizes="40vw"
                  />
                </div>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-6 text-center">
          <span className="text-[10px] uppercase tracking-[0.35em] text-warm-gray/40 font-sans font-light">
            <span className="hidden md:inline">Drag to explore &rarr;</span>
            <span className="md:hidden">Swipe to explore &rarr;</span>
          </span>
        </div>
      </div>
    </section>
  );
}

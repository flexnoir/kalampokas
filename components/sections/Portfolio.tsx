"use client";

import { useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import SectionTitle from "../ui/SectionTitle";
import type { PortfolioImage } from "@/lib/portfolio";

const GALLERY_HEIGHT_VH = 70;

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

      {/* Mobile: vertical masonry with real aspect ratios */}
      <div className="md:hidden px-4">
        <div className="columns-2 gap-2">
          {images.map((img) => (
            <div
              key={img.src}
              className="relative w-full mb-2 overflow-hidden"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                className="w-full h-auto"
                sizes="50vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: horizontal scroll gallery — drag to explore */}
      <div ref={containerRef} className="hidden md:block overflow-hidden">
        <motion.div style={{ x: galleryX }}>
          <div
            ref={scrollRef}
            className="flex gap-4 pl-16 overflow-x-auto pr-16 pb-4 scrollbar-hide select-none items-start"
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
                    height: `${GALLERY_HEIGHT_VH}vh`,
                    width: `calc(${GALLERY_HEIGHT_VH}vh * ${aspect})`,
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    draggable={false}
                    className="object-contain pointer-events-none"
                    sizes={`${Math.round(GALLERY_HEIGHT_VH * aspect)}vh`}
                  />
                </div>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-6 text-center">
          <span className="text-[10px] uppercase tracking-[0.35em] text-warm-gray/40 font-sans font-light">
            Drag to explore &rarr;
          </span>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  aspect = "3/4",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: ParallaxImageProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className="relative overflow-hidden" style={{ aspectRatio: aspect }}>
      <motion.div style={{ y }} className="absolute inset-[-15%]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes}
          priority={priority}
        />
      </motion.div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";

interface OfferGalleryProps {
  images: string[];
}

export default function OfferGallery({ images }: OfferGalleryProps) {
  return (
    <section className="py-16 md:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-16">
        <SectionTitle label="Recent Work" title="A Preview of Your Story" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
              className="relative aspect-[3/4] overflow-hidden group"
            >
              <Image
                src={src}
                alt="Wedding photography sample"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

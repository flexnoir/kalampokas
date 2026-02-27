"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import type { OfferTestimonial } from "@/types";

interface OfferTestimonialsProps {
  testimonials: OfferTestimonial[];
}

export default function OfferTestimonials({ testimonials }: OfferTestimonialsProps) {
  return (
    <section className="py-16 md:py-32 bg-soft-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-16">
        <SectionTitle label="The experience is best described" title="by those who have lived it" />

        <div className={`grid grid-cols-1 ${testimonials.length > 1 ? "md:grid-cols-2" : ""} gap-12 md:gap-16`}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.couple}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
              className="text-center"
            >
              <span className="block font-serif text-5xl md:text-6xl text-gold/25 leading-none select-none">
                &ldquo;
              </span>

              <blockquote className="mt-2 font-serif text-lg md:text-xl text-charcoal leading-relaxed font-light italic">
                {t.quote}
              </blockquote>

              <div className="mt-8 w-6 h-px bg-gold/40 mx-auto" />

              <div className="mt-4">
                <span className="block text-[13px] font-sans font-medium tracking-[0.05em] text-charcoal">
                  {t.couple}
                </span>
                <span className="block mt-1 text-[10px] uppercase tracking-[0.25em] text-warm-gray/60 font-sans font-light">
                  {t.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

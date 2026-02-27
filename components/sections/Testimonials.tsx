"use client";

import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";

const testimonials = [
  {
    quote:
      "He didn't just photograph our wedding — he preserved the feeling of it. Every image takes us right back to that magical evening in Mykonos.",
    couple: "Elizabeth & Christopher",
    location: "Mykonos",
  },
  {
    quote:
      "Effortlessly elegant, impossibly talented, and the kindest soul. Our photos are our most treasured possession.",
    couple: "Claudia & Tiago",
    location: "Milano",
  },
  {
    quote:
      "We wanted someone who would capture the quiet, candid moments — and that's exactly what we received. Pure art.",
    couple: "Carol & Alex",
    location: "Athens",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-40 bg-soft-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-16">
        <SectionTitle label="The experience is best described" title="by those who have lived it" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.couple}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
              className="text-center"
            >
              {/* Decorative quote mark */}
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

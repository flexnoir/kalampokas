"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import type { OfferPackage } from "@/types";

interface OfferPackagesProps {
  packages: OfferPackage[];
  selectedPackageId: string | null;
  onSelectPackage: (id: string) => void;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function OfferPackages({
  packages,
  selectedPackageId,
  onSelectPackage,
}: OfferPackagesProps) {
  return (
    <section className="py-16 md:py-32 bg-soft-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-16">
        <SectionTitle label="Collections" title="Choose Your Experience" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {packages.map((pkg, i) => {
            const isSelected = selectedPackageId === pkg.id;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
                className={`relative flex flex-col p-8 md:p-10 transition-all duration-500 ${
                  isSelected
                    ? "border border-gold/60 bg-ivory"
                    : "border border-warm-gray/15 bg-soft-white hover:border-warm-gray/30"
                }`}
              >
                {/* Package name */}
                <h3 className="font-serif text-2xl md:text-[1.7rem] italic font-light text-charcoal text-center mt-2">
                  &ldquo;{pkg.name}&rdquo;
                </h3>

                {/* Description */}
                <p className="mt-4 text-[13px] text-warm-gray/70 font-sans font-light leading-relaxed text-center">
                  {pkg.description}
                </p>

                {/* Divider */}
                <div className="mt-6 w-8 h-px bg-gold/30 mx-auto" />

                {/* Features */}
                <ul className="mt-6 space-y-3 flex-1">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-[13px] font-sans font-light text-charcoal/70"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-gold/50 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price */}
                <div className="mt-8 text-center">
                  <span className="font-serif text-3xl md:text-4xl font-light text-charcoal">
                    {formatPrice(pkg.price)}
                  </span>
                </div>

                {/* Select button */}
                <button
                  onClick={() => onSelectPackage(pkg.id)}
                  className={`mt-8 w-full text-[11px] uppercase tracking-[0.3em] font-sans font-light px-8 py-4 transition-all duration-500 ${
                    isSelected
                      ? "bg-charcoal text-ivory border border-charcoal"
                      : "border border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-ivory hover:border-charcoal"
                  }`}
                >
                  {isSelected ? "Selected" : "Select Collection"}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

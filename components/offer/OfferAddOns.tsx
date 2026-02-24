"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import type { OfferAddOn } from "@/types";

interface OfferAddOnsProps {
  addOns: OfferAddOn[];
  selectedAddOnIds: string[];
  onToggleAddOn: (id: string) => void;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function OfferAddOns({
  addOns,
  selectedAddOnIds,
  onToggleAddOn,
}: OfferAddOnsProps) {
  return (
    <section className="py-16 md:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-16">
        <SectionTitle label="Enhance Your Experience" title="Additional Options" />

        <div className="space-y-4">
          {addOns.map((addon, i) => {
            const isSelected = selectedAddOnIds.includes(addon.id);

            return (
              <motion.button
                key={addon.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                onClick={() => onToggleAddOn(addon.id)}
                className={`w-full flex items-center gap-5 p-5 md:p-6 text-left transition-all duration-500 ${
                  isSelected
                    ? "border border-gold/50 bg-gold/5"
                    : "border border-warm-gray/15 hover:border-warm-gray/30"
                }`}
              >
                {/* Checkbox */}
                <div
                  className={`shrink-0 w-5 h-5 border transition-all duration-300 flex items-center justify-center ${
                    isSelected
                      ? "border-gold bg-gold"
                      : "border-warm-gray/30"
                  }`}
                >
                  {isSelected && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.5 6L5 8.5L9.5 3.5"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <span className="block text-[14px] font-sans font-medium tracking-wide text-charcoal">
                    {addon.name}
                  </span>
                  <span className="block mt-1 text-[12px] font-sans font-light text-warm-gray/60">
                    {addon.description}
                  </span>
                </div>

                {/* Price */}
                <span className="shrink-0 font-serif text-lg font-light text-charcoal">
                  {addon.percentageCost
                    ? `+${addon.percentageCost}%`
                    : `+${formatPrice(addon.price)}`}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

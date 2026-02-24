"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import type { OfferPackage, OfferAddOn } from "@/types";

interface OfferResponseProps {
  selectedPackage: OfferPackage | null;
  selectedAddOns: OfferAddOn[];
  totalPrice: number;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function OfferResponse({
  selectedPackage,
  selectedAddOns,
  totalPrice,
}: OfferResponseProps) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "accepted">("idle");

  const handleAccept = () => {
    setStatus("accepted");
  };

  const inputClasses =
    "w-full bg-transparent border-b border-warm-gray/20 py-4 text-charcoal font-sans text-[14px] font-light tracking-wide placeholder:text-warm-gray/40 focus:border-gold/60 focus:outline-none transition-colors duration-500";

  if (status !== "idle") {
    return (
      <section className="py-16 md:py-32 bg-soft-white">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-8 h-px bg-gold/40 mx-auto" />
            <h3 className="mt-6 font-serif text-2xl md:text-3xl font-light text-charcoal">
              Thank You
            </h3>
            <p className="mt-4 text-warm-gray text-[15px] font-sans font-light leading-relaxed">
              Your response has been received. I&apos;ll be in touch very soon to discuss the next steps and start planning your beautiful day.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-32 bg-soft-white">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="text-center">
            <span className="text-[10px] uppercase tracking-[0.35em] text-warm-gray/60 font-sans font-light">
              Your Decision
            </span>
            <div className="mt-4 w-8 h-px bg-gold/40 mx-auto" />
            <h2 className="mt-6 font-serif text-2xl md:text-[2.75rem] font-light text-charcoal tracking-wide">
              Ready to Proceed?
            </h2>
          </div>
        </AnimateOnScroll>

        {/* Summary */}
        {selectedPackage && (
          <AnimateOnScroll delay={0.1}>
            <div className="mt-10 md:mt-14 border border-warm-gray/15 p-6 md:p-8">
              <h4 className="text-[11px] uppercase tracking-[0.3em] text-warm-gray/60 font-sans font-light">
                Your Selection
              </h4>

              <div className="mt-4 flex items-center justify-between">
                <span className="font-serif text-lg italic text-charcoal font-light">
                  {selectedPackage.name}
                </span>
                <span className="font-serif text-lg text-charcoal font-light">
                  {formatPrice(selectedPackage.price)}
                </span>
              </div>

              {selectedAddOns.length > 0 && (
                <div className="mt-4 pt-4 border-t border-warm-gray/10 space-y-2">
                  {selectedAddOns.map((addon) => (
                    <div key={addon.id} className="flex items-center justify-between">
                      <span className="text-[13px] font-sans font-light text-charcoal/70">
                        {addon.name}
                      </span>
                      <span className="text-[13px] font-sans font-light text-charcoal/70">
                        {addon.percentageCost
                          ? `+${addon.percentageCost}% (${formatPrice(Math.round(selectedPackage.price * (addon.percentageCost / 100)))})`
                          : `+${formatPrice(addon.price)}`}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-warm-gray/15 flex items-center justify-between">
                <span className="text-[12px] uppercase tracking-[0.2em] font-sans font-medium text-charcoal">
                  Total
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-2xl font-light text-charcoal">
                    {formatPrice(totalPrice)}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-warm-gray/50 font-sans font-light">
                    VAT excl.
                  </span>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        )}

        {/* Message */}
        <AnimateOnScroll delay={0.15}>
          <div className="mt-8">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Leave a message (optional)..."
              className={`${inputClasses} resize-none`}
            />
          </div>
        </AnimateOnScroll>

        {/* Buttons */}
        <AnimateOnScroll delay={0.2}>
          <div className="mt-10 text-center">
            <button
              onClick={handleAccept}
              className="inline-block bg-charcoal text-ivory text-[11px] uppercase tracking-[0.3em] font-sans font-light px-12 py-4 border border-charcoal hover:bg-charcoal/90 transition-all duration-500"
            >
              Accept Proposal
            </button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

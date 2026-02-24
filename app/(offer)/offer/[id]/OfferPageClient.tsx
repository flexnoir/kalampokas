"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { OfferData } from "@/types";
import OfferHero from "@/components/offer/OfferHero";
import OfferIntro from "@/components/offer/OfferIntro";
import OfferPackages from "@/components/offer/OfferPackages";
import OfferAddOns from "@/components/offer/OfferAddOns";
import OfferTestimonials from "@/components/offer/OfferTestimonials";
import OfferGallery from "@/components/offer/OfferGallery";
import OfferResponse from "@/components/offer/OfferResponse";
import OfferFooter from "@/components/offer/OfferFooter";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function OfferPageClient({ offer }: { offer: OfferData }) {
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);

  const selectedPackage = offer.packages.find((p) => p.id === selectedPackageId) ?? null;
  const selectedAddOns = offer.addOns.filter((a) => selectedAddOnIds.includes(a.id));
  const packagePrice = selectedPackage?.price ?? 0;
  const addOnsFixedTotal = selectedAddOns
    .filter((a) => !a.percentageCost)
    .reduce((sum, a) => sum + a.price, 0);
  const addOnsPercentageTotal = selectedAddOns
    .filter((a) => a.percentageCost)
    .reduce((sum, a) => Math.round(packagePrice * (a.percentageCost! / 100)) + sum, 0);
  const totalPrice = packagePrice + addOnsFixedTotal + addOnsPercentageTotal;

  const ndaIds = ["full-nda", "partial-nda"];

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      // NDA options are mutually exclusive
      if (ndaIds.includes(id)) {
        return [...prev.filter((x) => !ndaIds.includes(x)), id];
      }
      return [...prev, id];
    });
  };

  return (
    <>
      <OfferHero
        clientName={offer.clientName}
        eventDate={offer.eventDate}
        eventLocation={offer.eventLocation}
      />
      <OfferIntro
        introText={offer.introText}
        photographerName={offer.photographerName}
      />
      <OfferPackages
        packages={offer.packages}
        selectedPackageId={selectedPackageId}
        onSelectPackage={setSelectedPackageId}
      />
      <OfferAddOns
        addOns={offer.addOns}
        selectedAddOnIds={selectedAddOnIds}
        onToggleAddOn={toggleAddOn}
      />
      <OfferTestimonials testimonials={offer.testimonials} />
      <OfferGallery images={offer.galleryImages} />
      <OfferResponse
        selectedPackage={selectedPackage}
        selectedAddOns={selectedAddOns}
        totalPrice={totalPrice}
      />
      <OfferFooter />

      {/* Sticky bottom bar — shows when a package is selected */}
      <AnimatePresence>
        {selectedPackage && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-charcoal/95 backdrop-blur-sm border-t border-soft-white/10"
          >
            <div className="max-w-6xl mx-auto px-6 lg:px-16 py-4 flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-lg italic text-soft-white/70 font-light hidden sm:inline">
                  {selectedPackage.name}
                </span>
                {selectedAddOns.length > 0 && (
                  <span className="text-[11px] text-soft-white/40 font-sans font-light">
                    + {selectedAddOns.length} extra{selectedAddOns.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl font-light text-soft-white">
                  {formatPrice(totalPrice)}
                </span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-soft-white/40 font-sans font-light">
                  VAT excl.
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

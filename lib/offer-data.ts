import type { OfferData } from "@/types";

const offers: Record<string, OfferData> = {
  "maria-nikos-2026": {
    id: "maria-nikos-2026",
    clientName: "Maria & Nikos",
    eventDate: "15 September 2026",
    eventLocation: "Santorini, Greece",
    introText:
      "Dear Maria & Nikos,\n\nThank you so much for considering me to be part of your special day. It would be an absolute honour to capture your love story against the breathtaking backdrop of Santorini.\n\nPlease take your time reviewing the collections below. Each one has been thoughtfully designed to ensure your memories are preserved with the artistry and care they deserve. I'm always here to discuss any details or create something entirely bespoke for you.",
    packages: [
      {
        id: "classic",
        name: "Classic Elegance",
        description:
          "A refined photography experience for intimate celebrations, capturing the essence of your day with timeless artistry.",
        price: 3000,
        features: [
          "6 hours of coverage",
          "1 photographer",
          "300+ edited images",
          "Online gallery for 12 months",
          "Engagement session included",
          "Travel expenses included",
        ],
      },
      {
        id: "refined",
        name: "Refined & Elevated",
        description:
          "Our most popular collection — an elevated visual narrative, telling the full story of your celebration with cinematic elegance.",
        price: 4500,
        features: [
          "10 hours of coverage",
          "1 photographer + assistant",
          "500+ edited images",
          "Online gallery for 12 months",
          "Engagement session included",
          "Wedding album (30 pages)",
          "Second shooter for ceremony",
          "Travel expenses included",
        ],
        highlighted: true,
      },
      {
        id: "ultimate",
        name: "Ultimate Luxury",
        description:
          "The complete editorial experience — a world-class wedding photography package built around flawless coverage and fine art delivery.",
        price: 7000,
        features: [
          "Full day coverage (up to 14 hours)",
          "2 photographers",
          "800+ edited images",
          "Online gallery for 24 months",
          "Engagement session included",
          "Luxury album (50 pages)",
          "Fine art prints collection",
          "Rehearsal dinner coverage",
          "Same-day preview edit",
          "Travel expenses included",
        ],
      },
    ],
    addOns: [
      {
        id: "extra-hour",
        name: "Extra Hour of Coverage",
        description: "Extended shooting time beyond your package",
        price: 300,
      },
      {
        id: "photographer",
        name: "Additional Photographer",
        description: "Full day second shooter for complete coverage",
        price: 1000,
      },
      {
        id: "day-before-after",
        name: "Rehearsal & Day-After Session",
        description: "3 hours of intimate coverage the day before or after",
        price: 800,
      },
      {
        id: "extra-day",
        name: "Additional Event Day",
        description: "Full coverage for a second day of celebrations",
        price: 2000,
      },
      {
        id: "album",
        name: "Fine-Art Wedding Album",
        description: "Handcrafted heirloom album with archival prints",
        price: 500,
      },
      {
        id: "parent-albums",
        name: "Parent Albums",
        description: "Two smaller replica albums for your families",
        price: 400,
      },
      {
        id: "full-nda",
        name: "Complete Privacy Agreement",
        description: "Full NDA — 100% privacy, no images shared publicly",
        price: 0,
        percentageCost: 20,
      },
      {
        id: "partial-nda",
        name: "Partial Privacy Agreement",
        description: "Partial NDA — bride & groom faces remain private",
        price: 0,
        percentageCost: 10,
      },
    ],
    testimonials: [
      {
        quote:
          "Lefteris didn't just photograph our wedding — he preserved the very feeling of it. Every image tells a story we get to relive again and again.",
        couple: "Elena & Dimitris",
        location: "Mykonos, Greece",
      },
      {
        quote:
          "Our photos are our most treasured possession. Pure art, captured with heart. We couldn't have dreamed of anything more beautiful.",
        couple: "Sophie & James",
        location: "Amalfi Coast, Italy",
      },
    ],
    galleryImages: [
      "/images/portfolio/11-ethereal-veil.jpg",
      "/images/portfolio/04-bride-getting-ready.jpg",
      "/images/portfolio/08-seaside-reception.jpg",
      "/images/portfolio/05-bridal-veil-detail.jpg",
      "/images/portfolio/09-luxury-reception-setup.jpg",
      "/images/portfolio/10-garden-dinner.jpg",
    ],
    photographerName: "Lefteris",
  },
};

export function getOfferById(id: string): OfferData | null {
  return offers[id] ?? null;
}

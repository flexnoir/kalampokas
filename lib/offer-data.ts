import type { OfferData, OfferPackage, OfferAddOn } from "@/types";
import { client, offerBySlugQuery } from "@/lib/sanity";

// Hardcoded package definitions — only prices come from Sanity
const packageDefinitions: Omit<OfferPackage, "price">[] = [
  {
    id: "classic",
    name: "Classic Elegance",
    description:
      "A refined photography experience for intimate celebrations, capturing the essence of your day with timeless artistry.",
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
];

const addonDefinitions: Omit<OfferAddOn, "price" | "percentageCost">[] = [
  {
    id: "extra-hour",
    name: "Extra Hour of Coverage",
    description: "Extended shooting time beyond your package",
  },
  {
    id: "photographer",
    name: "Additional Photographer",
    description: "Full day second shooter for complete coverage",
  },
  {
    id: "day-before-after",
    name: "Rehearsal & Day-After Session",
    description: "3 hours of intimate coverage the day before or after",
  },
  {
    id: "extra-day",
    name: "Additional Event Day",
    description: "Full coverage for a second day of celebrations",
  },
  {
    id: "album",
    name: "Fine-Art Wedding Album",
    description: "Handcrafted heirloom album with archival prints",
  },
  {
    id: "parent-albums",
    name: "Parent Albums",
    description: "Two smaller replica albums for your families",
  },
  {
    id: "full-nda",
    name: "Complete Privacy Agreement",
    description: "Full NDA — 100% privacy, no images shared publicly",
  },
  {
    id: "partial-nda",
    name: "Partial Privacy Agreement",
    description: "Partial NDA — bride & groom faces remain private",
  },
];

// Map addon ID (kebab-case) to Sanity field name (camelCase)
const addonIdToField: Record<string, string> = {
  "extra-hour": "extraHour",
  photographer: "photographer",
  "day-before-after": "dayBeforeAfter",
  "extra-day": "extraDay",
  album: "album",
  "parent-albums": "parentAlbums",
  "full-nda": "fullNda",
  "partial-nda": "partialNda",
};

const NDA_ADDON_IDS = new Set(["full-nda", "partial-nda"]);

interface SanityOffer {
  _id: string;
  clientName: string;
  clientEmail?: string;
  slug: { current: string };
  eventDate: string;
  eventLocation: string;
  packagePrices: { classic: number; refined: number; ultimate: number };
  addonPrices: Record<string, number>;
  isExpired: boolean;
  status: string;
}

function getIntroText(clientName: string): string {
  return `Dear ${clientName},\n\nThank you so much for considering me to be part of your special day. It would be an absolute honour to capture your love story against the breathtaking backdrop of your celebration.\n\nPlease take your time reviewing the collections below. Each one has been thoughtfully designed to ensure your memories are preserved with the artistry and care they deserve. I'm always here to discuss any details or create something entirely bespoke for you.`;
}

const defaultGalleryImages = [
  "/images/portfolio/11-ethereal-veil.jpg",
  "/images/portfolio/04-bride-getting-ready.jpg",
  "/images/portfolio/08-seaside-reception.jpg",
  "/images/portfolio/05-bridal-veil-detail.jpg",
  "/images/portfolio/09-luxury-reception-setup.jpg",
  "/images/portfolio/10-garden-dinner.jpg",
];

const defaultTestimonials = [
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
];

export async function getOfferBySlug(
  slug: string
): Promise<OfferData | null> {
  const sanityOffer = await client.fetch<SanityOffer | null>(
    offerBySlugQuery,
    { slug },
    { next: { revalidate: 0 } }
  );

  if (!sanityOffer) {
    return null;
  }

  const packages: OfferPackage[] = packageDefinitions.map((pkg) => ({
    ...pkg,
    price: sanityOffer.packagePrices?.[pkg.id as keyof typeof sanityOffer.packagePrices] ?? 0,
  }));

  const addOns: OfferAddOn[] = addonDefinitions.map((addon) => {
    const field = addonIdToField[addon.id];
    const value = sanityOffer.addonPrices?.[field] ?? 0;

    if (NDA_ADDON_IDS.has(addon.id)) {
      return { ...addon, price: 0, percentageCost: value };
    }
    return { ...addon, price: value };
  });

  return {
    id: sanityOffer.slug.current,
    clientName: sanityOffer.clientName,
    eventDate: sanityOffer.eventDate || "",
    eventLocation: sanityOffer.eventLocation || "",
    introText: getIntroText(sanityOffer.clientName),
    packages,
    addOns,
    testimonials: defaultTestimonials,
    galleryImages: defaultGalleryImages,
    photographerName: "Lefteris",
    status: sanityOffer.status as OfferData["status"] || "draft",
    isExpired: sanityOffer.isExpired ?? false,
  };
}

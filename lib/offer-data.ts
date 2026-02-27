import type { OfferData, OfferPackage, OfferAddOn, OfferTestimonial } from "@/types";
import { client, offerBySlugQuery } from "@/lib/sanity";

// ─── Wedding content ───

const weddingPackages: Omit<OfferPackage, "price">[] = [
  {
    id: "classic",
    name: "The Signature Day",
    description:
      "A refined, focused coverage of your wedding day with intentional storytelling.",
    features: [
      "One Photographer — Lefteris Kalampokas",
      "Full-day coverage, up to 10 consecutive hours",
      "Drone coverage, weather and legal conditions permitting",
      "Carefully curated high-resolution image collection",
      "Private online gallery for viewing and download",
      "Preview selection delivered within the first week",
      "Full gallery delivered within approximately six weeks",
    ],
  },
  {
    id: "refined",
    name: "The Complete Story",
    description:
      "For couples who value depth, nuance and seamless coverage. This is the collection most couples choose.",
    features: [
      "Two Photographers",
      "Full-day coverage, up to 10 consecutive hours",
      "Parallel preparations coverage",
      "Drone coverage, weather and legal conditions permitting",
      "Expanded curated high-resolution image collection",
      "Private online gallery for viewing and download",
      "Preview selection delivered within the first week",
      "Full gallery delivered within approximately six weeks",
    ],
    highlighted: true,
  },
  {
    id: "ultimate",
    name: "The Editorial Weekend",
    description:
      "A multi-day, immersive documentation designed for destination celebrations.",
    features: [
      "Two Photographers",
      "Welcome dinner or rehearsal coverage",
      "Full wedding day coverage, up to 10 consecutive hours",
      "After-wedding brunch or farewell gathering",
      "Drone coverage, weather and legal conditions permitting",
      "Comprehensive curated collection across all events",
      "Private online gallery for viewing and download",
      "Preview selection delivered within the first week",
      "Full gallery delivered within approximately six weeks",
    ],
  },
];

const weddingAddons: Omit<OfferAddOn, "price" | "percentageCost">[] = [
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

const weddingGallery = [
  "/images/wedding/01-couple-kiss.jpg",
  "/images/wedding/02-table-detail.jpg",
  "/images/wedding/03-venue-window.jpg",
  "/images/wedding/04-couple-walk.jpg",
  "/images/wedding/05-aerial-view.jpg",
  "/images/wedding/06-party-moment.jpg",
];

const weddingTestimonials: OfferTestimonial[] = [
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

function weddingIntroText(clientName: string): string {
  return `Dear ${clientName},\n\nThank you so much for considering me to be part of your special day. It would be an absolute honour to capture your love story against the breathtaking backdrop of your celebration.\n\nPlease take your time reviewing the collections below. Each one has been thoughtfully designed to ensure your memories are preserved with the artistry and care they deserve. I'm always here to discuss any details or create something entirely bespoke for you.`;
}

// ─── Christening content ───

const christeningPackage: Omit<OfferPackage, "price"> = {
  id: "christening",
  name: "Christening Coverage",
  description:
    "A thoughtful photography experience designed to preserve the beauty and emotion of your child's christening day.",
  features: [
    "Full ceremony coverage",
    "1 photographer",
    "200+ edited images",
    "Online gallery for 12 months",
    "Travel expenses included",
  ],
};

const christeningGallery = [
  "/images/portfolio/09-luxury-reception-setup.jpg",
  "/images/portfolio/10-garden-dinner.jpg",
  "/images/portfolio/02-greek-chapel.jpg",
  "/images/portfolio/07-floral-centerpiece.jpg",
];

const christeningTestimonials: OfferTestimonial[] = [
  {
    quote:
      "Lefteris captured every tender moment of our daughter's christening with such warmth and artistry. These photos are truly priceless.",
    couple: "Maria & Giorgos",
    location: "Athens, Greece",
  },
  {
    quote:
      "The images are stunning — every detail, every emotion, beautifully preserved. We couldn't be happier.",
    couple: "Anna & Nikos",
    location: "Thessaloniki, Greece",
  },
];

function christeningIntroText(clientName: string): string {
  return `Dear ${clientName},\n\nThank you so much for considering me to capture this beautiful milestone. It would be an honour to preserve the joy and emotion of your child's christening day.\n\nPlease review the details below. I'm always here to discuss any specifics or tailor the experience to your needs.`;
}

// ─── Event content ───

const eventPackage: Omit<OfferPackage, "price"> = {
  id: "event",
  name: "Event Coverage",
  description:
    "A tailored photography experience designed to capture the atmosphere, moments, and details of your special occasion.",
  features: [
    "Up to 8 consecutive hours",
    "2 photographers",
    "Comprehensive documentary coverage of the event",
    "Refined editorial coverage of all guests throughout the evening",
    "Atmosphere, styling and defining moments",
    "Carefully edited high resolution images",
    "Private online gallery for viewing and download",
  ],
};

const eventAddons: Omit<OfferAddOn, "price">[] = [
  {
    id: "event-extra-hour",
    name: "Additional Hour",
    description: "Extended shooting time beyond the included 8 hours",
  },
  {
    id: "event-third-photographer",
    name: "Third Photographer",
    description: "An additional photographer for wider coverage",
  },
  {
    id: "event-express-delivery",
    name: "Express Delivery",
    description: "Receive your edited gallery within 5 working days",
  },
];

const eventGallery = [
  "/images/events/01-underworld-setup.jpg",
  "/images/events/02-versailles-crowd.jpg",
  "/images/events/03-havana-dancers.jpg",
  "/images/events/04-evalend-bar.jpg",
  "/images/events/05-havana-portrait.jpg",
  "/images/events/06-versailles-masquerade.jpg",
];

const eventTestimonials: OfferTestimonial[] = [
  {
    quote:
      "Lefteris has an incredible eye for capturing the energy and emotion of any occasion. Our photos are absolutely stunning.",
    couple: "Christina & Alexandros",
    location: "Athens, Greece",
  },
  {
    quote:
      "Every detail, every laugh, every special moment — beautifully documented. We couldn't be more grateful.",
    couple: "Elizabeth & Christopher",
    location: "Mykonos, Greece",
  },
];

function eventIntroText(clientName: string): string {
  return `Dear ${clientName},\n\nThank you so much for considering me to photograph your event. It would be an honour to capture the atmosphere and special moments of your celebration.\n\nPlease review the details below. I'm always here to discuss any specifics or tailor the experience to your needs.`;
}

// ─── Shared logic ───

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
  eventType: string;
  christeningPrice?: number;
  eventPrice?: number;
  eventAddonPrices?: { extraHour?: number; thirdPhotographer?: number; expressDelivery?: number };
  packagePrices: { classic: number; refined: number; ultimate: number };
  addonPrices: Record<string, number>;
  isWeddingPlanner: boolean;
  isExpired: boolean;
  status: string;
}

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

  const eventType = (sanityOffer.eventType || "wedding") as OfferData["eventType"];

  // Build packages
  let packages: OfferPackage[];
  let addOns: OfferAddOn[];
  let introText: string;
  let testimonials: OfferTestimonial[];
  let galleryImages: string[];

  switch (eventType) {
    case "christening":
      packages = [{ ...christeningPackage, price: sanityOffer.christeningPrice ?? 0 }];
      addOns = [];
      introText = christeningIntroText(sanityOffer.clientName);
      testimonials = christeningTestimonials;
      galleryImages = christeningGallery;
      break;
    case "event": {
      packages = [{ ...eventPackage, price: sanityOffer.eventPrice ?? 0 }];
      const eap = sanityOffer.eventAddonPrices ?? {};
      const eventAddonIdToField: Record<string, keyof typeof eap> = {
        "event-extra-hour": "extraHour",
        "event-third-photographer": "thirdPhotographer",
        "event-express-delivery": "expressDelivery",
      };
      addOns = eventAddons.map((addon) => ({
        ...addon,
        price: eap[eventAddonIdToField[addon.id]] ?? 0,
      }));
      introText = eventIntroText(sanityOffer.clientName);
      testimonials = eventTestimonials;
      galleryImages = eventGallery;
      break;
    }
    default: // wedding
      packages = weddingPackages.map((pkg) => ({
        ...pkg,
        price: sanityOffer.packagePrices?.[pkg.id as keyof typeof sanityOffer.packagePrices] ?? 0,
      }));
      addOns = weddingAddons.map((addon) => {
        const field = addonIdToField[addon.id];
        const value = sanityOffer.addonPrices?.[field] ?? 0;
        if (NDA_ADDON_IDS.has(addon.id)) {
          return { ...addon, price: 0, percentageCost: value };
        }
        return { ...addon, price: value };
      });
      introText = weddingIntroText(sanityOffer.clientName);
      testimonials = weddingTestimonials;
      galleryImages = weddingGallery;
      break;
  }

  return {
    id: sanityOffer.slug.current,
    clientName: sanityOffer.clientName,
    eventDate: sanityOffer.eventDate || "",
    eventLocation: sanityOffer.eventLocation || "",
    introText,
    packages,
    addOns,
    testimonials,
    galleryImages,
    photographerName: "Lefteris",
    eventType,
    status: sanityOffer.status as OfferData["status"] || "draft",
    isExpired: sanityOffer.isExpired ?? false,
    isWeddingPlanner: sanityOffer.isWeddingPlanner ?? false,
  };
}

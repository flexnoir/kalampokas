export interface JournalPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  coverImage: string;
  date: string;
  location: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  date: string;
  venue: string;
  message: string;
}

// Offer types
export interface OfferPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  highlighted?: boolean;
}

export interface OfferAddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  percentageCost?: number; // percentage of selected package price (e.g. 20 = +20%)
}

export interface OfferTestimonial {
  quote: string;
  couple: string;
  location: string;
}

export interface OfferData {
  id: string;
  clientName: string;
  eventDate: string;
  eventLocation: string;
  introText: string;
  packages: OfferPackage[];
  addOns: OfferAddOn[];
  testimonials: OfferTestimonial[];
  galleryImages: string[];
  photographerName: string;
}

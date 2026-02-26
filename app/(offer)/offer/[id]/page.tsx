import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOfferBySlug } from "@/lib/offer-data";
import OfferPageClient from "./OfferPageClient";
import OfferStatusMessage from "@/components/offer/OfferStatusMessage";

interface OfferPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: OfferPageProps): Promise<Metadata> {
  const { id } = await params;
  const offer = await getOfferBySlug(id);
  const noIndex = { robots: { index: false, follow: false } };
  if (!offer) return { title: "Offer Not Found", ...noIndex };

  const offerUrl = `https://kalampokasfotografia.gr/offer/${id}`;
  return {
    title: `${offer.eventType === "christening" ? "Christening" : "Wedding"} Photography Proposal for ${offer.clientName} | Kalampokas Fotografia`,
    alternates: { canonical: offerUrl },
    openGraph: {
      url: offerUrl,
    },
    ...noIndex,
  };
}

export default async function OfferPage({ params }: OfferPageProps) {
  const { id } = await params;
  const offer = await getOfferBySlug(id);
  if (!offer) notFound();

  if (offer.isExpired) {
    return <OfferStatusMessage type="expired" />;
  }

  return <OfferPageClient offer={offer} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOfferById } from "@/lib/offer-data";
import OfferPageClient from "./OfferPageClient";

interface OfferPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: OfferPageProps): Promise<Metadata> {
  const { id } = await params;
  const offer = getOfferById(id);
  if (!offer) return { title: "Offer Not Found" };

  return {
    title: `Wedding Photography Proposal for ${offer.clientName} | Kalampokas Fotografia`,
    robots: { index: false, follow: false },
  };
}

export default async function OfferPage({ params }: OfferPageProps) {
  const { id } = await params;
  const offer = getOfferById(id);
  if (!offer) notFound();

  return <OfferPageClient offer={offer} />;
}

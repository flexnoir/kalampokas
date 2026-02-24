import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import PageLoader from "@/components/ui/PageLoader";
import CustomCursor from "@/components/ui/CustomCursor";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF9F6",
};

export const metadata: Metadata = {
  title: "Kalampokas Fotografia | Destination Wedding Photography",
  description:
    "Luxury destination wedding photography across Greece, Italy, and the French Riviera. Timeless, editorial imagery for the modern romantic.",
  keywords: [
    "destination wedding photographer",
    "luxury wedding photography",
    "Greece wedding photographer",
    "Santorini wedding",
    "Italy wedding photographer",
  ],
  openGraph: {
    title: "Kalampokas Fotografia | Destination Wedding Photography",
    description:
      "Luxury destination wedding photography across Greece, Italy, and the French Riviera.",
    type: "website",
    locale: "en_US",
    siteName: "Kalampokas Fotografia",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Kalampokas Fotografia",
  description:
    "Luxury destination wedding photography across Greece, Italy, and the French Riviera.",
  image: "/images/hero.jpg",
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    addressCountry: "GR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        <PageLoader />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

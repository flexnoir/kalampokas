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
  metadataBase: new URL("https://kalampokasfotografia.gr"),
  title: "Kalampokas Fotografia | Destination Wedding Photography",
  description:
    "Luxury destination wedding photography across Greece, Italy, and across Europe. Timeless, editorial imagery for the modern romantic.",
  keywords: [
    "destination wedding photographer",
    "luxury wedding photography",
    "Greece wedding photographer",
    "Europe wedding photographer",
    "Santorini wedding photographer",
    "Mykonos wedding photographer",
    "Corfu wedding photographer",
    "Italy wedding photographer",
    "Amalfi Coast wedding photographer",
    "editorial wedding photography",
    "fine art wedding photography",
    "elopement photographer Greece",
    "intimate wedding photographer",
    "Mediterranean wedding photographer",
  ],
  alternates: {
    canonical: "https://kalampokasfotografia.gr",
  },
  openGraph: {
    title: "Kalampokas Fotografia | Destination Wedding Photography",
    description:
      "Luxury destination wedding photography across Greece, Italy, and across Europe.",
    type: "website",
    locale: "en_US",
    siteName: "Kalampokas Fotografia",
    url: "https://kalampokasfotografia.gr",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "Kalampokas Fotografia — Destination Wedding Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalampokas Fotografia | Destination Wedding Photography",
    description:
      "Luxury destination wedding photography across Greece, Italy, and across Europe.",
    images: ["/images/og.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Kalampokas Fotografia",
  url: "https://kalampokasfotografia.gr",
  description:
    "Luxury destination wedding photography across Greece, Italy, and across Europe.",
  image: "https://kalampokasfotografia.gr/images/og.jpg",
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    addressCountry: "GR",
  },
  sameAs: [
    "https://www.instagram.com/kalampokasfotografia",
  ],
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
      <body className="antialiased overflow-x-hidden custom-cursor-scope">
        <PageLoader />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

export interface PortfolioImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const portfolioImages: PortfolioImage[] = [
  { src: "/images/portfolio/02-greek-chapel.jpg", alt: "Greek Island Chapel", width: 1367, height: 2048 },
  { src: "/images/portfolio/04-bride-getting-ready.jpg", alt: "Bride Getting Ready", width: 370, height: 554 },
  { src: "/images/portfolio/05-bridal-veil-detail.jpg", alt: "Bridal Veil Detail", width: 1367, height: 2048 },
  { src: "/images/portfolio/06-bridesmaids-champagne.png", alt: "Bridesmaids Celebration", width: 1365, height: 2048 },
  { src: "/images/portfolio/07-floral-centerpiece.jpg", alt: "Floral Centerpiece", width: 900, height: 1348 },
  { src: "/images/portfolio/08-seaside-reception.jpg", alt: "Seaside Reception", width: 900, height: 1348 },
  { src: "/images/portfolio/09-luxury-reception-setup.jpg", alt: "Luxury Reception Setup", width: 1367, height: 2048 },
  { src: "/images/portfolio/10-garden-dinner.jpg", alt: "Garden Dinner Setting", width: 800, height: 1208 },
  { src: "/images/portfolio/11-ethereal-veil.jpg", alt: "Ethereal Veil", width: 1367, height: 2048 },
  { src: "/images/portfolio/12-bride-through-veil.jpg", alt: "Bride Through the Veil", width: 1536, height: 2048 },
];

export function getPortfolioImages(): PortfolioImage[] {
  return portfolioImages;
}

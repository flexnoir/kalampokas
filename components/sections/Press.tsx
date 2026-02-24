import SectionTitle from "../ui/SectionTitle";
import PressCard from "../ui/PressCard";

const pressFeatures = [
  {
    title: "Embracing Airy, Greek Summer Vibes at Ammoa Luxury Hotel & Spa Resort",
    coverImage: "/images/press-1.jpg",
    url: "https://www.stylemepretty.com/2025/03/10/embracing-airy-greek-summer-vibes-at-ammoa-luxury-hotel-spa-resort/",
    publication: "Style Me Pretty",
  },
  {
    title: "Lightness and Elegance in Corfu",
    coverImage: "/images/press-2-v2.jpg",
    url: "https://amberandmuse.com/lightness-and-elegance-in-corfu/",
    publication: "Amber & Muse",
  },
  {
    title: "A Vintage Wedding for Angeliki and Kyriakos",
    coverImage: "/images/press-3.webp",
    url: "https://caratsandcake.com/wedding/angeliki-and-kyriakos",
    publication: "Carats & Cake",
  },
];

export default function Press() {
  return (
    <section id="press" className="py-16 md:py-40 px-6 lg:px-16 max-w-7xl mx-auto">
      <SectionTitle label="Press" title="As Featured In" />

      <div className="flex flex-col gap-5 md:grid md:grid-cols-3 md:gap-8">
        {pressFeatures.map((entry, i) => (
          <PressCard key={entry.url} {...entry} index={i} />
        ))}
      </div>
    </section>
  );
}

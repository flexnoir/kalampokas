import SectionTitle from "../ui/SectionTitle";
import PressCard from "../ui/PressCard";

const pressFeatures = [
  {
    title: "Embracing Airy, Greek Summer Vibes at Ammoa Luxury Hotel & Spa Resort",
    coverImage: "/images/journal-1.jpg",
    url: "https://stylemepretty.com",
    publication: "Style Me Pretty",
  },
  {
    title: "A Bohemian Dream Wedding in Mykonos",
    coverImage: "/images/journal-2.jpg",
    url: "https://magnoliarouge.com",
    publication: "Magnolia Rouge",
  },
  {
    title: "Elegant Corfu Wedding Featured on Ellwed",
    coverImage: "/images/journal-3.jpg",
    url: "https://ellwed.com",
    publication: "Ellwed",
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

import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";

interface PressCardProps {
  title: string;
  coverImage: string;
  url: string;
  publication: string;
  index: number;
}

export default function PressCard({
  title,
  coverImage,
  url,
  publication,
  index,
}: PressCardProps) {
  return (
    <AnimateOnScroll delay={index * 0.12}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex gap-4 md:block"
      >
        {/* Mobile: square thumbnail | Desktop: full image */}
        <div className="relative w-20 h-20 shrink-0 md:w-full md:h-auto md:aspect-[3/4] overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 80px, 33vw"
          />
        </div>
        <div className="flex flex-col justify-center md:mt-5">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold/80 font-sans font-light">
            {publication}
          </span>
          <h3 className="mt-1 md:mt-2 text-[15px] md:text-base font-serif font-light text-charcoal group-hover:text-gold/80 transition-colors duration-500 leading-snug">
            {title}
          </h3>
        </div>
      </a>
    </AnimateOnScroll>
  );
}

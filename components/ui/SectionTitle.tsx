import AnimateOnScroll from "./AnimateOnScroll";

interface SectionTitleProps {
  label: string;
  title: string;
  className?: string;
}

export default function SectionTitle({ label, title, className = "" }: SectionTitleProps) {
  return (
    <AnimateOnScroll className={`text-center mb-12 md:mb-20 ${className}`}>
      <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-warm-gray/60 font-sans font-light">
        {label}
      </span>
      <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-serif font-light text-charcoal leading-[1.2]">
        {title}
      </h2>
      <div className="mt-5 mx-auto w-8 h-px bg-gold/40" />
    </AnimateOnScroll>
  );
}

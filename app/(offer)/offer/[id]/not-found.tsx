import Link from "next/link";

export default function OfferNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <span className="text-[10px] uppercase tracking-[0.35em] text-warm-gray/60 font-sans font-light">
          Proposal
        </span>
        <div className="mt-4 w-8 h-px bg-gold/40 mx-auto" />
        <h1 className="mt-6 font-serif text-3xl md:text-4xl font-light text-charcoal">
          Not Available
        </h1>
        <p className="mt-4 text-warm-gray text-[15px] font-sans font-light leading-relaxed">
          This proposal is no longer available or the link may be incorrect.
          Please contact us if you believe this is an error.
        </p>
        <Link
          href="/"
          className="inline-block mt-10 border border-charcoal/30 text-charcoal text-[11px] uppercase tracking-[0.3em] px-10 py-4 font-sans font-light hover:bg-charcoal hover:text-ivory hover:border-charcoal transition-all duration-700"
        >
          Visit Website
        </Link>
      </div>
    </div>
  );
}

const messages = {
  expired: {
    title: "This Offer Has Expired",
    description:
      "This proposal is no longer available. Please get in touch if you'd like to discuss a new one.",
  },
  accepted: {
    title: "Proposal Accepted",
    description:
      "This proposal has already been accepted. Thank you — I'll be in touch soon with the next steps.",
  },
};

export default function OfferStatusMessage({
  type,
}: {
  type: "expired" | "accepted";
}) {
  const { title, description } = messages[type];

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-8 h-px bg-gold/40 mx-auto" />
        <h1 className="mt-6 font-serif text-2xl md:text-3xl font-light text-charcoal tracking-wide">
          {title}
        </h1>
        <p className="mt-4 text-warm-gray text-[15px] font-sans font-light leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

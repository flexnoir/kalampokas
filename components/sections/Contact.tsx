"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import AnimateOnScroll from "../ui/AnimateOnScroll";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  date: z.string().min(1, "Please select a date"),
  venue: z.string().min(2, "Please enter your venue or destination"),
  message: z.string().min(10, "Please tell us a bit more about your day"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const inputClasses =
    "w-full bg-transparent border-b border-warm-gray/20 py-4 text-charcoal font-sans text-[14px] font-light tracking-wide placeholder:text-warm-gray/40 focus:border-gold/60 focus:outline-none transition-colors duration-500";

  return (
    <section id="contact" className="py-16 md:py-40 bg-soft-white">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <SectionTitle label="Inquire" title="Let&rsquo;s Create Something Beautiful" />

        <AnimateOnScroll>
          <p className="text-center text-warm-gray/60 text-[13px] font-sans font-light tracking-wider uppercase mb-10 md:mb-14">
            Currently booking 2026-2027 &middot; Limited availability
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          {status === "sent" ? (
            <div className="text-center py-16">
              <div className="w-8 h-px bg-gold/40 mx-auto" />
              <h3 className="mt-6 font-serif text-2xl md:text-3xl font-light text-charcoal">
                Thank you
              </h3>
              <p className="mt-4 text-warm-gray text-[15px] font-sans font-light">
                Your inquiry has been received. I&apos;ll be in touch within 48 hours
                to discuss your celebration.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                <div>
                  <input
                    {...register("name")}
                    placeholder="Name"
                    className={inputClasses}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-[11px] text-muted-rose/80 font-light">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    className={inputClasses}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-[11px] text-muted-rose/80 font-light">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <input
                    {...register("date")}
                    type="date"
                    placeholder="Wedding Date"
                    className={inputClasses}
                  />
                  {errors.date && (
                    <p className="mt-1.5 text-[11px] text-muted-rose/80 font-light">{errors.date.message}</p>
                  )}
                </div>
                <div>
                  <input
                    {...register("venue")}
                    placeholder="Venue or Destination"
                    className={inputClasses}
                  />
                  {errors.venue && (
                    <p className="mt-1.5 text-[11px] text-muted-rose/80 font-light">{errors.venue.message}</p>
                  )}
                </div>
              </div>
              <div>
                <textarea
                  {...register("message")}
                  rows={3}
                  placeholder="Tell me about your day..."
                  className={`${inputClasses} resize-none`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-[11px] text-muted-rose/80 font-light">{errors.message.message}</p>
                )}
              </div>

              {status === "error" && (
                <p className="text-[13px] text-muted-rose/80 font-light text-center">
                  Something went wrong. Please try again or email directly.
                </p>
              )}

              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-block border border-charcoal/30 text-charcoal text-[11px] uppercase tracking-[0.3em] px-12 py-4 font-sans font-light hover:bg-charcoal hover:text-ivory hover:border-charcoal transition-all duration-700 disabled:opacity-40"
                >
                  {status === "sending" ? "Sending..." : "Send Inquiry"}
                </button>
              </div>
            </form>
          )}
        </AnimateOnScroll>
      </div>
    </section>
  );
}

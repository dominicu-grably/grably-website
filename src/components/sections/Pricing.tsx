"use client";

import { Check } from "lucide-react";

import { FadeIn } from "@/components/FadeIn";
import { scrollToId } from "@/lib/scroll";

const INCLUDED: string[] = [
  "1 dispatcher + 2 drivers included",
  "Additional drivers: $19/month each",
  "Free onboarding (Founding Client benefit)",
  "GMV commission waived (Founding Client benefit)",
  "Cancel anytime — no contracts",
];

export function Pricing() {
  return (
    <section id="pricing" className="relative bg-grably-dark">
      {/* Left accent strip */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-1.5 bg-grably-accent"
      />

      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-grably-accent">
            Pricing
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-grably-lightgrn">
            One flat monthly rate. No contracts. Cancel anytime.
          </p>
        </FadeIn>

        <FadeIn className="mx-auto mt-12 max-w-md">
          <div className="relative rounded-lg border-2 border-grably-accent bg-grably-mid p-8">
            {/* Founding client badge */}
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-grably-accent px-3 py-1 text-xs font-bold text-grably-dark">
              FOUNDING CLIENT
            </span>

            {/* Price */}
            <div className="mt-2 text-center">
              <span className="font-serif text-5xl font-bold text-white">
                $399
              </span>
              <span className="text-grably-lightgrn"> / month</span>
            </div>

            {/* Includes */}
            <ul className="mt-8 space-y-3">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-grably-accent"
                    aria-hidden="true"
                  />
                  <span className="text-grably-lightgrn">{item}</span>
                </li>
              ))}
            </ul>

            {/* Annual option */}
            <p className="mt-6 text-center text-sm text-grably-lightgrn">
              $3,990/year — save 2 months
            </p>

            {/* CTA */}
            <button
              type="button"
              onClick={() => scrollToId("demo-form")}
              className="mt-6 w-full rounded bg-grably-accent py-3 font-bold text-grably-dark transition-colors hover:bg-grably-adk"
            >
              Book Your Demo
            </button>

            {/* Fine print */}
            <p className="mt-6 text-xs text-grably-lightgrn/50">
              Founding Client pricing available to first 100 BC retailers.
              Pricing subject to change with 90 days notice.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";

import { FadeIn } from "@/components/FadeIn";
import { scrollToId } from "@/lib/scroll";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden bg-grably-dark"
    >
      {/* Left accent strip */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-1.5 bg-grably-accent"
      />

      {/* G mark watermark */}
      <Image
        src="/logos/G_Logo_watermark_transparent.png"
        alt=""
        aria-hidden="true"
        width={388}
        height={393}
        priority
        className="pointer-events-none absolute right-0 top-0 hidden w-[340px] opacity-[0.07] md:block"
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
        <div className="max-w-3xl">
          <FadeIn>
            <p className="text-xs font-bold uppercase tracking-[3px] text-grably-accent">
              LCRB-Compliant Delivery Dispatch
            </p>
          </FadeIn>

          <FadeIn className="delay-100">
            <h1 className="mt-6 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              The Only Delivery Dispatch Platform Built for BC Cannabis
              Compliance
            </h1>
          </FadeIn>

          <FadeIn className="delay-200">
            <p className="mt-6 max-w-xl text-lg text-grably-lightgrn">
              Grably gives licensed BC retailers LCRB-compliant delivery
              records, driver coordination, and customer communications —
              automated from the first order.
            </p>
          </FadeIn>

          <FadeIn className="delay-300">
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToId("demo-form")}
                className="rounded bg-grably-accent px-6 py-3 font-bold text-grably-dark transition-colors hover:bg-grably-adk"
              >
                Book a Demo
              </button>
              <button
                type="button"
                onClick={() => scrollToId("how-it-works")}
                className="rounded border border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                See How It Works
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

import { FadeIn } from "@/components/FadeIn";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About Grably: Why We Built This",
  description:
    "Grably exists so no licensed cannabis retailer ever loses their licence over a delivery record they couldn't produce. Here is what we're building for licensed Canadian cannabis retailers.",
  alternates: { canonical: "https://grably.ca/about" },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Section 1 — Mission */}
        <section className="bg-grably-offwhite">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-widest text-grably-accent">
                Why We Exist
              </p>
              <p className="mt-4 font-serif text-3xl font-bold text-grably-text sm:text-4xl">
                We exist so no licensed cannabis retailer ever loses their
                licence over a delivery record they couldn&rsquo;t produce,
                because doing it right should be the easiest way to do it.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Section 2 — Vision */}
        <section className="bg-grably-lightgrn">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-widest text-grably-accent">
                What We&rsquo;re Building
              </p>
              <p className="mt-4 text-lg text-grably-textmid">
                A dispatch and compliance platform built for licensed Canadian
                cannabis retailers that need audit-ready delivery records
                without replacing their existing point of sale. Pairing a driver
                app with a dispatcher dashboard so every run leaves a
                timestamped, regulator-friendly trail.
              </p>
            </FadeIn>

            <FadeIn className="mt-12">
              <hr className="border-t border-grably-lightgrn" />

              <div className="mt-10 border-l-4 border-grably-accent pl-6 text-lg text-grably-textmid">
                <p>
                  Picture the store owner on a Friday night: a dozen deliveries
                  stacked on the dispatch board, two drivers already out, and an
                  audit notice landing in her inbox. She reads it, taps a
                  button, and sends a complete, timestamped log before her next
                  coffee cools. No scramble. No panic. No lawyer on speed dial.
                  Just proof, automatic, ordered, and honest.
                </p>
                <p className="mt-6">
                  This is the world Grably is building. A world where the
                  regulated cannabis retailer spends their energy on customers,
                  on product, on the craft of running a real store, not on the
                  paperwork that could end their business over a single missed
                  signature. Where new licences get granted because operators
                  can demonstrate clean delivery practices from day one. Where
                  drivers carry their phones the way couriers in any other
                  industry do: as tools of a respectable trade, not quiet
                  accomplices to risk.
                </p>
                <p className="mt-6">
                  When a provincial inspector walks in, the record is ready.
                  When a customer asks where their order is, the answer is
                  already in their inbox. When a young retailer opens their
                  second location, scaling compliance is no longer the question,
                  it is just the default. The cannabis trade has carried the
                  weight of its illegal past long enough.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Section 3 — CTA */}
        <section className="relative bg-grably-dark">
          {/* Left accent strip */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 bottom-0 w-1.5 bg-grably-accent"
          />

          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
            <FadeIn>
              <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
                Ready to run compliant delivery?
              </h2>
              <p className="mt-4 text-lg text-grably-lightgrn">
                Live within days, not weeks. No contracts.
              </p>
              <Link
                href="/#demo-form"
                className="mt-8 inline-block rounded bg-grably-accent px-6 py-3 font-bold text-grably-dark transition-colors hover:bg-grably-adk"
              >
                Book a free demo
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

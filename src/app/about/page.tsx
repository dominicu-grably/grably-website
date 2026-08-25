import type { Metadata } from "next";
import Link from "next/link";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About Grably: Why We Built This",
  description:
    "Grably exists so no licensed cannabis retailer ever loses their licence over a delivery record they couldn't produce. Here is the story behind why we built it.",
  alternates: { canonical: "https://grably.ca/about" },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-grably-offwhite">
        {/* Sections 1-3 — editorial single column */}
        <div className="mx-auto max-w-[720px] px-5 py-20 sm:px-8">
          {/* Section 1 — Mission */}
          <section>
            <p className="text-[11px] font-bold uppercase tracking-[3px] text-grably-accent">
              Why We Exist
            </p>
            <p className="mx-auto mt-8 max-w-[680px] py-6 text-center font-serif text-[26px] font-bold leading-snug text-grably-text sm:text-[30px]">
              We exist so no licensed cannabis retailer ever loses their licence
              over a delivery record they couldn&rsquo;t produce, because doing
              it right should be the easiest way to do it.
            </p>
          </section>

          {/* Section 2 — Vision narrative */}
          <section className="mt-20">
            <p className="text-[11px] font-bold uppercase tracking-[3px] text-grably-accent">
              What We&rsquo;re Building
            </p>
            <p className="mt-6 text-base leading-[1.75] text-grably-textmid">
              A dispatch and compliance platform built for licensed Canadian
              cannabis retailers that need audit-ready delivery records without
              replacing their existing point of sale. Pairing a driver app with
              a dispatcher dashboard so every run leaves a timestamped,
              regulator-friendly trail.
            </p>

            <hr className="my-10 border-t border-grably-lightgrn" />

            <div className="border-l-4 border-grably-accent pl-6">
              <p className="text-base leading-[1.75] text-grably-textmid">
                Picture the store owner on a Friday night: a dozen deliveries
                stacked on the dispatch board, two drivers already out, and an
                audit notice landing in her inbox. She reads it, taps a button,
                and sends a complete, timestamped log before her next coffee
                cools. No scramble. No panic. No lawyer on speed dial. Just
                proof, automatic, ordered, and honest.
              </p>
              <p className="mt-6 text-base leading-[1.75] text-grably-textmid">
                This is the world Grably is building. A world where the
                regulated cannabis retailer spends their energy on customers, on
                product, on the craft of running a real store, not on the
                paperwork that could end their business over a single missed
                signature. Where new licences get granted because operators can
                demonstrate clean delivery practices from day one. Where drivers
                carry their phones the way couriers in any other industry do: as
                tools of a respectable trade, not quiet accomplices to risk.
              </p>
              <p className="mt-6 text-base leading-[1.75] text-grably-textmid">
                When a provincial inspector walks in, the record is ready. When
                a customer asks where their order is, the answer is already in
                their inbox. When a young retailer opens their second location,
                scaling compliance is no longer the question, it is just the
                default. The cannabis trade has carried the weight of its
                illegal past long enough.
              </p>
            </div>
          </section>

          {/* Section 3 — Founder */}
          <section className="mt-20">
            <p className="text-[11px] font-bold uppercase tracking-[3px] text-grably-accent">
              The Founder
            </p>
            <h2 className="mt-6 font-serif text-3xl font-bold text-grably-text">
              Dominic Uy
            </h2>
            <p className="mt-2 text-sm font-semibold text-grably-textmid">
              Founder, Grably Technologies Inc.
            </p>

            <p className="mt-8 text-[15px] leading-[1.7] text-grably-textmid">
              I spent over 20 years building and scaling retail and e-commerce
              technology, growing a business from $2M to over $250M in annual
              revenue. I know what production-scale retail infrastructure looks
              like and what happens when it breaks.
            </p>
            <p className="mt-6 text-[15px] leading-[1.7] text-grably-textmid">
              When I looked at cannabis delivery in Canada, I found retailers
              running one of their highest-compliance activities on WhatsApp
              threads and sticky notes. Not because they were careless. Because
              nothing existed that was built for them. The tools available were
              generic logistics software with no understanding of LCRB
              manifests, age verification requirements, or what a delivery
              record needs to contain to survive an inspection.
            </p>
            <p className="mt-6 text-[15px] leading-[1.7] text-grably-textmid">
              So I built it. Grably is based in Vancouver, BC and is live with
              licensed Canadian cannabis retailers today. Our compliance records
              have been reviewed against current LCRB audit standards.
            </p>
          </section>
        </div>

        {/* Section 4 — CTA */}
        <section className="relative bg-grably-dark">
          {/* Left accent strip */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 bottom-0 w-1.5 bg-grably-accent"
          />

          <div className="mx-auto max-w-[720px] px-5 py-20 text-center sm:px-8">
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
              Ready to run compliant delivery?
            </h2>
            <p className="mt-4 text-grably-lightgrn">
              Live within days, not weeks. No contracts.
            </p>
            <Link
              href="/#demo-form"
              className="mt-8 inline-block rounded bg-grably-accent px-6 py-3 font-bold text-grably-dark transition-colors hover:bg-grably-adk"
            >
              Book a free demo
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

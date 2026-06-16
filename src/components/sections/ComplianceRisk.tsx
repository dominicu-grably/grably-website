import { Check } from "lucide-react";

import { FadeIn } from "@/components/FadeIn";

const RECORD_ITEMS: string[] = [
  "Complete delivery log with timestamp, address, and driver identity",
  "Proof of age verification at point of delivery",
  "Customer acknowledgment of receipt",
  "Full traceability from dispatch to completion",
];

const CONSEQUENCES: string[] = [
  "Fines up to $100,000",
  "Licence suspension",
  "Public enforcement action on your permanent LCRB record",
  "Permanent licence loss",
];

export function ComplianceRisk() {
  return (
    <section id="compliance" className="relative bg-grably-dark">
      {/* Left accent strip */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-1.5 bg-grably-accent"
      />

      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <FadeIn className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-grably-accent">
            LCRB Compliance
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl">
            The LCRB Audit Is Real
          </h2>
          <p className="mt-4 text-lg text-grably-lightgrn">
            LCRB requires retailers to maintain complete, auditable delivery
            records. Most retailers doing delivery today cannot produce them.
          </p>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left: required records */}
          <FadeIn>
            <ul className="space-y-4">
              {RECORD_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-grably-accent/15">
                    <Check
                      className="h-4 w-4 text-grably-accent"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-grably-lightgrn">{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* Right: warning box */}
          <FadeIn>
            <div className="rounded-lg border border-grably-warn bg-grably-warn/10 p-6">
              <p className="font-semibold text-grably-warn">
                Non-compliance can mean:
              </p>
              <ul className="mt-4 space-y-3">
                {CONSEQUENCES.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-grably-warn"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

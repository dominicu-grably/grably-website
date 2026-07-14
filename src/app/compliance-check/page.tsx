import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

import { ComplianceQuiz } from "@/components/compliance/ComplianceQuiz";

export const metadata: Metadata = {
  title: "LCRB Delivery Compliance Checker — Grably",
  description:
    "Find out if your BC cannabis delivery operation is LCRB compliant. 7 questions, 2 minutes, instant results.",
  alternates: {
    canonical: "https://grably.ca/compliance-check",
  },
};

const TRUST_SIGNALS = [
  "Used by BC cannabis retailers today",
  "Based on actual LCRB delivery inspection requirements",
  "No credit card. No obligation.",
];

export default function ComplianceCheckPage() {
  return (
    <div className="min-h-screen bg-grably-offwhite">
      {/* Non-sticky header — scrolls away naturally */}
      <header className="border-b border-grably-gray">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center" aria-label="Grably home">
            <Image
              src="/logos/Logo_GrablyDark_transparent.png"
              alt="Grably"
              width={954}
              height={321}
              priority
              className="h-8 w-auto"
            />
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-grably-textmid transition-colors hover:text-grably-dark"
          >
            ← Back to grably.ca
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[620px] px-5 py-12 sm:px-8 sm:py-16">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-grably-textmid">
            Free Tool — BC Cannabis Retailers
          </p>
          <h1 className="mt-3 font-serif text-3xl font-bold text-grably-text sm:text-4xl">
            Is Your Delivery Operation LCRB Compliant?
          </h1>
          <p className="mt-4 text-grably-textmid">
            7 questions. 2 minutes. Find out exactly where your compliance gaps
            are — before the LCRB does.
          </p>
        </div>

        <div className="mt-10">
          <ComplianceQuiz />
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
          {TRUST_SIGNALS.map((signal) => (
            <div
              key={signal}
              className="flex items-center gap-2 text-sm text-grably-textmid"
            >
              <Check
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-grably-accent"
              />
              <span>{signal}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

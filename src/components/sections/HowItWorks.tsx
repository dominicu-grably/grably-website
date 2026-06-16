import { ClipboardList, Truck, FileCheck2, type LucideIcon } from "lucide-react";

import { FadeIn } from "@/components/FadeIn";

interface Step {
  number: string;
  title: string;
  body: string;
  Icon: LucideIcon;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Dispatch from Dashboard",
    body: "Your team creates a delivery order in Grably — customer info, items, delivery window, and driver assignment. Everything logged from the moment of dispatch.",
    Icon: ClipboardList,
  },
  {
    number: "02",
    title: "Driver Picks Up and Delivers",
    body: "Your driver uses the Grably app to confirm pickup, capture age verification, and complete the delivery with a timestamped record.",
    Icon: Truck,
  },
  {
    number: "03",
    title: "Compliance Record Generated",
    body: "Grably automatically produces an LCRB-compliant delivery record — audit-ready, stored securely, accessible instantly if your store is ever inspected.",
    Icon: FileCheck2,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-grably-offwhite">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <FadeIn className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-grably-accent">
            How It Works
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-grably-text sm:text-4xl">
            Three Steps from Order to Compliant Delivery
          </h2>
          <p className="mt-4 text-lg text-grably-textmid">
            No spreadsheets. No guesswork. No compliance gaps.
          </p>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map(({ number, title, body, Icon }) => (
            <FadeIn key={number} className="h-full">
              <div className="flex h-full flex-col overflow-hidden rounded-lg border border-grably-gray bg-white shadow-sm">
                {/* Dark green header band */}
                <div className="flex items-center justify-between bg-grably-dark px-6 py-4">
                  <span className="font-serif text-3xl font-bold text-grably-accent">
                    {number}
                  </span>
                  <Icon className="h-6 w-6 text-grably-lightgrn" aria-hidden="true" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-grably-text">
                    {title}
                  </h3>
                  <p className="mt-2 text-grably-textmid">{body}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

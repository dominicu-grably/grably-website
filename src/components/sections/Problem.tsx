import { AlertTriangle, Route, TrendingUp, type LucideIcon } from "lucide-react";

import { FadeIn } from "@/components/FadeIn";

interface ProblemCard {
  title: string;
  body: string;
  Icon: LucideIcon;
  iconClassName: string;
}

const CARDS: ProblemCard[] = [
  {
    title: "Compliance Risk",
    body: "WhatsApp threads and spreadsheets don't produce LCRB-compliant delivery records. One audit can mean fines, suspensions, or licence loss.",
    Icon: AlertTriangle,
    iconClassName: "text-grably-warn",
  },
  {
    title: "Operational Chaos",
    body: "Manual dispatch means late deliveries, missed windows, and owners spending hours they don't have on coordination.",
    Icon: Route,
    iconClassName: "text-orange-500",
  },
  {
    title: "Lost Revenue",
    body: "Delivery customers spend 35% more per order than walk-ins. Without a professional system, you're leaving your highest-value channel on the table.",
    Icon: TrendingUp,
    iconClassName: "text-blue-500",
  },
];

export function Problem() {
  return (
    <section className="bg-grably-offwhite">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <FadeIn className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-grably-accent">
            The Problem
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-grably-text sm:text-4xl">
            Delivery in BC Cannabis Is Broken
          </h2>
          <p className="mt-4 text-lg text-grably-textmid">
            Most retailers are running delivery on duct tape — and carrying full
            LCRB liability while doing it.
          </p>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CARDS.map(({ title, body, Icon, iconClassName }) => (
            <FadeIn key={title} className="h-full">
              <div className="flex h-full flex-col rounded-lg border border-grably-gray bg-white p-6 shadow-sm">
                <Icon className={`h-9 w-9 ${iconClassName}`} aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold text-grably-text">
                  {title}
                </h3>
                <p className="mt-2 text-grably-textmid">{body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

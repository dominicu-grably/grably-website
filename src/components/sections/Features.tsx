import {
  LayoutDashboard,
  FileCheck2,
  ScanFace,
  MessageSquareText,
  Smartphone,
  ListChecks,
  type LucideIcon,
} from "lucide-react";

import { FadeIn } from "@/components/FadeIn";

interface Feature {
  name: string;
  description: string;
  Icon: LucideIcon;
}

const FEATURES: Feature[] = [
  {
    name: "Dispatch Dashboard",
    description:
      "Real-time view of all active deliveries, drivers, and order status.",
    Icon: LayoutDashboard,
  },
  {
    name: "Compliance Records",
    description:
      "Auto-generated LCRB delivery records — timestamped, driver-linked, audit-ready.",
    Icon: FileCheck2,
  },
  {
    name: "Age Verification",
    description:
      "Built-in ID check step in the driver flow. Documented at time of delivery, no workarounds.",
    Icon: ScanFace,
  },
  {
    name: "Customer SMS",
    description:
      "Automatic notifications at dispatch and delivery. Driver info and ETA included.",
    Icon: MessageSquareText,
  },
  {
    name: "Driver Mobile App",
    description:
      "Native iOS + Android app guides drivers through every compliant delivery step.",
    Icon: Smartphone,
  },
  {
    name: "Audit Trail",
    description:
      "Every event logged. Every record exportable. Ready for inspection in minutes.",
    Icon: ListChecks,
  },
];

export function Features() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <FadeIn className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-grably-accent">
            Features
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-grably-text sm:text-4xl">
            Everything Your Delivery Operation Needs
          </h2>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ name, description, Icon }) => (
            <FadeIn key={name} className="h-full">
              <div className="flex h-full flex-col rounded-lg border border-grably-gray bg-grably-offwhite p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-grably-dark">
                  <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-semibold text-grably-text">{name}</h3>
                <p className="mt-2 text-grably-textmid">{description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

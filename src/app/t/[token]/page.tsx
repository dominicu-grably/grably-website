import type { Metadata } from "next";

import { TrackingView } from "./TrackingView";

// A public delivery-status URL must never appear in search results. This
// overrides the site-wide robots: { index: true } set in the root layout.
// The token is deliberately NOT placed in the title or any metadata field.
export const metadata: Metadata = {
  title: "Track your delivery",
  robots: { index: false, follow: false },
};

interface PageProps {
  params: { token: string };
}

export default function TrackingPage({ params }: PageProps) {
  return <TrackingView token={params.token} />;
}

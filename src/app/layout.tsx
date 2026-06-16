import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://grably.ca"),
  title: "Grably — LCRB-Compliant Cannabis Delivery Dispatch",
  description:
    "The only dispatch platform built for BC cannabis retailers. Automate your compliance records, driver coordination, and customer SMS — from the first order.",
  keywords: [
    "cannabis delivery dispatch BC",
    "LCRB delivery compliance",
    "cannabis retailer delivery software BC",
  ],
  applicationName: "Grably",
  authors: [{ name: "Grably" }],
  alternates: {
    canonical: "https://grably.ca",
  },
  openGraph: {
    title: "Grably — Every delivery. Audit-ready.",
    description:
      "LCRB-compliant delivery dispatch for licensed BC cannabis retailers. Compliance records, driver coordination, and customer SMS — automated from the first order.",
    url: "https://grably.ca",
    siteName: "Grably",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grably — Every delivery. Audit-ready.",
    description:
      "LCRB-compliant delivery dispatch for licensed BC cannabis retailers.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0F2E1E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA">
      <body className="antialiased">{children}</body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-BFCJ6QT4MB";

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

// Site-wide Organization schema (appears on every page). Description is the
// homepage Hero value prop, verbatim.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Grably",
  url: "https://grably.ca",
  description:
    "Grably gives licensed BC retailers LCRB-compliant delivery records, driver coordination, and customer communications — automated from the first order.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA">
      <body className="antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />

        {/* Google Analytics (GA4) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}

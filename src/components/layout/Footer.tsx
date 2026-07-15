import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative border-t border-grably-accent bg-grably-dark">
      {/* Left accent strip */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-1.5 bg-grably-accent"
      />

      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
          {/* Logo */}
          <Image
            src="/logos/Logo_GrablyWhite_transparent.png"
            alt="Grably"
            width={954}
            height={321}
            className="h-7 w-auto"
          />

          {/* Centre links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-grably-lightgrn">
            <Link
              href="/"
              className="transition-colors hover:text-white"
            >
              grably.ca
            </Link>
            <span aria-hidden="true" className="text-grably-mid">
              |
            </span>
            <a
              href="mailto:hello@grably.ca"
              className="transition-colors hover:text-white"
            >
              hello@grably.ca
            </a>
            <span aria-hidden="true" className="text-grably-mid">
              |
            </span>
            <a
              href="https://dashboard.grably.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              dashboard.grably.ca
            </a>
          </nav>

          {/* Right tagline */}
          <p className="max-w-xs text-center text-sm text-grably-lightgrn md:text-right">
            Built for BC Cannabis Retailers. LCRB-Compliant Delivery Dispatch.
          </p>
        </div>

        {/* Bottom fine print */}
        <p className="mt-10 text-center text-xs text-grably-lightgrn/40">
          Grably Technologies Inc. © 2026 Grably. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

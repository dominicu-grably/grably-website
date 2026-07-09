"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  targetId: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "How It Works", targetId: "how-it-works" },
  { label: "Compliance", targetId: "compliance" },
  { label: "Pricing", targetId: "pricing" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (targetId: string) => {
    setMobileOpen(false);
    scrollToId(targetId);
  };

  return (
    <header className="sticky top-0 z-50 bg-grably-dark">
      {/* Left accent strip */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-1.5 bg-grably-accent"
      />

      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNav("top")}
          className="flex items-center"
          aria-label="Grably home"
        >
          <Image
            src="/logos/Logo_GrablyWhite_transparent.png"
            alt="Grably"
            width={954}
            height={321}
            priority
            className="h-8 w-auto"
          />
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.targetId}
              type="button"
              onClick={() => handleNav(link.targetId)}
              className="text-sm font-medium text-grably-lightgrn transition-colors hover:text-white"
            >
              {link.label}
            </button>
          ))}
          <Link
            href="/compliance-check"
            className="text-sm font-medium text-grably-lightgrn transition-colors hover:text-white"
          >
            Free Compliance Check
          </Link>
          <button
            type="button"
            onClick={() => handleNav("demo-form")}
            className="rounded bg-grably-accent px-4 py-2 text-sm font-bold text-grably-dark transition-colors hover:bg-grably-adk"
          >
            Book a Demo
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="text-white md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile slide-down drawer */}
      <div
        className={cn(
          "overflow-hidden border-t border-grably-mid bg-grably-dark transition-[max-height] duration-300 ease-out md:hidden",
          mobileOpen ? "max-h-80" : "max-h-0"
        )}
      >
        <div className="flex flex-col gap-1 px-5 py-3">
          {NAV_LINKS.map((link) => (
            <button
              key={link.targetId}
              type="button"
              onClick={() => handleNav(link.targetId)}
              className="rounded px-2 py-3 text-left text-base font-medium text-grably-lightgrn transition-colors hover:bg-grably-mid hover:text-white"
            >
              {link.label}
            </button>
          ))}
          <Link
            href="/compliance-check"
            onClick={() => setMobileOpen(false)}
            className="rounded px-2 py-3 text-left text-base font-medium text-grably-lightgrn transition-colors hover:bg-grably-mid hover:text-white"
          >
            Free Compliance Check
          </Link>
          <button
            type="button"
            onClick={() => handleNav("demo-form")}
            className="mt-2 rounded bg-grably-accent px-4 py-3 text-center text-base font-bold text-grably-dark transition-colors hover:bg-grably-adk"
          >
            Book a Demo
          </button>
        </div>
      </div>
    </header>
  );
}

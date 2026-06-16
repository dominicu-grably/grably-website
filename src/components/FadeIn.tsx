"use client";

import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Subtle fade-in + rise as the element scrolls into view. Stagger by passing a
 * Tailwind delay utility (e.g. "delay-150") via className. Honors reduced motion
 * via the underlying useInView hook.
 */
export function FadeIn({ children, className }: FadeInProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
    >
      {children}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  /** Fraction of the element visible before triggering. */
  threshold?: number;
  /** Trigger only once, then stop observing. */
  once?: boolean;
}

/**
 * Subtle scroll fade-in. Returns a ref to attach to the target element and a
 * boolean that flips true when the element enters the viewport. Respects users
 * who prefer reduced motion by reporting visible immediately.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  once = true,
}: UseInViewOptions = {}): { ref: React.RefObject<T>; inView: boolean } {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, inView };
}

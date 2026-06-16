/**
 * Smoothly scroll to an element by id (e.g. "demo-form", "how-it-works").
 * scroll-margin-top is set globally in globals.css so the sticky navbar does
 * not cover the section heading.
 */
export function scrollToId(id: string): void {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

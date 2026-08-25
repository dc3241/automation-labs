"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const STAGGER_MS = 80;

/** Stagger delay for card groups: index × 80ms */
export function staggerDelay(index: number): number {
  return index * STAGGER_MS;
}

/**
 * IntersectionObserver reveal — fires once, then unobserves.
 * Respects prefers-reduced-motion (marks visible immediately).
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  delayMs = 0
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return {
    ref,
    className: "reveal",
    style:
      delayMs > 0
        ? ({ transitionDelay: `${delayMs}ms` } as CSSProperties)
        : undefined,
  };
}

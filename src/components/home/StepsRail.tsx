"use client";

import { useEffect, useRef, type ReactNode } from "react";
import "./home-motion.css";

type Step = { title: string; body: string };

/** Three steps joined by a line that fills as the section scrolls through the
 *  viewport. Steps light up as the line reaches them. */
export function StepsRail({ steps }: { steps: readonly Step[] }) {
  const rootRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(".hs__step"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const apply = (p: number) => {
      root.style.setProperty("--p", String(p));
      items.forEach((el, i) => {
        const threshold = items.length === 1 ? 0 : i / (items.length - 1);
        el.classList.toggle("is-active", p >= threshold - 0.001);
      });
    };

    if (reduced) {
      apply(1);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * 0.75 - rect.top) / Math.max(rect.height, 1);
      apply(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const rows: ReactNode[] = steps.map((step, i) => (
    <li key={step.title} className="hs__step">
      <span className="hs__num">{i + 1}</span>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{step.title}</h3>
      <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">{step.body}</p>
    </li>
  ));

  return (
    <ol ref={rootRef} className="hs grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
      <span className="hs__track" aria-hidden>
        <span className="hs__fill" />
      </span>
      {rows}
    </ol>
  );
}

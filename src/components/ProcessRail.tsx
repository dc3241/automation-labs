"use client";

import { useEffect, useRef, useState } from "react";

export type ProcessStep = {
  title: string;
  description: string;
};

type ProcessRailProps = {
  steps: ProcessStep[];
  className?: string;
};

/**
 * One-time scroll-triggered draw-in for a fixed process sequence.
 * Not a loop — plays once and settles.
 */
export function ProcessRail({ steps, className = "" }: ProcessRailProps) {
  const ref = useRef<HTMLOListElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <ol
      ref={ref}
      className={`process-rail ${drawn ? "is-drawn" : ""} ${className}`.trim()}
    >
      {steps.map((step, i) => (
        <li key={step.title} className="process-rail__step">
          {i < steps.length - 1 ? (
            <svg
              className="process-rail__connector"
              viewBox="0 0 2 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <line
                className="process-rail__stroke"
                x1="1"
                y1="0"
                x2="1"
                y2="100"
                pathLength={1}
                fill="none"
              />
            </svg>
          ) : null}
          <span className="process-rail__node" aria-hidden>
            {i + 1}
          </span>
          <div className="process-rail__body">
            <strong className="process-rail__title text-gray-900">
              {step.title}
            </strong>
            <p className="process-rail__desc text-gray-600">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

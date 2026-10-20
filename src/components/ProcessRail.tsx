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
 * Scroll-triggered draw-in plus active-step progress while in view.
 * Settles when scrolled past; respects prefers-reduced-motion.
 */
export function ProcessRail({ steps, className = "" }: ProcessRailProps) {
  const ref = useRef<HTMLOListElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [drawn, setDrawn] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      setActiveIndex(steps.length - 1);
      return;
    }

    const revealObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          revealObserver.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    revealObserver.observe(el);

    let ticking = false;

    const updateActive = () => {
      ticking = false;
      const probe = window.innerHeight * 0.42;
      let next = 0;

      stepRefs.current.forEach((step, i) => {
        if (!step) return;
        const top = step.getBoundingClientRect().top;
        if (top <= probe) next = i;
      });

      setActiveIndex((prev) => (prev === next ? prev : next));
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [steps.length]);

  return (
    <ol
      ref={ref}
      className={`process-rail ${drawn ? "is-drawn" : ""} ${className}`.trim()}
    >
      {steps.map((step, i) => {
        const reached = i <= activeIndex;
        const active = i === activeIndex;
        const complete = i < activeIndex;

        return (
          <li
            key={step.title}
            ref={(node) => {
              stepRefs.current[i] = node;
            }}
            className={[
              "process-rail__step",
              reached ? "is-reached" : "",
              active ? "is-active" : "",
              complete ? "is-complete" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
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
                <line
                  className="process-rail__stroke process-rail__stroke--progress"
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
        );
      })}
    </ol>
  );
}

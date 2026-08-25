"use client";

import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Absolute delay in ms, or use index with stagger */
  delayMs?: number;
  /** Card group index — applies index × 80ms stagger */
  index?: number;
  as?: ElementType;
  id?: string;
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "style" | "id">;

export function Reveal({
  children,
  className = "",
  delayMs,
  index,
  as: Tag = "div",
  id,
  ...rest
}: RevealProps) {
  const resolvedDelay =
    delayMs ?? (typeof index === "number" ? index * 80 : 0);
  const { ref, className: revealClass, style } = useScrollReveal(resolvedDelay);

  return (
    <Tag
      ref={ref}
      id={id}
      className={[revealClass, className].filter(Boolean).join(" ")}
      style={style as CSSProperties | undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

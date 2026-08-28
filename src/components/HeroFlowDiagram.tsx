import { Fragment } from "react";

const STAGES = [
  {
    title: "Trigger",
    caption: "Inbox, form, or schedule",
    icon: "trigger",
  },
  {
    title: "Runs",
    caption: "The workflow executes",
    icon: "runs",
  },
  {
    title: "Result",
    caption: "Dashboard, alert, or handoff",
    icon: "result",
  },
] as const;

function StageIcon({ icon }: { icon: (typeof STAGES)[number]["icon"] }) {
  return (
    <svg
      className="hero-flow__glyph"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {icon === "trigger" ? (
        <>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
        </>
      ) : null}
      {icon === "runs" ? (
        <>
          <path d="M7 6l6 6-6 6" />
          <path d="M13 6l6 6-6 6" />
        </>
      ) : null}
      {icon === "result" ? (
        <>
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="M8 12.5l2.5 2.5L16 9.5" />
        </>
      ) : null}
    </svg>
  );
}

/**
 * Homepage hero graphic: trigger → runs → result.
 * Draw-in is CSS-only (plays once on load) so it does not flash empty
 * while waiting on hydration. Not a loop.
 */
export function HeroFlowDiagram({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`hero-flow ${className}`.trim()}
      role="img"
      aria-label="A trigger starts a workflow, the workflow runs, then a result is produced"
    >
      <div className="hero-flow__stage">
        {STAGES.map((stage, i) => (
          <Fragment key={stage.title}>
            {i > 0 ? (
              <span className="hero-flow__rail" aria-hidden>
                <span className="hero-flow__line" />
                <span className="hero-flow__pulse" />
              </span>
            ) : null}
            <article className="hero-flow__card">
              <span className="hero-flow__icon">
                <StageIcon icon={stage.icon} />
              </span>
              <strong className="hero-flow__title">{stage.title}</strong>
              <p className="hero-flow__caption">{stage.caption}</p>
            </article>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

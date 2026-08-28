export type HelpCardKind = "tools" | "workflows" | "builds";

type HelpCardIconProps = {
  kind: HelpCardKind;
};

function ToolsGlyph() {
  return (
    <>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
      <path d="M17.25 13.25v5M14.75 15.75h5M15.45 13.95l3.6 3.6M19.05 13.95l-3.6 3.6" />
    </>
  );
}

function WorkflowsGlyph() {
  return (
    <>
      <circle cx="5" cy="16" r="2.25" />
      <circle cx="12" cy="7" r="2.25" />
      <circle cx="19" cy="16" r="2.25" />
      <path d="M6.7 14.2L10.3 8.8M13.7 8.8l3.6 5.4" />
    </>
  );
}

function BuildsGlyph() {
  return (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="2" />
      <path d="M3.5 9h17" />
      <path d="M7 16v-4M11 16v-2.5M15 16v-5" />
    </>
  );
}

export function HelpCardIcon({ kind }: HelpCardIconProps) {
  return (
    <span className="help-card__icon" aria-hidden>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {kind === "tools" ? <ToolsGlyph /> : null}
        {kind === "workflows" ? <WorkflowsGlyph /> : null}
        {kind === "builds" ? <BuildsGlyph /> : null}
      </svg>
    </span>
  );
}

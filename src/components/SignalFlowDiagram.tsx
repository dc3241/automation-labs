/**
 * Temporary looping placeholder: trigger → runs → result.
 * Grayscale only. Replace with a real screenshot when one exists —
 * do not leave this looping once visuals are in place.
 */
export function SignalFlowDiagram({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`signal-flow ${className}`.trim()}
      role="img"
      aria-label="Animated diagram: a trigger fires, the workflow runs, then a result is produced"
    >
      <div className="signal-flow__stage">
        <span className="signal-flow__node signal-flow__node--trigger">
          Trigger
        </span>
        <span className="signal-flow__rail" aria-hidden>
          <span className="signal-flow__pulse" />
        </span>
        <span className="signal-flow__node signal-flow__node--runs">Runs</span>
        <span className="signal-flow__rail" aria-hidden>
          <span className="signal-flow__pulse signal-flow__pulse--delay" />
        </span>
        <span className="signal-flow__node signal-flow__node--result">
          Result
        </span>
      </div>
      <p className="signal-flow__caption">Visual coming soon</p>
    </div>
  );
}

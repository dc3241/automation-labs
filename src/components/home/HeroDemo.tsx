import "./home-motion.css";

const ROWS = [
  { vendor: "Northwind Supply", amount: "$1,240.00" },
  { vendor: "Brightline Print", amount: "$386.50" },
  { vendor: "Delta Freight", amount: "$2,915.00" },
  { vendor: "Oakridge Cleaning", amount: "$210.00" },
] as const;

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="8" cy="8" r="6.5" />
      <path d="M5.2 8.2l1.9 1.9 3.7-3.9" />
    </svg>
  );
}

/**
 * Hero product window: fictional invoices move Received → Reading → Filed on a
 * loop. Pure CSS. With reduced motion it shows the finished state.
 */
export function HeroDemo() {
  return (
    <div
      className="hd"
      role="img"
      aria-label="Illustration: invoices arrive, are read and checked, then filed automatically, with fictional example data"
    >
      <span className="hd__float hd__float--a" aria-hidden>
        <Check /> Vendor matched
      </span>
      <span className="hd__float hd__float--b" aria-hidden>
        <Check /> Total verified
      </span>
      <span className="hd__float hd__float--c" aria-hidden>
        <Check /> Duplicate check passed
      </span>

      <div className="hd__window" aria-hidden>
        <div className="hd__bar">
          <span className="hd__dots">
            <i />
            <i />
            <i />
          </span>
          <span className="hd__title">Invoice intake</span>
          <span className="hd__live">Running</span>
        </div>
        <div className="hd__body">
          <div className="hd__cols">
            <span>Vendor</span>
            <span>Amount</span>
            <span>Status</span>
          </div>
          {ROWS.map((row) => (
            <div className="hd__row" key={row.vendor}>
              <span className="hd__vendor">{row.vendor}</span>
              <span className="hd__amt">{row.amount}</span>
              <span className="hd__status">
                <span className="hd__chip hd__chip--recv">Received</span>
                <span className="hd__chip hd__chip--read">Reading</span>
                <span className="hd__chip hd__chip--done">Filed</span>
              </span>
              <span className="hd__meter" />
            </div>
          ))}
        </div>
        <div className="hd__foot">
          <span>Illustrative example · fictional data</span>
          <span>A person approves each one</span>
        </div>
      </div>
    </div>
  );
}

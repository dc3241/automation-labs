import Link from "next/link";
import { buildKicker, type Build } from "@/data/builds";
import "./home-motion.css";

type Tone = "ok" | "info" | "warn";
type PreviewLine = { name: string; tag: string; tone: Tone; width: string };

const PREVIEWS: Record<string, PreviewLine[]> = {
  "invoice-intake": [
    { name: "Northwind Supply · $1,240", tag: "Filed", tone: "ok", width: "100%" },
    { name: "Brightline Print · $386", tag: "Filed", tone: "ok", width: "100%" },
    { name: "Delta Freight · $2,915", tag: "Needs review", tone: "warn", width: "62%" },
  ],
  "resume-intake": [
    { name: "Candidate A", tag: "Strong match", tone: "ok", width: "92%" },
    { name: "Candidate B", tag: "Possible", tone: "info", width: "74%" },
    { name: "Candidate C", tag: "For review", tone: "warn", width: "55%" },
  ],
  "lead-briefs": [
    { name: "Company overview", tag: "Ready", tone: "ok", width: "100%" },
    { name: "Recent news", tag: "Ready", tone: "ok", width: "100%" },
    { name: "Questions to ask", tag: "Drafting", tone: "info", width: "68%" },
  ],
};

const FALLBACK: PreviewLine[] = PREVIEWS["invoice-intake"];

export function ExampleCard({ build }: { build: Build }) {
  const lines = PREVIEWS[build.slug] ?? FALLBACK;

  return (
    <Link href={`/projects/${build.slug}`} className="hx-card">
      <div className="hx-preview" aria-hidden>
        <div className="hx-preview__panel">
          {lines.map((line, i) => (
            <div className="hx-line" key={line.name}>
              <span className="hx-line__name">{line.name}</span>
              <span className={`hx-line__tag hx-line__tag--${line.tone}`}>{line.tag}</span>
              <span className="hx-line__bar">
                <i style={{ ["--w" as string]: line.width, ["--hd" as string]: `${i * 0.5}s` }} />
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="hx-body">
        <p className="text-sm font-semibold text-gray-500 mb-2">{buildKicker(build)}</p>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{build.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{build.hook}</p>
        <p className="hx-link">
          Read the breakdown <span aria-hidden>→</span>
        </p>
      </div>
    </Link>
  );
}

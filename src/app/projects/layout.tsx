import type { Metadata } from "next";

// Agency pages are hidden while the site focuses on Lab Notes (11/2026).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

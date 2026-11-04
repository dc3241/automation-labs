import type { Metadata } from "next";
import { PackCard } from "@/components/content/Cards";
import { packSummaries } from "@/content/packs";

export const metadata: Metadata = {
  title: "Free packs",
  description: "Free copy-paste Claude prompt packs. Enter your email and use them today.",
  alternates: { canonical: "/get" },
};

export default function PacksIndex() {
  const packs = packSummaries();
  return (
    <div className="bg-white py-14 lg:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <p className="hm-eyebrow mb-6">Free packs</p>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
          Copy, paste, done.
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-gray-600">
          Each pack is a set of prompts from one of our videos, ready to paste into Claude.
          Free with your email.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packs.map((pack) => (
            <PackCard key={pack.keyword} pack={pack} />
          ))}
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { PlayCard } from "@/components/content/Cards";
import { plays } from "@/content/plays";

export const metadata: Metadata = {
  title: "Plays",
  description:
    "Step-by-step write-ups of useful things you can do with Claude and AI tools, from our short videos.",
  alternates: { canonical: "/plays" },
};

export default function PlaysIndex() {
  return (
    <div className="bg-white py-14 lg:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <p className="hm-eyebrow mb-6">Plays</p>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
          Useful things to do with AI, step by step.
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-gray-600">
          Every video we post, written out so you can follow along.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plays.map((play) => (
            <PlayCard key={play.slug} play={play} />
          ))}
        </div>
      </div>
    </div>
  );
}

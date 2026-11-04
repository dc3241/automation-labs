import Link from "next/link";
import { PackCard, PlayCard, ToolCard } from "@/components/content/Cards";
import { EmailCapture } from "@/components/EmailCapture";
import { Reveal } from "@/components/Reveal";
import { VideoCarousel } from "@/components/VideoCarousel";
import { packSummaries } from "@/content/packs";
import { plays } from "@/content/plays";
import { tools } from "@/content/tools";
import { videos } from "@/content/videos";
import { NEWSLETTER } from "@/lib/newsletter";

export default function HomePage() {
  const latestPlays = plays.slice(0, 3);
  const packs = packSummaries().slice(0, 3);
  const featuredTools = tools.filter((t) => t.featured).slice(0, 3);

  return (
    <div className="bg-white">
      {/* Hero: the signup is the point of the page */}
      <section className="hero-atmosphere py-16 lg:py-24">
        <div className="hero-atmosphere__wash" aria-hidden />
        <div className="hm-grid" aria-hidden />
        <div className="hero-atmosphere__content container mx-auto max-w-3xl px-4 text-center">
          <p className="hm-eyebrow mb-6">{NEWSLETTER.name} · {NEWSLETTER.cadence.toLowerCase()}</p>
          <h1 className="mb-6 text-4xl font-bold leading-[1.08] text-gray-900 sm:text-6xl">
            Useful AI tricks you can <span className="hm-mark">use tonight.</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
            Claude prompts that save real hours, new tools with honest prices, and the AI news
            that actually matters. Explained in plain English, one email a week.
          </p>
          <div className="mx-auto max-w-lg text-left">
            <EmailCapture source="home-hero" buttonLabel={`Get ${NEWSLETTER.name}`} />
          </div>
        </div>
      </section>

      {/* Latest plays */}
      <section className="border-t border-gray-200 bg-gray-50 py-16" aria-label="Latest videos">
        <div className="container mx-auto max-w-6xl px-4">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="hm-eyebrow mb-4">Latest videos</p>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                From the videos, step by step.
              </h2>
            </div>
            <Link href="/plays" className="arrow-link font-semibold text-gray-900">
              All plays <span className="arrow">→</span>
            </Link>
          </Reveal>
          {videos.length > 0 ? (
            <VideoCarousel videos={videos.slice(0, 12)} />
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latestPlays.map((play, i) => (
                <Reveal key={play.slug} index={i} className="h-full">
                  <PlayCard play={play} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Free packs */}
      <section className="py-16" aria-label="Free packs">
        <div className="container mx-auto max-w-6xl px-4">
          <Reveal className="mb-10">
            <p className="hm-eyebrow mb-4">Free packs</p>
            <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Copy-paste prompts, free with your email.
            </h2>
            <p className="max-w-2xl text-lg text-gray-600">
              Saw a video and commented the keyword? Your pack is here.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packs.map((pack, i) => (
              <Reveal key={pack.keyword} index={i} className="h-full">
                <PackCard pack={pack} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What's in the email */}
      <section className="border-y border-gray-200 bg-gray-50 py-16" aria-label={`What's in ${NEWSLETTER.name}`}>
        <div className="container mx-auto max-w-5xl px-4">
          <Reveal className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              What lands in your inbox
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {NEWSLETTER.contents.map((item, i) => (
              <Reveal key={item.title} index={i} className="h-full">
                <div className="h-full rounded-xl border border-gray-200 bg-white p-6">
                  <p className="mb-3 font-mono text-sm font-semibold text-gray-400">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-16" aria-label="Tools worth trying">
        <div className="container mx-auto max-w-6xl px-4">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="hm-eyebrow mb-4">Tools</p>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Worth trying this week.</h2>
            </div>
            <Link href="/tools" className="arrow-link font-semibold text-gray-900">
              All tools <span className="arrow">→</span>
            </Link>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredTools.map((tool, i) => (
              <Reveal key={tool.slug} index={i} className="h-full">
                <ToolCard tool={tool} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final signup */}
      <section className="bg-black py-20" aria-label="Subscribe">
        <div className="container mx-auto max-w-2xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Get one useful AI trick a week.
          </h2>
          <p className="mb-8 text-lg text-gray-400">{NEWSLETTER.promise}</p>
          <div className="mx-auto max-w-lg text-left">
            <EmailCapture source="home-footer" tone="dark" buttonLabel={`Get ${NEWSLETTER.name}`} />
          </div>
        </div>
      </section>
    </div>
  );
}

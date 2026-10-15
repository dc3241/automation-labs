import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BuildBreakdown } from "@/components/builds/BuildBreakdown";
import { getBuildBreakdown } from "@/data/build-breakdowns";
import { builds, getBuildBySlug, getRelatedBuilds } from "@/data/builds";
import { absoluteUrl } from "@/lib/site";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return builds.map((build) => ({ slug: build.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: PageProps): Metadata {
  const build = getBuildBySlug(params.slug);
  const breakdown = build ? getBuildBreakdown(build.slug) : undefined;
  if (!build || !breakdown) return {};

  const url = absoluteUrl(`/projects/${build.slug}`);
  const images = [build.visual, ...(build.gallery ?? [])]
    .filter((shot) => Boolean(shot.src))
    .map((shot) => ({
      url: absoluteUrl(shot.src as string),
      alt: shot.alt,
    }));

  return {
    title: breakdown.seoTitle,
    description: breakdown.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title: breakdown.seoTitle,
      description: breakdown.seoDescription,
      url,
      type: "article",
      images: images.length > 0 ? images : undefined,
    },
    twitter: {
      card: images.length > 0 ? "summary_large_image" : "summary",
      title: breakdown.seoTitle,
      description: breakdown.seoDescription,
    },
  };
}

function buildJsonLd(slug: string) {
  const build = getBuildBySlug(slug);
  const breakdown = build ? getBuildBreakdown(build.slug) : undefined;
  if (!build || !breakdown) return null;

  const url = absoluteUrl(`/projects/${build.slug}`);
  const images = [build.visual, ...(build.gallery ?? [])]
    .filter((shot) => Boolean(shot.src))
    .map((shot) => absoluteUrl(shot.src as string));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Projects",
            item: absoluteUrl("/projects"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: build.title,
            item: url,
          },
        ],
      },
      {
        "@type": "Article",
        headline: breakdown.headline,
        description: breakdown.seoDescription,
        image: images.length > 0 ? images : undefined,
        author: {
          "@type": "Organization",
          name: "Automation Labs",
          url: absoluteUrl("/"),
        },
        mainEntityOfPage: url,
        about: build.stack,
      },
      {
        "@type": "FAQPage",
        mainEntity: breakdown.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

export default function ProjectBuildPage({ params }: PageProps) {
  const build = getBuildBySlug(params.slug);
  const breakdown = build ? getBuildBreakdown(build.slug) : undefined;
  if (!build || !breakdown) notFound();

  const jsonLd = buildJsonLd(build.slug);

  return (
    <>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}
      <BuildBreakdown
        build={build}
        breakdown={breakdown}
        related={getRelatedBuilds(build)}
      />
    </>
  );
}

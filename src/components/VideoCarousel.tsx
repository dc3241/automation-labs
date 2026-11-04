"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { youtubeWatchUrl, type Video } from "@/content/videos";

function Thumb({ id }: { id: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  if (failed) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
      alt=""
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
      onError={() => setFailed(true)}
    />
  );
}

export function VideoCarousel({ videos }: { videos: Video[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<Video | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows, videos.length]);

  // Close on Escape, lock page scroll while the player is open.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  function close() {
    setActive(null);
    openerRef.current?.focus();
  }

  function scrollByCard(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = (card?.offsetWidth ?? 240) + 16;
    el.scrollBy({ left: dir * step * 2, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 scroll-px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="list"
        aria-label="Latest videos"
      >
        {videos.map((video) => (
          <div
            key={video.youtubeId}
            data-card
            role="listitem"
            className="w-[62vw] max-w-[260px] flex-shrink-0 snap-start sm:w-[220px]"
          >
            <button
              type="button"
              onClick={(e) => {
                openerRef.current = e.currentTarget;
                setActive(video);
              }}
              className="group relative block aspect-[9/16] w-full overflow-hidden rounded-xl bg-gray-900 text-left shadow-sm ring-1 ring-gray-200"
              aria-label={`Play video: ${video.title}`}
            >
              <Thumb id={video.youtubeId} />
              <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-lg transition group-hover:scale-110">
                <svg className="ml-1 h-6 w-6 text-black" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="absolute inset-x-0 bottom-0 p-3 text-sm font-semibold leading-snug text-white">
                {video.title}
              </span>
            </button>
          </div>
        ))}
      </div>

      {videos.length > 2 && (
        <div className="mt-2 hidden justify-end gap-2 md:flex">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            aria-label="Previous videos"
            className="btn-press flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 disabled:opacity-30"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            aria-label="Next videos"
            className="btn-press flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 disabled:opacity-30"
          >
            →
          </button>
        </div>
      )}

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={close}
        >
          <div
            className="relative flex max-h-full w-full max-w-sm flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              autoFocus
              aria-label="Close video"
              className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg font-bold text-black"
            >
              ×
            </button>
            <div className="aspect-[9/16] max-h-[78vh] w-full overflow-hidden rounded-xl bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${active.youtubeId}?autoplay=1&rel=0&playsinline=1`}
                title={active.title}
                className="h-full w-full"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-semibold text-white">
              {active.play ? (
                <Link href={`/plays/${active.play}`} className="underline">
                  Read the steps
                </Link>
              ) : (
                <span />
              )}
              <a
                href={youtubeWatchUrl(active.youtubeId)}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

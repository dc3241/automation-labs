/**
 * Videos shown in the homepage carousel (newest first).
 *
 * To add one: paste the 11-character YouTube ID (the part after /shorts/ or
 * ?v= in the video URL), a title, and optionally the slug of its play in
 * src/content/plays.ts. Works for Shorts and regular videos.
 *
 * Until at least one video is listed here, the homepage shows the latest
 * plays as cards instead, so the section is never empty.
 */

export type Video = {
  /** YouTube video ID, e.g. "dQw4w9WgXcQ". */
  youtubeId: string;
  title: string;
  /** Slug of the matching play, to link "Read the steps". */
  play?: string;
  publishedOn: string;
};

export const videos: Video[] = [
  // {
  //   youtubeId: "PASTE_ID_HERE",
  //   title: "Delete yourself from the internet in one afternoon",
  //   play: "delete-yourself-from-the-internet",
  //   publishedOn: "2026-11-03",
  // },
];

export function youtubeWatchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

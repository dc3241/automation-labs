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
  /** Optional. Shown on the card and used for accessibility labels. */
  title?: string;
  /** Slug of the matching play, to link "Read the steps". */
  play?: string;
  publishedOn?: string;
};

export const videos: Video[] = [
  { youtubeId: "qeeEffpZOt4" },
  { youtubeId: "COx11V2rG2E" },
  { youtubeId: "JHMpx4IHuSs" },
  // Add titles and a matching play when known, e.g.:
  // { youtubeId: "XXXXXXXXXXX", title: "Delete yourself from the internet in one afternoon", play: "delete-yourself-from-the-internet" },
];

export function youtubeWatchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

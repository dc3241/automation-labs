# Solutions section: setup

1. **Run the migration first.** Execute `supabase_solution_inquiries_migration.sql` in the Supabase SQL editor *before* deploying. Inquiry inserts fail until the new columns exist.
2. **Set pricing.** In `src/content/solutions.ts`, set `startingAt` (e.g. `"Pilots start at $X"`) per solution. Nothing is shown until you do.
3. **Add demo videos.** Set `demoVideoUrl` (YouTube or Vimeo link) per solution; the embed appears above the example output.
4. **Attribution.** Link each video to `/solutions/<slug>?utm_source=youtube&utm_medium=video&utm_campaign=<angle>&utm_content=<video-id>`. First-touch UTM and referrer are saved with each inquiry and shown in `/admin/contacts`.
5. **Add a solution.** Copy an entry in `solutions.ts` with a new slug. It appears on `/solutions`, in the sitemap and as its own page. Qualifier options also drive the server-side allow-list.
6. **Env.** The inquiry route needs `SUPABASE_SERVICE_ROLE_KEY` (same as other admin-written routes); without it the route returns 503.

Query leads by source: see the example at the bottom of the migration file.

Not included yet: email notification for new inquiries (they appear only in `/admin/contacts`), and the Claude skills section.

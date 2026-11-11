-- Attribution columns for solution inquiries (/solutions/<slug> pages).
--
-- The /api/solutions/inquiry route stores inquiries in contact_submissions, so they
-- show up in the existing /admin/contacts view. These columns record which solution
-- the visitor asked about and where they came from.
--
-- RUN ORDER (important): run this in the Supabase SQL editor BEFORE deploying the
-- branch with the Solutions pages. The route inserts these columns, so submissions
-- fail until they exist.
--
-- Safe to re-run. Does not change existing rows or any policy: contact_submissions
-- stays locked down by supabase_lockdown_contact_submissions.sql, and this route
-- uses the server-only service role key.

ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS solution_slug VARCHAR(80),
  ADD COLUMN IF NOT EXISTS qualifiers JSONB,
  ADD COLUMN IF NOT EXISTS utm_source VARCHAR(120),
  ADD COLUMN IF NOT EXISTS utm_medium VARCHAR(120),
  ADD COLUMN IF NOT EXISTS utm_campaign VARCHAR(120),
  ADD COLUMN IF NOT EXISTS utm_content VARCHAR(120),
  ADD COLUMN IF NOT EXISTS referrer VARCHAR(120),
  ADD COLUMN IF NOT EXISTS landing_path VARCHAR(120);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_solution
  ON public.contact_submissions (solution_slug)
  WHERE solution_slug IS NOT NULL;

-- Which video or post produced inquiries, by solution:
--   SELECT solution_slug, utm_source, utm_campaign, utm_content, COUNT(*) AS inquiries
--   FROM public.contact_submissions
--   WHERE solution_slug IS NOT NULL
--   GROUP BY 1, 2, 3, 4
--   ORDER BY inquiries DESC;

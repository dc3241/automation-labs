-- Branching /contact form columns for contact_submissions.
-- Project: Automation Labs (ytfenryujbjbawsoxucr)
-- Run this in the Supabase SQL editor BEFORE deploying the branched ContactPage.
--
-- This is the real migration. Do NOT use supabase_contact_fields_migration.sql
-- (that file only touched company_size / inquiry_type and is a no-op on the live table).

ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS budget_range VARCHAR(50),
  ADD COLUMN IF NOT EXISTS how_heard VARCHAR(50),
  ADD COLUMN IF NOT EXISTS timeline VARCHAR(50),
  ADD COLUMN IF NOT EXISTS process_frequency VARCHAR(50),
  ADD COLUMN IF NOT EXISTS tools_needed TEXT,
  ADD COLUMN IF NOT EXISTS process_today TEXT,
  ADD COLUMN IF NOT EXISTS current_workaround TEXT,
  ADD COLUMN IF NOT EXISTS team_users TEXT,
  ADD COLUMN IF NOT EXISTS must_have_integrations TEXT,
  ADD COLUMN IF NOT EXISTS loom_url TEXT;

CREATE INDEX IF NOT EXISTS idx_contact_submissions_company_size
  ON contact_submissions(company_size);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_budget_range
  ON contact_submissions(budget_range);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_inquiry_type
  ON contact_submissions(inquiry_type);

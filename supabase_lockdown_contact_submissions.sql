-- Lock down contact_submissions so visitors can submit a form but cannot read
-- anyone's inquiry.
--
-- WHY: supabase_migration.sql created a policy "Users can read their own
-- submissions" with USING (true) for role public. The anon key ships in the
-- browser bundle by design, so that policy lets anyone read every name,
-- email, company and message in this table.
--
-- RUN ORDER (important):
--   1. Add SUPABASE_SERVICE_ROLE_KEY and ADMIN_PASSWORD in Vercel env vars.
--   2. Deploy the branch that moves /admin/contacts to server routes and
--      stops the contact form from reading the row back after insert.
--   3. THEN run this file in the Supabase SQL editor.
-- Running it before step 2 would break the contact form's submit.
--
-- After this runs:
--   - Anonymous visitors can still INSERT (the contact form keeps working).
--   - Nothing public can SELECT, UPDATE or DELETE.
--   - The admin API uses the service role key, which bypasses RLS.

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Remove every policy except INSERT, including any added by hand in the dashboard.
DO $$
DECLARE
  p record;
BEGIN
  FOR p IN
    SELECT policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'contact_submissions'
      AND cmd IN ('SELECT', 'UPDATE', 'DELETE', 'ALL')
  LOOP
    EXECUTE format('DROP POLICY %I ON public.contact_submissions', p.policyname);
  END LOOP;
END $$;

-- Make sure the insert policy exists (no-op if it is already there).
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'contact_submissions'
      AND cmd = 'INSERT'
  ) THEN
    CREATE POLICY "Anyone can insert contact submissions"
      ON public.contact_submissions FOR INSERT TO public WITH CHECK (true);
  END IF;
END $$;

-- Verify: expect exactly one row, cmd = INSERT.
-- SELECT policyname, cmd, roles FROM pg_policies
--   WHERE schemaname = 'public' AND tablename = 'contact_submissions';

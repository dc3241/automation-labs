-- Run in Supabase SQL editor to add contact form qualification fields
ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS company_size VARCHAR(20),
  ADD COLUMN IF NOT EXISTS inquiry_type VARCHAR(50);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_inquiry_type
  ON contact_submissions(inquiry_type);

-- Miracle IVF — leads table
-- Run once against the target Supabase project.

CREATE TABLE leads (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name        text        NOT NULL,
  phone            text        NOT NULL,
  city             text,
  service_interest text,
  message          text,
  language         text        NOT NULL CHECK (language IN ('uz', 'ru', 'en')),
  source_page      text        NOT NULL,
  created_at       timestamptz NOT NULL DEFAULT now()
);

-- Descending index: dashboard queries list newest leads first
CREATE INDEX idx_leads_created_at ON leads (created_at DESC);

-- Filter by locale for locale-specific reporting
CREATE INDEX idx_leads_language ON leads (language);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Deny all access to the anon/public role
-- Only the service-role key (used by the server-only Supabase client) can INSERT.
CREATE POLICY "deny_anon_all" ON leads
  FOR ALL
  TO anon
  USING (false);

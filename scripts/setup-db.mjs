/**
 * Database Setup Script — creates the `leads` table in Supabase.
 *
 * Requires: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 * Run: node --env-file=.env.local scripts/setup-db.mjs
 */

import { createClient } from '@supabase/supabase-js'

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌  Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// Check if the leads table already exists
const { error: checkError } = await supabase.from('leads').select('id').limit(1)

if (!checkError) {
  console.log('✅  leads table already exists. Nothing to do.')
  process.exit(0)
}

if (!checkError.message.includes('does not exist') && checkError.code !== 'PGRST205') {
  console.error('❌  Unexpected error when checking table:', checkError.message)
  console.error('    Please run the SQL manually in the Supabase Dashboard SQL Editor.')
  printSql()
  process.exit(1)
}

// Table does not exist — print the SQL the user must run
console.log('⚠️  The leads table does not exist in your Supabase project.')
console.log('')
console.log('The Supabase service-role key cannot execute DDL (CREATE TABLE) directly.')
console.log('You need to run the following SQL in the Supabase Dashboard SQL Editor:')
console.log('')
console.log('  1. Go to: https://supabase.com/dashboard/project/qmbrrjyltorkpychevci/sql')
console.log('  2. Click "New query"')
console.log('  3. Paste the SQL below and click "Run"\n')
printSql()

function printSql() {
  console.log('─'.repeat(60))
  console.log(`
CREATE TABLE IF NOT EXISTS leads (
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

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_language   ON leads (language);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "deny_anon_all"              ON leads;
DROP POLICY IF EXISTS "restrict_anon_all"          ON leads;
DROP POLICY IF EXISTS "restrict_authenticated_all" ON leads;

CREATE POLICY "restrict_anon_all" ON leads
  AS RESTRICTIVE FOR ALL TO anon
  USING (false) WITH CHECK (false);

CREATE POLICY "restrict_authenticated_all" ON leads
  AS RESTRICTIVE FOR ALL TO authenticated
  USING (false) WITH CHECK (false);
`)
  console.log('─'.repeat(60))
}

-- Migration: harden Row Level Security on the leads table
--
-- This migration closes three gaps left by 0001_create_leads.sql:
--
--   1. The original "deny_anon_all" policy was PERMISSIVE (PostgreSQL default).
--      Permissive policies are OR-ed together, so a future accidental
--      PERMISSIVE grant (e.g. USING (true)) for the anon role would silently
--      override the deny.  RESTRICTIVE policies are AND-ed — they cannot be
--      overridden by any PERMISSIVE policy added later.
--
--   2. WITH CHECK was not explicit.  For FOR ALL policies PostgreSQL inherits
--      the USING expression as the default WITH CHECK, but relying on implicit
--      behaviour is fragile.  Stating WITH CHECK (false) is unambiguous.
--
--   3. The authenticated role (Supabase Auth users) had no explicit policy.
--      It was protected by the default-deny that applies when RLS is enabled
--      and no policy matches.  That implicit protection disappears if anyone
--      runs CREATE POLICY ... FOR ALL USING (true) without a TO clause (which
--      targets PUBLIC and covers authenticated).  An explicit RESTRICTIVE deny
--      survives that scenario.
--
-- service_role is intentionally excluded: Supabase configures it with the
-- BYPASSRLS attribute, so it is exempt from all RLS policies by design.
-- The application's server-only Supabase client uses this role exclusively,
-- which is the only path allowed to INSERT rows.
--
-- Effective access matrix after this migration:
--
--   Role              SELECT  INSERT  UPDATE  DELETE
--   ──────────────────────────────────────────────────
--   anon              DENY    DENY    DENY    DENY
--   authenticated     DENY    DENY    DENY    DENY
--   service_role      ALLOW   ALLOW   ALLOW   ALLOW  (BYPASSRLS — no policy applies)

-- ── Step 1: remove the original permissive deny ─────────────────────────────

DROP POLICY IF EXISTS "deny_anon_all" ON leads;

-- ── Step 2: RESTRICTIVE deny for the anon role ───────────────────────────────
-- Covers all four DML operations.
-- USING (false)      → no rows are visible for SELECT / UPDATE / DELETE
-- WITH CHECK (false) → no rows pass the write check for INSERT / UPDATE

CREATE POLICY "restrict_anon_all" ON leads
  AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

-- ── Step 3: RESTRICTIVE deny for the authenticated role ──────────────────────
-- Same logic as above.  No Supabase Auth user should ever access leads directly.

CREATE POLICY "restrict_authenticated_all" ON leads
  AS RESTRICTIVE
  FOR ALL
  TO authenticated
  USING (false)
  WITH CHECK (false);

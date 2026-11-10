import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const isConfigured = Boolean(url && key && !url.includes('YOUR_PROJECT') && !key.includes('YOUR_PUBLISHABLE'));
// No connection is created until valid public environment variables are supplied.
export const supabase = isConfigured ? createClient(url, key, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
}) : null;

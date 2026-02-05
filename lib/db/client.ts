import { createClient } from '@supabase/supabase-js';

// Cliente principal (projeto adesoes-club)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
});

// Cliente LP Produtores
const lpSupabaseUrl = process.env.LP_SUPABASE_URL!;
const lpSupabaseKey = process.env.LP_SUPABASE_ANON_KEY!;

export const lpSupabase = createClient(lpSupabaseUrl, lpSupabaseKey, {
  auth: { persistSession: false }
});

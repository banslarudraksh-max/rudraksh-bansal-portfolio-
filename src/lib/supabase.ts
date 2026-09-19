import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Retrieve Supabase credentials from Vite client-side environment variables
const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseUrl = typeof rawUrl === 'string' ? rawUrl.trim() : '';
export const supabaseAnonKey = typeof rawAnonKey === 'string' ? rawAnonKey.trim() : '';

// Validation flag to verify genuine credentials are present
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseUrl.startsWith('http') &&
  !supabaseUrl.includes('YOUR_SUPABASE_URL') &&
  supabaseAnonKey &&
  supabaseAnonKey.length > 15 &&
  !supabaseAnonKey.includes('YOUR_SUPABASE_ANON_KEY')
);

// Fallback placeholder to prevent runtime bundle initialization crash if variables are not yet provided
const clientUrl = isSupabaseConfigured ? supabaseUrl : 'https://placeholder.supabase.co';
const clientKey = isSupabaseConfigured ? supabaseAnonKey : 'placeholder-anon-key-prevent-init-crash';

/**
 * Reusable Supabase client instance using standard browser-safe anon key.
 * Never use or expose the Supabase service_role key here.
 */
export const supabase: SupabaseClient = createClient(clientUrl, clientKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'rb_portfolio_supabase_auth_token',
  },
});

export interface ConnectionTestResult {
  success: boolean;
  message?: string;
  error?: string;
  tableExists?: boolean;
  checkedAt: string;
}

/**
 * Performs a real Supabase database read on the `admin_test` table
 * Columns expected:
 *   - id UUID primary key
 *   - message TEXT
 *   - created_at TIMESTAMPTZ default now()
 */
export async function testAdminConnection(): Promise<ConnectionTestResult> {
  const timestamp = new Date().toLocaleTimeString();

  if (!isSupabaseConfigured) {
    return {
      success: false,
      error: 'Supabase credentials missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.',
      checkedAt: timestamp,
    };
  }

  try {
    const { data, error } = await supabase
      .from('admin_test')
      .select('id, message, created_at')
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      // Postgres error 42P01 or PostgREST error when relation does not exist
      if (
        error.code === '42P01' ||
        error.code === 'PGRST204' ||
        error.code === 'PGRST200' ||
        error.message.toLowerCase().includes('relation "admin_test" does not exist') ||
        error.message.toLowerCase().includes('not found')
      ) {
        return {
          success: false,
          tableExists: false,
          error: 'Table "admin_test" not found in Supabase. Please create the table in Supabase SQL editor.',
          checkedAt: timestamp,
        };
      }

      // Check RLS denial
      if (error.code === '42501' || error.message.toLowerCase().includes('policy')) {
        return {
          success: false,
          tableExists: true,
          error: 'RLS Permission Denied: Ensure a SELECT policy exists for "admin_test".',
          checkedAt: timestamp,
        };
      }

      return {
        success: false,
        tableExists: true,
        error: error.message || 'Error reading from admin_test table.',
        checkedAt: timestamp,
      };
    }

    const rowMessage =
      data && data.length > 0 && data[0]?.message
        ? String(data[0].message)
        : 'admin_test table read successfully (0 rows)';

    return {
      success: true,
      tableExists: true,
      message: rowMessage,
      checkedAt: timestamp,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Network error contacting Supabase.';
    return {
      success: false,
      error: msg,
      checkedAt: timestamp,
    };
  }
}

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Database types
export interface WaitlistEntry {
  id?: number;
  email: string;
  created_at?: string;
  metadata?: Record<string, any>;
  unsubscribed?: boolean;
}

// Create Supabase client (with proper initialization)
function createSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn('[SUPABASE] Missing credentials, some features may not work');
    return null;
  }

  return createClient(url, key);
}

export const supabase = createSupabaseClient();

// Waitlist functions
export async function addToWaitlist(email: string): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Database not configured' };
  }

  try {
    // Check if already exists
    const { data: existing } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email.toLowerCase())
      .single();

    if (existing) {
      return { success: false, error: 'Already on waitlist' };
    }

    // Add to waitlist
    const { error } = await supabase
      .from('waitlist')
      .insert([
        {
          email: email.toLowerCase(),
          metadata: {
            source: 'beta_landing',
            ip: process.env.NODE_ENV === 'production' ? undefined : 'localhost'
          }
        }
      ]);

    if (error) {
      console.error('[SUPABASE] Insert error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('[SUPABASE] Error:', error);
    return { success: false, error: 'Database error' };
  }
}

export async function getWaitlistEntries(): Promise<WaitlistEntry[]> {
  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[SUPABASE] Fetch error:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('[SUPABASE] Error:', error);
    return [];
  }
}

export async function unsubscribeEmail(email: string): Promise<boolean> {
  if (!supabase) {
    return false;
  }

  try {
    const { error } = await supabase
      .from('waitlist')
      .update({ unsubscribed: true })
      .eq('email', email.toLowerCase());

    if (error) {
      console.error('[SUPABASE] Unsubscribe error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('[SUPABASE] Error:', error);
    return false;
  }
}

export async function isUnsubscribed(email: string): Promise<boolean> {
  if (!supabase) {
    return false;
  }

  try {
    const { data } = await supabase
      .from('waitlist')
      .select('unsubscribed')
      .eq('email', email.toLowerCase())
      .single();

    return data?.unsubscribed || false;
  } catch (error) {
    return false;
  }
}
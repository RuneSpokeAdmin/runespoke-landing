import { createClient } from '@supabase/supabase-js';

// Database types
export interface WaitlistEntry {
  id?: number;
  email: string;
  created_at?: string;
  metadata?: Record<string, any>;
  unsubscribed?: boolean;
}

// Create Supabase client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// Waitlist functions
export async function addToWaitlist(email: string): Promise<{ success: boolean; error?: string }> {
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
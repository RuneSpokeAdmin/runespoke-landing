import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { secret } = await request.json();

    // Check if the provided secret matches
    const envSecret = process.env.WAITLIST_SECRET;
    const matches = secret === envSecret;

    // Check if Supabase is configured
    const supabaseConfigured = !!(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    );

    return NextResponse.json({
      matches,
      providedSecret: secret,
      // Only show first/last 3 chars for security
      envSecretHint: envSecret ?
        `${envSecret.substring(0, 3)}...${envSecret.substring(envSecret.length - 3)}` :
        'NOT SET',
      supabaseConfigured,
      envVarsSet: {
        WAITLIST_SECRET: !!process.env.WAITLIST_SECRET,
        SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        SUPABASE_SERVICE_KEY: !!process.env.SUPABASE_SERVICE_KEY,
        SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Debug check failed' }, { status: 500 });
  }
}
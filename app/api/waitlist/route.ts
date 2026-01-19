import { NextRequest, NextResponse } from 'next/server';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Simple in-memory storage for now (will be replaced with database)
// For production, use Supabase, Vercel KV, or another database
const waitlist = new Set<string>();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    // For now, just log to Vercel logs (you can see these in Vercel dashboard)
    console.log(`[WAITLIST SIGNUP] Email: ${normalizedEmail}, Time: ${new Date().toISOString()}`);

    // Option 1: Send to webhook (uncomment and add your webhook URL)
    // await fetch('YOUR_WEBHOOK_URL', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email: normalizedEmail, timestamp: new Date().toISOString() })
    // });

    // Option 2: Save to Supabase (uncomment and add your Supabase credentials)
    // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    // const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
    // if (supabaseUrl && supabaseKey) {
    //   const response = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'apikey': supabaseKey,
    //       'Authorization': `Bearer ${supabaseKey}`
    //     },
    //     body: JSON.stringify({ email: normalizedEmail, created_at: new Date().toISOString() })
    //   });
    // }

    // Check if already exists (in-memory for this session only)
    if (waitlist.has(normalizedEmail)) {
      return NextResponse.json(
        { message: 'You\'re already on the waitlist!' },
        { status: 200 }
      );
    }

    waitlist.add(normalizedEmail);

    return NextResponse.json(
      { message: 'Successfully joined the waitlist!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('[WAITLIST ERROR]:', error);
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve emails (protect this in production!)
export async function GET(request: NextRequest) {
  // Simple auth check - replace with proper auth
  const authHeader = request.headers.get('authorization');

  // Set a secret key in your environment variables
  if (authHeader !== `Bearer ${process.env.WAITLIST_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    emails: Array.from(waitlist),
    count: waitlist.size,
    note: 'This is temporary in-memory storage. Set up database for persistence.'
  });
}
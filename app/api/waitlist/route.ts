import { NextRequest, NextResponse } from 'next/server';
import { sendWaitlistConfirmation } from '@/lib/email';
import { addToWaitlist, getWaitlistEntries } from '@/lib/supabase';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    const timestamp = new Date().toISOString();

    // Store in Supabase
    let alreadyExists = false;

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && (process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
      console.log('[WAITLIST] Storing in Supabase');
      const result = await addToWaitlist(normalizedEmail);

      if (result.success) {
        console.log(`[SUPABASE] Waitlist signup stored: ${normalizedEmail}`);
      } else if (result.error === 'Already on waitlist') {
        alreadyExists = true;
      } else {
        console.error('[SUPABASE] Failed to store:', result.error);
        return NextResponse.json(
          { error: 'Failed to process request. Please try again.' },
          { status: 500 }
        );
      }
    } else {
      console.error('[WAITLIST] Supabase not configured');
      return NextResponse.json(
        { error: 'Service temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    // Always log to Vercel as backup
    console.log(`[WAITLIST SIGNUP] Email: ${normalizedEmail}, Time: ${timestamp}`);

    // Return appropriate response
    if (alreadyExists) {
      return NextResponse.json(
        { message: 'You\'re already on the waitlist!' },
        { status: 200 }
      );
    }

    // Send confirmation email (non-blocking)
    sendWaitlistConfirmation(normalizedEmail).catch(error => {
      console.error('[EMAIL] Failed to send confirmation:', error);
    });

    return NextResponse.json(
      { message: 'Successfully joined the waitlist! Check your email for confirmation.' },
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

// GET endpoint to retrieve emails (protected)
export async function GET(request: NextRequest) {
  // Check authorization
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.WAITLIST_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get emails from Supabase
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && (process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
    try {
      const entries = await getWaitlistEntries();
      const emails = entries.map(entry => entry.email);
      console.log(`[ADMIN] Retrieved ${emails.length} emails from Supabase`);

      return NextResponse.json({
        emails,
        count: emails.length,
        storage: 'Supabase'
      });
    } catch (error) {
      console.error('[ADMIN] Supabase fetch error:', error);
      return NextResponse.json(
        { error: 'Failed to retrieve waitlist' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    { error: 'Database not configured' },
    { status: 503 }
  );
}
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

    // Try Supabase first (if configured)
    let stored = false;
    let alreadyExists = false;

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && (process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
      console.log('[WAITLIST] Using Supabase for storage');
      const result = await addToWaitlist(normalizedEmail);

      if (result.success) {
        stored = true;
        console.log(`[SUPABASE] Waitlist signup stored: ${normalizedEmail}`);
      } else if (result.error === 'Already on waitlist') {
        alreadyExists = true;
      } else {
        console.error('[SUPABASE] Failed to store:', result.error);
      }
    }

    // Fallback to Vercel KV if Supabase not configured or failed
    if (!stored && !alreadyExists && process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      try {
        // Check if email already exists
        const checkResponse = await fetch(
          `${process.env.KV_REST_API_URL}/get/waitlist:${normalizedEmail}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
            },
          }
        );

        const checkData = await checkResponse.json();
        if (checkData.result) {
          alreadyExists = true;
        } else {
          // Store email with timestamp
          await fetch(
            `${process.env.KV_REST_API_URL}/set/waitlist:${normalizedEmail}/${timestamp}`,
            {
              headers: {
                Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
              },
            }
          );

          // Add to list for easy retrieval
          await fetch(
            `${process.env.KV_REST_API_URL}/sadd/waitlist:all/${normalizedEmail}`,
            {
              headers: {
                Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
              },
            }
          );

          stored = true;
          console.log(`[KV] Waitlist signup stored: ${normalizedEmail}`);
        }
      } catch (error) {
        console.error('[KV Storage Error]:', error);
      }
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

  let emails: string[] = [];
  let source = 'none';

  // Try Supabase first
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && (process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
    try {
      const entries = await getWaitlistEntries();
      emails = entries.map(entry => entry.email);
      source = 'Supabase (Persistent)';
      console.log(`[ADMIN] Retrieved ${emails.length} emails from Supabase`);
    } catch (error) {
      console.error('[ADMIN] Supabase fetch error:', error);
    }
  }

  // Fallback to Vercel KV if no Supabase data
  if (emails.length === 0 && process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const response = await fetch(
        `${process.env.KV_REST_API_URL}/smembers/waitlist:all`,
        {
          headers: {
            Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
          },
        }
      );
      const data = await response.json();
      if (data.result) {
        emails = data.result;
        source = 'Upstash Redis (Vercel KV)';
      }
    } catch (error) {
      console.error('[ADMIN] KV fetch error:', error);
    }
  }

  return NextResponse.json({
    emails,
    count: emails.length,
    storage: source
  });
}
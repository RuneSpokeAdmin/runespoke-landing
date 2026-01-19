import { NextRequest, NextResponse } from 'next/server';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Temporary storage (for when KV is not set up)
const tempWaitlist = new Map<string, { email: string; timestamp: string }>();

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

    // Try Vercel KV first (if configured)
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      try {
        // Check if email exists
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
          return NextResponse.json(
            { message: 'You\'re already on the waitlist!' },
            { status: 200 }
          );
        }

        // Store in KV
        await fetch(
          `${process.env.KV_REST_API_URL}/set/waitlist:${normalizedEmail}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
            },
            body: JSON.stringify({ value: timestamp }),
          }
        );

        // Add to sorted set for listing
        await fetch(
          `${process.env.KV_REST_API_URL}/zadd/waitlist:all`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
            },
            body: JSON.stringify({
              score: Date.now(),
              member: normalizedEmail,
            }),
          }
        );

        console.log(`[KV STORED] Waitlist signup: ${normalizedEmail}`);
      } catch (kvError) {
        console.error('[KV Error]:', kvError);
        // Fall through to alternative storage
      }
    }

    // Try Supabase if configured
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/waitlist`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': process.env.SUPABASE_SERVICE_KEY,
              'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
              'Prefer': 'return=minimal',
            },
            body: JSON.stringify({
              email: normalizedEmail,
              created_at: timestamp
            }),
          }
        );

        if (response.ok) {
          console.log(`[SUPABASE STORED] Waitlist signup: ${normalizedEmail}`);
        }
      } catch (supabaseError) {
        console.error('[Supabase Error]:', supabaseError);
      }
    }

    // Send confirmation email if configured
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'RuneSpoke Hub <hello@runespoke.com>',
            to: normalizedEmail,
            subject: 'Welcome to RuneSpoke Hub Beta Waitlist!',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Thank you for joining the RuneSpoke Hub Beta waitlist!</h2>
                <p>We're excited to have you as one of our early adopters.</p>
                <p>You'll be among the first to know when we launch our beta program. Keep an eye on your inbox for your exclusive invitation!</p>
                <p>In the meantime, here's what you can expect from RuneSpoke Hub:</p>
                <ul>
                  <li>90% cost savings compared to GitHub Copilot</li>
                  <li>Support for Claude, ChatGPT, Gemini, and Local LLMs</li>
                  <li>Universal IDE integration</li>
                  <li>Self-hosted options for complete control</li>
                </ul>
                <p>Best regards,<br>The RuneSpoke Team</p>
              </div>
            `,
          }),
        });
        console.log(`[EMAIL SENT] Confirmation to: ${normalizedEmail}`);
      } catch (emailError) {
        console.error('[Email Error]:', emailError);
      }
    }

    // Always log to Vercel logs as backup
    console.log(`[WAITLIST SIGNUP] Email: ${normalizedEmail}, Time: ${timestamp}`);

    // Store in memory as last resort
    tempWaitlist.set(normalizedEmail, { email: normalizedEmail, timestamp });

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

// GET endpoint to retrieve emails
export async function GET(request: NextRequest) {
  // Check authorization
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.WAITLIST_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let emails: string[] = [];

  // Try to get from Vercel KV
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const response = await fetch(
        `${process.env.KV_REST_API_URL}/zrange/waitlist:all/0/-1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
          },
        }
      );
      const data = await response.json();
      if (data.result) {
        emails = data.result;
      }
    } catch (error) {
      console.error('[KV Fetch Error]:', error);
    }
  }

  // Try Supabase if no KV results
  if (emails.length === 0 && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/waitlist?select=email`,
        {
          headers: {
            'apikey': process.env.SUPABASE_SERVICE_KEY,
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
          },
        }
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        emails = data.map(item => item.email);
      }
    } catch (error) {
      console.error('[Supabase Fetch Error]:', error);
    }
  }

  // Fall back to temporary storage
  if (emails.length === 0) {
    emails = Array.from(tempWaitlist.keys());
  }

  return NextResponse.json({
    emails,
    count: emails.length,
    storage: process.env.KV_REST_API_URL ? 'Vercel KV' :
             process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Supabase' :
             'Temporary (resets on deploy)',
  });
}
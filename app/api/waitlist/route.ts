import { NextRequest, NextResponse } from 'next/server';

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

    // Use Upstash Redis (auto-configured by Vercel)
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
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
          return NextResponse.json(
            { message: 'You\'re already on the waitlist!' },
            { status: 200 }
          );
        }

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

        console.log(`[STORED] Waitlist signup: ${normalizedEmail}`);
      } catch (error) {
        console.error('[Storage Error]:', error);
        // Continue anyway - still log it
      }
    }

    // Always log to Vercel as backup
    console.log(`[WAITLIST SIGNUP] Email: ${normalizedEmail}, Time: ${timestamp}`);

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

// GET endpoint to retrieve emails (protected)
export async function GET(request: NextRequest) {
  // Check authorization
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.WAITLIST_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let emails: string[] = [];

  // Get from Upstash Redis
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
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
      }
    } catch (error) {
      console.error('[Fetch Error]:', error);
    }
  }

  return NextResponse.json({
    emails,
    count: emails.length,
    storage: process.env.KV_REST_API_URL ? 'Upstash Redis (Persistent)' : 'Logs Only'
  });
}
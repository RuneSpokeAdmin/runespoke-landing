import { NextRequest, NextResponse } from 'next/server';
import { unsubscribeEmail } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();
    const timestamp = new Date().toISOString();

    // Try Supabase first
    let unsubscribed = false;
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && (process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
      unsubscribed = await unsubscribeEmail(normalizedEmail);
      if (unsubscribed) {
        console.log(`[SUPABASE] Email unsubscribed: ${normalizedEmail}`);
      }
    }

    // Also store in KV if available (fallback)
    if (!unsubscribed && process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      try {
        // Add to unsubscribed list
        await fetch(
          `${process.env.KV_REST_API_URL}/sadd/unsubscribed:all/${normalizedEmail}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
            },
          }
        );

        // Store timestamp
        await fetch(
          `${process.env.KV_REST_API_URL}/set/unsubscribed:${normalizedEmail}/${timestamp}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
            },
          }
        );

        console.log(`[KV] Email unsubscribed: ${normalizedEmail}`);
      } catch (error) {
        console.error('[KV] Unsubscribe storage error:', error);
      }
    }

    // Log for audit trail
    console.log(`[UNSUBSCRIBE] Email: ${normalizedEmail}, Time: ${timestamp}`);

    return NextResponse.json(
      { message: 'You have been successfully unsubscribed.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('[UNSUBSCRIBE ERROR]:', error);
    return NextResponse.json(
      { error: 'Failed to process unsubscribe request.' },
      { status: 500 }
    );
  }
}

// GET endpoint for unsubscribe page
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json(
      { error: 'Email parameter is required' },
      { status: 400 }
    );
  }

  // Return a simple HTML page for unsubscribe
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Unsubscribe - RuneSpoke Hub</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 12px;
      padding: 40px;
      max-width: 500px;
      width: 100%;
      text-align: center;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #1f2937;
      margin-bottom: 10px;
      font-size: 24px;
    }
    p {
      color: #6b7280;
      margin-bottom: 30px;
      line-height: 1.6;
    }
    button {
      background: #ef4444;
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    button:hover {
      background: #dc2626;
    }
    .success {
      display: none;
      color: #10b981;
      font-weight: 600;
      margin-top: 20px;
    }
    .error {
      display: none;
      color: #ef4444;
      margin-top: 20px;
    }
    .back-link {
      display: inline-block;
      margin-top: 20px;
      color: #6366f1;
      text-decoration: none;
      font-size: 14px;
    }
    .back-link:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Unsubscribe from RuneSpoke Hub</h1>
    <p>Are you sure you want to unsubscribe from the RuneSpoke Hub beta waitlist?</p>
    <p style="font-size: 14px; color: #9ca3af;">Email: ${email}</p>

    <button id="unsubscribeBtn" onclick="unsubscribe()">Yes, Unsubscribe Me</button>

    <div id="success" class="success">✓ You have been successfully unsubscribed.</div>
    <div id="error" class="error">Something went wrong. Please try again.</div>

    <a href="/" class="back-link">← Back to RuneSpoke Hub</a>
  </div>

  <script>
    async function unsubscribe() {
      const btn = document.getElementById('unsubscribeBtn');
      const success = document.getElementById('success');
      const error = document.getElementById('error');

      btn.disabled = true;
      btn.textContent = 'Processing...';

      try {
        const response = await fetch('/api/unsubscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: '${email}' })
        });

        if (response.ok) {
          btn.style.display = 'none';
          success.style.display = 'block';
        } else {
          throw new Error('Failed');
        }
      } catch (err) {
        btn.disabled = false;
        btn.textContent = 'Yes, Unsubscribe Me';
        error.style.display = 'block';
      }
    }
  </script>
</body>
</html>
  `;

  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
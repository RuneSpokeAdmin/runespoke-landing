import { NextRequest, NextResponse } from 'next/server';
import { sendWaitlistConfirmation } from '@/lib/email';

export async function POST(request: NextRequest) {
  // Check authorization
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.WAITLIST_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 });
  }

  // Log environment configuration
  console.log('[DEBUG-EMAIL] Environment check:');
  console.log('[DEBUG-EMAIL] AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID ? '✓ Set' : '✗ Not set');
  console.log('[DEBUG-EMAIL] AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY ? '✓ Set' : '✗ Not set');
  console.log('[DEBUG-EMAIL] AWS_REGION:', process.env.AWS_REGION || 'Not set');
  console.log('[DEBUG-EMAIL] AWS_SES_FROM_EMAIL:', process.env.AWS_SES_FROM_EMAIL || 'Not set');
  console.log('[DEBUG-EMAIL] Attempting to send to:', email);

  try {
    const result = await sendWaitlistConfirmation(email);
    console.log('[DEBUG-EMAIL] Send result:', result);

    return NextResponse.json({
      success: result,
      email,
      config: {
        region: process.env.AWS_REGION || 'us-east-2',
        fromEmail: process.env.AWS_SES_FROM_EMAIL || 'hello@runespoke.ai',
        awsConfigured: !!(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY)
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[DEBUG-EMAIL] Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      email,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
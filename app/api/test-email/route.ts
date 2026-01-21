import { NextRequest, NextResponse } from 'next/server';
import { sendWaitlistConfirmation } from '@/lib/email';

export async function GET(request: NextRequest) {
  // Check if this is an authorized test
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.WAITLIST_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Log environment variables (without exposing secrets)
  const config = {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ? '✓ Set' : '✗ Not set',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ? '✓ Set' : '✗ Not set',
    AWS_REGION: process.env.AWS_REGION || 'Not set',
    AWS_SES_FROM_EMAIL: process.env.AWS_SES_FROM_EMAIL || 'Not set',
    RESEND_API_KEY: process.env.RESEND_API_KEY ? '✓ Set' : '✗ Not set',
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ Set' : '✗ Not set',
  };

  // Try to send a test email
  const testEmail = 'yosemiteclimber@gmail.com';
  let emailResult = false;
  let emailError = null;

  try {
    console.log('[TEST-EMAIL] Attempting to send to:', testEmail);
    emailResult = await sendWaitlistConfirmation(testEmail);
    console.log('[TEST-EMAIL] Result:', emailResult);
  } catch (error) {
    emailError = error instanceof Error ? error.message : String(error);
    console.error('[TEST-EMAIL] Error:', emailError);
  }

  return NextResponse.json({
    config,
    emailTest: {
      to: testEmail,
      success: emailResult,
      error: emailError
    },
    timestamp: new Date().toISOString()
  });
}
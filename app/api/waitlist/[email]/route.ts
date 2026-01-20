import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// DELETE endpoint to remove email from waitlist
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  // Check authorization
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.WAITLIST_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { email: emailParam } = await params;
  const email = decodeURIComponent(emailParam).toLowerCase();

  try {
    // Try Supabase first
    if (supabase) {
      const { error } = await supabase
        .from('waitlist')
        .delete()
        .eq('email', email);

      if (!error) {
        console.log(`[ADMIN] Deleted email from Supabase: ${email}`);
        return NextResponse.json({
          message: 'Email deleted successfully',
          storage: 'Supabase'
        });
      } else {
        console.error('[ADMIN] Supabase delete error:', error);
      }
    }

    // Try Vercel KV as fallback
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      // Remove from main set
      await fetch(
        `${process.env.KV_REST_API_URL}/srem/waitlist:all/${email}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
          },
        }
      );

      // Delete the key
      await fetch(
        `${process.env.KV_REST_API_URL}/del/waitlist:${email}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
          },
        }
      );

      console.log(`[ADMIN] Deleted email from KV: ${email}`);
      return NextResponse.json({
        message: 'Email deleted successfully',
        storage: 'Vercel KV'
      });
    }

    return NextResponse.json(
      { error: 'No storage backend available' },
      { status: 500 }
    );

  } catch (error) {
    console.error('[ADMIN] Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete email' },
      { status: 500 }
    );
  }
}
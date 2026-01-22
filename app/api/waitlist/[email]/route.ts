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
    // Delete from Supabase
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
        return NextResponse.json(
          { error: 'Failed to delete email' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Database not configured' },
      { status: 503 }
    );

  } catch (error) {
    console.error('[ADMIN] Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete email' },
      { status: 500 }
    );
  }
}
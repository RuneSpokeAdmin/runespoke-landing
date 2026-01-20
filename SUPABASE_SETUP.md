# 🚀 Supabase Integration Setup

## Step 1: Create the Waitlist Table in Supabase

1. **Go to your Supabase project**: https://app.supabase.com
2. Click on **SQL Editor** in the sidebar
3. **Copy and paste the entire contents** of `supabase-schema.sql`
4. Click **Run** to create the table and indexes

## Step 2: Get Your Supabase Credentials

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy these values:
   - **URL**: Your project URL (starts with `https://`)
   - **Service Role Key**: The `service_role` secret key (keep this secure!)
   - **Anon Key**: The `anon` public key

## Step 3: Add to Local Environment

Add these to your `.env.local` file:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-role-key-here
```

## Step 4: Add to Vercel Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com) → Your Project → Settings → Environment Variables
2. Add these three variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_KEY`
3. Click **Redeploy** to apply changes

## Step 5: Test the Integration

### Local Testing:
```bash
# Test signup
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# View emails (replace with your secret)
curl http://localhost:3000/api/waitlist \
  -H "Authorization: Bearer rs-hub-beta-2024-secure-key"
```

### Production Testing:
- Visit https://runespoke.ai
- Sign up with a test email
- Check Supabase Table Editor to see the entry

## How It Works

The system now has **intelligent fallback**:

1. **Primary Storage**: Supabase (if configured)
   - Persistent across deployments
   - Can query with SQL
   - Includes metadata and timestamps
   - Unsubscribe tracking

2. **Fallback Storage**: Vercel KV/Upstash Redis (if Supabase fails)
   - Already configured
   - Works as backup

3. **Always**: Logs to Vercel Functions logs
   - Emergency backup
   - Audit trail

## Viewing Your Data

### In Supabase:
1. Go to **Table Editor** → **waitlist**
2. See all signups with timestamps and metadata
3. Export as CSV if needed

### Via Admin Panel:
- https://runespoke.ai/admin/waitlist
- Password: `rs-hub-beta-2024-secure-key`

### Quick Stats Query:
Run this in Supabase SQL Editor:
```sql
SELECT * FROM waitlist_stats;
```

## Migration from Existing Data

If you have emails in Vercel KV that you want to move to Supabase:

```sql
-- Insert emails one by one (replace with actual emails)
INSERT INTO waitlist (email, metadata)
VALUES
  ('user1@example.com', '{"source": "migrated_from_kv"}'),
  ('user2@example.com', '{"source": "migrated_from_kv"}')
ON CONFLICT (email) DO NOTHING;
```

## Benefits of Supabase Integration

✅ **Persistent Storage** - Data survives deployments
✅ **SQL Queries** - Complex filtering and analytics
✅ **Real-time Updates** - Can build live dashboards
✅ **Export Options** - CSV, JSON, SQL dumps
✅ **Metadata Tracking** - Store additional info
✅ **Unsubscribe Management** - Track opt-outs properly

## Troubleshooting

- **"relation 'waitlist' does not exist"**: Run the SQL schema first
- **401 Unauthorized**: Check your service key is correct
- **No data showing**: Check environment variables in Vercel
- **Emails not storing**: Check Supabase logs for errors
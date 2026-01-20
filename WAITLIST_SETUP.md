# 📧 Waitlist Email Collection Setup

## Current Status
Emails are currently logged to Vercel's function logs but **NOT permanently stored**.

## How to Access Emails Now

### Option 1: Vercel Dashboard (Immediate Access)
1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your `runespoke-landing` project
3. Click on "Functions" tab
4. Click on "api/waitlist"
5. View "Logs" - all email signups are logged with `[WAITLIST SIGNUP]` prefix

### Option 2: Admin Page (After setting secret)
1. Set environment variable in Vercel:
   - Go to Settings → Environment Variables
   - Add: `WAITLIST_SECRET` = `your-secret-key-here`
   - Redeploy

2. Visit: https://runespoke-landing.vercel.app/admin/waitlist
3. Enter your secret key to view emails

## Setting Up Persistent Storage

### Quick Option 1: Use Webhook (5 minutes)
1. Create free webhook at [webhook.site](https://webhook.site) or [Zapier](https://zapier.com)
2. In `/app/api/waitlist/route.ts`, uncomment lines 27-32
3. Replace `YOUR_WEBHOOK_URL` with your webhook URL
4. Deploy - emails will now be sent to your webhook/Zapier

### Option 2: Use Your Existing Supabase (10 minutes)

1. **Create waitlist table in Supabase:**
```sql
CREATE TABLE waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

2. **Add environment variables to Vercel:**
   - `NEXT_PUBLIC_SUPABASE_URL` = your-supabase-url
   - `SUPABASE_SERVICE_KEY` = your-service-key (from Supabase settings)

3. **Enable Supabase in the API:**
   - In `/app/api/waitlist/route.ts`, uncomment lines 34-47
   - Deploy

4. **View emails in Supabase:**
   - Go to your Supabase dashboard
   - Navigate to Table Editor → waitlist
   - All emails will be stored there

### Option 3: Use Vercel KV (Redis) - Recommended
1. Go to Vercel Dashboard → Storage → Create Database
2. Select "KV" (Redis)
3. Follow setup instructions
4. Emails will persist between deploys

## Quick Email Export

To export current session emails (until you set up persistence):
1. Visit: `/admin/waitlist`
2. Enter your secret key
3. Click "Download CSV"

## Need Help?
Contact: hello@runespoke.ai
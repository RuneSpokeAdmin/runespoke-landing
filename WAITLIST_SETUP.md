# 📧 Waitlist Email Collection Setup

## Current Status
Emails are stored in **Supabase PostgreSQL database** for persistent storage.

## How to Access Emails

### Option 1: Admin Dashboard
1. Visit: https://runespoke.ai/admin/waitlist
2. Enter your secret key (set in `WAITLIST_SECRET` environment variable)
3. View, delete, or export emails as CSV

### Option 2: Supabase Dashboard
1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Navigate to Table Editor → waitlist
3. View all email signups directly in the database

### Option 3: Vercel Logs (Backup)
1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your `runespoke-landing` project
3. Click on "Functions" tab → "api/waitlist"
4. View "Logs" - all signups are logged with `[WAITLIST SIGNUP]` prefix

## Required Setup

### Database Configuration (Required)

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
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your-anon-key
   - `SUPABASE_SERVICE_KEY` = your-service-key (from Supabase settings)
   - `WAITLIST_SECRET` = your-admin-secret-key

3. **Redeploy** the application after adding environment variables

## Email Notifications

### AWS SES Configuration (Production Ready)
The application uses AWS SES for sending confirmation emails:
- Region: `us-east-2` (Ohio)
- Production access already enabled
- SPF/DKIM records configured for runespoke.ai

Environment variables needed:
- `AWS_ACCESS_KEY_ID` = your-aws-key
- `AWS_SECRET_ACCESS_KEY` = your-aws-secret
- `AWS_REGION` = us-east-2
- `AWS_SES_FROM_EMAIL` = hello@runespoke.ai

## Features

### Admin Panel
- View all waitlist emails
- Delete individual emails
- Bulk delete all emails
- Export to CSV
- Real-time storage status

### API Endpoints
- `POST /api/waitlist` - Add email to waitlist
- `GET /api/waitlist` - Retrieve all emails (requires auth)
- `DELETE /api/waitlist/[email]` - Remove email (requires auth)

## Security
- Admin endpoints protected with bearer token authentication
- Emails normalized to lowercase to prevent duplicates
- Email validation before storage
- CORS protection on all endpoints

## Need Help?
Contact: hello@runespoke.ai
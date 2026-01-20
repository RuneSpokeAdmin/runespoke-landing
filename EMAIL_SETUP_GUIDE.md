# 📧 Complete Email Collection Setup Guide

## Quick Setup (5 Minutes) - Choose ONE Option:

### Option 1: Vercel KV (Recommended - Free & Persistent)

1. **Enable Vercel KV Storage:**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Select your `runespoke-landing` project
   - Click "Storage" tab
   - Click "Create Database"
   - Choose "KV" (Redis)
   - Name it "waitlist"
   - Click "Create"

2. **Connect to your project:**
   - Vercel automatically adds environment variables
   - Click "Connect" when prompted
   - Your emails are now persistent!

3. **Add Admin Secret:**
   - Go to Settings → Environment Variables
   - Add: `WAITLIST_SECRET = your-secret-key-123`
   - Redeploy

### Option 2: Use Your Existing Supabase

1. **Create waitlist table:**
   ```sql
   CREATE TABLE waitlist (
     id SERIAL PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

2. **Add to Vercel Environment Variables:**
   - `NEXT_PUBLIC_SUPABASE_URL = your-url`
   - `SUPABASE_SERVICE_KEY = your-service-key`
   - `WAITLIST_SECRET = your-admin-secret`

3. **Redeploy** - Emails now save to Supabase!

## Adding Email Confirmations (Optional but Recommended)

### Option 1: Using AWS SES (Recommended if you have AWS)

1. **Verify your email/domain in AWS SES:**
   - Go to AWS SES Console → Verified identities
   - Add `hello@runespoke.com` or verify entire `runespoke.com` domain
   - Follow verification steps (email or DNS)

2. **Get out of sandbox mode (for production):**
   - New AWS accounts start in sandbox mode
   - Request production access in SES console

3. **Add to Vercel Environment Variables:**
   - `AWS_ACCESS_KEY_ID = your-access-key`
   - `AWS_SECRET_ACCESS_KEY = your-secret-key`
   - `AWS_REGION = us-east-1` (or your preferred region)
   - `AWS_SES_FROM_EMAIL = hello@runespoke.com`

4. **Redeploy** - Users now get confirmation emails!

### Option 2: Using Resend.com (Easiest - 100 free emails/day)

1. **Sign up at [Resend.com](https://resend.com)** (free)
2. **Get your API key:**
   - Go to [API Keys](https://resend.com/api-keys)
   - Click "Create API Key"
   - Give it a name like "RuneSpoke Beta"
   - Copy the key (starts with `re_`)
3. **Add to Vercel Environment Variables:**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Add: `RESEND_API_KEY = re_xxxxxxxxxxxxx`
   - Add: `RESEND_FROM_EMAIL = hello@runespoke.com`
4. **Domain Verification (Optional for custom domain):**
   - If you want to send from @runespoke.com
   - Go to Resend → Domains → Add Domain
   - Follow DNS verification steps
   - Otherwise emails will send from onboarding@resend.dev
5. **Redeploy** - Users now get confirmation emails!

## How to View Collected Emails

### Method 1: Admin Page
- Visit: https://runespoke-landing.vercel.app/admin/waitlist
- Enter your `WAITLIST_SECRET`
- View all emails & download as CSV

### Method 2: Vercel Dashboard (Backup)
- Vercel Dashboard → Functions → Logs
- Look for `[WAITLIST SIGNUP]` entries

### Method 3: Direct Database
- **Vercel KV**: Dashboard → Storage → Data Browser
- **Supabase**: Table Editor → waitlist table

## What Users See

When someone signs up:
1. Form shows "Joining..." with spinner
2. Success: "Successfully joined the waitlist! Check your email for confirmation."
3. If email configured: They receive a professional confirmation email
4. If duplicate: "You're already on the waitlist!"

## Confirmation Email Template

Users receive:
```
Subject: Welcome to RuneSpoke Hub Beta Waitlist!

Thank you for joining the RuneSpoke Hub Beta waitlist!

We're excited to have you as one of our early adopters.

You'll be among the first to know when we launch our beta
program. Keep an eye on your inbox for your exclusive invitation!

What you can expect:
• 90% cost savings compared to GitHub Copilot
• Support for Claude, ChatGPT, Gemini, and Local LLMs
• Universal IDE integration
• Self-hosted options for complete control

Best regards,
The RuneSpoke Team
```

## Testing Your Setup

1. **Test signup**: Go to your site and sign up with a test email
2. **Check storage**: Visit /admin/waitlist with your secret
3. **Verify email**: Check if confirmation was received

## Current Status Check

Your API automatically tries storage in this order:
1. Vercel KV (if configured)
2. Supabase (if configured)
3. Temporary memory (lost on redeploy)
4. Always logs to Vercel (backup)

## Need Help?

- All signups are logged in Vercel Dashboard → Functions → Logs
- Even without setup, you can see emails there
- Contact: hello@runespoke.com
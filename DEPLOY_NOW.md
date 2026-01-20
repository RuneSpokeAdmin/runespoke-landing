# 🚀 DEPLOY TO VERCEL - FINAL STEPS

## ✅ Everything is Ready!

Your beta landing page is complete with:
- 📧 Email collection (Upstash Redis)
- 💌 Email confirmations (Resend)
- 🎯 Modal signup system
- 💰 Free beta pricing with 50% lifetime discount
- 🎉 Full Enterprise access for beta testers

## 📦 Step 1: Push to GitHub

### Use GitHub Desktop (Easiest):
1. Open **GitHub Desktop**
2. Select **runespoke-landing** repository
3. You'll see **6 commits** ready to push
4. Click **"Push origin"**

### OR Use Command Line:
```bash
git push origin main
```

## 🔧 Step 2: Add to Vercel Environment Variables

Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables

Add these variables:

```env
WAITLIST_SECRET=rs-hub-beta-2024-secure-key
RESEND_API_KEY=re_hnmViDAd_JEuU89DrRHYTSjcYKYQfjCvk
RESEND_FROM_EMAIL=onboarding@resend.dev
```

Click **"Save"** for each one.

## 🎯 Step 3: Redeploy (if needed)

After adding environment variables:
1. Go to Deployments tab
2. Click the three dots on latest deployment
3. Select "Redeploy"

## 📊 Your Live URLs

- **Landing Page**: https://runespoke-landing.vercel.app
- **Admin Panel**: https://runespoke-landing.vercel.app/admin/waitlist
- **Admin Password**: `rs-hub-beta-2024-secure-key`

## ✨ What Users Will Experience

1. Visit your landing page
2. Click any CTA button → Email modal appears
3. Enter email → Get confirmation message
4. Receive welcome email from `onboarding@resend.dev`
5. Their email is stored in Upstash Redis

## 📧 Email Notes

- Currently using Resend's default domain (`onboarding@resend.dev`)
- To use `hello@runespoke.com`:
  1. Go to https://resend.com/domains
  2. Add and verify `runespoke.com` domain
  3. Update `RESEND_FROM_EMAIL` in Vercel

## 🎉 You're Done!

Push to GitHub now and your beta landing page will be live in ~2 minutes!
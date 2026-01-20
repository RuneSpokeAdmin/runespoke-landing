# 🚀 Push to GitHub - Quick Guide

Since SSH has permission issues, here are 3 ways to push your changes:

## Option 1: GitHub Desktop (Easiest)
1. Open GitHub Desktop
2. It should show "runespoke-landing" repository with uncommitted changes
3. Review the changes (2 commits ready)
4. Click "Push origin" button
5. Done! ✅

## Option 2: Personal Access Token (Command Line)
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic) with "repo" scope
3. Copy the token
4. Run this command:
```bash
git push https://RuneSpokeAdmin:<YOUR-TOKEN>@github.com/RuneSpokeAdmin/runespoke-landing.git main
```

## Option 3: Fix SSH Key
1. Your SSH key might be a deploy key with limited permissions
2. Add your SSH key to your GitHub account (not just the repo):
   - Copy your public key: `cat ~/.ssh/id_ed25519_github.pub`
   - Go to GitHub → Settings → SSH and GPG keys
   - Add new SSH key
   - Then push: `git push origin main`

## Your Commits Ready to Push:
- ✅ Update to use Vercel KV environment variables and add persistent email storage
- ✅ Add automatic email confirmation system with Resend/SendGrid support
- ✅ Update email system to prioritize AWS SES over other providers

## After Pushing:

### Add to Vercel Environment Variables:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add these (all are already in your .env.local):
   - `WAITLIST_SECRET = rs-hub-beta-2024-secure-key`
   - For AWS SES (if you have AWS):
     - `AWS_ACCESS_KEY_ID = your-key`
     - `AWS_SECRET_ACCESS_KEY = your-secret`
     - `AWS_REGION = us-east-1`
     - `AWS_SES_FROM_EMAIL = hello@runespoke.com`

3. Your KV variables are already there (auto-added by Vercel)

### Test Your Live Site:
- Landing page: https://runespoke-landing.vercel.app
- Admin panel: https://runespoke-landing.vercel.app/admin/waitlist
- Password: `rs-hub-beta-2024-secure-key`
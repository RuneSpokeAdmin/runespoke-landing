# 🔧 How to Add Environment Variables to Vercel

## Step-by-Step Guide with Screenshots

### Step 1: Go to Vercel Dashboard
1. Open your browser
2. Go to: **https://vercel.com/dashboard**
3. Log in if needed

### Step 2: Find Your Project
1. Look for **"runespoke-landing"** in your projects list
2. Click on the project name

### Step 3: Navigate to Settings
1. Once in your project, look at the top navigation
2. Click on **"Settings"** tab (it's usually the last tab)

### Step 4: Find Environment Variables
1. In the left sidebar of Settings, scroll down
2. Click on **"Environment Variables"**
3. You'll see a page that says "Environment Variables" at the top

### Step 5: Add Each Variable

#### Add the first variable:
1. In the **"Key"** field, type: `WAITLIST_SECRET`
2. In the **"Value"** field, type: `rs-hub-beta-2024-secure-key`
3. Leave "Environment" checkboxes as default (all checked)
4. Click **"Save"** button

#### Add the second variable:
1. Click **"Add Another"** or the form resets
2. In the **"Key"** field, type: `RESEND_API_KEY`
3. In the **"Value"** field, type: `re_hnmViDAd_JEuU89DrRHYTSjcYKYQfjCvk`
4. Click **"Save"** button

#### Add the third variable:
1. Click **"Add Another"**
2. In the **"Key"** field, type: `RESEND_FROM_EMAIL`
3. In the **"Value"** field, type: `onboarding@resend.dev`
4. Click **"Save"** button

### Step 6: Verify They're Added
You should now see all 3 variables listed:
- WAITLIST_SECRET (hidden value)
- RESEND_API_KEY (hidden value)
- RESEND_FROM_EMAIL (hidden value)

Plus your KV_ variables that Vercel added automatically

### Step 7: Trigger Redeploy (Optional)
If your site is already deployed:
1. Go to the **"Deployments"** tab
2. Find the most recent deployment
3. Click the three dots menu (**⋮**)
4. Select **"Redeploy"**
5. Click **"Redeploy"** in the popup

## 🎯 Direct Links

### Quick Access URL:
```
https://vercel.com/[your-username]/runespoke-landing/settings/environment-variables
```

Replace [your-username] with your Vercel username

### Alternative Path:
1. https://vercel.com → Login
2. Click on "runespoke-landing" project
3. Click "Settings" at the top
4. Click "Environment Variables" in left sidebar

## 📝 Copy-Paste Values

```
Key: WAITLIST_SECRET
Value: rs-hub-beta-2024-secure-key

Key: RESEND_API_KEY
Value: re_hnmViDAd_JEuU89DrRHYTSjcYKYQfjCvk

Key: RESEND_FROM_EMAIL
Value: onboarding@resend.dev
```

## ✅ How to Know It Worked

1. The variables appear in your list
2. After redeploy, check your site
3. Test email signup - you should get a confirmation email
4. Check admin panel at `/admin/waitlist` with password: `rs-hub-beta-2024-secure-key`

## 🚨 Common Issues

**Can't find Environment Variables?**
- Make sure you're in the Settings tab
- Scroll down in the left sidebar
- It's under "General" section

**Variables not working?**
- Did you click "Save" for each one?
- Try redeploying from Deployments tab
- Check spelling of keys exactly as shown

**Don't see your project?**
- Make sure you're logged into the right Vercel account
- Check if project name is different
- Might need to import from GitHub first
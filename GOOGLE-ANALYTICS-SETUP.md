# Google Analytics & SEO Setup Guide

## 1. Google Analytics 4 (GA4) Setup

### Step 1: Create GA4 Property
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Admin" (gear icon)
3. Click "Create Property"
4. Enter property name: "RuneSpoke Hub"
5. Select your timezone and currency
6. Choose "Web" as platform
7. Enter website URL: `https://runespoke.ai`

### Step 2: Get Measurement ID
1. After creating property, go to "Data Streams"
2. Click on your web stream
3. Copy the "Measurement ID" (starts with G-)
   - Example: `G-XXXXXXXXXX`

### Step 3: Add to Vercel Environment Variables
1. Go to [Vercel Dashboard](https://vercel.com/RuneSpokeAdmin/runespoke-landing/settings/environment-variables)
2. Add new variable:
   - Name: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - Value: `G-XXXXXXXXXX` (your measurement ID)
3. Deploy to apply changes

## 2. Google Search Console Setup (Essential for SEO)

### Step 1: Verify Domain
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property → Choose "Domain"
3. Enter: `runespoke.ai`
4. Add the TXT record to your DNS:
   - Type: TXT
   - Name: @ (or leave blank)
   - Value: `google-site-verification=xxxxx`

### Step 2: Submit Sitemap
1. In Search Console, go to "Sitemaps"
2. Enter: `https://runespoke.ai/sitemap.xml`
3. Click "Submit"

### Step 3: Request Indexing
1. Go to "URL Inspection"
2. Enter: `https://runespoke.ai`
3. Click "Request Indexing"

## 3. What Gets Tracked

### Automatically Tracked:
- Page views
- Session duration
- Bounce rate
- Traffic sources (organic, direct, referral)
- Device types
- Geographic location
- Browser/OS information

### Custom Events We Track:
- Email waitlist signups (`sign_up` event)
- Button clicks
- Form submissions
- Conversion funnel

## 4. Benefits for Your Business

### Analytics Benefits:
- **Conversion Tracking**: See how many visitors become waitlist signups
- **Traffic Sources**: Know where your best users come from
- **User Behavior**: Understand what content engages users
- **A/B Testing**: Test different landing page versions
- **ROI Measurement**: Track marketing campaign effectiveness

### SEO Benefits:
- **Sitemap.xml**: Helps Google find all your pages
- **Robots.txt**: Controls what gets indexed
- **Search Console**: Shows what keywords bring traffic
- **Performance Data**: Page speed insights
- **Mobile Usability**: Identifies mobile issues

## 5. Viewing Your Analytics

### Real-Time Data:
1. Go to GA4 → Reports → Realtime
2. See live visitor activity

### Key Reports to Monitor:
- **Acquisition**: Where users come from
- **Engagement**: What pages they visit
- **Conversions**: Waitlist signup rate
- **Demographics**: Who your users are

## 6. Google Ads (Optional - If Running Paid Campaigns)

### Setup Conversion Tracking:
1. In Google Ads, go to Tools → Conversions
2. Create new conversion → Website
3. Choose "Sign-up" as category
4. Add tracking code (already integrated)

### Benefits:
- Track ROI from paid ads
- Optimize bidding strategies
- Create remarketing audiences
- Measure cost per acquisition

## 7. Privacy Compliance

### GDPR/CCPA Compliance:
- Analytics respects Do Not Track
- No personally identifiable information collected
- Cookie consent not required for GA4 in cookieless mode
- Privacy policy already mentions analytics

## Environment Variables Needed

Add to `.env.local`:
```
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Add to Vercel:
- Same variable with your actual measurement ID

## Testing Your Setup

### Verify Analytics is Working:
1. Visit your site
2. Open GA4 Realtime report
3. You should see yourself as active user

### Verify Search Console:
1. Check "Coverage" report for indexed pages
2. Check "Performance" for search impressions
3. Monitor for any crawl errors

## Important Notes

- Analytics data starts collecting immediately
- Search Console data takes 2-3 days to appear
- Full SEO impact takes 4-6 weeks
- Keep monitoring and optimizing based on data

## Support

For Google Analytics: https://support.google.com/analytics
For Search Console: https://support.google.com/webmasters
For implementation issues: Create issue in GitHub repo
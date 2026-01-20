# 🚀 Update Vercel Environment Variables

## Add these to Vercel Dashboard

Go to: https://vercel.com → Your Project → Settings → Environment Variables

Add these variables:

```
AWS_ACCESS_KEY_ID=(your AWS access key - starts with AKIA)
AWS_SECRET_ACCESS_KEY=(your AWS secret key)
AWS_REGION=us-east-1
AWS_SES_FROM_EMAIL=hello@runespoke.ai
```

Note: Use the AWS API credentials you created for SES access.

## Remove/Comment Out Resend Variables
Since AWS SES is now working, you can remove or leave these as backup:
- RESEND_API_KEY
- RESEND_FROM_EMAIL

## After Adding
Click "Redeploy" to apply the changes.

## Testing
Once deployed, test by signing up with any email address. Emails should now be sent via AWS SES!

## Important Notes
- AWS SES is now configured and working ✅
- Emails will be sent from `hello@runespoke.ai`
- Make sure `hello@runespoke.ai` is verified in AWS SES
- Check AWS SES console to ensure you're not in sandbox mode
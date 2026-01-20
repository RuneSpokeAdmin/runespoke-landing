interface EmailConfig {
  apiKey: string;
  fromEmail: string;
  provider: 'resend' | 'sendgrid' | 'none';
}

export async function getEmailConfig(): Promise<EmailConfig> {
  // Check for Resend
  if (process.env.RESEND_API_KEY) {
    return {
      apiKey: process.env.RESEND_API_KEY,
      fromEmail: process.env.RESEND_FROM_EMAIL || 'hello@runespoke.com',
      provider: 'resend'
    };
  }

  // Check for SendGrid
  if (process.env.SENDGRID_API_KEY) {
    return {
      apiKey: process.env.SENDGRID_API_KEY,
      fromEmail: process.env.SENDGRID_FROM_EMAIL || 'hello@runespoke.com',
      provider: 'sendgrid'
    };
  }

  return {
    apiKey: '',
    fromEmail: '',
    provider: 'none'
  };
}

export async function sendWaitlistConfirmation(email: string): Promise<boolean> {
  const config = await getEmailConfig();

  if (config.provider === 'none') {
    console.log('[EMAIL] No email provider configured, skipping confirmation');
    return false;
  }

  const emailContent = {
    to: email,
    from: config.fromEmail,
    subject: 'Welcome to RuneSpoke Hub Beta Waitlist!',
    text: `Thank you for joining the RuneSpoke Hub Beta waitlist!

We're excited to have you as one of our early adopters.

You'll be among the first to know when we launch our beta program. Keep an eye on your inbox for your exclusive invitation!

What you can expect:
• 90% cost savings compared to GitHub Copilot
• Support for Claude, ChatGPT, Gemini, and Local LLMs
• Universal IDE integration
• Self-hosted options for complete control

Best regards,
The RuneSpoke Team`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
    .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px; }
    .features { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .feature-item { padding: 8px 0; }
    .footer { text-align: center; padding-top: 20px; color: #6b7280; font-size: 14px; }
    h1 { margin: 0; font-size: 28px; }
    .beta-badge { display: inline-block; background: #fbbf24; color: #000; padding: 5px 15px; border-radius: 20px; font-weight: bold; margin-bottom: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="beta-badge">BETA PROGRAM</div>
      <h1>Welcome to RuneSpoke Hub!</h1>
    </div>
    <div class="content">
      <p>Thank you for joining the RuneSpoke Hub Beta waitlist!</p>

      <p>We're excited to have you as one of our early adopters. You'll be among the first to know when we launch our beta program.</p>

      <div class="features">
        <strong>What you can expect:</strong>
        <div class="feature-item">✓ 90% cost savings compared to GitHub Copilot</div>
        <div class="feature-item">✓ Support for Claude, ChatGPT, Gemini, and Local LLMs</div>
        <div class="feature-item">✓ Universal IDE integration</div>
        <div class="feature-item">✓ Self-hosted options for complete control</div>
      </div>

      <p>Keep an eye on your inbox for your exclusive beta invitation!</p>

      <div class="footer">
        <p>Best regards,<br>The RuneSpoke Team</p>
        <p style="font-size: 12px;">If you have any questions, reach out to hello@runespoke.com</p>
      </div>
    </div>
  </div>
</body>
</html>`
  };

  try {
    if (config.provider === 'resend') {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `RuneSpoke Hub <${config.fromEmail}>`,
          to: [email],
          subject: emailContent.subject,
          text: emailContent.text,
          html: emailContent.html,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('[EMAIL] Resend error:', error);
        return false;
      }

      console.log(`[EMAIL] Confirmation sent to ${email} via Resend`);
      return true;

    } else if (config.provider === 'sendgrid') {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email }] }],
          from: { email: config.fromEmail, name: 'RuneSpoke Hub' },
          subject: emailContent.subject,
          content: [
            { type: 'text/plain', value: emailContent.text },
            { type: 'text/html', value: emailContent.html }
          ],
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('[EMAIL] SendGrid error:', error);
        return false;
      }

      console.log(`[EMAIL] Confirmation sent to ${email} via SendGrid`);
      return true;
    }

    return false;
  } catch (error) {
    console.error('[EMAIL] Error sending confirmation:', error);
    return false;
  }
}
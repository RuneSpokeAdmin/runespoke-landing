import crypto from 'crypto';

interface EmailConfig {
  provider: 'aws-ses' | 'sendgrid' | 'resend' | 'none';
  fromEmail: string;
  apiKey?: string;
  awsAccessKeyId?: string;
  awsSecretKey?: string;
  awsRegion?: string;
}

export async function getEmailConfig(): Promise<EmailConfig> {
  // Check for AWS SES (prioritized)
  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    return {
      provider: 'aws-ses',
      fromEmail: process.env.AWS_SES_FROM_EMAIL || 'hello@runespoke.com',
      awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
      awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
      awsRegion: process.env.AWS_REGION || 'us-east-1'
    };
  }

  // Check for SendGrid
  if (process.env.SENDGRID_API_KEY) {
    return {
      provider: 'sendgrid',
      fromEmail: process.env.SENDGRID_FROM_EMAIL || 'hello@runespoke.com',
      apiKey: process.env.SENDGRID_API_KEY
    };
  }

  // Check for Resend
  if (process.env.RESEND_API_KEY) {
    return {
      provider: 'resend',
      fromEmail: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      apiKey: process.env.RESEND_API_KEY
    };
  }

  return {
    provider: 'none',
    fromEmail: ''
  };
}

// AWS SES v4 signature helper
function createAWSSignature(
  method: string,
  url: string,
  headers: Record<string, string>,
  payload: string,
  secretKey: string,
  region: string,
  service: string
): string {
  const datetime = headers['x-amz-date'];
  const date = datetime.substring(0, 8);

  // Create canonical request
  const canonicalUri = new URL(url).pathname;
  const canonicalQuerystring = '';
  const canonicalHeaders = Object.keys(headers)
    .sort()
    .map(key => `${key}:${headers[key]}`)
    .join('\n') + '\n';
  const signedHeaders = Object.keys(headers).sort().join(';');
  const payloadHash = crypto.createHash('sha256').update(payload).digest('hex');

  const canonicalRequest = [
    method,
    canonicalUri,
    canonicalQuerystring,
    canonicalHeaders,
    signedHeaders,
    payloadHash
  ].join('\n');

  // Create string to sign
  const algorithm = 'AWS4-HMAC-SHA256';
  const credentialScope = `${date}/${region}/${service}/aws4_request`;
  const stringToSign = [
    algorithm,
    datetime,
    credentialScope,
    crypto.createHash('sha256').update(canonicalRequest).digest('hex')
  ].join('\n');

  // Calculate signature
  const kDate = crypto.createHmac('sha256', 'AWS4' + secretKey).update(date).digest();
  const kRegion = crypto.createHmac('sha256', kDate).update(region).digest();
  const kService = crypto.createHmac('sha256', kRegion).update(service).digest();
  const kSigning = crypto.createHmac('sha256', kService).update('aws4_request').digest();

  return crypto.createHmac('sha256', kSigning).update(stringToSign).digest('hex');
}

export async function sendWaitlistConfirmation(email: string): Promise<boolean> {
  const config = await getEmailConfig();

  if (config.provider === 'none') {
    console.log('[EMAIL] No email provider configured, skipping confirmation');
    return false;
  }

  const emailContent = {
    subject: 'Welcome to RuneSpoke Hub Beta Waitlist!',
    text: `Thank you for joining the RuneSpoke Hub Beta waitlist!

We're excited to have you as one of our early adopters.

You'll be among the first to know when we launch our beta program. Keep an eye on your inbox for your exclusive invitation!

What you can expect:
• Use your own AI provider accounts - no markup
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
        <div class="feature-item">✓ Use your own AI provider accounts - no markup</div>
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
    if (config.provider === 'aws-ses') {
      const region = config.awsRegion || 'us-east-1';
      const service = 'ses';
      const host = `email.${region}.amazonaws.com`;
      const endpoint = `https://${host}/v2/email/outbound-emails`;

      const payload = JSON.stringify({
        Content: {
          Simple: {
            Body: {
              Html: {
                Charset: 'UTF-8',
                Data: emailContent.html
              },
              Text: {
                Charset: 'UTF-8',
                Data: emailContent.text
              }
            },
            Subject: {
              Charset: 'UTF-8',
              Data: emailContent.subject
            }
          }
        },
        Destination: {
          ToAddresses: [email]
        },
        FromEmailAddress: `RuneSpoke Hub <${config.fromEmail}>`
      });

      const datetime = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
      const headers: Record<string, string> = {
        'content-type': 'application/json',
        'host': host,
        'x-amz-date': datetime
      };

      // Create AWS signature
      const signature = createAWSSignature(
        'POST',
        endpoint,
        headers,
        payload,
        config.awsSecretKey!,
        region,
        service
      );

      const credentialScope = `${datetime.substring(0, 8)}/${region}/${service}/aws4_request`;
      const signedHeaders = Object.keys(headers).sort().join(';');

      headers['Authorization'] = `AWS4-HMAC-SHA256 Credential=${config.awsAccessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: payload
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('[EMAIL] AWS SES error:', error);
        return false;
      }

      console.log(`[EMAIL] Confirmation sent to ${email} via AWS SES`);
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

    } else if (config.provider === 'resend') {
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
    }

    return false;
  } catch (error) {
    console.error('[EMAIL] Error sending confirmation:', error);
    return false;
  }
}
# EmailJS Setup Guide

This application uses EmailJS to send barcode scan results via email. Follow these steps to configure it:

## Step 1: Sign Up for EmailJS

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier includes 200 emails/month)

## Step 2: Create an Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. **Save your Service ID** (you'll need it later)

## Step 3: Create an Email Template

1. Go to **Email Templates** in your EmailJS dashboard
2. Click **Create New Template**
3. Use this template structure:

**Subject:** Barcode Scan Results

**Content:**
```
Barcode Scan Results

Code 1: {{code1}}
Code 2: {{code2}}
Code 3: {{code3}}

Phone Number: {{phoneNumber}}
Email: {{email}}

Scan Time: {{timestamp}}
```

4. **Save your Template ID** (you'll need it later)

## Step 4: Get Your Public Key

1. Go to **Account** > **General** in your EmailJS dashboard
2. Find your **Public Key** under API Keys section
3. Copy the Public Key

## Step 5: Configure the Application

1. Open `src/js/constants.js`
2. Update the `EMAILJS_CONFIG` object with your credentials:

```javascript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id_here',      // From Step 2
  TEMPLATE_ID: 'your_template_id_here',    // From Step 3
  PUBLIC_KEY: 'your_public_key_here'       // From Step 4
};
```

## Step 6: Test

1. Run your application
2. Scan some barcodes (or manually enter codes)
3. Enter an email address
4. Click the "INVIA" (Submit) button
5. Check the recipient email inbox for the barcode results

## Troubleshooting

- **"EmailJS library is not loaded"**: Make sure the EmailJS script is included in `index.html`
- **"EmailJS configuration is incomplete"**: Check that all three values are set in `constants.js`
- **Email not received**: Check your EmailJS dashboard for error logs, verify your email service is properly connected
- **Template variables not working**: Make sure your template uses the exact variable names: `{{code1}}`, `{{code2}}`, `{{code3}}`, `{{phoneNumber}}`, `{{email}}`, `{{timestamp}}`

## Security Note

The Public Key is safe to expose in client-side code. However, for production use, consider:
- Setting up rate limiting in EmailJS
- Adding CAPTCHA or other spam protection
- Using environment variables for configuration (if using a build system that supports it)


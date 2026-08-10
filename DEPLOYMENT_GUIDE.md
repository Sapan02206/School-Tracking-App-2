# Email Configuration for Deployment

## Problem
Emails work locally but fail after deployment to platforms like Vercel, Render, Heroku, etc.

## Solutions

### 1. **Set Environment Variables on Your Hosting Platform**

After deploying, you MUST add these environment variables in your hosting dashboard:

#### **For Vercel:**
1. Go to Project Settings → Environment Variables
2. Add:
   - `EMAIL_USER` = `codewithsapan007@gmail.com`
   - `EMAIL_PASS` = `mjepfsqgbkspcukz`
   - `PORT` = `3001` (or leave default)

#### **For Render:**
1. Go to Environment → Environment Variables
2. Add the same variables

#### **For Heroku:**
```bash
heroku config:set EMAIL_USER=codewithsapan007@gmail.com
heroku config:set EMAIL_PASS=mjepfsqgbkspcukz
```

---

### 2. **Gmail Security Issues**

If emails still don't work, check these:

#### **Option A: Use Gmail App Password (Recommended)**
✅ You're already using this: `mjepfsqgbkspcukz`

Make sure:
- 2-Step Verification is enabled on your Google account
- App Password is valid and hasn't expired
- Go to: https://myaccount.google.com/apppasswords

#### **Option B: Enable "Less Secure Apps"** (Not Recommended)
- Go to: https://myaccount.google.com/lesssecureapps
- Turn it ON (but Google may block this)

---

### 3. **Alternative Email Services (More Reliable)**

Gmail sometimes blocks emails from servers. Consider these alternatives:

#### **Option A: SendGrid (FREE - 100 emails/day)**
```javascript
// Install: npm install @sendgrid/mail
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: email,
  from: 'codewithsapan007@gmail.com',
  subject: subject,
  text: text,
};
sgMail.send(msg);
```
Get API Key: https://signup.sendgrid.com/

#### **Option B: AWS SES (Very Cheap)**
- More reliable for production
- Setup: https://aws.amazon.com/ses/

#### **Option C: Mailgun (FREE - 5000 emails/month)**
- Easy setup
- https://www.mailgun.com/

---

### 4. **Common Deployment Errors**

| Error | Solution |
|-------|----------|
| `Invalid login` | Check if EMAIL_USER and EMAIL_PASS are set correctly |
| `Connection timeout` | Your hosting platform might block Gmail SMTP (port 465/587). Use SendGrid instead |
| `Authentication failed` | Regenerate Gmail App Password |
| `No emails sent` | Check if environment variables are loaded: `console.log(process.env.EMAIL_USER)` |

---

### 5. **Testing Email in Production**

Add this test endpoint to verify:

```javascript
app.get('/test-email-config', (req, res) => {
  res.json({
    emailUser: process.env.EMAIL_USER ? 'Set ✅' : 'Missing ❌',
    emailPass: process.env.EMAIL_PASS ? 'Set ✅' : 'Missing ❌',
    emailService: 'Gmail',
  });
});
```

Visit: `https://your-deployed-url.com/test-email-config`

---

## Quick Checklist ✅

Before deploying:
- [ ] `.env` file created locally (never commit this!)
- [ ] `.gitignore` includes `.env`
- [ ] Environment variables added to hosting platform
- [ ] `dotenv` package installed
- [ ] `require('dotenv').config()` added to server.js
- [ ] Tested locally first

After deploying:
- [ ] Check environment variables are set on hosting dashboard
- [ ] Test `/test-email` endpoint
- [ ] Check server logs for email errors
- [ ] Consider switching to SendGrid if Gmail fails

---

## Recommended: Switch to SendGrid for Production

Gmail is not ideal for production. Here's why SendGrid is better:

1. **More Reliable** - Won't block your emails
2. **Better Deliverability** - Emails won't go to spam
3. **Free Tier** - 100 emails/day
4. **Easy Setup** - Just need an API key

Need help switching to SendGrid? Let me know!

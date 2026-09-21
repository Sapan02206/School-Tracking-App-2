const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Configure SMTP transporter (fallback to hardcoded for Vercel compatibility)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'codewithsapan007@gmail.com',
    pass: process.env.EMAIL_PASS || 'mjepfsqgbkspcukz',
  },
  logger: true,
  debug: true,
});

// Verify transporter on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('Error configuring mail transporter:', error);
  } else {
    console.log('Mail transporter is ready');
  }
});

// Email sending function
async function sendEmail(to, subject, text) {
  const mailOptions = {
    from: '"School Admin" <codewithsapan007@gmail.com>',
    to,
    subject,
    text,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}

// API Routes
app.post('/send-attendance-email', async (req, res) => {
  const { to, subject, text } = req.body;
  if (!to || !subject || !text) return res.status(400).json({ success: false, message: 'Missing required fields' });
  const result = await sendEmail(to, subject, text);
  res.json(result);
});

app.post('/send-exam-schedule-email', async (req, res) => {
  const { to, subject, text } = req.body;
  if (!to || !subject || !text) return res.status(400).json({ success: false, message: 'Missing required fields' });
  const result = await sendEmail(to, subject, text);
  res.json(result);
});

app.post('/send-result-upload-email', async (req, res) => {
  const { to, subject, text } = req.body;
  if (!to || !subject || !text) return res.status(400).json({ success: false, message: 'Missing required fields' });
  const result = await sendEmail(to, subject, text);
  res.json(result);
});

app.post('/send-new-student-email', async (req, res) => {
  const { to, subject, text } = req.body;
  if (!to || !subject || !text) return res.status(400).json({ success: false, message: 'Missing required fields' });
  const result = await sendEmail(to, subject, text);
  res.json(result);
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    emailUser: process.env.EMAIL_USER || 'codewithsapan007@gmail.com (fallback)',
    emailPass: (process.env.EMAIL_PASS || 'mjepfsqgbkspcukz') ? 'SET' : 'NOT SET',
  });
});

// Test email route
app.get('/test-email', async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: '"School Admin" <codewithsapan007@gmail.com>',
      to: process.env.EMAIL_USER || 'codewithsapan007@gmail.com',
      subject: 'Test Email from School Tracking Server',
      text: 'This is a test email to verify your server config.',
    });
    res.send('Test email sent: ' + info.messageId);
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).send('Failed: ' + error.message);
  }
});

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

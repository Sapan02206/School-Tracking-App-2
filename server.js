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

// Log env vars on startup (masked) so we can verify in Vercel logs
console.log('EMAIL_USER:', process.env.EMAIL_USER ? process.env.EMAIL_USER : '❌ NOT SET');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ SET (hidden)' : '❌ NOT SET');

// Configure SMTP transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generic email send function
async function sendEmail(to, subject, text) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Email credentials not configured.');
    return { success: false, error: 'Email credentials not set in environment variables.' };
  }
  try {
    const info = await transporter.sendMail({
      from: `"School Admin" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
    console.log('Email sent:', info.messageId);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error.message);
    return { success: false, error: error.message };
  }
}

// Email API routes
app.post('/send-attendance-email', async (req, res) => {
  const { to, subject, text } = req.body;
  if (!to || !subject || !text) return res.status(400).json({ success: false, message: 'Missing fields' });
  const result = await sendEmail(to, subject, text);
  res.json(result);
});

app.post('/send-exam-schedule-email', async (req, res) => {
  const { to, subject, text } = req.body;
  if (!to || !subject || !text) return res.status(400).json({ success: false, message: 'Missing fields' });
  const result = await sendEmail(to, subject, text);
  res.json(result);
});

app.post('/send-result-upload-email', async (req, res) => {
  const { to, subject, text } = req.body;
  if (!to || !subject || !text) return res.status(400).json({ success: false, message: 'Missing fields' });
  const result = await sendEmail(to, subject, text);
  res.json(result);
});

app.post('/send-new-student-email', async (req, res) => {
  const { to, subject, text } = req.body;
  if (!to || !subject || !text) return res.status(400).json({ success: false, message: 'Missing fields' });
  const result = await sendEmail(to, subject, text);
  res.json(result);
});

// Health check — use this to verify the server is running on Vercel
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    emailUser: process.env.EMAIL_USER ? process.env.EMAIL_USER : 'NOT SET',
    emailPass: process.env.EMAIL_PASS ? 'SET' : 'NOT SET',
  });
});

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

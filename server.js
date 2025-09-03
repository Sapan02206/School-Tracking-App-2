const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // ✅ Serve static files

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'codewithsapan007@gmail.com',
    pass: 'mjep fsqg bksp cukz'
  }
});

function sendEmail(to, subject, text) {
  const mailOptions = {
    from: 'School Admin <codewithsapan007@gmail.com>',
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// Attendance Email
app.post('/send-attendance', (req, res) => {
  const { name, email, date, status } = req.body;
  const subject = 'Attendance Update';
  const text = `Hi ${name}, your attendance for ${date} is marked as: ${status}.`;
  sendEmail(email, subject, text);
  res.send('Attendance email sent');
});

// Result Email
app.post('/upload-result', (req, res) => {
  const { name, email, result } = req.body;
  const subject = 'Result Uploaded';
  const text = `Hi ${name}, your result has been uploaded. Check it in the app: ${result}`;
  sendEmail(email, subject, text);
  res.send('Result email sent');
});

// Exam Schedule Email
app.post('/upload-schedule', (req, res) => {
  const { name, email, schedule } = req.body;
  const subject = 'Exam Schedule Uploaded';
  const text = `Hi ${name}, your exam schedule has been uploaded. Check it here: ${schedule}`;
  sendEmail(email, subject, text);
  res.send('Schedule email sent');
});

// New Student Added Email
app.post('/add-student', (req, res) => {
  const { name, email, batch } = req.body;
  const subject = 'Welcome to School Tracking App';
  const text = `Hi ${name},\n\nYou have been added to the School Tracking App for batch ${batch}.\nCheck your student dashboard for details.`;
  sendEmail(email, subject, text);
  res.send('Student addition email sent');
});

// Serve index.html by default
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

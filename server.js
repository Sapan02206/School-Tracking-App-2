const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// =====================================================================
// DATABASE CONNECTION
// =====================================================================
const pool = new Pool({
  host: 'aws-0-ap-southeast-2.pooler.supabase.com',
  port: 5432,
  database: 'postgres',
  user: 'postgres.tcmpovdqpnixcnkswbnx',
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false },
});

pool.query('SELECT NOW()', (err) => {
  if (err) console.error('DB connection error:', err.message);
  else console.log('✅ Connected to Supabase database');
});

// =====================================================================
// EMAIL TRANSPORTER
// =====================================================================
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(to, subject, text) {
  if (!to) return { success: false, error: 'No email address' };
  try {
    const info = await transporter.sendMail({
      from: `"School Admin" <${process.env.EMAIL_USER}>`,
      to, subject, text,
    });
    console.log('Email sent:', info.messageId);
    return { success: true };
  } catch (err) {
    console.error('Email error:', err.message);
    return { success: false, error: err.message };
  }
}

// =====================================================================
// AUTH ROUTES
// =====================================================================

// LOGIN
app.post('/api/login', async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) return res.status(400).json({ success: false, message: 'Missing fields' });
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username=$1 AND password=$2 AND role=$3',
      [username, password, role]
    );
    if (result.rows.length === 0) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =====================================================================
// USER ROUTES
// =====================================================================

// GET all users
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY created_at ASC');
    res.json({ success: true, users: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// UPDATE user (profile update)
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, surname, email, phone, username, password } = req.body;
  try {
    // Check username uniqueness
    const existing = await pool.query('SELECT id FROM users WHERE username=$1 AND id!=$2', [username, id]);
    if (existing.rows.length > 0) return res.status(400).json({ success: false, message: 'Username already exists' });
    const result = await pool.query(
      'UPDATE users SET name=$1, surname=$2, email=$3, phone=$4, username=$5, password=$6 WHERE id=$7 RETURNING *',
      [name, surname || '', email || '', phone, username, password, id]
    );
    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =====================================================================
// STUDENT ROUTES
// =====================================================================

// GET all students
app.get('/api/students', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE role='student' ORDER BY roll_no ASC");
    res.json({ success: true, students: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ADD student
app.post('/api/students', async (req, res) => {
  const { id, name, surname, email, phone, username, password, batch_id, std, division, roll_no } = req.body;
  try {
    const existing = await pool.query('SELECT id FROM users WHERE username=$1', [username]);
    if (existing.rows.length > 0) return res.status(400).json({ success: false, message: 'Username already exists' });
    const result = await pool.query(
      `INSERT INTO users (id, username, password, role, name, surname, email, phone, batch_id, std, division, roll_no)
       VALUES ($1,$2,$3,'student',$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [id, username, password, name, surname || '', email || '', phone, batch_id, std, division, roll_no]
    );
    const student = result.rows[0];
    // Send welcome email
    if (email) {
      const batchRes = await pool.query('SELECT name FROM batches WHERE id=$1', [batch_id]);
      const batchName = batchRes.rows[0] ? batchRes.rows[0].name : '';
      await sendEmail(email, 'Welcome to School',
        `Dear ${name},\n\nYou have been added.\nBatch: ${batchName} | Std: ${std} | Division: ${division} | Roll No: ${roll_no}\nUsername: ${username}\nPassword: ${password}\n\nRegards,\nSchool Administration`
      );
    }
    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// UPDATE student
app.put('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  const { name, surname, email, phone, username, password, batch_id, std, division } = req.body;
  try {
    const existing = await pool.query('SELECT id FROM users WHERE username=$1 AND id!=$2', [username, id]);
    if (existing.rows.length > 0) return res.status(400).json({ success: false, message: 'Username already exists' });
    const result = await pool.query(
      `UPDATE users SET name=$1, surname=$2, email=$3, phone=$4, username=$5, password=$6, batch_id=$7, std=$8, division=$9 WHERE id=$10 RETURNING *`,
      [name, surname || '', email || '', phone, username, password, batch_id, std, division, id]
    );
    res.json({ success: true, student: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE student
app.delete('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE id=$1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET next roll number
app.get('/api/students/rollno', async (req, res) => {
  const { batch_id, std, division } = req.query;
  try {
    const result = await pool.query(
      "SELECT COALESCE(MAX(roll_no), 0) + 1 AS next_roll FROM users WHERE role='student' AND batch_id=$1 AND std=$2 AND division=$3",
      [batch_id, std, division]
    );
    res.json({ success: true, roll_no: result.rows[0].next_roll });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =====================================================================
// BATCH ROUTES
// =====================================================================

// GET all batches
app.get('/api/batches', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM batches ORDER BY name ASC');
    res.json({ success: true, batches: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ADD batch
app.post('/api/batches', async (req, res) => {
  const { id, name } = req.body;
  try {
    const existing = await pool.query('SELECT id FROM batches WHERE LOWER(name)=LOWER($1)', [name]);
    if (existing.rows.length > 0) return res.status(400).json({ success: false, message: 'Batch already exists' });
    const result = await pool.query('INSERT INTO batches (id, name) VALUES ($1, $2) RETURNING *', [id, name]);
    res.json({ success: true, batch: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE batch
app.delete('/api/batches/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('UPDATE users SET batch_id=NULL WHERE batch_id=$1', [id]);
    await pool.query('DELETE FROM batches WHERE id=$1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =====================================================================
// ATTENDANCE ROUTES
// =====================================================================

// GET attendance (with optional filters)
app.get('/api/attendance', async (req, res) => {
  const { student_id, batch_id, date, month } = req.query;
  try {
    let query = 'SELECT * FROM attendance WHERE 1=1';
    const params = [];
    if (student_id) { params.push(student_id); query += ` AND student_id=$${params.length}`; }
    if (batch_id)   { params.push(batch_id);   query += ` AND batch_id=$${params.length}`; }
    if (date)       { params.push(date);        query += ` AND date=$${params.length}`; }
    if (month)      { params.push(month + '%'); query += ` AND date::TEXT LIKE $${params.length}`; }
    query += ' ORDER BY date DESC';
    const result = await pool.query(query, params);
    res.json({ success: true, attendance: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ADD attendance
app.post('/api/attendance', async (req, res) => {
  const { id, student_id, batch_id, date, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO attendance (id, student_id, batch_id, date, status) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [id, student_id, batch_id, date, status]
    );
    // Send email
    const studentRes = await pool.query('SELECT email, name FROM users WHERE id=$1', [student_id]);
    const student = studentRes.rows[0];
    if (student && student.email) {
      await sendEmail(student.email, 'Attendance Notification',
        `Dear ${student.name},\n\nYour attendance was marked as "${status}" on ${date}.\n\nRegards,\nSchool Administration`
      );
    }
    res.json({ success: true, record: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =====================================================================
// EXAM ROUTES
// =====================================================================

// GET exams
app.get('/api/exams', async (req, res) => {
  const { batch_id } = req.query;
  try {
    let query = 'SELECT * FROM exams';
    const params = [];
    if (batch_id) { params.push(batch_id); query += ' WHERE batch_id=$1'; }
    query += ' ORDER BY date ASC';
    const result = await pool.query(query, params);
    res.json({ success: true, exams: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ADD exam
app.post('/api/exams', async (req, res) => {
  const { id, name, batch_id, date, time } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO exams (id, name, batch_id, date, time) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [id, name, batch_id, date, time]
    );
    // Send emails to batch students
    const students = await pool.query("SELECT email, name FROM users WHERE role='student' AND batch_id=$1 AND email!=''", [batch_id]);
    for (const s of students.rows) {
      await sendEmail(s.email, 'New Exam Schedule',
        `Dear ${s.name},\n\nExam: ${name}\nDate: ${date}\nTime: ${time}\n\nRegards,\nSchool Administration`
      );
    }
    res.json({ success: true, exam: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =====================================================================
// RESULT ROUTES
// =====================================================================

// GET results
app.get('/api/results', async (req, res) => {
  const { student_id } = req.query;
  try {
    let query = 'SELECT * FROM results';
    const params = [];
    if (student_id) { params.push(student_id); query += ' WHERE student_id=$1'; }
    query += ' ORDER BY result_date DESC';
    const result = await pool.query(query, params);
    res.json({ success: true, results: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ADD results (multiple subjects at once)
app.post('/api/results', async (req, res) => {
  const { student_id, title, result_date, subjects } = req.body;
  // subjects = [{ id, subject, marks_obtained, total_marks }]
  try {
    const inserted = [];
    for (const s of subjects) {
      const r = await pool.query(
        'INSERT INTO results (id, student_id, title, result_date, subject, marks_obtained, total_marks) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
        [s.id, student_id, title, result_date, s.subject, s.marks_obtained, s.total_marks]
      );
      inserted.push(r.rows[0]);
    }
    // Send email
    const studentRes = await pool.query('SELECT email, name FROM users WHERE id=$1', [student_id]);
    const student = studentRes.rows[0];
    if (student && student.email) {
      await sendEmail(student.email, 'New Result Uploaded',
        `Dear ${student.name},\n\nYour result "${title}" has been uploaded.\nPlease login to view your results.\n\nRegards,\nSchool Administration`
      );
    }
    res.json({ success: true, results: inserted });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE result set
app.delete('/api/results', async (req, res) => {
  const { student_id, title, result_date } = req.body;
  try {
    await pool.query('DELETE FROM results WHERE student_id=$1 AND title=$2 AND result_date=$3', [student_id, title, result_date]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =====================================================================
// FEES ROUTES
// =====================================================================

// GET fees
app.get('/api/fees', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM fees');
    res.json({ success: true, fees: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// SAVE fee record (upsert)
app.post('/api/fees', async (req, res) => {
  const { student_id, amount, status } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO fees (student_id, amount, status, updated_at)
       VALUES ($1, $2, $3, NOW())
       ON CONFLICT (student_id) DO UPDATE SET amount=$2, status=$3, updated_at=NOW()
       RETURNING *`,
      [student_id, amount, status]
    );
    res.json({ success: true, fee: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =====================================================================
// LEGACY EMAIL ROUTES (kept for compatibility)
// =====================================================================
app.post('/send-attendance-email', async (req, res) => {
  const { to, subject, text } = req.body;
  if (!to || !subject || !text) return res.status(400).json({ success: false });
  res.json(await sendEmail(to, subject, text));
});
app.post('/send-exam-schedule-email', async (req, res) => {
  const { to, subject, text } = req.body;
  if (!to || !subject || !text) return res.status(400).json({ success: false });
  res.json(await sendEmail(to, subject, text));
});
app.post('/send-result-upload-email', async (req, res) => {
  const { to, subject, text } = req.body;
  if (!to || !subject || !text) return res.status(400).json({ success: false });
  res.json(await sendEmail(to, subject, text));
});
app.post('/send-new-student-email', async (req, res) => {
  const { to, subject, text } = req.body;
  if (!to || !subject || !text) return res.status(400).json({ success: false });
  res.json(await sendEmail(to, subject, text));
});

// Health check
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', db: 'connected', email: 'configured' });
  } catch (err) {
    res.json({ status: 'ok', db: 'error: ' + err.message });
  }
});

// Test email
app.get('/test-email', async (req, res) => {
  const result = await sendEmail(
    process.env.EMAIL_USER || 'codewithsapan007@gmail.com',
    'Test Email from School Tracking Server',
    'This is a test email to verify your server config.'
  );
  if (result.success) res.send('Test email sent successfully!');
  else res.status(500).send('Failed: ' + result.error);
});

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

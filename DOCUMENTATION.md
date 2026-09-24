# 🎓 School Tracking App — Full Documentation

---

## 📌 Overview

**School Tracking App** is a full-stack web application designed for school/coaching institutes to manage students, attendance, exam schedules, results, and fees — all in one place. It supports two roles: **Admin** and **Student**.

---

## 🌐 Live URL

```
https://school-tracking-app-2.vercel.app
```

---

## 🔐 Default Login Credentials

| Role    | Username  | Password     |
|---------|-----------|--------------|
| Admin   | admin     | admin123     |
| Student | student1  | student123   |
| Student | student2  | student123   |

> ⚠️ Change default passwords after first login.

---

## 🛠️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | HTML5, Tailwind CSS, Vanilla JS   |
| Backend    | Node.js, Express.js               |
| Database   | Supabase (PostgreSQL)             |
| Email      | Nodemailer + Gmail SMTP           |
| Hosting    | Vercel                            |
| Repo       | GitHub                            |
| Excel      | SheetJS (xlsx)                    |

---

## 📁 Project Structure

```
School Tracking App 2/
├── server.js           → Backend (Express API + Email + DB)
├── package.json        → Dependencies
├── .env                → Environment variables (not committed)
├── vercel.json         → Vercel deployment config
├── render.yaml         → Render deployment config
└── public/
    └── index.html      → Full frontend (single page app)
```

---

## ⚙️ Environment Variables

These must be set in Vercel (and your local `.env` file):

| Key           | Description                        |
|---------------|------------------------------------|
| `EMAIL_USER`  | Gmail address for sending emails   |
| `EMAIL_PASS`  | Gmail App Password (16 chars)      |
| `DB_PASSWORD` | Supabase database password         |
| `PORT`        | Server port (default: 3000)        |

---

## 🗄️ Database Tables (Supabase PostgreSQL)

### `users`
| Column     | Type    | Description                    |
|------------|---------|--------------------------------|
| id         | TEXT    | Primary key                    |
| username   | TEXT    | Unique login username          |
| password   | TEXT    | Login password                 |
| role       | TEXT    | `admin` or `student`           |
| name       | TEXT    | First name                     |
| surname    | TEXT    | Last name                      |
| email      | TEXT    | Email address                  |
| phone      | TEXT    | Phone number                   |
| batch_id   | TEXT    | Foreign key → batches          |
| std        | TEXT    | Standard/Class (1-12)          |
| division   | TEXT    | Division (A-E)                 |
| roll_no    | INTEGER | Auto-generated roll number     |

### `batches`
| Column | Type | Description            |
|--------|------|------------------------|
| id     | TEXT | Primary key            |
| name   | TEXT | Batch year (e.g. 2025) |

### `attendance`
| Column     | Type | Description              |
|------------|------|--------------------------|
| id         | TEXT | Primary key              |
| student_id | TEXT | Foreign key → users      |
| batch_id   | TEXT | Foreign key → batches    |
| date       | DATE | Attendance date          |
| status     | TEXT | `Present` or `Absent`    |

### `exams`
| Column   | Type | Description           |
|----------|------|-----------------------|
| id       | TEXT | Primary key           |
| name     | TEXT | Exam name             |
| batch_id | TEXT | Foreign key → batches |
| date     | DATE | Exam date             |
| time     | TEXT | Exam time (HH:MM)     |

### `results`
| Column         | Type    | Description            |
|----------------|---------|------------------------|
| id             | TEXT    | Primary key            |
| student_id     | TEXT    | Foreign key → users    |
| title          | TEXT    | Result title/exam name |
| result_date    | DATE    | Result date            |
| subject        | TEXT    | Subject name           |
| marks_obtained | INTEGER | Marks scored           |
| total_marks    | INTEGER | Maximum marks          |

### `fees`
| Column     | Type    | Description         |
|------------|---------|---------------------|
| id         | TEXT    | Primary key         |
| student_id | TEXT    | Foreign key → users |
| amount     | NUMERIC | Fee amount (₹)      |
| status     | TEXT    | `Paid` or `Pending` |

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint     | Description       |
|--------|--------------|-------------------|
| POST   | `/api/login` | Login (all roles) |

### Students
| Method | Endpoint               | Description          |
|--------|------------------------|----------------------|
| GET    | `/api/students`        | Get all students     |
| POST   | `/api/students`        | Add new student      |
| PUT    | `/api/students/:id`    | Update student       |
| DELETE | `/api/students/:id`    | Delete student       |
| GET    | `/api/students/rollno` | Get next roll number |

### Batches
| Method | Endpoint           | Description     |
|--------|--------------------|-----------------|
| GET    | `/api/batches`     | Get all batches |
| POST   | `/api/batches`     | Add batch       |
| DELETE | `/api/batches/:id` | Delete batch    |

### Attendance
| Method | Endpoint          | Description            |
|--------|-------------------|------------------------|
| GET    | `/api/attendance` | Get attendance records |
| POST   | `/api/attendance` | Mark attendance        |

### Exams
| Method | Endpoint     | Description   |
|--------|--------------|---------------|
| GET    | `/api/exams` | Get all exams |
| POST   | `/api/exams` | Add exam      |

### Results
| Method | Endpoint       | Description       |
|--------|----------------|-------------------|
| GET    | `/api/results` | Get results       |
| POST   | `/api/results` | Upload results    |
| DELETE | `/api/results` | Delete result set |

### Fees
| Method | Endpoint    | Description          |
|--------|-------------|----------------------|
| GET    | `/api/fees` | Get all fee records  |
| POST   | `/api/fees` | Save fee record      |

### Utility
| Method | Endpoint      | Description        |
|--------|---------------|--------------------|
| GET    | `/health`     | Check server + DB  |
| GET    | `/test-email` | Test email config  |

---

## 📧 Email Notifications

Emails are automatically sent in these situations:

| Event               | Recipient            |
|---------------------|----------------------|
| Student added       | Student's email      |
| Attendance marked   | Student's email      |
| Exam schedule added | All batch students   |
| Result uploaded     | Student's email      |

---

## 👨‍💼 Admin Features

1. **Dashboard** — 7 module cards for quick navigation
2. **Batches** — Add/delete year-based batches (2025, 2026...)
3. **Add Students** — Add with Std, Division, auto Roll No
4. **Attendance Management** — Filter by Batch/Std, mark Present/Absent
5. **Exam Schedule** — Add exams per batch, auto email to students
6. **Result Management** — Upload subject-wise results per student
7. **List of Students** — Filter by Batch/Std/Division, Export Excel
8. **Fees** — Track Paid/Pending fees, Export Excel
9. **Profile** — Update admin credentials
10. **Student Credentials** — Manage student login from profile

---

## 👨‍🎓 Student Features

1. **Dashboard** — 3 quick access cards
2. **Attendance Records** — Filter by month/date
3. **Exam Schedule** — View upcoming exams for their batch
4. **Results** — View subject-wise results with clickable cards
5. **Profile** — Update personal info and password

---

## 🚀 Local Setup

### Prerequisites
- Node.js (v14+)
- npm

### Steps
```bash
# 1. Clone the repo
git clone https://github.com/Sapan02206/School-Tracking-App-2.git
cd "School Tracking App 2"

# 2. Install dependencies
npm install

# 3. Create .env file
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
DB_PASSWORD=your-supabase-password
PORT=3000

# 4. Start the server
node server.js

# 5. Open in browser
http://localhost:3000
```

---

## ☁️ Deployment (Vercel)

1. Push code to GitHub
2. Connect repo on vercel.com
3. Add environment variables:
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `DB_PASSWORD`
4. Deploy — Vercel auto-deploys on every push to `main`

---

## 🔑 Gmail App Password Setup

1. Go to **myaccount.google.com**
2. Security → 2-Step Verification → App passwords
3. Create new → copy 16-char password
4. Add as `EMAIL_PASS` in Vercel env vars

> App Passwords can expire — regenerate if emails stop working.

---

## 📱 Mobile Support

- Responsive design using Tailwind CSS
- Sidebar slides in/out on mobile (hamburger button)
- Works on all screen sizes

---

## 🔒 Security Notes

- Never commit `.env` file (already in `.gitignore`)
- All credentials stored as environment variables only
- Supabase DB uses SSL connection
- Consider password hashing (bcrypt) in future versions

---

*Documentation last updated: September 2026*

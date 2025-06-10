<div align="center">

# 🎓 School Tracking System

### *Empowering Education Through Digital Management*

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

*A comprehensive, modern web-based school management solution that bridges the gap between administrators, students, and academic excellence.*

---

</div>

## 🌟 Overview

**School Tracking System** is a full-stack educational management platform designed to streamline academic operations. Built with modern web technologies, it provides an intuitive interface for managing student data, tracking attendance, scheduling examinations, and maintaining academic records—all while keeping stakeholders informed through automated email notifications.

### 🎯 Why Choose Our System?

- **🔐 Dual-Role Architecture**: Separate interfaces for administrators and students
- **📧 Smart Notifications**: Automated email alerts for all academic activities
- **📱 Mobile-First Design**: Responsive interface that works on all devices
- **⚡ Real-Time Updates**: Instant data synchronization across all modules
- **🎨 Modern UI/UX**: Clean, intuitive design powered by Tailwind CSS

---

## 🎯 Features

<summary><b>👨‍💼 Administrator Features</b></summary>

### 📊 **Comprehensive Dashboard**
- Real-time overview of all academic activities
- Quick access to all management modules

### 👥 **Student Management**
- ➕ Add new students with batch assignment
- ✏️ Edit existing student profiles
- 🗑️ Remove students with data cleanup
- 🔑 Manage login credentials securely

### 📅 **Attendance Tracking**
- 📝 Mark daily attendance with date selection
- 📧 Automatic email notifications to students
- 🔍 Advanced filtering (by batch, student, date, month)
- 📈 Attendance history and analytics

### 🎓 **Examination Management**
- 📋 Create and schedule examinations
- 🏫 Batch-wise exam organization
- ⏰ Time management with 12-hour format
- 📧 Automated notifications to all batch students

### 📊 **Result Management**
- 📝 Subject-wise result entry
- 🎯 Detailed marks breakdown
- 📧 Result notification system
- 📈 Performance tracking

### 🏷️ **Batch Organization**
- 🆕 Create and manage student batches
- 🗂️ Organize students by academic groups
- 🔄 Easy batch reassignment
---
<summary><b>👨‍🎓 Student Features</b></summary>

### 🏠 **Personal Dashboard**
- Personalized welcome interface
- Quick access to academic information
- Overview of recent activities

### 📊 **Attendance Portal**
- 📅 View personal attendance records
- 🔍 Filter by date ranges and batches
- 📈 Attendance percentage tracking

### 📚 **Examination Schedule**
- 📋 View upcoming examinations
- ⏰ Exam timings and details
- 📧 Receive schedule updates

### 🎯 **Results Center**
- 📊 Detailed subject-wise results
- 🔍 Clickable result cards for detailed view
- 📈 Performance analysis

### ⚙️ **Profile Management**
- ✏️ Update personal information
- 🔐 Change login credentials
- 📧 Manage contact details


---

## 🛠️ Technology Stack

<div align="center">

### Backend Technologies
| Technology | Purpose | Version |
|------------|---------|---------|
| 🟢 **Node.js** | Runtime Environment | v14+ |
| 🚀 **Express.js** | Web Framework | Latest |
| 📧 **Nodemailer** | Email Service | Latest |
| 🌐 **CORS** | Cross-Origin Requests | Latest |

### Frontend Technologies
| Technology | Purpose | Features |
|------------|---------|----------|
| 🎨 **HTML5** | Structure | Semantic Markup |
| 💎 **Tailwind CSS** | Styling | Responsive Design |
| ⭐ **Font Awesome** | Icons | Professional Icons |
| ⚡ **Vanilla JS** | Interactivity | Modern ES6+ |

</div>

---

## 🚀 Quick Start

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

- 🟢 **Node.js** (v14.0.0 or higher)
- 📦 **npm** or **yarn** package manager
- 📧 **Gmail Account** (for email functionality)

### ⚡ Installation

<details>
<summary><b>🔧 Step-by-Step Setup</b></summary>

#### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/your-username/school-tracking-system.git
cd school-tracking-system
```

#### 2️⃣ **Install Dependencies**
```bash
npm install
# or
yarn install
```

#### 3️⃣ **Configure Email Settings**

**🔐 Gmail App Password Setup:**
1. Enable 2-Factor Authentication on your Gmail
2. Generate App Password:
   - Google Account → Security → 2-Step Verification → App passwords
   - Select "Mail" and generate password

**⚙️ Update Configuration:**
```javascript
// In server.js, update these lines:
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',        // 👈 Your Gmail
    pass: 'your-16-digit-app-password',  // 👈 Your App Password
  },
});
```

#### 4️⃣ **Launch the Application**
```bash
npm start
# or
node server.js
```

#### 5️⃣ **Access the System**
🌐 Open your browser and navigate to: **http://localhost:3000**

</details>

---

## 🔐 Default Access Credentials

<div align="center">

### 👨‍💼 Administrator Access
| Field | Value |
|-------|-------|
| 🆔 **Username** | `admin` |
| 🔑 **Password** | `admin123` |

### 👨‍🎓 Student Access (Demo Accounts)
| Student | Username | Password |
|---------|----------|----------|
| 👤 **John Doe** | `student1` | `student123` |
| 👤 **Jane Smith** | `student2` | `student123` |

</div>

> ⚠️ **Security Note**: Change these default credentials before deploying to production!

---

## 📁 Project Structure

```
🎓 school-tracking-system/
├── 🚀 server.js                 # Express.js backend server
├── 📁 public/
│   └── 🌐 index (6).html        # Main frontend application
├── 📦 package.json              # Project dependencies & scripts
├── 📖 README.md                 # Project documentation
└── 🔧 .gitignore               # Git ignore rules
```

---

## 🌐 API Reference

<details>
<summary><b>📧 Email Notification Endpoints</b></summary>

### Attendance Notifications
```http
POST /send-attendance-email
Content-Type: application/json

{
  "to": "student@example.com",
  "subject": "Attendance Notification",
  "text": "Your attendance has been marked..."
}
```

### Exam Schedule Updates
```http
POST /send-exam-schedule-email
Content-Type: application/json

{
  "to": "student@example.com",
  "subject": "New Exam Schedule",
  "text": "A new exam has been scheduled..."
}
```

### Result Notifications
```http
POST /send-result-upload-email
Content-Type: application/json

{
  "to": "student@example.com",
  "subject": "New Result Available",
  "text": "Your result has been uploaded..."
}
```

### Welcome Messages
```http
POST /send-new-student-email
Content-Type: application/json

{
  "to": "newstudent@example.com",
  "subject": "Welcome to Your Batch",
  "text": "You have been added to the batch..."
}
```

</details>

<details>
<summary><b>🔧 Utility Endpoints</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| 🧪 **GET** | `/test-email` | Test email configuration |
| 🏠 **GET** | `/` | Serve main application |

</details>

---

---

## 🎨 User Interface Highlights

### 🎯 **Design Philosophy**
- **Minimalist Approach**: Clean, distraction-free interface
- **Intuitive Navigation**: Logical flow and easy-to-find features
- **Responsive Design**: Seamless experience across all devices
- **Accessibility First**: ARIA labels and keyboard navigation support

### 📱 **Mobile Experience**
- **Touch-Optimized**: Large buttons and touch-friendly interactions
- **Collapsible Sidebar**: Space-efficient navigation on mobile
- **Responsive Tables**: Horizontal scrolling for data tables
- **Mobile-First CSS**: Optimized for smaller screens

---

## 🔒 Security Features

<details>
<summary><b>🛡️ Security Implementations</b></summary>

### 🔐 **Authentication**
- Role-based access control (Admin/Student)
- Secure password handling
- Session management via localStorage

### 🛡️ **Data Protection**
- Input validation and sanitization
- XSS protection measures
- CORS configuration for API security

### 📧 **Email Security**
- App Password authentication
- Secure SMTP connection
- Rate limiting considerations

</details>

---

## 🚀 Deployment Guide

<details>
<summary><b>☁️ Cloud Deployment Options</b></summary>

### 🌐 **Heroku Deployment**
```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create your-school-app

# Set environment variables
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASS=your-app-password

# Deploy
git push heroku main
```

### ⚡ **Vercel Deployment**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### 🐳 **Docker Deployment**
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

</details>

---
<details>
<summary><b>🔧 Development Setup</b></summary>

### 1️⃣ **Fork & Clone**
```bash
git clone https://github.com/your-username/school-tracking-system.git
cd school-tracking-system
```

### 2️⃣ **Create Feature Branch**
```bash
git checkout -b feature/amazing-feature
```

### 3️⃣ **Make Changes**
- Follow existing code style
- Add comments for complex logic
- Test thoroughly

### 4️⃣ **Commit & Push**
```bash
git commit -m "✨ Add amazing feature"
git push origin feature/amazing-feature
```

### 5️⃣ **Create Pull Request**
- Describe your changes clearly
- Include screenshots if UI changes
- Reference any related issues

</details>

---

**Made with ❤️ for the Education Community**

*Empowering schools, one line of code at a time.*

</div>
```
```


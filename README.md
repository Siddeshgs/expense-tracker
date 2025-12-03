# Expense Tracker – Full Stack MERN Application

A complete expense tracking system with authentication, budget alerts, filters, and a beautiful responsive dashboard.

---

### Features
- Secure signup/login (JWT + httpOnly cookies + bcrypt)
- Add / Edit / Delete expenses
- Filter by category & date range
- Monthly budget with real-time tracking
- Red warning when budget is exceeded
- Dashboard with interactive Pie Chart (Recharts)
- Fully responsive UI 

---

### Tech Stack
- **Frontend:** React + Vite + Recharts
- **Backend:** Node.js + Express + MongoDB
- **Auth:** JWT + bcrypt

---

### Screenshots

| Login & Signup                  | Dashboard (Normal)                 |
|----------------------------------|-------------------------------------|
| ![Signup](./screenshots/01-signup.png) | ![Dashboard](./screenshots/07-dashboard.png) |

| Budget Exceeded Warning          | Add / Edit Expense                 |
|----------------------------------|-------------------------------------|
| ![Exceeded](./screenshots/09-dashboard-exceeded.png) | ![Add](./screenshots/04-add-expense.png) |

| Expense List + Filters           | Budget Page                        |
|----------------------------------|-------------------------------------|
| ![List](./screenshots/05-expense-list.png) | ![Budget](./screenshots/03-budget-page.png) |

---

### Run Locally

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend 
cd frontend
npm install
npm run dev

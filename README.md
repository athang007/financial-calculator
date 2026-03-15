# 💰 Financial Record Web App

A lightweight, modern web application to track monthly spending and manage personal finances. Built with a focus on simplicity, speed, and a clean user experience.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?logo=node.js)
![SQLite](https://img.shields.io/badge/Database-SQLite-003B57?logo=sqlite)
![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?logo=tailwind-css)

## ✨ Features

- **📊 Dashboard Summary**: Real-time calculation of total spending.
- **📝 Transaction Management**: Easily add new expenses with category, date, and description.
- **📅 Monthly Tracking**: Organized list of recent transactions.
- **🎨 Modern UI**: Responsive design built with Tailwind CSS.
- **💾 Local Persistence**: Data is stored locally using SQLite.

## 🚀 Tech Stack

- **Frontend**: [React](https://reactjs.org/) (TypeScript) + [Vite](https://vitejs.dev/)
- **Backend**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- **Database**: [SQLite](https://www.sqlite.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## 🛠️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (comes with Node.js)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/financial-calculator.git
cd financial-calculator
```

### 2. Setup Backend
```bash
cd server
npm install
npm start
```
The server will run on `http://localhost:5000`.

### 3. Setup Frontend
Open a new terminal window:
```bash
cd client
npm install
npm run dev
```
The app will be available at `http://localhost:5173`.

## 📂 Project Structure

```text
financial-calculator/
├── client/                # React frontend (Vite)
│   ├── src/
│   │   ├── api.ts         # API service layer
│   │   ├── App.tsx        # Main UI component
│   │   └── index.css      # Tailwind directives
│   └── tailwind.config.js
├── server/                # Express backend
│   ├── index.js           # Server & API routes
│   └── finance.db         # SQLite database (auto-generated)
└── README.md
```

## 🌐 Deployment Plan

This project is designed for easy deployment:
- **Frontend**: Host on [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).
- **Backend**: Deploy the Express API to [Render](https://render.com/) or [Railway](https://railway.app/).
- **Database**: Migrate the local SQLite to a managed [PostgreSQL](https://www.postgresql.org/) instance like [Supabase](https://supabase.com/) or [Neon](https://neon.tech/) for production.

## 📄 License
This project is licensed under the MIT License.

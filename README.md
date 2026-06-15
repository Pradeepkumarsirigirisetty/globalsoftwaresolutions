# Global Software Solutions - Complete Web Portal & Admin CMS

A professional, high-performance, full-stack website and admin content management system designed for **Global Software Solutions** (computer training center, software services, sales & internet cafe). Built with Next.js 14/16 (App Router, Turbopack, Tailwind CSS) for a modern, responsive frontend, and Node.js + Express + Prisma (PostgreSQL) for a robust and secure backend.

---

## 🏗️ Architecture Overview

```text
global-software-solutions/
├── frontend/           ← Next.js (App Router, TypeScript, Tailwind CSS)
│   ├── src/app/        ← Public website pages & admin dashboard
│   ├── src/components/ ← Reusable UI components & layouts
│   └── src/lib/        ← API services, types, constants
├── backend/            ← Node.js + Express API + Prisma ORM
│   ├── src/routes/     ← API Router endpoints
│   ├── src/controllers/← Database business logic handlers
│   ├── src/middleware/ ← JWT & Auth middleware
│   └── prisma/         ← Prisma schema & migration configuration
└── docker-compose.yml  ← Local PostgreSQL container setup
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js, React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Framer Motion |
| **Backend** | Node.js, Express, TypeScript, Prisma v6 ORM, Multer |
| **Database** | PostgreSQL |
| **Authentication** | JWT (JSON Web Tokens) & bcryptjs (password hashing) |
| **Image Hosting** | Cloudinary (Multer memory storage integration) |
| **Local Dev DB** | Docker Compose |

---

## ⚡ Prerequisites

Before starting, ensure you have the following installed:
* **Node.js** (v18 or higher) & **npm**
* **Docker & Docker Desktop** (running for PostgreSQL database)

---

## 🚀 Setup & Launch Instructions

### Step 1: Run the Database

1. Open Docker Desktop.
2. In the root directory, start the PostgreSQL container:
   ```bash
   docker compose up -d
   ```
   *This starts a PostgreSQL database listening on port `5432`.*

---

### Step 2: Configure & Start Backend API

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Initialize the environment variables:
   * Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   * *The default config is pre-configured to connect to the docker database.*
4. Sync the Prisma schema structure with PostgreSQL:
   ```bash
   npm run db:push
   ```
5. Seed the database (creates default courses, testimonials, settings, and the admin account):
   ```bash
   npm run db:seed
   ```
6. Start the API server in development mode:
   ```bash
   npm run dev
   ```
   *The API will start running at [http://localhost:5000](http://localhost:5000).*

---

### Step 3: Configure & Start Frontend

1. Open a new terminal tab and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Initialize the environment variables:
   * Copy the `.env.example` file to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
4. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   *The frontend website will start running at [http://localhost:3000](http://localhost:3000).*

---

## 🔑 Admin Credentials (Seeded)

Access the secure CMS administration panel by visiting [http://localhost:3000/admin](http://localhost:3000/admin) and logging in with:

* **Email:** `admin@globalsoftware.in`
* **Password:** `Admin@123`

*You can change the email, name, and login password anytime within the **Admin Settings** page.*

---

## 📁 API Endpoint Routing Reference

All API routes are prefixed with `/api`. Admin routes require an `Authorization: Bearer <token>` header.

| Route | Method | Access | Description |
|---|---|---|---|
| `/auth/login` | `POST` | Public | Authenticate admin & return JWT token |
| `/auth/me` | `GET` | Admin | Get logged-in user profiles |
| `/auth/change-password` | `PUT` | Admin | Update current user account password |
| `/courses` | `GET` | Public | List active courses catalog |
| `/courses/:slug` | `GET` | Public | Fetch individual course detail |
| `/courses` | `POST` | Admin | Create a new course entry |
| `/courses/:id` | `PUT` | Admin | Update course content/syllabus |
| `/courses/:id` | `DELETE` | Admin | Delete course entry |
| `/admissions` | `POST` | Public | Submit course admission request |
| `/admissions` | `GET` | Admin | Retrieve filterable list of applications |
| `/admissions/:id/status`| `PUT` | Admin | Approve/Reject application + notes |
| `/gallery` | `GET` | Public | Retrieve image gallery photos |
| `/gallery` | `POST` | Admin | Save new image upload reference |
| `/gallery/:id` | `DELETE` | Admin | Delete image entry |
| `/testimonials` | `GET` | Public | Fetch approved customer testimonials |
| `/upload` | `POST` | Admin | Stream raw image to Cloudinary CDN |

# 🌱 SmartSeason: Field Monitoring System

SmartSeason is a premium full-stack agricultural monitoring platform designed for commercial farms to track crop progress, manage field agents, and optimize seasonal yields through real-time data intelligence.

## 🚀 Quick Start (Setup Instructions)

### Prerequisites
- **Node.js**: v16+ recommended
- **PostgreSQL**: Running locally or on a server

### 1. Backend Setup (`/server`)
1. Open a terminal in the `server` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` folder:
   ```env
   PORT=3000
   DATABASE_URL=postgres://your_user:your_password@localhost:5432/smartseason
   JWT_SECRET=your_super_secret_key
   ```
4. Initialize the database and seed demo data:
   ```bash
   node db/createDb.js
   node db/init.js
   node db/seed.js
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup (`/client`)
1. Open a terminal in the `client` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `client` folder:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### 3. Unified Startup (Root)
From the root directory, you can run both simultaneously:
```bash
npm install
npm start
```

---

## 🔐 Sample Logins

You can use the following credentials to explore the system features after seeding the database:

| User Role | Email Address | Password |
| :--- | :--- | :--- |
| **System Admin** | `jonnymaina3937@gmail.com` | `1234` |
| **Field Agent** | `maina@gmail.com` | `1234` |
| **Demo Agent** | `agent@smartseason.app` | `1234` |

---

## 🎨 Design Decisions

### Technology Stack
- **Frontend**: React (Vite) + TypeScript for type safety and performance.
- **Styling**: Vanilla CSS for maximum flexibility and performance. I implemented a custom **Design System** in `index.css` using CSS Variables for consistent tokens (colors, shadows, spacing).
- **Backend**: Node.js + Express for a lightweight, scalable REST API.
- **Database**: PostgreSQL for robust relational data management, essential for tracking fields and their activity history.

### Application Architecture
- **Component-Based UI**: Reusable components like `Navbar` and `BackButton` ensure a consistent user experience.
- **Route Protection**: Implemented a custom `ProtectedRoute` component on the frontend and JWT middleware on the backend to enforce role-based access control (RBAC).
- **Service Layer**: Centralized API calls in `client/services/api.ts` to attach authentication headers automatically to all protected requests.

### Aesthetics
I prioritized a **Premium Glassmorphism** design:
- **Landing Page**: High-definition agricultural background with glassy floating elements.
- **Interactivity**: Smooth CSS transitions on hover and entry animations for all pages using an `animate-in` utility.
- **Clarity**: High contrast typography and color-coded status badges (Active, At Risk, Completed) for rapid data interpretation.

---

## 💡 Assumptions Made

### 1. Authentication Logic
- **Email Validation**: All user logins and registrations must end with `@gmail.com`. This was an explicit requirement for this environment.
- **Single Admin Rule**: The system only allows **one Admin account** to be registered. Once an Admin is registered, any further attempts to register with the "Admin" role will be blocked by the backend to prevent unauthorized access.

### 2. Field Health (Status Logic)
The system calculates the status of a field dynamically based on activity:
- **Completed**: If the current stage is set to "Harvested".
- **At Risk**: If the field has not received a site update (from either registration or a note) in the last **7 days**.
- **Active**: All other fields that are being updated regularly.

### 3. Role Permissions
- **Admin**: Can create, edit, delete, and list all fields. Can assign agents and view the entire system summary.
- **Field Agent**: Can only see fields assigned to them. They can view the history and submit new stage/note updates.

---

## 📂 Project Structure

```text
SmartSeason/
├── client/
│   ├── public/              # Static assets (Hero backgrounds)
│   ├── src/
│   │   ├── components/      # Reusable UI (Navbar, BackButton, ProtectedRoute)
│   │   ├── context/         # AuthContext for session management
│   │   ├── pages/           # Modular views (Admin, Agent, Fields, etc.)
│   │   ├── services/        # API communication layer
│   │   └── routes/          # AppRoutes configuration
└── server/
    ├── controllers/         # Request handling logic
    ├── db/                  # SQL schema and initialization scripts
    ├── middlewares/         # Auth and Error handlers
    ├── routes/              # Express endpoint definitions
    └── services/            # Core business logic (Status calculation, DB queries)
```

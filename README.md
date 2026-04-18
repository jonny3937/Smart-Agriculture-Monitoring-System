# SmartSeason Field Monitoring System

## Overview
SmartSeason is a clean, minimal, and fully functional web application designed for tracking crop progress across multiple fields during a growing season. The system operates with dual-role authentication (Admin and Field Agent) and implements computed logic to evaluate field risks effectively.

## Features
- **Admin Dashboard**: View all monitored fields globally. Assign fields to available agents. Visualize real-time calculated system metrics.
- **Field Agent Dashboard**: Manage exclusively assigned fields. Add sequential status checkpoints, stage tracking, and notes.
- **Field Management**: Fields have logical statuses (`Active`, `At Risk`, `Completed`) dynamically computed based on harvest stages and inactivity periods (> 7 days).

## Tech Stack
- Frontend: React + Vite + TypeScript (Migrated functionality to `.tsx` following best practices)
- Backend: Node.js + Express
- Database: PostgreSQL (Raw PL/pgSQL statements to ensure simplicity and bypass heavy ORMs)
- Auth: JWT (JSON Web Tokens)

## Setup Instructions

### Pre-requisites
1. Node.js installed (> v16+ recommended).
2. PostgreSQL installed and running locally on port `5432` with a database credential that matches `postgres:1234`.

### Installation
1. Install dependencies for the root, frontend, and backend environments:
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   cd ..
   ```
2. Initialize Database Models & Seed Data:
   ```bash
   cd server
   node db/createDb.js
   node db/init.js
   node db/seed.js
   ```

3. Launch Server and Client Concurrently from the root directory:
   ```bash
   npm start
   ```

*The Express backend runs on `http://localhost:3000` and the React frontend on Vite's default dev port.*

## Design Decisions
- **Monorepo Structure**: Kept frontend and backend isolated cleanly under a single repository roof, leveraging NPM workspaces or `concurrently` for rapid development initialization.
- **Vanilla Data Access**: Decided against heavy ORMs to keep database setup "simple and practical" while utilizing PL/PgSQL migrations manually.
- **Inline Minimalist UI**: Eliminated dependency bloat. The user interface leverages lean structural styling, implementing simple unified color codes indicating severity (Active = Green, At Risk = Orange, Completed = Gray).
- **TypeScript Conversion**: Components were restructured safely to TypeScript (`.tsx`) enforcing stronger typing for React Components without aggressively limiting Vanilla JS paradigms on the backend models.

## Assumptions
- Agents can only insert updates indicating advancing stages, restricting backwards regression for ease of auditing.
- Computing status based on simple metrics guarantees scalability. (Field updates not created within rolling 7 days throw flags).

## Demo Credentials
| Role | Email | Password |
|---|---|---|
| Admin | admin@smartseason.app | 1234 |
| Field Agent | agent@smartseason.app | 1234 |

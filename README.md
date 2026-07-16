# DineDash Ethiopia

> **Your restaurant menu, in every customer's pocket. Fast, friendly, and custom-tailored for the Ethiopian hospitality rhythm.**

---

## 🌟 The Product

**DineDash** is a premium, ready-to-deploy digital menu and real-time operations platform designed to eliminate dining friction, optimize order times, and increase sales velocity for the Ethiopian restaurant market. 

By replacing physical menus with smart, table-specific QR codes, DineDash allows guests to scan, explore bilingual offerings, submit orders, and handle payment processing directly from their mobile browser—no app installations required. At the same time, restaurant operators manage floor activity from a live, real-time central operations **Cockpit**.

---

## ✨ Core Commercial Features

### 1. Local Payment Integration
Designed specifically for the local financial ecosystem, DineDash integrates mobile payment wallets directly into the guest checkout flow:
* **Telebirr**: Fast, frictionless digital wallet clearing.
* **CBE Birr**: Instant bank wallet approval.
* No expensive terminal hardware is required at individual dining tables. Customers scan, authorize, and check out in seconds.

### 2. Fully Bilingual (Amharic & English)
Provide a localized, welcoming environment for both local residents and international tourists:
* **One-Tap Translation**: Smooth toggle between English and Amharic for menus, descriptions, and categories.
* **Culturally Tailored Cuisine**: Fully supports traditional dishes (e.g., Special Kitfo, Tegabino Shiro) with accurate bilingual descriptions.

### 3. Real-Time Operations Cockpit
Empower floor staff, kitchen crews, and management with a centralized dashboard that dynamically reflects restaurant state:
* **Table Occupancy Grid**: Real-time visualization of tables (Occupied, Vacant, Browsing, Ordering, Paid, Unpaid).
* **Live Order Queue**: Instantly updates as customers place orders, tracking preparation status (Received ➜ Preparing ➜ Delivered ➜ Paid).
* **Menu Stock Control**: Direct toggles to mark ingredients or chef choices as sold out, instantly sync'd to all guest screens.
* **Revenue Ledgers**: Real-time sales counter to track daily performance.

### 4. Automated Onboarding & Waitlist Automation
A built-in B2B registration portal connects interested restaurant owners to DineDash:
* **Supabase CRM Sync**: Saves owner contact info, restaurant size (number of tables), and location directly to a structured database.
* **Resend Notification Routing**: Automatically triggers beautiful email receipts to the registering partner and notifications to the DineDash sales team.

---

## 🏗️ Technical Architecture & Key Files

DineDash is engineered for speed, clean code standards, and seamless real-time interactivity.

* **Frontend Framework**: React 19, TypeScript, and Vite.
  * Core layout and interactive simulator: [src/App.tsx](file:///c:/DineDash/DineDash/src/App.tsx)
  * Dynamic Guest Simulator Phone: [src/components/LiveDemoModal.tsx](file:///c:/DineDash/DineDash/src/components/LiveDemoModal.tsx)
  * Central Admin Dashboard: [src/components/Cockpit.tsx](file:///c:/DineDash/DineDash/src/components/Cockpit.tsx)
* **Backend Framework**: Node.js Express server + Serverless handlers.
  * Express App Server: [server.ts](file:///c:/DineDash/DineDash/server.ts)
  * Vercel Serverless Function API: [api/register.ts](file:///c:/DineDash/DineDash/api/register.ts)
  * Supabase & Resend integration methods: [src/backend/api.ts](file:///c:/DineDash/DineDash/src/backend/api.ts)

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18+ recommended)
* A **Supabase** account and database table named `registrations` (Optional, simulated fallback included).
* A **Resend** API key for email delivery (Optional, simulated fallback included).

### Local Development Setup

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local` or `.env` and fill in the values:
   ```env
   # API Keys & DB Credentials
   SUPABASE_URL="your-supabase-url"
   SUPABASE_ANON_KEY="your-supabase-anon-key"
   RESEND_API_KEY="re_yourResendApiKey"
   ```

3. **Start the Express Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to view the live dashboard and interactive demo loop.

### Production Build & Launch

To bundle the frontend single-page app and transpile the Express server for production, run:
```bash
npm run build
npm run start
```

# 🌍 EcoSphere: The Ultimate ESG Operating System

> **Odoo Hackathon 2026 Submission** 🏆
> *Empowering enterprises to track, manage, and gamify their Environmental, Social, and Governance (ESG) impact in real-time.*

![EcoSphere Banner](https://img.shields.io/badge/EcoSphere-ESG_Management-10b981?style=for-the-badge&logo=leaf&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

---

## 🚀 The Vision

Modern enterprises struggle to unify their ESG data. Environmental metrics live in spreadsheets, CSR initiatives are lost in emails, and compliance audits are tracked in siloed systems. 

**EcoSphere** bridges this gap. By seamlessly integrating with enterprise logistics and ERP systems (like Odoo), EcoSphere acts as a unified "Operating System" for corporate sustainability—turning regulatory burdens into engaging, gamified experiences for employees while providing executives with AI-driven compliance reports.

---

## ✨ Key Features

### 🌱 1. Environmental Analytics (Scope 1, 2 & 3)
* **Real-time ERP Syncing:** Simulates real-time ingestion of supply chain, fleet operations, and manufacturing data.
* **Live CO2e Tracking:** Automatically calculates and aggregates carbon footprint metrics across departments.

### 🤝 2. Social & CSR Management
* **Community Engagement:** A centralized hub for employees to discover, register for, and track CSR initiatives (e.g., Beach Cleanups, Tech Mentorships).
* **Diversity & Inclusion:** Live tracking of company-wide D&I training completion rates.

### 🛡️ 3. Governance & Compliance
* **Proactive Auditing:** Centralized dashboard for active compliance issues, audits, and policy acknowledgements.
* **Risk Mitigation:** Real-time severity tagging, due dates, and one-click reminder dispatching for unacknowledged policies.

### 🏆 4. Gamification & Culture
* **Employee Challenges:** Incentivizes sustainable behaviors (e.g., "Bike to Work Week", "Zero Waste Lunch") with XP and badges.
* **Global Leaderboards:** Fosters healthy, company-wide competition, boosting employee morale and retention.

### 🤖 5. AI-Powered Reporting
* **Intelligent Summarization:** (Backend ready) Leverages LLMs to digest massive amounts of ESG data and generate human-readable sustainability reports for stakeholders.

---

## 💻 Tech Stack

**EcoSphere is built for scale, speed, and beautiful user experiences.**

- **Frontend:** Next.js 14, React 18, Tailwind CSS, Lucide Icons, TypeScript
- **Backend:** Python, FastAPI, SQLAlchemy, Pydantic, SQLite (Production-ready for Postgres)
- **Architecture:** RESTful Micro-services, Component-based UI, JWT Authentication

---

## 🛠️ Quick Start Guide

Want to run EcoSphere locally? Follow these steps:

### 1. Start the Backend API
Navigate to the `backend` directory and start the FastAPI server:
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate | Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```
*The API will be available at `http://localhost:8000`. You can view the interactive Swagger docs at `http://localhost:8000/docs`.*

### 2. Start the Frontend Application
Open a new terminal window, navigate to the `frontend` directory, and start the Next.js server:
```bash
cd frontend
npm install
npm run dev
```
*The web app will be available at `http://localhost:3000`.*

---

## 💡 Hackathon Demo Instructions

To get the most out of the EcoSphere demo:
1. Navigate to `http://localhost:3000/login` and click **"Login as ESG Admin"** for the full experience.
2. Go to the **Environmental** tab and click **"Simulate ERP Data"** to watch the UI instantly parse and calculate new carbon footprints.
3. Visit the **Gamification** tab and click **"Submit Proof"** to see real-time UI state management for employee engagement.
4. Explore the **Governance** tab to file new compliance tickets and dispatch policy reminders.

---

## 👥 Meet the Team

EcoSphere was built by a passionate team of engineers dedicated to making corporate sustainability actionable, engaging, and transparent.

*Built with ❤️ for the Odoo Hackathon 2026.*

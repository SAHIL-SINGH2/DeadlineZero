<div align="center">

<img src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" alt="DeadlineZero Banner" width="100%" />

<br/>

# ⚡ DeadlineZero
### AI-Powered Last-Minute Productivity Engine

[![Built with Gemini](https://img.shields.io/badge/Powered%20by-Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Deployed on Cloud Run](https://img.shields.io/badge/Deployed%20on-Google%20Cloud%20Run-34A853?style=for-the-badge&logo=google-cloud&logoColor=white)](https://cloud.google.com/run)
[![Built with React](https://img.shields.io/badge/Built%20with-React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vibe2Ship Hackathon](https://img.shields.io/badge/Vibe2Ship-Hackathon%202026-FF6B35?style=for-the-badge)](https://blockseblock.com)

**Submission for Vibe2Ship 2026 · Problem Statement 1: The Last-Minute Life Saver**

[🚀 Live Demo](https://deadlinezero-488749120701.asia-southeast1.run.app) · [💻 GitHub Repo](https://github.com/SAHIL-SINGH2/DeadlineZero) · [📹 Demo Video](#) · [📄 Project Description (Google Doc)](https://docs.google.com/document/d/1MlQDQYWepcJNntMZknwB8LZOVIGWWT3X/edit?usp=sharing&ouid=104096812594625123572&rtpof=true&sd=true)

</div>

---

## 📌 Problem Statement

> *Students, professionals, and entrepreneurs frequently miss deadlines, assignments, meetings, bill payments, interviews, and important commitments. Existing productivity tools often rely on passive reminders that are easy to ignore and do little to help users actually complete their tasks.*

**DeadlineZero** solves this by building an AI-powered productivity companion that goes beyond passive reminders — it **proactively helps users plan, prioritize, and execute** before deadlines are missed.

---

## ✨ Key Features

### 🧠 AI Productivity Coach (Zara)
- Conversational AI assistant powered by **Google Gemini 2.0 Flash**
- Receives your full task list as real-time context in every message
- Gives personalized, actionable advice referencing your actual task names and deadlines
- Quick-prompt shortcuts: *"What should I do first?", "Plan my evening", "Risk check"*
- Full multi-turn conversation memory within each session

### 📋 Smart Task Management
- Add, edit, and delete tasks with title, deadline, priority, and category
- **Intelligent urgency scoring** — auto-sorts tasks by deadline proximity × priority weight
- Categories: Study / Work / Personal / Finance
- One-click task completion with streak tracking
- Export all tasks to CSV archive

### 🚨 Danger Zone
- Highlights tasks due within the next **24 hours** with a pulsing red alert banner
- Live countdown labels: *"2h left", "Overdue", "3d left"*
- Context-aware floating toast notifications when a deadline is under 2 hours away

### 🎯 Focus Mode
- Single-click to isolate the #1 most urgent task
- Hides all other tasks and displays an ambient focus indicator
- Helps users eliminate decision fatigue under pressure

### 📊 Progress & Streak Tracker
- Daily completion progress bar
- Streak counter that updates when tasks are completed
- Stats dashboard: Total / Urgent / Done / Pending

### 📦 Offline-First
- All task data persists in **localStorage** — no account needed
- Works fully without internet (except AI chat features)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Tailwind CSS v4 |
| AI / LLM | Google Gemini 2.0 Flash (`@google/genai`) |
| Backend | Node.js + Express (API proxy for Gemini) |
| Build Tool | Vite 6 |
| Animation | Motion (Framer Motion v12) |
| Charts | Recharts |
| Icons | Lucide React |
| Deployment | Google Cloud Run (via AI Studio) |

---

## 🟢 Google Technologies Used

- **Google Gemini 2.0 Flash** — Core AI model for the productivity coach
- **Google AI Studio** — App development, configuration, and one-click deployment
- **Google Cloud Run** — Serverless hosting for the deployed application
- **`@google/genai` SDK** — Official Google Gen AI Node.js SDK for Gemini API calls

---

## 🚀 Getting Started (Run Locally)

### Prerequisites
- **Node.js** v18 or higher
- A **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/SAHIL-SINGH2/DeadlineZero.git
cd DeadlineZero

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Open .env.local and add your Gemini API key:
# GEMINI_API_KEY="your_api_key_here"

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
deadlinezero/
├── src/
│   ├── App.tsx                 # Root component — state, logic, layout
│   ├── main.tsx                # React entry point
│   ├── index.css               # Global styles (Tailwind + custom)
│   ├── types.ts                # TypeScript interfaces (Task, ChatMessage, etc.)
│   └── components/
│       ├── AIChat.tsx          # Gemini-powered AI chat panel (Zara)
│       ├── TaskForm.tsx        # Add new task form
│       ├── TaskList.tsx        # Task feed with urgency sorting & focus mode
│       ├── ProgressTracker.tsx # Progress bar, streak, stats
│       └── CategoryChart.tsx   # Recharts category breakdown
├── server.ts                   # Express backend — Gemini API proxy
├── index.html                  # HTML entry point
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript config
├── .env.example                # Environment variable template
└── package.json
```

---

## 🎯 Evaluation Criteria Alignment

| Criteria | How DeadlineZero addresses it |
|---|---|
| **Problem Solving & Impact (20%)** | Directly targets deadline-missing behavior with proactive AI intervention, not passive reminders |
| **Agentic Depth (20%)** | AI reads live task context, reasons about urgency scores, and generates personalized execution plans |
| **Innovation & Creativity (20%)** | Urgency scoring algorithm, Danger Zone, Focus Mode, and streak gamification go well beyond a to-do app |
| **Usage of Google Technologies (15%)** | Gemini 2.0 Flash + AI Studio + Cloud Run + official `@google/genai` SDK |
| **Product Experience & Design (10%)** | Premium dark UI with glassmorphism, live clock, smooth animations, and responsive layout |
| **Technical Implementation (10%)** | TypeScript + React 19, secure backend proxy for API keys, modular component architecture |
| **Completeness & Usability (5%)** | All features functional, offline-first storage, clean UX from first load |

---

## 🖼️ Screenshots

> *Add screenshots of your app here after deployment*

| Dashboard | AI Coach (Zara) | Focus Mode |
|---|---|---|
| ![Dashboard](#) | ![AI Chat](#) | ![Focus Mode](#) |

---

## 👤 Author

**Sahil Singh** — Vibe2Ship 2026 Participant

- 🔗 GitHub: [github.com/SAHIL-SINGH2](https://github.com/SAHIL-SINGH2)
- 🚀 Live App: [deadlinezero-488749120701.asia-southeast1.run.app](https://deadlinezero-488749120701.asia-southeast1.run.app)
- 📄 Project Description: [Google Doc](https://docs.google.com/document/d/1MlQDQYWepcJNntMZknwB8LZOVIGWWT3X/edit?usp=sharing&ouid=104096812594625123572&rtpof=true&sd=true)
- Submitted via: [BlockseBlock Platform](https://blockseblock.com/dashboard)
- Hackathon: **Vibe2Ship** by Coding Ninjas × Google for Developers
- Problem Statement: **The Last-Minute Life Saver**

---

## 📄 License

This project was built for the Vibe2Ship Hackathon 2026. All rights reserved.

---

<div align="center">

Built with ⚡ using **Google Gemini** · Deployed on **Google Cloud Run**

*Deadline? What deadline. — DeadlineZero*

</div>

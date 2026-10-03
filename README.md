# 💰 Money Boss AI

A personal finance app that makes budgeting fun instead of boring. Instead of a plain expense tracker, you pick an AI **"mentor"** character who reacts to your spending in real time, encouraging you when you save and calling you out when you overspend.

## ✨ What it does

- Track your income, expenses, and savings goals
- Choose one of **4 mentor characters**, each with a different personality and strictness level
- Get instant feedback with animated reaction popups every time you log a transaction
- Earn points and streaks for good spending habits
- Talk to an **AI coach** (by text or voice) about your finances
- Compare your savings progress with others on a leaderboard
- Multi-currency support
- Budgets, savings goals, and spending analytics

## 🎯 Why we built it

Most budgeting apps feel like spreadsheets. People try them for a week and quit. We wanted something that keeps people engaged, using the same feedback loops that make games addictive, but for saving money instead of losing time.

## 🛠️ Tech stack

| Layer | Technology |
|-------|------------|
| Frontend | React, TypeScript, Vite |
| Backend | Node.js / Express (`server.ts`), proxies requests to the AI model |
| AI | Amazon Bedrock (foundation model inference) |
| IDE | [Kiro](https://kiro.dev), AWS's agentic, spec-driven development environment |
| Deployment | _To be updated once finalized (e.g. AWS / Cloud Run)_ |

## 📁 Project structure

```
├── assets/                       # Static assets & icons
├── server.ts                     # Express backend & AI proxy
├── src/
│   ├── components/
│   │   ├── AiCoachScreen.tsx         # Voice & text AI coach
│   │   ├── AnalyticsScreen.tsx       # Spending charts & stats
│   │   ├── BottomNav.tsx             # Main navigation
│   │   ├── BudgetGoalsScreen.tsx     # Budgets & savings goals
│   │   ├── CurrencySelection.tsx     # Currency setup
│   │   ├── HomeDashboard.tsx         # Main home screen
│   │   ├── Leaderboard.tsx           # Anonymized savings leaderboard
│   │   ├── MentorCard.tsx            # Mentor selection card
│   │   ├── MentorInfoModal.tsx       # Mentor details popup
│   │   ├── OnboardingFlow.tsx        # First-time setup flow
│   │   ├── ProfileScreen.tsx         # User profile & settings
│   │   ├── RecordsManager.tsx        # Transaction logging & history
│   │   ├── RewardsScreen.tsx         # KP shop & rewards
│   │   ├── SpendingReactionPopup.tsx # Real-time mentor reactions
│   │   └── SplashAuth.tsx            # Splash & auth screen
│   ├── mentors.ts                # Mentor persona definitions
│   ├── initialData.ts            # Mock/seed data
│   ├── types.ts                  # Shared TypeScript types
│   └── app.tsx                   # Root app component
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🚀 How to run it

**1. Clone this repo**

```bash
git clone https://github.com/liyanshin/Money-Boss-AI-Kiro.git
cd Money-Boss-AI-Kiro
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables** (see below)

**4. Run the dev server**

```bash
npm run dev
```

## 🔐 Environment setup

Copy `.env.example` to `.env` and fill in your values:

```env
AWS_ACCESS_KEY_ID="your_aws_access_key_id"
AWS_SECRET_ACCESS_KEY="your_aws_secret_access_key"
AWS_REGION="us-east-1"
APP_URL="your_app_url"
```

AWS credentials are required for Amazon Bedrock API calls (used by the AI Money Coach).

> ⚠️ **Never commit your actual `.env` file.** Only `.env.example` should be tracked in Git.

## 👥 Team: ERROR:404

- Kalyani Bijwe
- Lavanya Chandurkar
- Jaywardhan Sonwane
- Aryan Prasad

## 🏆 Built for

**Kiro Buildathon**, 15th August, 2026

Built using [Kiro](https://kiro.dev), AWS's agentic, spec-driven development IDE.

[Uploading project.md…]()
# Money Boss AI — Project Specification

## 1. Project Overview

**Money Boss AI** is a gamified personal finance application designed to make budgeting engaging rather than spreadsheet-like.

Instead of acting as a conventional expense tracker, the application allows the user to select an AI "mentor" character who reacts to spending behavior in real time — encouraging good financial decisions and calling out overspending.

### Core capabilities

- Track income, expenses, and savings goals.
- Choose one of four mentor characters, each with a different personality and strictness level.
- Receive instant feedback after logging transactions through animated mentor reaction popups.
- Earn Kinetic Points (KP) and maintain streaks for positive spending habits.
- Talk to an AI Money Coach through text or voice.
- Use Amazon Bedrock for AI-powered financial coaching.
- Compare savings progress through an anonymized leaderboard.
- Support multiple currencies.
- Manage budgets and savings goals.
- View spending analytics and habit patterns.

## 2. Product Motivation

Most budgeting applications feel like spreadsheets. Users often try them for a short period and stop using them.

Money Boss AI uses game-style feedback loops to encourage financial discipline. The goal is to make saving and responsible spending more engaging by combining:

- Gamification
- Character-based accountability
- Rewards
- Streaks
- Real-time feedback
- AI financial coaching
- Progress tracking
- Social comparison through rankings

## 3. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| UI Icons | Lucide React |
| Backend | Node.js + Express |
| AI | Amazon Bedrock |
| AI Model | Anthropic Claude on Amazon Bedrock |
| Runtime | Node.js |
| Build/Bundle | Vite + esbuild |
| Development IDE | Kiro |
| Voice Input | Browser Speech Recognition API |
| Voice Output | Browser Speech Synthesis API |

## 4. Repository Source Files

The original project consists of the following files:

```text
vite.config.ts
types.ts
tsconfig.json
server.ts
package.json
metadata.json
mentors.ts
main.tsx
initialData.ts
index.html
index.css
declaration.d.ts
CurrencySelectScreen.tsx
App.tsx
SplashAuth.tsx
SpendingReactionPopup.tsx
RewardsScreen.tsx
RecordsManager.tsx
README.md
ProfileScreen.tsx
OnboardingFlow.tsx
MentorInfoModal.tsx
MentorCard.tsx
LeaderboardScreen.tsx
HomeDashboard.tsx
BudgetsGoalsScreen.tsx
BottomNav.tsx
AnalyticsScreen.tsx
AiCoachScreen.tsx
.gitignore
.env.example
```

The project uses `src/` for the React application and `src/data/` for mentor and initial-data definitions.

## 5. Application Architecture

### Frontend

The React frontend contains:

- Application root and navigation.
- Authentication and onboarding.
- Dashboard.
- Transaction management.
- Budgets and savings goals.
- Analytics.
- AI Money Coach.
- Mentor selection and mentor information.
- Rewards and KP system.
- Leaderboard.
- Profile/settings.
- Bottom navigation.
- Spending reaction popups.

### Backend

`server.ts` provides an Express server that:

1. Loads environment variables.
2. Initializes the Amazon Bedrock Runtime client.
3. Exposes the `/api/ai-coach` endpoint.
4. Sends user financial context and mentor context to an Amazon Bedrock model.
5. Returns the AI-generated financial coaching response.
6. Runs Vite middleware during development.
7. Serves the production `dist` directory when running in production.

## 6. Amazon Bedrock Integration

The AI Money Coach uses Amazon Bedrock for foundation-model inference.

The backend creates a `BedrockRuntimeClient` using:

- `AWS_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

The `/api/ai-coach` endpoint accepts:

```text
message
mentor
tone
userData
```

The backend builds a system prompt containing:

- Mentor name
- Mentor personality
- Mentor quote
- Tone mode
- User currency
- Total balance
- Pocket-money balance
- Savings goal
- Goal progress
- Kinetic Points
- Multiplier
- Active streak

The model is instructed to provide concise, actionable financial advice that is grounded in the user's supplied financial state.

## 7. Development and Runtime Configuration

### npm scripts

```json
{
  "scripts": {
    "dev": "tsx server.ts",
    "build": "vite build && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs",
    "start": "node dist/server.cjs",
    "preview": "vite preview",
    "clean": "rm -rf dist server.cjs",
    "lint": "tsc --noEmit"
  }
}
```

### Development command

```bash
npm install
npm run dev
```

### Production build

```bash
npm run build
npm start
```

## 8. Environment Variables

Copy `.env.example` to `.env` and provide the required values.

```text
AWS_ACCESS_KEY_ID="your_aws_access_key_id"
AWS_SECRET_ACCESS_KEY="your_aws_secret_access_key"
AWS_REGION="us-east-1"
APP_URL="your_app_url"
```

AWS credentials are required for Amazon Bedrock API calls.

**Never commit the actual `.env` file to GitHub. Only `.env.example` should be tracked.**

## 9. Project Entry Point

The HTML entry point is `index.html`.

The React application is mounted through:

```html
<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
```

The React entry point is `main.tsx`:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

## 10. Vite Configuration

The Vite configuration uses:

- React plugin
- Tailwind CSS Vite plugin
- Path alias `@`
- Optional HMR disabling through `DISABLE_HMR`

Source:

```ts
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
```

## 11. TypeScript Configuration

The project targets modern JavaScript and uses React JSX transformation.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "module": "ESNext",
    "lib": [
      "ES2022",
      "DOM",
      "DOM.Iterable"
    ],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "moduleDetection": "force",
    "allowJs": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": [
        "./*"
      ]
    },
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
}
```

## 12. Package Dependencies

### Runtime dependencies

```json
{
  "@aws-sdk/client-bedrock-runtime": "^3.600.0",
  "@tailwindcss/vite": "^4.1.14",
  "@vitejs/plugin-react": "^5.0.4",
  "lucide-react": "^0.546.0",
  "react": "^19.0.1",
  "react-dom": "^19.0.1",
  "vite": "^6.2.3",
  "express": "^4.21.2",
  "dotenv": "^17.2.3",
  "motion": "^12.23.24"
}
```

### Development dependencies

```json
{
  "@types/node": "^22.14.0",
  "autoprefixer": "^10.4.21",
  "esbuild": "^0.25.0",
  "tailwindcss": "^4.1.14",
  "tsx": "^4.21.0",
  "typescript": "~5.8.2",
  "vite": "^6.2.3",
  "@types/express": "^4.17.21"
}
```

## 13. Server Implementation

The backend is implemented with Express and Amazon Bedrock.

### Server initialization

```ts
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  BedrockRuntimeClient,
  InvokeModelCommand
} from '@aws-sdk/client-bedrock-runtime';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const bedrockClient = new BedrockRuntimeClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
    }
  });

  // AI endpoint and Vite/static serving are defined here.
}
```

### AI Coach endpoint

The endpoint is:

```text
POST /api/ai-coach
```

It receives:

```text
message
mentor
tone
userData
```

The AI system prompt requires the model to:

1. Ground advice in supplied financial statistics.
2. Keep responses concise at approximately 2–4 sentences.
3. Use the selected mentor's personality when mentor tone is enabled.
4. Provide actionable budgeting and savings advice.

The implementation invokes:

```text
anthropic.claude-3-sonnet-20240229-v1:0
```

using the Anthropic Messages API format supported by Amazon Bedrock.

The model request uses:

```text
max_tokens: 256
temperature:
  0.8 when mentor tone is active
  0.4 when neutral tone is active
```

### Development/production server behavior

During development:

```text
Express
  ↓
Vite middleware
  ↓
React application
```

During production:

```text
Express
  ↓
dist/
  ↓
index.html
```

## 14. Metadata

`metadata.json` describes the project as:

```json
{
  "name": "Money Boss AI",
  "description": "Gamified mobile finance application with Asian-parent mentor system, budget tracking, rewards, AI Money Coach powered by Amazon Bedrock, and leaderboard.",
  "requestFramePermissions": ["microphone"],
  "majorCapabilities": ["MAJOR_CAPABILITY_SERVER_SIDE_AMAZON_BEDROCK_API"],
  "builtWith": "Kiro IDE",
  "provider": "Amazon Web Services"
}
```

The application requires microphone access for its voice-input capability.

## 15. HTML Metadata

`index.html` defines:

- HTML5 document structure.
- Responsive viewport.
- Application title.
- SEO description.
- Open Graph metadata.
- Twitter card metadata.
- React root element.
- React entry-point script.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Money Boss AI — Powered by Kiro</title>
    <meta
      name="description"
      content="Money Boss AI — Gamified personal finance app built with Kiro on Amazon Web Services."
    />
    <meta property="og:title" content="Money Boss AI — Powered by Kiro" />
    <meta
      property="og:description"
      content="Gamified personal finance app built with Kiro on Amazon Web Services."
    />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## 16. Type Declarations

The project supports imported image assets through `declaration.d.ts`.

```ts
/// <reference types="vite/client" />

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}
```

## 17. Git Ignore Rules

The repository ignores:

```text
node_modules/
build/
dist/
coverage/
.DS_Store
*.log
.env*
!.env.example
```

The actual environment file is intentionally excluded while `.env.example` remains tracked.

## 18. Intended Project Structure

```text
Money-Boss-AI/
├── assets/
├── server.ts
├── src/
│   ├── components/
│   │   ├── AiCoachScreen.tsx
│   │   ├── AnalyticsScreen.tsx
│   │   ├── BottomNav.tsx
│   │   ├── BudgetGoalsScreen.tsx
│   │   ├── CurrencySelection.tsx
│   │   ├── HomeDashboard.tsx
│   │   ├── Leaderboard.tsx
│   │   ├── MentorCard.tsx
│   │   ├── MentorInfoModal.tsx
│   │   ├── OnboardingFlow.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── RecordsManager.tsx
│   │   ├── RewardsScreen.tsx
│   │   ├── SpendingReactionPopup.tsx
│   │   └── SplashAuth.tsx
│   ├── data/
│   │   ├── mentors.ts
│   │   └── initialData.ts
│   ├── types.ts
│   └── App.tsx
├── index.html
├── index.css
├── metadata.json
├── package.json
├── tsconfig.json
├── vite.config.ts
├── declaration.d.ts
├── .env.example
└── .gitignore
```

## 19. How to Run

### Step 1 — Clone

```bash
git clone https://github.com/liyanshin/Money-Boss-AI-Kiro.git
cd Money-Boss-AI-Kiro
```

### Step 2 — Install

```bash
npm install
```

### Step 3 — Configure environment

Create `.env` from `.env.example` and add the required AWS Bedrock credentials and configuration.

### Step 4 — Start development server

```bash
npm run dev
```

### Step 5 — Build for production

```bash
npm run build
```

### Step 6 — Start production server

```bash
npm start
```

## 20. Buildathon Information

**Team:** ERROR:404

Team members:

- Kalyani Bijwe
- Lavanya Chandurkar
- Jaywardhan Sonwane
- Aryan Prasad

**Built for:** Kiro Buildathon — 15th August 2026

**Built with:** Kiro, AWS's agentic, spec-driven development IDE.

**Cloud/AI provider:** Amazon Web Services

**AI platform:** Amazon Bedrock

## 21. Project-Level Requirements

Money Boss AI should remain:

- A mobile-oriented personal finance application.
- Gamified rather than spreadsheet-like.
- Mentor-driven and behavior-focused.
- Capable of tracking financial state.
- Multi-currency capable.
- Connected to an AI financial coach.
- Able to provide real-time mentor reactions.
- Able to reward positive financial behavior.
- Secure with respect to environment credentials.
- Compatible with the React + TypeScript + Vite architecture.
- Compatible with the Node.js + Express backend.
- Designed for continued development through Kiro.

## 22. Source File Responsibilities

| File | Responsibility |
|---|---|
| `README.md` | Project documentation and setup |
| `package.json` | Dependencies and npm scripts |
| `vite.config.ts` | Vite and Tailwind configuration |
| `tsconfig.json` | TypeScript compiler configuration |
| `server.ts` | Express backend and Amazon Bedrock API |
| `metadata.json` | Application metadata and capabilities |
| `main.tsx` | React application entry point |
| `index.html` | HTML shell and metadata |
| `declaration.d.ts` | Asset type declarations |
| `.env.example` | Environment variable template |
| `.gitignore` | Git exclusions |
| `types.ts` | Shared application types |
| `initialData.ts` | Seed/initial application data |
| `mentors.ts` | Mentor definitions |
| `App.tsx` | Root application state and routing |
| `index.css` | Global styling |
| UI components | Individual application screens and interaction systems |

## 23. Important Naming Normalizations

Some source files have inconsistent names in the original documentation. The intended normalized names are:

```text
currencyselection.tsx → CurrencySelectScreen.tsx
app.tsx → App.tsx
Recordsscreen.tsx → RecordsManager.tsx
Leaderboard.tsx → LeaderboardScreen.tsx
BudgetGoalsScreen.tsx → BudgetsGoalsScreen.tsx
AicoachScreen.tsx → AiCoachScreen.tsx
.gigitnore → .gitignore
```

These normalized names should be used consistently in the final repository and in future Kiro instructions.

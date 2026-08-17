├── assets/                    # Static assets & icons
├── server.ts                  # Express backend & Gemini API proxy
├── src/
│   ├── components/
│   │   ├── AiCoachScreen.tsx          # Gemini voice & chat interface
│   │   ├── AnalyticsScreen.tsx        # Spending charts & 35-day heatmap
│   │   ├── BottomNav.tsx              # Mobile navigation bar
│   │   ├── BudgetsGoalsScreen.tsx     # Budget allocations & savings targets
│   │   ├── CurrencySelectScreen.tsx   # Multi-currency switcher & search
│   │   ├── HomeDashboard.tsx          # Main wallet & gamified HUD
│   │   ├── LeaderboardScreen.tsx      # Social discipline rankings
│   │   ├── MentorCard.tsx             # Mentor selection cards
│   │   ├── MentorInfoModal.tsx        # Mentor rulebook & multiplier dossiers
│   │   ├── OnboardingFlow.tsx         # Initial setup & wallet allocation
│   │   ├── ProfileScreen.tsx          # Settings & avatar customization
│   │   ├── RecordsManager.tsx         # Fast keypad expense logging
│   │   ├── RewardsScreen.tsx          # KP reward redemption store
│   │   ├── SpendingReactionPopup.tsx  # Dynamic mentor reaction modals
│   │   └── SplashAuth.tsx             # Entry splash & auth screen
│   ├── data/
│   │   └── mentors.ts                 # Mentor rules, voice lines & avatars
│   ├── types.ts                       # Shared TypeScript interfaces & types
│   ├── App.tsx                        # Master app router & state coordinator
│   ├── main.tsx                       # React DOM entry point
│   └── index.css                      # Tailwind imports & global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
